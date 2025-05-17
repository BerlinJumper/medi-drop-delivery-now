
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Pill, Truck, Check, Edit2 } from "lucide-react";

const SummaryScreen: React.FC = () => {
  const navigate = useNavigate();
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleEdit = (section: string) => {
    switch (section) {
      case "address":
        navigate("/address");
        break;
      case "medications":
        navigate("/medications");
        break;
      case "delivery":
        navigate("/delivery");
        break;
      default:
        break;
    }
  };

  const handleConfirmOrder = () => {
    // In a real app, this would place the order via API
    setOrderPlaced(true);
  };

  const handleOrderAgain = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-4 pt-10 pb-20">
      {!orderPlaced ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Review Your Order
          </h1>

          <div className="space-y-6 mb-6">
            {/* Address Section */}
            <Card className="shadow-sm bg-white">
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-primary mr-2" />
                    <h3 className="font-semibold">Delivery Address</h3>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit("address")}
                    className="h-8 text-sm"
                  >
                    <Edit2 className="h-3.5 w-3.5 mr-1" />
                    Edit
                  </Button>
                </div>
                <p className="text-gray-700">123 Main Street</p>
                <p className="text-gray-700">New York, NY 10001</p>
              </CardContent>
            </Card>

            {/* Medications Section */}
            <Card className="shadow-sm bg-white">
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <Pill className="h-5 w-5 text-primary mr-2" />
                    <h3 className="font-semibold">Selected Medications</h3>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit("medications")}
                    className="h-8 text-sm"
                  >
                    <Edit2 className="h-3.5 w-3.5 mr-1" />
                    Edit
                  </Button>
                </div>
                <ul className="list-disc list-inside text-gray-700">
                  <li>Lisinopril (10mg, once daily)</li>
                  <li>Atorvastatin (20mg, once daily)</li>
                </ul>
              </CardContent>
            </Card>

            {/* Delivery Method Section */}
            <Card className="shadow-sm bg-white">
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <Truck className="h-5 w-5 text-primary mr-2" />
                    <h3 className="font-semibold">Delivery Method</h3>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit("delivery")}
                    className="h-8 text-sm"
                  >
                    <Edit2 className="h-3.5 w-3.5 mr-1" />
                    Edit
                  </Button>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Drone className="h-5 w-5" />
                  <span>Drone Delivery (Within 1 hour)</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Button
            className="w-full py-6 text-lg"
            onClick={handleConfirmOrder}
          >
            Confirm Order
          </Button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md text-center"
        >
          <div className="bg-green-50 p-6 rounded-full inline-flex items-center justify-center mb-6">
            <Check className="h-12 w-12 text-green-500" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-4">
            Your order has been placed!
          </h1>
          <p className="text-gray-600 mb-8">
            You'll receive a confirmation email shortly with your tracking
            information.
          </p>
          <Button
            className="w-full py-6 text-lg"
            onClick={handleOrderAgain}
          >
            Back to Home
          </Button>
        </motion.div>
      )}
    </div>
  );
};

// Import the Drone icon since it's not in the main import above
import { Drone } from "lucide-react";

export default SummaryScreen;
