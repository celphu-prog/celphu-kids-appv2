
import React from 'react';

export const Loader: React.FC<{ message?: string }> = ({ message = "Generando..." }) => (
  <div className="flex flex-col items-center justify-center space-y-4 p-8">
    <div className="w-16 h-16 border-4 border-teal-500 border-dashed rounded-full animate-spin border-t-transparent"></div>
    <p className="text-teal-600 font-semibold">{message}</p>
  </div>
);
