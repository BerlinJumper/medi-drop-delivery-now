
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
          <path 
            d="M12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5Z" 
            stroke="currentColor" 
            strokeWidth="2"
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <path 
            d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <path 
            d="M4 12H5" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round"
          />
          <path 
            d="M19 12H20" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round"
          />
          <path 
            d="M12 5V6" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round"
          />
          <path 
            d="M12 18V19" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round"
          />
          <path 
            d="M7 7L8 8" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round"
          />
          <path 
            d="M16 16L17 17" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round"
          />
          <path 
            d="M7 17L8 16" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round"
          />
          <path 
            d="M16 8L17 7" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round"
          />
        </svg>
      </div>
      <span className="text-primary font-bold ml-2 text-lg md:text-xl">MediFly</span>
    </div>
  );
};

export default Logo;
