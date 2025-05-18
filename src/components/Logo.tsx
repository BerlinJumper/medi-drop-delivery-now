
import React from "react";
import { useNavigate } from "react-router-dom";

interface LogoProps {
  size?: "small" | "medium" | "large";
}

const Logo: React.FC<LogoProps> = ({ size = "medium" }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate("/");
  };

  const dimensions = {
    small: "h-32",
    medium: "h-48",
    large: "h-64",
  };

  return (
    <div 
      className="flex items-center cursor-pointer" 
      onClick={handleClick}
    >
      <div className={`${dimensions[size]}`}>
        <img 
          src="/lovable-uploads/69d379d0-04ae-49bb-995d-1ff89679bb46.png" 
          alt="MediFly Logo" 
          className="h-full w-auto"
        />
      </div>
    </div>
  );
};

export default Logo;
