import React from "react";

const ErrorMessage = ({ message }) => (
  <div className="bg-red-100 border border-red-300 text-red-700 p-4 rounded-md m-4">
    <p className="font-semibold">Error</p>
    <p className="text-sm">{message}</p>
  </div>
);

export default ErrorMessage;
