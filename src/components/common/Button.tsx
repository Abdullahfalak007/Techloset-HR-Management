// File: src/components/common/Button.tsx
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

const Button: React.FC<ButtonProps> = ({ label, ...rest }) => {
  return (
    <button {...rest} className="btn">
      {label}
    </button>
  );
};

export default Button;
