
import React from "react";
import { Button } from "@/components/ui/button";
import WaveBackground from "@/components/WaveBackground";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Logo from "@/components/Logo";
import { User } from "lucide-react";

const WelcomeScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col items-center justify-center px-4 relative"
    >
      <div className="absolute top-4 right-4">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate("/settings")}
          className="text-primary hover:bg-accent/30"
        >
          <User className="h-6 w-6" />
        </Button>
      </div>
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-center z-10 flex flex-col items-center w-full max-w-2xl"
      >
        <div className="mb-6">
          <Logo size="large" />
        </div>
        <p className="text-lg md:text-xl text-gray-600 mb-8">
          Get your prescription medication delivered to your home.
        </p>
        <Button
          className="w-full max-w-xs text-lg py-6"
          onClick={() => navigate("/address")}
        >
          Start
        </Button>
      </motion.div>
      <WaveBackground />
    </motion.div>
  );
};

export default WelcomeScreen;
