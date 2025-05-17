
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import ProgressIndicator from "@/components/ProgressIndicator";
import { motion } from "framer-motion";
import { Car, Send } from "lucide-react";
import BackButton from "@/components/BackButton";
import Logo from "@/components/Logo";

type DeliveryMethod = "car" | "drone" | null;

interface DeliveryOption {
  id: DeliveryMethod;
  name: string;
  timeEstimate: string;
  description: string;
  price: string;
  note?: string;
  icon: React.ReactNode;
}

const DeliveryMethodScreen: React.FC = () => {
  const navigate = useNavigate();
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>(null);
  
  const deliveryOptions: DeliveryOption[] = [
    {
      id: "car",
      name: "Car Delivery",
      timeEstimate: "2–4 hours",
      description: "Standard courier delivery to your door.",
      price: "$3.99",
      icon: <Car className="h-16 w-16 text-primary mb-2" />
    },
    {
      id: "drone",
      name: "Drone Delivery",
      timeEstimate: "Within 1 hour",
      description: "Fast, eco-friendly drone drop-off.",
      price: "$9.99",
      note: "Drone delivery may not be available in all locations.",
      icon: <Send className="h-16 w-16 text-primary mb-2" />
    }
  ];

  const handleSelectMethod = (method: DeliveryMethod) => {
    setDeliveryMethod(method);
  };

  const handleContinue = () => {
    if (deliveryMethod) {
      navigate("/summary");
    }
  };

  const userAddress = "123 Main Street, New York, NY 10001";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col items-center px-4 pt-10 relative"
    >
      <BackButton previousRoute="/medications" />
      
      <div className="flex justify-center mb-6">
        <Logo size="small" />
      </div>
      
      <ProgressIndicator currentStep={4} totalSteps={4} />
      
      <div className="w-full max-w-md">
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
            <p className="text-gray-900">{userAddress}</p>
            <Button 
              variant="link" 
              className="text-sm p-0 h-auto mt-1" 
              onClick={() => navigate("/address")}
            >
              Change address
            </Button>
          </div>

          <div className="space-y-6 mb-6">
            {deliveryOptions.map(option => (
              <Card
                key={option.id}
                className={`hover:shadow-md cursor-pointer transition-all ${
                  deliveryMethod === option.id ? "border-primary border-2" : ""
                }`}
                onClick={() => handleSelectMethod(option.id)}
              >
                <CardContent className="p-6 flex flex-col items-center">
                  {option.icon}
                  <div className="flex items-center justify-between w-full mb-1">
                    <h3 className="text-xl font-semibold">{option.name}</h3>
                    <span className="text-lg font-bold text-primary">{option.price}</span>
                  </div>
                  <p className="text-lg font-medium">{option.timeEstimate}</p>
                  <p className="text-gray-600 text-center mt-2">
                    {option.description}
                  </p>
                  {option.note && (
                    <p className="text-xs text-gray-500 mt-2 text-center">
                      {option.note}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <Button
            className="w-full py-6 text-lg"
            onClick={handleContinue}
            disabled={!deliveryMethod}
          >
            Review & Confirm
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DeliveryMethodScreen;
