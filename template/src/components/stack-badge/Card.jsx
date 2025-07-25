import React from "react";

export function Card({ children, className = "" }) {
  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 ${className}`}
      style={{ boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}
    >
      {children}
    </div>
  );
}
