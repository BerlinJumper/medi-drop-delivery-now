
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate, useLocation } from "react-router-dom";
import ProgressIndicator from "@/components/ProgressIndicator";
import { motion } from "framer-motion";
import { Home, MapPin } from "lucide-react";
import BackButton from "@/components/BackButton";
import Logo from "@/components/Logo";

const AddressScreen: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [address, setAddress] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [suggestions] = useState([
    "123 Main St, New York, NY 10001",
    "456 Oak Ave, San Francisco, CA 94102",
    "789 Pine Rd, Chicago, IL 60601",
  ]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Determine the previous route for the back button
  const previousRoute = "/medication-type";

  const validateAddress = (address: string) => {
    return address.length >= 10;
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAddress(value);
    setShowSuggestions(value.length > 0);
    
    if (value.length > 0) {
      setError(validateAddress(value) ? null : "Please enter a valid address");
    } else {
      setError(null);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setAddress(suggestion);
    setError(null);
    setShowSuggestions(false);
  };

  const handleContinue = () => {
    if (validateAddress(address)) {
      // If coming from OTC selection, we're already in the non-prescription flow
      // If location state has otc=true, go to OTC catalog next
      const fromMedicationType = location.state?.from === 'medicationType';
      const isOtc = location.state?.otc === true;
      
      if (isOtc || fromMedicationType) {
        navigate('/otc-catalog');
      } else {
        navigate('/insurance');
      }
    } else {
      setError("Please enter a valid address");
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col items-center px-4 pt-10 relative"
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
      
      <div className="w-full max-w-2xl">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h1 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Where should we deliver your medication?
          </h1>

          <div className="relative mb-6">
            <div className="relative">
              <MapPin className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-500" />
              <Input
                className={`border-2 ${
                  error ? "border-red-400" : "border-accent"
                } p-4 pl-10 text-lg`}
                placeholder="123 Main Street, City..."
                value={address}
                onChange={handleAddressChange}
              />
            </div>
            
            {error && (
              <p className="text-red-500 text-sm mt-1">{error}</p>
            )}
            
            {showSuggestions && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
                {suggestions
                  .filter(s => s.toLowerCase().includes(address.toLowerCase()))
                  .map((suggestion, index) => (
                    <div
                      key={index}
                      className="p-2 hover:bg-accent cursor-pointer"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </div>
                  ))}
              </div>
            )}
          </div>

          <Button
            className="w-full py-6 text-lg"
            disabled={!validateAddress(address)}
            onClick={handleContinue}
          >
            Continue
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AddressScreen;
