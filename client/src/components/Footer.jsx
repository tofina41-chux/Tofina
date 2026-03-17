import { Linkedin, Github, MessageCircle, Instagram } from 'lucide-react';

const Footer = () => {
  const socials = [
    { name: "LinkedIn", url: "#", icon: <Linkedin size={20} /> },
    { name: "GitHub", url: "https://github.com/tofina41-chux", icon: <Github size={20} /> },
    { name: "WhatsApp", url: "https://wa.me/0743173996", icon: <MessageCircle size={20} /> },
    { name: "Instagram", url: "#", icon: <Instagram size={20} /> }
  ];

  return (
    <footer className="py-8 bg-swiss-dark border-t border-white/5 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Left Side: Logo & Branding */}
        <div className="flex items-center gap-4">
          <img 
            src="/logo.png" 
            alt="Tofina" 
            className="h-8 w-auto brightness-110 drop-shadow-[0_0_8px_rgba(1,195,141,0.3)]" 
          />
          <span className="text-swiss-grey font-mono text-[10px] tracking-[0.3em] uppercase border-l border-white/10 pl-4 hidden sm:block">
            Creative Technologist
          </span>
        </div>

        {/* Right Side: Social Icons */}
        <div className="flex gap-6 items-center">
          {socials.map((social) => (
            <a 
              key={social.name} 
              href={social.url} 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label={social.name}
              className="text-swiss-grey hover:text-swiss-green transition-all duration-300 transform hover:-translate-y-1 hover:drop-shadow-[0_0_10px_rgba(1,195,141,0.5)]"
            >
              {social.icon}
            </a>
          ))}
        </div>

      </div>
    </footer>
  );
};

export default Footer;