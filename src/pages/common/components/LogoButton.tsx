import React from "react";
import { Link } from "react-router-dom";

interface LogoProps {
  text?: string; 
  to?: string; 
  className?: string; 
}

export const LogoButton: React.FC<LogoProps> = ({
  text = "북스토리",
  to = "/", 
  className = "", 
}) => {
  return (
    <Link to={to} className="flex gap-2 justify-center items-center">
      <h1
        className={`text-2xl font-bold text-black tracking-widest ${className}`}
      >
        {text}
      </h1>
    </Link>
  );
};
