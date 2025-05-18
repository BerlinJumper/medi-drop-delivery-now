
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import ProgressIndicator from "@/components/ProgressIndicator";
import { motion } from "framer-motion";
import { Car, Home } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import BackButton from "@/components/BackButton";
import Logo from "@/components/Logo";
import { toast } from "sonner";

type DeliveryMethod = "car" | "drone" | null;

interface DeliveryOption {
  id: DeliveryMethod;
  name: string;
  timeEstimate: string;
  description: string;
  price: string;
  distance: string;
  tag?: string;
  icon: React.ReactNode;
}

const DroneIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-8 w-8 text-primary"
  >
    {/* Drone Body */}
    <rect x="9" y="10" width="6" height="4" rx="1" />
    
    {/* Camera/Sensor */}
    <circle cx="12" cy="12" r="1" fill="currentColor" />
    
    {/* Arms */}
    <line x1="4" y1="8" x2="9" y2="12" />
    <line x1="20" y1="8" x2="15" y2="12" />
    <line x1="4" y1="16" x2="9" y2="12" />
    <line x1="20" y1="16" x2="15" y2="12" />
    
    {/* Propellers */}
    <circle cx="4" cy="8" r="2" />
    <circle cx="20" cy="8" r="2" />
    <circle cx="4" cy="16" r="2" />
    <circle cx="20" cy="16" r="2" />
  </svg>
);

const DeliveryMethodScreen: React.FC = () => {
  const navigate = useNavigate();
  // Default to drone delivery
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>("drone");
  const [userAddress, setUserAddress] = useState<string>(""); 
  
  useEffect(() => {
    // Retrieve the address from localStorage
    const address = localStorage.getItem('deliveryAddress');
    if (address) {
      setUserAddress(address);
    } else {
      // If no address is found, show an error and redirect
      toast.error("Please enter a delivery address first");
      navigate('/address');
    }
  }, [navigate]);

  const deliveryOptions: DeliveryOption[] = [
    {
      id: "drone",
      name: "Drone Delivery",
      timeEstimate: "12 minutes",
      description: "Fast, eco-friendly drone drop-off.",
      price: "€2.99",
      distance: "1.2 km",
      tag: "Fastest Option",
      icon: <DroneIcon />
    },
    {
      id: "car",
      name: "Car Delivery",
      timeEstimate: "28 minutes", 
      description: "Standard courier delivery to your door.",
      price: "€5.99",
      distance: "4.8 km",
      tag: "Standard Option",
      icon: <Car className="h-8 w-8 text-primary" />
    }
  ];

  const handleSelectMethod = (method: DeliveryMethod) => {
    setDeliveryMethod(method);
  };

  const handleContinue = () => {
    if (deliveryMethod) {
      // Store selected method for summary screen
      localStorage.setItem('selectedDeliveryMethod', deliveryMethod);
      localStorage.setItem('deliveryPrice', 
        deliveryMethod === 'drone' ? '€2.99' : '€5.99');
      localStorage.setItem('deliveryTime', 
        deliveryMethod === 'drone' ? '12 minutes' : '28 minutes');
      
      navigate("/summary");
    }
  };

  const handleChangeAddress = () => {
    navigate("/address");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col items-center px-4 pt-10 relative"
    >
      <BackButton previousRoute="/medications" />

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
      
      <ProgressIndicator currentStep={4} totalSteps={4} />
      
      <div className="w-full max-w-2xl">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h1 className="text-2xl md:text-3xl font-bold text-center mb-4">
            Choose a Delivery Method
          </h1>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h2 className="font-medium text-gray-600 mb-1">Deliver to:</h2>
            <p className="text-gray-900 font-medium">{userAddress || "Parkstraße 8, 01968 Senftenberg"}</p>
            <Button 
              variant="link" 
              className="text-sm p-0 h-auto mt-1" 
              onClick={handleChangeAddress}
            >
              Change address
            </Button>
          </div>

          <div className="space-y-4 mb-6">
            {deliveryOptions.map(option => (
              <Card
                key={option.id}
                className={`hover:shadow-md cursor-pointer transition-all bg-accent ${
                  deliveryMethod === option.id ? "border-primary border-2" : ""
                }`}
                onClick={() => handleSelectMethod(option.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start">
                    <div className="mr-3 pt-1">{option.icon}</div>
                    <div className="flex-grow">
                      <div className="flex items-start justify-between mb-1">
                        <div>
                          <div className="flex items-center">
                            <h3 className="text-lg font-semibold">{option.name}</h3>
                            {option.tag && (
                              <Badge 
                                variant={option.id === "drone" ? "default" : "secondary"} 
                                className="ml-2 bg-accent text-primary border border-primary"
                              >
                                {option.tag}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">{option.description}</p>
                        </div>
                        <span className="text-lg font-bold text-primary">{option.price}</span>
                      </div>
                      
                      <div className="flex justify-between mt-3">
                        <div className="flex flex-col">
                          <span className="text-xs text-gray-500">Delivery Time</span>
                          <span className="font-medium">{option.timeEstimate}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs text-gray-500">Distance</span>
                          <span className="font-medium">{option.distance}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Button
            className="w-full py-6 text-lg"
            onClick={handleContinue}
            disabled={!deliveryMethod}
          >
            Continue to Review
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DeliveryMethodScreen;
