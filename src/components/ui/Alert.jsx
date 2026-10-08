import React from "react";

const Alert = ({ message, type }) => {
  if (message === "") return null;

  const baseClasses = "p-4 rounded border-l-4 text-md";
  const typeClasses = {
    success: "bg-green-50 border-green-500 text-green-600",
    error: "bg-red-50 border-red-500 text-red-600",
  };

  return <div className={`${baseClasses} ${typeClasses[type]}`}>{message}</div>;
};

export default Alert;