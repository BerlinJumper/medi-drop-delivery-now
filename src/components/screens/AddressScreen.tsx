import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import ProgressIndicator from "@/components/ProgressIndicator";
import { motion } from "framer-motion";
import { Home, Loader2, MapPin } from "lucide-react";
import BackButton from "@/components/BackButton";
import Logo from "@/components/Logo";
import Autocomplete from "react-google-autocomplete";
import { getDeliveryOptions } from "@/utils/googlePlaces";
import { toast } from "sonner";

const AddressScreen: React.FC = () => {
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<google.maps.places.PlaceResult | null>(null);
  const [coordinates, setCoordinates] = useState<{ lat: number; lon: number } | null>(null);

  const validateAddress = (address: string) => {
    return address.length >= 10;
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
              }
              setIsLoading(false);
            }
          );
        },
        (error) => {
          console.error("Error getting location:", error);
          toast.error("Failed to get your location");
          setIsLoading(false);
        },
        { enableHighAccuracy: true }
      );
    } else {
      toast.error("Geolocation is not supported by your browser");
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
    if (!validateAddress(address)) {
      setError("Please enter a valid address");
      return;
    }

    if (!coordinates) {
      setError("Location coordinates are required");
      return;
    }

    console.log("Making API call with coordinates:", coordinates);
    setIsLoading(true);

    try {
      const deliveryOptions = await getDeliveryOptions(coordinates.lat, coordinates.lon);
      console.log("Delivery options response:", deliveryOptions);

      if (deliveryOptions) {
        toast.success("Location verified successfully");
        navigate("/insurance");
      } else {
        throw new Error("No delivery options returned");
      }
    } catch (error) {
      console.error("Error getting delivery options:", error);
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
      <BackButton previousRoute="/medication-type" />

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
                <Autocomplete
                  apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
                  onPlaceSelected={handlePlaceSelected}
                  defaultValue={address}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Start typing your address in Germany..."
                  options={{
                    types: ['address'],
                    // componentRestrictions: { country: 'FR' }
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
