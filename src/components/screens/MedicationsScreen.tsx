
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from "react-router-dom";
import ProgressIndicator from "@/components/ProgressIndicator";
import { motion } from "framer-motion";
import { Info, Home } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";
import BackButton from "@/components/BackButton";
import Logo from "@/components/Logo";

interface Medication {
  id: number;
  name: string;
  dosage: string;
  description: string;
  packaging: string;
  selected: boolean;
}

const MedicationsScreen: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  
  const [medications, setMedications] = useState<Medication[]>([
    {
      id: 1,
      name: "Lisinopril",
      dosage: "10mg",
      description: "For blood pressure management",
      packaging: "Pack of 30 tablets",
      selected: true,
    },
    {
      id: 2,
      name: "Atorvastatin",
      dosage: "20mg",
      description: "For cholesterol management",
      packaging: "Pack of 28 tablets",
      selected: true,
    },
    {
      id: 3,
      name: "Metformin",
      dosage: "500mg",
      description: "For blood sugar control",
      packaging: "Pack of 56 tablets",
      selected: true,
    },
  ]);

  useEffect(() => {
    // Enforce that this screen is only accessible in the prescription flow
    const flowType = localStorage.getItem('medicationFlow');
    
    if (flowType !== 'prescription') {
      toast.error("This screen is only for prescription medications");
      navigate('/medication-type');
      return;
    }
    
    // Enforce that insurance must be verified first
    const insuranceVerified = localStorage.getItem('insuranceVerified');
    if (insuranceVerified !== 'true') {
      toast.error("Please verify your insurance first");
      navigate('/insurance');
    }
  }, [navigate]);

  const toggleMedication = (id: number) => {
    setMedications((prevMeds) =>
      prevMeds.map((med) =>
        med.id === id ? { ...med, selected: !med.selected } : med
      )
    );
    setError(null);
  };

  const handleContinue = () => {
    const selectedMeds = medications.filter((med) => med.selected);
    if (selectedMeds.length === 0) {
      setError("Please select at least one medication to continue");
      return;
    }
    navigate("/delivery", { state: { from: 'medications', flowType: 'prescription' } });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col items-center px-4 pt-10"
    >
      <BackButton previousRoute="/insurance" />

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
      
      <ProgressIndicator currentStep={3} totalSteps={4} />
      
      <div className="w-full max-w-2xl">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h1 className="text-2xl md:text-3xl font-bold text-center mb-4">
            Your Prescribed Medications
          </h1>
          
          <p className="text-center text-gray-600 mb-8">
            These medications are ready for delivery. You can deselect any you don't need.
          </p>

          <div className="space-y-4">
            {medications.map((med) => (
              <Card
                key={med.id}
                className={`overflow-hidden transition-all ${
                  med.selected ? "border-accent bg-white" : "border-gray-200 bg-gray-50 opacity-70"
                }`}
                style={{ backgroundColor: med.selected ? "#e0f0ff" : "#f9f9f9" }}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-start space-x-4">
                      <Checkbox
                        id={`med-${med.id}`}
                        checked={med.selected}
                        onCheckedChange={() => toggleMedication(med.id)}
                        className="mt-1"
                      />
                      <div>
                        <div>
                          <label
                            htmlFor={`med-${med.id}`}
                            className="text-lg font-medium cursor-pointer"
                          >
                            {med.name} {med.dosage}
                          </label>
                          <p className="text-sm font-medium text-gray-700 mt-1">
                            {med.packaging}
                          </p>
                        </div>

                        <p className="text-xs text-gray-500 mt-1">
                          {med.description}
                        </p>
                      </div>
                    </div>
                    
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-5 w-5 text-gray-400 hover:text-primary cursor-pointer" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Medication information</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {error && (
            <div className="text-red-500 text-center mt-4">{error}</div>
          )}

          <Button
            className="w-full py-6 text-lg mt-8"
            onClick={handleContinue}
            style={{ backgroundColor: "#002b5c" }}
          >
            Continue
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MedicationsScreen;
