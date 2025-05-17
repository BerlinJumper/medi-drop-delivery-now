
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
    small: "h-8 w-8",
    medium: "h-12 w-12",
    large: "h-16 w-16",
  };

  return (
    <div 
      className="flex items-center cursor-pointer" 
      onClick={handleClick}
    >
      <div className={`bg-primary rounded-full p-2 ${dimensions[size]}`}>
        <img 
          src="/lovable-uploads/9d56aaa5-97aa-4547-b7d5-ac71a1977dfd.png" 
          alt="MediDrop Logo" 
          className="w-full h-full object-contain"
        />
      </div>
      <span className="text-primary font-bold ml-2 text-lg md:text-xl">MediDrop</span>
    </div>
  );
};

export default Logo;
