
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Pill, ShoppingCart, Home } from "lucide-react";
import BackButton from "@/components/BackButton";
import Logo from "@/components/Logo";
import WaveBackground from "@/components/WaveBackground";

const MedicationTypeScreen: React.FC = () => {
  const navigate = useNavigate();

  const handleSelectType = (type: 'prescription' | 'otc') => {
    if (type === 'prescription') {
      navigate('/address');
    } else {
      navigate('/otc-catalog');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col items-center px-4 pt-10 relative"
    >
      <BackButton previousRoute="/" />

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
      
      <div className="flex justify-center mb-10">
        <Logo size="small" />
      </div>

      <div className="w-full max-w-2xl z-10">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-2xl md:text-3xl font-bold mb-4">
            Choose Medication Type
          </h1>

          <p className="text-lg text-gray-600 mb-8">
            Would you like to order prescription medications or over-the-counter items?
          </p>

          <div className="space-y-6 md:space-y-0 md:grid md:grid-cols-2 md:gap-6">
            <Card 
              className="hover:shadow-md cursor-pointer transition-all hover:border-primary"
              onClick={() => handleSelectType('prescription')}
            >
              <CardContent className="p-8 flex flex-col items-center">
                <Pill className="h-16 w-16 text-primary mb-4" />
                <h2 className="text-xl font-semibold mb-2">Prescription</h2>
                <p className="text-gray-600 text-center">
                  Access your prescribed medications for delivery
                </p>
              </CardContent>
            </Card>

            <Card
              className="hover:shadow-md cursor-pointer transition-all hover:border-primary"
              onClick={() => handleSelectType('otc')}
            >
              <CardContent className="p-8 flex flex-col items-center">
                <ShoppingCart className="h-16 w-16 text-primary mb-4" />
                <h2 className="text-xl font-semibold mb-2">Non-Prescription</h2>
                <p className="text-gray-600 text-center">
                  Browse and order over-the-counter medications
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>

      <WaveBackground />
    </motion.div>
  );
};

export default MedicationTypeScreen;
