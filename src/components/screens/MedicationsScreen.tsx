
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from "react-router-dom";
import ProgressIndicator from "@/components/ProgressIndicator";
import { motion } from "framer-motion";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Medication {
  id: number;
  name: string;
  dosage: string;
  description: string;
  info: string;
}

const MedicationsScreen: React.FC = () => {
  const navigate = useNavigate();
  const [medications, setMedications] = useState<Medication[]>([
    {
      id: 1,
      name: "Lisinopril",
      dosage: "10mg, once daily",
      description: "For blood pressure management",
      info: "Lisinopril is an ACE inhibitor that widens blood vessels to lower blood pressure and improve blood flow.",
    },
    {
      id: 2,
      name: "Atorvastatin",
      dosage: "20mg, once daily at bedtime",
      description: "For cholesterol management",
      info: "Atorvastatin is a statin that reduces the production of cholesterol in the liver to lower LDL levels.",
    },
    {
      id: 3,
      name: "Metformin",
      dosage: "500mg, twice daily with meals",
      description: "For blood sugar control",
      info: "Metformin helps control blood sugar levels in people with type 2 diabetes by decreasing glucose production in the liver.",
    },
  ]);

  const [selectedMeds, setSelectedMeds] = useState<number[]>(
    medications.map((med) => med.id)
  );

  const handleCheckboxChange = (medId: number) => {
    setSelectedMeds((prev) =>
      prev.includes(medId)
        ? prev.filter((id) => id !== medId)
        : [...prev, medId]
    );
  };

  const handleContinue = () => {
    if (selectedMeds.length > 0) {
      navigate("/delivery");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col items-center px-4 pt-10 pb-20"
    >
      <ProgressIndicator currentStep={3} totalSteps={4} />
      
      <div className="w-full max-w-md">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h1 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Your Prescribed Medications
          </h1>

          <div className="space-y-4 mb-6">
            {medications.map((med) => (
              <Card
                key={med.id}
                className={`transition-all ${
                  selectedMeds.includes(med.id)
                    ? "border-primary"
                    : "border-gray-200 opacity-60"
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id={`med-${med.id}`}
                      checked={selectedMeds.includes(med.id)}
                      onCheckedChange={() => handleCheckboxChange(med.id)}
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <label
                          htmlFor={`med-${med.id}`}
                          className="text-lg font-medium cursor-pointer"
                        >
                          {med.name}
                        </label>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                              >
                                <Info className="h-4 w-4" />
                                <span className="sr-only">Info</span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs">{med.info}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <p className="text-sm font-medium text-gray-500">
                        {med.dosage}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        {med.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {selectedMeds.length === 0 && (
            <div className="text-red-600 text-sm mb-4">
              You must select at least one medication.
            </div>
          )}

          <Button
            className="w-full py-6 text-lg"
            onClick={handleContinue}
            disabled={selectedMeds.length === 0}
          >
            Continue
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MedicationsScreen;
