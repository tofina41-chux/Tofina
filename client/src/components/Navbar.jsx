import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [isLight, setIsLight] = useState(localStorage.getItem('theme') === 'light');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isLight) {
      document.documentElement.classList.add('light');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    }
  }, [isLight]);

  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#projects', label: 'Work' },
    { href: '#skills', label: 'Skills' },
    { href: '#contact', label: 'Contact', highlight: true }
  ];

  return (
    <nav className="fixed inset-x-0 top-0 z-50 px-4 py-3">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 bg-swiss-navy/95 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-full px-4 py-3">
        <a href="#home" className="flex items-center gap-3 shrink-0 hover:opacity-90 transition-opacity">
          <img src="/logo.png" alt="Tofina" className="h-10 w-auto" />
          <span className="hidden sm:inline text-xs uppercase tracking-[0.35em] text-white font-bold">Tofina</span>
        </a>

        <div className="hidden sm:flex items-center gap-6">
          {navLinks.slice(0, 3).map((link) => (
            <a key={link.href} href={link.href} className="text-white/75 hover:text-swiss-green font-medium text-sm transition-all">
              {link.label}
            </a>
          ))}

          <a href="#contact" className="text-swiss-green font-bold text-sm hover:brightness-125 transition-all">
            Contact
          </a>

          <div className="h-5 w-px bg-white/10"></div>

          <button
            onClick={() => setIsLight(!isLight)}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-white transition-all hover:border-swiss-green/40"
            title="Toggle Light/Dark Interface Core"
          >
            {isLight ? '🌙 Dark Mode' : '☀️ Light Mode'}
          </button>
        </div>

        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="sm:hidden rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-wider text-white font-bold transition-all hover:bg-white/10"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? 'Close' : 'Menu'}
        </button>
      </div>

      {isOpen && (
        <div className="sm:hidden mx-auto mt-3 max-w-6xl rounded-3xl bg-swiss-navy/95 border border-white/10 p-4 shadow-2xl">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block rounded-2xl px-4 py-3 text-sm font-medium transition-all ${link.highlight ? 'bg-swiss-green/10 text-swiss-green' : 'text-white/75 hover:bg-white/10 hover:text-swiss-green'}`}
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => { setIsLight(!isLight); setIsOpen(false); }}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm uppercase tracking-wider text-white font-bold transition-all hover:bg-white/10"
            >
              {isLight ? 'Switch Dark' : 'Switch Light'}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
