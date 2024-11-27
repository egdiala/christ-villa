import React from "react";

export const TableLoader: React.FC = () => {
  return (
    <div className="p-4 bg-white">
      <div className="animate-pulse space-y-4 transition-all ease-out duration-700">
        <div className="w-full h-5 bg-neutral-10 rounded"></div>
        <div className="w-full h-5 bg-neutral-10 rounded"></div>
        <div className="w-full h-5 bg-neutral-10 rounded"></div>
        <div className="w-full h-5 bg-neutral-10 rounded"></div>
        <div className="w-full h-5 bg-neutral-10 rounded"></div>
        <div className="w-full h-5 bg-neutral-10 rounded"></div>
        <div className="w-full h-5 bg-neutral-10 rounded"></div>
        <div className="w-full h-5 bg-neutral-10 rounded"></div>
        <div className="w-full h-5 bg-neutral-10 rounded"></div>
        <div className="w-full h-5 bg-neutral-10 rounded"></div>
      </div>
    </div>
  );
};