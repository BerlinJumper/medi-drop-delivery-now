
import React from "react";
import { Button } from "@/components/ui/button";
import WaveBackground from "@/components/WaveBackground";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const WelcomeScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col items-center justify-center px-4 relative"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-center z-10"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">MediDrop</h1>
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
