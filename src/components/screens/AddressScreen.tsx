import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate, useLocation } from "react-router-dom";
import ProgressIndicator from "@/components/ProgressIndicator";
import { motion } from "framer-motion";
import { Home, Loader2, MapPin } from "lucide-react";
import BackButton from "@/components/BackButton";
import Logo from "@/components/Logo";
import { toast } from "sonner";

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
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [flowType, setFlowType] = useState<'prescription' | 'otc' | null>(null);
  
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

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAddress(value);
    setShowSuggestions(value.length > 0);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setAddress(suggestion);
    setShowSuggestions(false);
  };

  const handleContinue = () => {
    if (!address.trim()) {
      toast.error("Please enter a delivery address");
      return;
    }

    setIsLoading(true);

    try {
      // Store address in localStorage
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
      toast.error("Failed to save address");
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
            <div className="relative">
              <div className="flex">
                <div className="relative flex-grow">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <Input
                    className="pl-10 border-[#e0f0ff]"
                    placeholder="e.g. Hauptstraße 21, 10827 Berlin"
                    value={address}
                    onChange={handleAddressChange}
                  />
                </div>
              </div>
              
              {showSuggestions && (
                <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200">
                  {dummyAddresses.map((suggestion, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 hover:bg-[#e0f0ff] cursor-pointer text-sm"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Button
              className="w-full bg-[#002b5c] hover:bg-[#003b7c]"
              onClick={handleContinue}
              disabled={isLoading || !address.trim()}
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
