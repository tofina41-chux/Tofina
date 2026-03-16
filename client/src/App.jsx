import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact'; 

function App() {
  return (
    // We add 'scroll-smooth' to the HTML via the main wrapper to make nav links glide
    <main className="bg-slate-900 min-h-screen selection:bg-sky-500/30">
      <Navbar />
      
      {/* Each section gets an ID so the Navbar links know where to jump */}
      <div id="home">
        <Hero />
      </div>

      <div id="projects">
        <Projects />
      </div>

      <div id="skills">
        <Skills />
      </div>

      <div id="contact">
        <Contact /> 
      </div>

      <footer className="py-10 text-center text-slate-500 border-t border-slate-800">
        <p>© {new Date().getFullYear()} Tofina. Built with React & Node.js</p>
      </footer>
    </main>
  );
}

export default App;