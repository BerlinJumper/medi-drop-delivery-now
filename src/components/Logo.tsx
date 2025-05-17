
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
    small: "h-8",
    medium: "h-12",
    large: "h-16",
  };

  return (
    <div 
      className="flex items-center cursor-pointer" 
      onClick={handleClick}
    >
      <div className={`text-primary ${dimensions[size]}`}>
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-auto"
        >
          {/* Drone Body */}
          <rect x="9" y="10" width="6" height="4" rx="1" stroke="currentColor" strokeWidth="2" />
          
          {/* Camera/Sensor */}
          <circle cx="12" cy="12" r="1" fill="currentColor" />
          
          {/* Arms */}
          <line x1="4" y1="8" x2="9" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="20" y1="8" x2="15" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="4" y1="16" x2="9" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="20" y1="16" x2="15" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          
          {/* Propellers */}
          <circle cx="4" cy="8" r="2" stroke="currentColor" strokeWidth="2" />
          <circle cx="20" cy="8" r="2" stroke="currentColor" strokeWidth="2" />
          <circle cx="4" cy="16" r="2" stroke="currentColor" strokeWidth="2" />
          <circle cx="20" cy="16" r="2" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>
      <span className="text-primary font-bold ml-2 text-lg md:text-xl">MediFly</span>
    </div>
  );
};

export default Logo;
