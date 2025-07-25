import React from "react";

export function Badge({ children, variant = "primary", className = "" }) {
  const baseStyle = "inline-block px-3 py-1 rounded-full text-sm font-semibold ";
  const variants = {
    primary: "bg-blue-500 text-white",
    secondary: "bg-gray-300 text-gray-800",
    success: "bg-green-500 text-white",
    danger: "bg-red-500 text-white",
    warning: "bg-yellow-400 text-black",
  };

  const variantClass = variants[variant] || variants.primary;

  return (
    <span className={`${baseStyle} ${variantClass} ${className}`}>
      {children}
    </span>
  );
}
