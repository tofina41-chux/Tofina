import { useEffect, useState } from 'react';

const Splash = ({ onComplete }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFadeOut(true), 1500); // Show for 1.5s
    const removeTimer = setTimeout(onComplete, 2000); // Remove from DOM after fade
    return () => { clearTimeout(timer); clearTimeout(removeTimer); };
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center bg-swiss-dark transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
      <div className="relative">
        <img 
          src="/logo.png" 
          alt="Tofina" 
          className="h-24 w-auto animate-pulse brightness-110 drop-shadow-[0_0_20px_rgba(1,195,141,0.6)]" 
        />
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-white/5 overflow-hidden">
          <div className="h-full bg-swiss-green animate-progress-load"></div>
        </div>
      </div>
    </div>
  );
};

export default Splash;