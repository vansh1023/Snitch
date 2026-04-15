import React from "react";

const LeftPanel = () => {
  return (
    <div className="relative hidden md:block md:w-1/2 h-full overflow-hidden">
      <img
        src="/RegisterPageModel.png"
        alt="Luxury fashion"
        className="absolute inset-0 w-full h-full object-cover object-top grayscale"
      />
      <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/20 to-black/60" />
      <div className="absolute bottom-12 left-10 right-10">
        <p className="text-[10px] tracking-[0.25em] text-[#c9a84c] uppercase mb-3 font-medium">
          The Atelier Collection
        </p>
        <h2 className="text-white text-5xl font-black uppercase leading-tight tracking-tight">
          Redefine
          <br />
          Your Essence
        </h2>
        <div className="mt-4 w-10 h-0.5 bg-[#c9a84c]" />
      </div>
    </div>
  );
};

export default LeftPanel;
