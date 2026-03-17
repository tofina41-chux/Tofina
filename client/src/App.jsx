import { useState } from 'react';
import Splash from './components/Splash';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import About from './components/About';
import Footer from './components/Footer';
import Blog from './components/Blog'; 

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {/* 1. Show Splash Screen if loading is true */}
      {loading && <Splash onComplete={() => setLoading(false)} />}

      {/* 2. Content is hidden while loading, then fades in */}
      <main className={`bg-swiss-dark min-h-screen selection:bg-swiss-green/30 transition-opacity duration-1000 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        <Navbar />
        
        {/* We call the components directly. They already have their own IDs inside! */}
        <Hero />
        <Projects />
        <About />
        <Skills />
        <Blog /> 
        <Contact /> 
        <Footer /> 
      </main>
    </>
  );
}

export default App;