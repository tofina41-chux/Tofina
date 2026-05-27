import React, { useState, useEffect } from 'react';

const Navbar = () => {
  // 1. Initialize theme state by checking local storage system preferences
  const [isLight, setIsLight] = useState(localStorage.getItem('theme') === 'light');

  // 2. React Side-Effect Engine: Listens to state changes and toggles classes on the root HTML element
  useEffect(() => {
    if (isLight) {
      document.documentElement.classList.add('light');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    }
  }, [isLight]);

  return (
    <nav className="fixed top-0 w-full z-50 flex justify-center p-6">
      {/* Container: Swiss Navy with high transparency blur */}
      <div className="flex items-center gap-8 bg-swiss-navy/80 backdrop-blur-xl px-6 py-2 rounded-full border border-white/5 shadow-2xl transition-all duration-300">
        
        {/* Logo Section */}
        <a href="#home" className="flex items-center hover:opacity-80 transition-opacity">
          <img 
            src="/logo.png" 
            alt="Tofina" 
            className="h-24 w-auto mb-4 hover:scale-110 transition-transform duration-500 drop-shadow-[0_0_15px_rgba(1,195,141,0.4)]" 
          />
        </a>

        {/* Vertical Separator */}
        <div className="h-10 w-[1px] bg-white/10 hidden md:block"></div>

        {/* Navigation Links */}
        <div className="flex gap-6 items-center">
          <a href="#about" className="text-white/70 hover:text-swiss-green dark:text-white/70 dark:hover:text-swiss-green font-medium text-sm transition-all">About</a>
          
          {/* Linked to #projects ID but labeled 'Work' for the UI */}
          <a href="#projects" className="text-white/70 hover:text-swiss-green dark:text-white/70 dark:hover:text-swiss-green font-medium text-sm transition-all">Work</a>
          
          <a href="#skills" className="text-white/70 hover:text-swiss-green dark:text-white/70 dark:hover:text-swiss-green font-medium text-sm transition-all">Skills</a>
          
          <a href="#contact" className="text-swiss-green font-bold text-sm hover:brightness-125 transition-all ml-2">Contact</a>

          {/* Vertical Separator for the Toggle */}
          <div className="h-4 w-[1px] bg-white/10 hidden sm:block mx-1"></div>

          {/* 💡 SYSTEM LIGHT / DARK CORE TOGGLE SWITCH */}
          <button 
            onClick={() => setIsLight(!isLight)} 
            className="p-2 px-3 rounded-full bg-white/5 border border-white/10 hover:border-swiss-green/40 text-white transition-all font-mono text-[10px] tracking-wider uppercase font-bold select-none"
            title="Toggle Light/Dark Interface Core"
          >
            {isLight ? "🌙 Dark Mode" : "☀️ Light Mode"}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;