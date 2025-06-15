
import React from "react";

const BrandiagaWatermark = () => (
  <div className="fixed bottom-4 right-4 opacity-30 pointer-events-none z-50 flex flex-col items-center">
    <img
      src="/lovable-uploads/163a4508-5c59-4889-8599-815d06c9c067.png"
      alt="Brandiaga Logo"
      className="h-12 w-12 mb-1"
      loading="lazy"
      draggable={false}
      style={{ filter: "grayscale(1)" }}
    />
    <span className="text-gray-500 font-medium select-none drop-shadow-md">Brandiaga</span>
  </div>
);

export default BrandiagaWatermark;
