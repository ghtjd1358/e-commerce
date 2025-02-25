import React from "react";
import { Link } from "react-router-dom";

interface LogoProps {
  text?: string; 
  to?: string; 
  className?: string; 
}

export const LogoButton: React.FC<LogoProps> = ({
  text = "딱총마켓",
  to = "/", 
  className = "", 
}) => {
  return (
    <Link to={to} className="flex gap-2">
      <img src="/public/favicon.jpg" alt="logo"  className="w-10 h-10 rounded border-2 border-black"/>
      <h1
        className={`text-2xl font-bold text-black tracking-widest ${className}`}
      >
        {text}
      </h1>
    </Link>
  );
};
