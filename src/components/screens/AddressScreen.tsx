
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate, useLocation } from "react-router-dom";
import ProgressIndicator from "@/components/ProgressIndicator";
import { motion } from "framer-motion";
import { Home, Loader2, MapPin } from "lucide-react";
import BackButton from "@/components/BackButton";
import Logo from "@/components/Logo";
import Autocomplete from "react-google-autocomplete";
import { getDeliveryOptions } from "@/utils/googlePlaces";
import { toast } from "sonner";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";

interface AddressFormValues {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

const AddressScreen: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [address, setAddress] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<google.maps.places.PlaceResult | null>(null);
  const [coordinates, setCoordinates] = useState<{ lat: number; lon: number } | null>(null);
  const [flowType, setFlowType] = useState<'prescription' | 'otc' | null>(null);
  const [manualEntryMode, setManualEntryMode] = useState(false);
  
  const form = useForm<AddressFormValues>({
    defaultValues: {
      street: "",
      city: "",
      state: "",
      zipCode: ""
    }
  });

  useEffect(() => {
    // Get flow type from location state or localStorage
    const stateFlowType = location.state?.flowType;
    const storedFlowType = localStorage.getItem('medicationFlow');

    // Set flow type from state or localStorage
    const currentFlowType = stateFlowType || storedFlowType;

    if (currentFlowType === 'prescription' || currentFlowType === 'otc') {
      setFlowType(currentFlowType);
    } else {
      // If no flow type is found, redirect to medication type screen
      toast.error("Please select a medication type first");
      navigate('/medication-type');
    }
  }, [location, navigate]);

  // Determine the previous route for the back button
  const previousRoute = "/medication-type";

  const validateAddress = (address: string) => {
    return address.length >= 5;
  };

  const validateManualForm = () => {
    const { street, city, state, zipCode } = form.getValues();
    return street.length >= 3 && city.length >= 2 && state.length >= 2 && zipCode.length >= 5;
  };

  // Get user's current location
  const getCurrentLocation = () => {
    if ("geolocation" in navigator) {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          console.log("Current location coordinates:", { latitude, longitude });
          setCoordinates({ lat: latitude, lon: longitude });

          // Use Google's Geocoding service to get the address
          try {
            const geocoder = new google.maps.Geocoder();
            geocoder.geocode(
              { location: { lat: latitude, lng: longitude } },
              (results, status) => {
                if (status === "OK" && results?.[0]) {
                  const formattedAddress = results[0].formatted_address;
                  setAddress(formattedAddress);
                  setSelectedPlace(results[0]);
                  toast.success("Location found successfully!");
                } else {
                  console.error("Geocoding failed:", status);
                  toast.error("Failed to get address for your location");
                  setManualEntryMode(true);
                }
                setIsLoading(false);
              }
            );
          } catch (error) {
            console.error("Error with geocoding:", error);
            toast.error("Failed to get address, please enter manually");
            setManualEntryMode(true);
            setIsLoading(false);
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          toast.error("Failed to get your location");
          setManualEntryMode(true);
          setIsLoading(false);
        },
        { enableHighAccuracy: true }
      );
    } else {
      toast.error("Geolocation is not supported by your browser");
      setManualEntryMode(true);
    }
  };

  const handlePlaceSelected = (place: google.maps.places.PlaceResult) => {
    console.log("Selected place:", place);

    if (!place.geometry?.location) {
      console.error("No geometry information available for the selected place");
      toast.error("Invalid location selected");
      return;
    }

    const lat = place.geometry.location.lat();
    const lon = place.geometry.location.lng();
    console.log("Selected place coordinates:", { lat, lon });

    if (place.formatted_address) {
      setAddress(place.formatted_address);
      setSelectedPlace(place);
      setCoordinates({ lat, lon });
      setError(null);
    } else {
      console.error("No formatted address available");
      toast.error("Invalid address selected");
    }
  };

  const handleContinue = async () => {
    if (manualEntryMode) {
      if (!validateManualForm()) {
        setError("Please fill out all address fields correctly");
        return;
      }
      
      // Create a formatted address from form values
      const { street, city, state, zipCode } = form.getValues();
      const manualAddress = `${street}, ${city}, ${state} ${zipCode}`;
      setAddress(manualAddress);
      
      // Set default coordinates if needed
      if (!coordinates) {
        // Use a default location (you might want to adjust this)
        setCoordinates({ lat: 40.7128, lon: -74.0060 }); // New York coordinates
      }
    } else if (!validateAddress(address)) {
      setError("Please enter a valid address");
      return;
    }

    console.log("Proceeding with address:", address);
    setIsLoading(true);

    try {
      // Store address in localStorage for reference
      localStorage.setItem('deliveryAddress', address);
      
      toast.success("Address saved successfully");

      // Navigate based on flow type
      if (flowType === 'otc') {
        navigate('/otc-catalog', { state: { from: 'address', flowType: 'otc' } });
      } else {
        navigate('/insurance', { state: { from: 'address', flowType: 'prescription' } });
      }
    } catch (error) {
      console.error("Error processing address:", error);
      toast.error("Failed to process your address");
      setError("Failed to process your address. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAddressEntryMode = () => {
    setManualEntryMode(!manualEntryMode);
    setError(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col items-center px-4 pt-10"
    >
      <BackButton previousRoute={previousRoute} />

      <div className="absolute top-4 right-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/")}
          className="text-primary hover:bg-accent/30"
        >
          <Home className="h-6 w-6" />
        </Button>
      </div>

      <div className="flex justify-center mb-6">
        <Logo size="small" />
      </div>

      <ProgressIndicator currentStep={1} totalSteps={4} />

      <div className="w-full max-w-lg">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h1 className="text-2xl md:text-3xl font-bold text-center mb-4">
            Enter Your Delivery Address
          </h1>

          <p className="text-center text-gray-600 mb-8">
            We'll deliver your medications to this address.
          </p>

          <div className="space-y-6">
            {!manualEntryMode ? (
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Autocomplete
                    apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
                    onPlaceSelected={handlePlaceSelected}
                    defaultValue={address}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Start typing your address..."
                    options={{
                      types: ['address'],
                    }}
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={getCurrentLocation}
                    disabled={isLoading}
                    title="Use current location"
                  >
                    <MapPin className="h-4 w-4" />
                  </Button>
                </div>
                
                <Button
                  variant="link"
                  className="text-sm px-0 h-auto"
                  onClick={toggleAddressEntryMode}
                >
                  Or enter address manually
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <Form {...form}>
                  <div className="space-y-3">
                    <FormField
                      control={form.control}
                      name="street"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Street Address</FormLabel>
                          <FormControl>
                            <Input placeholder="123 Main St" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-2 gap-3">
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input placeholder="New York" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>State</FormLabel>
                            <FormControl>
                              <Input placeholder="NY" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="zipCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ZIP Code</FormLabel>
                          <FormControl>
                            <Input placeholder="10001" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </Form>
                
                <Button
                  variant="link"
                  className="text-sm px-0 h-auto"
                  onClick={toggleAddressEntryMode}
                >
                  Use map to enter address
                </Button>
              </div>
            )}

            {error && (
              <p className="text-sm text-destructive mt-2">{error}</p>
            )}

            <Button
              className="w-full"
              onClick={handleContinue}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                'Continue'
              )}
            </Button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AddressScreen;
