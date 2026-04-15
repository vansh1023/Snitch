import React from "react";

const Footer = () => {
  return (
    <footer className="w-full border-t border-[#1c1c1c] bg-[#0e0e0e] px-8 sm:px-14 py-4 shrink-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <p className="text-white text-sm font-bold tracking-[0.2em] uppercase">
          SNITCH
        </p>
        <nav className="flex flex-wrap gap-x-6 gap-y-1">
          {[
            "Privacy Policy",
            "Terms of Service",
            "Shipping & Returns",
            "Contact",
          ].map((item) => (
            <a
              key={item}
              href="#"
              className="text-[#3a3a3a] text-[10px] tracking-[0.12em] uppercase hover:text-[#c9a84c] transition-colors duration-200"
            >
              {item}
            </a>
          ))}
        </nav>
        <p className="text-[#2a2a2a] text-[10px] tracking-[0.08em] uppercase hidden lg:block whitespace-nowrap">
          © 2024 Snitch Atelier. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
