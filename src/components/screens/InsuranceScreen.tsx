import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useNavigate, useLocation } from "react-router-dom";
import ProgressIndicator from "@/components/ProgressIndicator";
import { motion } from "framer-motion";
import { Loader2, Camera, Check, X, Home } from "lucide-react";
import { toast } from "sonner";
import BackButton from "@/components/BackButton";
import Logo from "@/components/Logo";

interface InsuranceFormState {
  provider: string;
  number: string;
  dob: string;
}

type VerificationStatus = "idle" | "verifying" | "success" | "error";

const InsuranceScreen: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showManualEntry, setShowManualEntry] = useState(false);
  const [formData, setFormData] = useState<InsuranceFormState>({
    provider: "",
    number: "",
    dob: "",
  });
  const [verificationStatus, setVerificationStatus] = useState<VerificationStatus>("idle");

  useEffect(() => {
    // Enforce that this screen is only accessible in the prescription flow
    const flowType = localStorage.getItem('medicationFlow');
    
    if (flowType !== 'prescription') {
      toast.error("Insurance information is only required for prescription medications");
      navigate('/medication-type');
    }
    
    // Enforce that address must be entered first
    const address = localStorage.getItem('deliveryAddress');
    if (!address) {
      toast.error("Please enter your delivery address first");
      navigate('/address', { state: { flowType: 'prescription' } });
    }
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const simulateVerification = () => {
    setVerificationStatus("verifying");
    
    // Always succeed verification after 1.5 seconds
    setTimeout(() => {
      setVerificationStatus("success");
      toast.success("Insurance verified successfully", {
        duration: 2000 // Display for 2 seconds only
      });
      localStorage.setItem('insuranceVerified', 'true');
    }, 1500);
  };

  const handleScanCard = () => {
    // In a real app, this would open the camera
    // Here we'll just simulate verification
    simulateVerification();
  };

  const handleSubmitManual = () => {
    const { provider, number, dob } = formData;
    if (provider && number && dob) {
      simulateVerification();
    }
  };

  const handleContinue = () => {
    navigate("/medications", { state: { from: 'insurance', flowType: 'prescription' } });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col items-center px-4 pt-10"
    >
      <BackButton previousRoute="/address" />
      
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
      
      <ProgressIndicator currentStep={2} totalSteps={4} />
      
      <div className="w-full max-w-2xl">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h1 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Connect your insurance
          </h1>

          <div className="space-y-6">
            <Card className="shadow-md" style={{ backgroundColor: "#e0f0ff" }}>
              <CardHeader className="font-semibold text-lg">Scan Insurance Card</CardHeader>
              <CardContent>
                <Button 
                  onClick={handleScanCard}
                  className="w-full flex items-center justify-center gap-2"
                  disabled={verificationStatus === "verifying"}
                  style={{ backgroundColor: "#002b5c" }}
                >
                  <Camera className="w-5 h-5 mr-2" />
                  Scan your card
                </Button>
              </CardContent>
            </Card>

            <div className="flex items-center justify-center">
              <div className="border-t border-gray-300 w-full"></div>
              <span className="px-4 text-gray-500">OR</span>
              <div className="border-t border-gray-300 w-full"></div>
            </div>

            <Card className="shadow-md" style={{ backgroundColor: "#e0f0ff" }}>
              <CardHeader 
                className="font-semibold text-lg cursor-pointer"
                onClick={() => setShowManualEntry(!showManualEntry)}
              >
                Manual Entry
              </CardHeader>
              {showManualEntry && (
                <CardContent className="space-y-4">
                  <Input
                    name="provider"
                    placeholder="Insurance Provider"
                    value={formData.provider}
                    onChange={handleChange}
                  />
                  <Input
                    name="number"
                    placeholder="Insurance Number"
                    value={formData.number}
                    onChange={handleChange}
                  />
                  <Input
                    name="dob"
                    placeholder="Date of Birth (MM/DD/YYYY)"
                    value={formData.dob}
                    onChange={handleChange}
                  />
                  <Button 
                    onClick={handleSubmitManual}
                    className="w-full"
                    disabled={verificationStatus === "verifying" || !formData.provider || !formData.number || !formData.dob}
                    style={{ backgroundColor: "#002b5c" }}
                  >
                    Verify
                  </Button>
                </CardContent>
              )}
            </Card>

            {verificationStatus !== "idle" && (
              <Card className={`shadow-md ${
                verificationStatus === "success" ? "bg-green-50" : 
                verificationStatus === "error" ? "bg-red-50" : ""
              }`}>
                <CardContent className="flex items-center justify-center py-4">
                  {verificationStatus === "verifying" && (
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-5 w-5 animate-spin text-primary" />
                      <span>Verifying your insurance...</span>
                    </div>
                  )}
                  {verificationStatus === "success" && (
                    <div className="flex items-center gap-2 text-green-600">
                      <Check className="h-5 w-5" />
                      <span>Insurance verified</span>
                    </div>
                  )}
                  {verificationStatus === "error" && (
                    <div className="flex items-center gap-2 text-red-600">
                      <X className="h-5 w-5" />
                      <span>We couldn't verify your card.</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            <Button
              className="w-full py-6 text-lg"
              onClick={handleContinue}
              disabled={verificationStatus !== "success"}
              style={{ backgroundColor: "#002b5c" }}
            >
              Continue
            </Button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default InsuranceScreen;
