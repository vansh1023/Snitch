import React from "react";



const DiamondIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l9 9-9 9-9-9 9-9z" />
  </svg>
);

const ChevronIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[#888]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);



const Navbar = () => {

  return (
    <nav className="bg-white border-b border-[#e8e6e1] px-8 h-16 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center gap-2.5 text-[#1a1a1a]">
        <DiamondIcon />
        <span className="text-lg font-bold tracking-wide uppercase">
          Snitch
        </span>
      </div>

      {/* Nav right */}
      <div className="flex items-center gap-6">
        <a
          href="#"
          className="text-[#444] text-sm font-medium hover:text-[#1a1a1a] transition-colors"
        >
          Dashboard
        </a>
        <a
          href="#"
          className="text-[#444] text-sm font-medium hover:text-[#1a1a1a] transition-colors"
        >
          Orders
        </a>
        <div className="flex items-center gap-2 cursor-pointer">
          <img
            src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&q=80"
            alt="Profile"
            className="w-9 h-9 rounded-full object-cover border border-[#e0ddd8]"
            onError={(e) => {
              e.target.src = "https://placehold.co/40x40/ddd/888?text=U";
            }}
          />
          <ChevronIcon />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
