// src/components/Input.tsx
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  multiline?: boolean;
  rows?: number;
}

const Input: React.FC<InputProps> = (props) => {
  if (props.multiline) {
    const { multiline, rows = 4, className, ...rest } = props as any;
    return (
      <textarea
        rows={rows}
        {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        className={`w-full min-h-[80px] p-3 rounded-[12px] glass-card border border-white/30 text-[var(--text-primary)] placeholder-[color:var(--text-tertiary)] focus-ring ${className ?? ""}`}
      />
    );
  }
  return (
    <input
      type="text"
      {...props}
      className={`w-full h-10 px-3 rounded-[12px] glass-card border border-white/30 text-[var(--text-primary)] placeholder-[color:var(--text-tertiary)] focus-ring ${props.className ?? ""}`}
    />
  );
};

export default Input;
