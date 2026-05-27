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
import AdminGateway from './components/AdminGateway'; // Use our fully wired upload console

function App() {
  const [loading, setLoading] = useState(true);

  // 🔐 ROUTE GUARD PATHWAY: 
  // If you manually navigate to /admin, it takes over the screen with the dashboard control deck!
  if (window.location.pathname === '/admin') {
    return (
      <div className="bg-swiss-dark min-h-screen flex items-center justify-center">
        {/* We redirect the exit close trigger back to your main portfolio homepage */}
        <AdminGateway onClose={() => window.location.href = '/'} />
      </div>
    );
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