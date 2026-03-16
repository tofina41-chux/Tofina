const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 flex justify-center p-6">
      <div className="flex gap-6 bg-slate-800/80 backdrop-blur-md px-6 py-2 rounded-full border border-slate-700 shadow-xl">
        <a href="#home" className="text-slate-300 hover:text-sky-400 font-medium transition-colors">Home</a>
        <a href="#about" className="text-slate-300 hover:text-sky-400 font-medium transition-colors">About</a>
        <a href="#projects" className="text-slate-300 hover:text-sky-400 font-medium transition-colors">Work</a>
        <a href="#skills" className="text-slate-300 hover:text-sky-400 font-medium transition-colors">Skills</a>
        <a href="#contact" className="text-slate-300 hover:text-sky-400 font-medium transition-colors">Contact</a>
      </div>
    </nav>
  );
};

export default Navbar;