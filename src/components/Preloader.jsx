import React from "react";

const PreLoader = () => {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="flex space-x-2">
        <div className="w-3 h-3 bg-primary-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-3 h-3 bg-primary-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-3 h-3 bg-primary-600 rounded-full animate-bounce"></div>
      </div>
    </div>
  );
};

export default PreLoader;