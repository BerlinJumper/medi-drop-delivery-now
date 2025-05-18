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

// Dummy addresses for suggestions (can be replaced with API data)
const dummyAddresses = [
  "Parkstraße 8, 01968 Senftenberg",
  "Hauptstraße 21, 10827 Berlin",
  "Müllerstraße 12, 13353 Berlin",
  "Prenzlauer Allee 44, 10405 Berlin"
];

const AddressScreen: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [address, setAddress] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<google.maps.places.PlaceResult | null>(null);
  const [coordinates, setCoordinates] = useState<{ lat: number; lon: number } | null>(null);
  const [flowType, setFlowType] = useState<'prescription' | 'otc' | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    // Get flow type from location state or localStorage
    const stateFlowType = location.state?.flowType;
    const storedFlowType = localStorage.getItem('medicationFlow');
    const currentFlowType = stateFlowType || storedFlowType;

    if (currentFlowType === 'prescription' || currentFlowType === 'otc') {
      setFlowType(currentFlowType);
      // Pre-fill address if it exists in localStorage
      const savedAddress = localStorage.getItem('deliveryAddress');
      if (savedAddress) {
        setAddress(savedAddress);
      }
    } else {
      toast.error("Please select a medication type first");
      navigate('/medication-type');
    }
  }, [location, navigate]);

  const previousRoute = "/medication-type";

  const validateAddress = (address: string) => {
    return address.length >= 10;
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAddress(value);
    setShowSuggestions(value.length > 0);
    setError(null);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setAddress(suggestion);
    setShowSuggestions(false);
    setError(null);
  };

  const getCurrentLocation = () => {
    if (!("geolocation" in navigator)) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }

    setIsLoading(true);
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
      toast.error("Location request timed out. Please try again.");
    }, 10000);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        clearTimeout(timeoutId);
        const { latitude, longitude } = position.coords;
        setCoordinates({ lat: latitude, lon: longitude });

        try {
          const geocoder = new google.maps.Geocoder();
          const results = await new Promise<any[]>((resolve, reject) => {
            geocoder.geocode(
              { location: { lat: latitude, lng: longitude } },
              (results, status) => {
                if (status === "OK" && results) {
                  resolve(results);
                } else {
                  reject(new Error(status));
                }
              }
            );
          });

          if (results[0]) {
            const formattedAddress = results[0].formatted_address;
            setAddress(formattedAddress);
            setSelectedPlace(results[0]);
            setError(null);
            toast.success("Location found successfully!");
          }
        } catch (error) {
          console.error("Geocoding failed:", error);
          toast.error("Failed to get address for your location");
        } finally {
          setIsLoading(false);
        }
      },
      (error) => {
        clearTimeout(timeoutId);
        console.error("Error getting location:", error);
        toast.error("Failed to get your location");
        setIsLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handlePlaceSelected = (place: google.maps.places.PlaceResult) => {
    if (!place.geometry?.location) {
      toast.error("Invalid location selected");
      return;
    }

    const lat = place.geometry.location.lat();
    const lon = place.geometry.location.lng();

    if (place.formatted_address) {
      setAddress(place.formatted_address);
      setSelectedPlace(place);
      setCoordinates({ lat, lon });
      setError(null);
    } else {
      toast.error("Invalid address selected");
    }
  };

  const handleContinue = async () => {
    if (!validateAddress(address)) {
      setError("Please enter a valid address");
      return;
    }

    setIsLoading(true);
    const toastId = toast.loading("Verifying your location...");

    try {
      // Store address immediately
      localStorage.setItem('deliveryAddress', address);

      if (coordinates) {
        // If we have coordinates, verify with API
        const deliveryOptionsPromise = getDeliveryOptions(coordinates.lat, coordinates.lon);

        // Set a timeout for the API call
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error('Request timeout')), 10000);
        });

        // Race between the API call and timeout
        const deliveryOptions = await Promise.race([
          deliveryOptionsPromise,
          timeoutPromise
        ]);

        if (!deliveryOptions) {
          throw new Error("No delivery options returned");
        }
      }

      toast.dismiss(toastId);
      toast.success("Location verified successfully");

      // Navigate based on flow type
      if (flowType === 'otc') {
        navigate('/otc-catalog', { state: { from: 'address', flowType: 'otc' } });
      } else {
        navigate('/insurance', { state: { from: 'address', flowType: 'prescription' } });
      }
    } catch (error) {
      console.error("Error processing address:", error);
      toast.dismiss(toastId);
      toast.error("Failed to verify delivery location");
      setError("Failed to verify delivery location. Please try again.");
    } finally {
      setIsLoading(false);
    }
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
            <div className="space-y-2">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Autocomplete
                    apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
                    className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    onPlaceSelected={handlePlaceSelected}
                    options={{
                      types: ['address'],
                      componentRestrictions: { country: 'DE' }
                    }}
                    defaultValue={address}
                    placeholder="Start typing your address..."
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleAddressChange(e);
                      setShowSuggestions(false); // Hide dummy suggestions when using Google Autocomplete
                    }}
                  />
                </div>
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
              {error && (
                <p className="text-sm text-destructive mt-2">{error}</p>
              )}
              {coordinates && (
                <p className="text-sm text-muted-foreground">
                  Location: {coordinates.lat.toFixed(6)}, {coordinates.lon.toFixed(6)}
                </p>
              )}
            </div>

            <Button
              className="w-full"
              onClick={handleContinue}
              disabled={!validateAddress(address) || isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
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
