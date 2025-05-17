
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import ProgressIndicator from "@/components/ProgressIndicator";
import { motion } from "framer-motion";
import { Car, Send } from "lucide-react";

type DeliveryMethod = "car" | "drone" | null;

const DeliveryMethodScreen: React.FC = () => {
  const navigate = useNavigate();
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>(null);

  const handleSelectMethod = (method: DeliveryMethod) => {
    setDeliveryMethod(method);
  };

  const handleContinue = () => {
    if (deliveryMethod) {
      navigate("/summary");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col items-center px-4 pt-10"
    >
      <ProgressIndicator currentStep={4} totalSteps={4} />
      
      <div className="w-full max-w-md">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h1 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Choose a Delivery Method
          </h1>

          <div className="space-y-6 mb-6">
            <Card
              className={`hover:shadow-md cursor-pointer transition-all ${
                deliveryMethod === "car" ? "border-primary border-2" : ""
              }`}
              onClick={() => handleSelectMethod("car")}
            >
              <CardContent className="p-6 flex flex-col items-center">
                <Car className="h-16 w-16 text-primary mb-2" />
                <h3 className="text-xl font-semibold">Car Delivery</h3>
                <p className="text-lg font-medium">2–4 hours</p>
                <p className="text-gray-600 text-center mt-2">
                  Standard courier delivery to your door.
                </p>
              </CardContent>
            </Card>

            <Card
              className={`hover:shadow-md cursor-pointer transition-all ${
                deliveryMethod === "drone" ? "border-primary border-2" : ""
              }`}
              onClick={() => handleSelectMethod("drone")}
            >
              <CardContent className="p-6 flex flex-col items-center">
                <Send className="h-16 w-16 text-primary mb-2" />
                <h3 className="text-xl font-semibold">Drone Delivery</h3>
                <p className="text-lg font-medium">Within 1 hour</p>
                <p className="text-gray-600 text-center mt-2">
                  Fast, eco-friendly drone drop-off.
                </p>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Drone delivery may not be available in all locations.
                </p>
              </CardContent>
            </Card>
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
