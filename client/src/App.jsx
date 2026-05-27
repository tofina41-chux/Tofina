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
import Admin from './components/Admin'; // 1. Import your Admin panel

function App() {
  const [loading, setLoading] = useState(true);

  // 2. Simple, lightweight router switch:
  // If the browser URL is 'localhost:5173/admin', render the login panel instead!
  if (window.location.pathname === '/admin') {
    return <Admin />;
  }

  return (
    <>
      {loading && <Splash onComplete={() => setLoading(false)} />}

      <main className={`bg-swiss-dark min-h-screen selection:bg-swiss-green/30 transition-opacity duration-1000 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        <Navbar />
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