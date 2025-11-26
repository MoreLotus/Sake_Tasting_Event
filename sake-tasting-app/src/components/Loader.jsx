import React from "react";

const Loader = ({ message = "Loading..." }) => (
  <div className="flex flex-col items-center justify-center p-8 text-gray-600">
    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-red-600 mb-3"></div>
    <p className="text-sm">{message}</p>
  </div>
);

export default Loader;
