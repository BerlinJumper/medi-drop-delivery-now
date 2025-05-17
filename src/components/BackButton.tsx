
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface BackButtonProps {
  previousRoute?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ previousRoute }) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    if (previousRoute) {
      navigate(previousRoute);
    } else {
      navigate(-1);
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleGoBack}
      className="absolute top-4 left-4 p-2 hover:bg-accent/20 transition-colors"
    >
      <ArrowLeft className="h-5 w-5 mr-1" />
      <span>Back</span>
    </Button>
  );
};

export default BackButton;
