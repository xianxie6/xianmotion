// src/components/Button.tsx
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "glass" | "primary";
}


const Button: React.FC<ButtonProps> = ({ children, variant = "glass", ...props }) => {
  return (
    <button
      {...props}
      className={`${
        variant === "primary"
          ? "btn-primary"
          : "glass-card px-4 py-2 hover:opacity-90"
      } transition-all duration-200 focus-ring ${props.className ?? ""}`}
    >
      {children}
    </button>
  );
};


export default Button;
