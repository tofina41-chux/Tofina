import React, { useState, useEffect, useRef } from 'react';
import { SITE } from '../data/site';

// Isolated so the per-second tick doesn't re-render the whole hero.
const LiveClock = () => {
  const [t, setT] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setT(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="text-swiss-green font-bold">
      {t.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone: 'Africa/Nairobi' })}
    </span>
  );
};

const Hero = () => {
  const glowRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const [language, setLanguage] = useState('EN');

  // Gallery Preview Images
  const mockupImages = [
    "/logo-showcase.png",
  "/logo.png",
  "/logo1.png",
  "/design1.webp",
  "/design2.webp",
  "/design3.webp",
  "/design4.webp",
  "/design6.webp",
  ];

  const contentMatrix = {
    EN: {
      subtitle: 'Web & Creative Services · IT Support',
      support: 'Websites, design and everyday digital support for small businesses and creators in Mombasa and beyond.',
      marquee: [
        'Web Development',
        'UI/UX & Branding',
        'IT & Digital Support',
        'Custom Digital Tools'
      ],
      pitch: 'I build clean websites and digital tools for ',
      strings: ['CREATORS.', 'DEVELOPERS.', 'LOCAL BUSINESSES.', 'BRANDS.'],
      btnExplore: 'Explore Work',
      btnCV: 'Download CV'
    },
    SW: {
      subtitle: 'Huduma za Wavuti na Ubunifu · Msaada wa IT',
      support: 'Tovuti, ubunifu na msaada wa kila siku wa kidijitali kwa biashara ndogo na wabunifu Mombasa na kwingineko.',
      marquee: [
        'Uundaji wa Tovuti',
        'Ubunifu wa UI/UX na Chapa',
        'Msaada wa IT na Kidijitali',
        'Zana Maalum za Kidijitali'
      ],
      pitch: 'Mimi huunda tovuti safi na zana za kidijitali kwa ',
      strings: ['WABUNIFU.', 'WASANIDI PROGRAMU.', 'BIASHARA ZA MTAANI.', 'MASHIRIKA.'],
      btnExplore: 'Kagua Kazi Zangu',
      btnCV: 'Pakua CV Yangu'
    }
  };

  const currentStrings = contentMatrix[language].strings;

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (glowRef.current) {
        glowRef.current.style.background = `radial-gradient(800px circle at ${e.clientX}px ${e.clientY}px, rgba(232,103,44,.05), transparent 60%)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    const stringInterval = setInterval(() => {
      setIndex((prev) => (prev + 1) % currentStrings.length);
    }, 2500);

    const frameTimer = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % mockupImages.length);
    }, 3500);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(stringInterval);
      clearInterval(frameTimer);
    };
  }, [currentStrings.length]);

  return (
    <section
      id="home"
      className="min-h-screen bg-swiss-dark text-fg flex flex-col justify-center px-6 pt-32 relative overflow-hidden transition-colors duration-300 scroll-mt-28"
    >
      <div className="absolute top-24 right-6 z-50">
        <button
          onClick={() =>
            setLanguage((prev) => (prev === 'EN' ? 'SW' : 'EN'))
          }
          className="flex items-center gap-2 bg-swiss-green text-swiss-dark font-mono text-xs font-black px-4 py-2 rounded-xl shadow-lg border border-swiss-green/20 hover:scale-105 active:scale-95 transition-all uppercase tracking-widest"
        >
          <span>🌐</span>
          <span>{language === 'EN' ? 'Swahili' : 'English'}</span>
        </button>
      </div>

      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-swiss-green/10 blur-[140px] rounded-full animate-float-slow"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-swiss-navy blur-[140px] rounded-full animate-float-delayed"></div>
      </div>

      <div
        ref={glowRef}
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-700 opacity-60"
      />

      <div
        className="absolute inset-0 z-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(to right,#696E79 1px,transparent 1px),linear-gradient(to bottom,#696E79 1px,transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-12 gap-12 items-center z-10 relative">

        <div className="min-w-0 lg:col-span-6 flex flex-col items-start text-left space-y-6">

          <div className="max-w-full flex-wrap inline-flex items-center gap-2 gap-y-2 bg-fg/5 border border-swiss-green text-fg px-4 py-2 rounded-xl font-mono text-[10px] tracking-wider shadow-md">

            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-swiss-green opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-swiss-green"></span>
              </span>

              <span className="font-black text-swiss-green">
                SYS_NOMINAL
              </span>
            </div>

            <div className="hidden sm:block h-3 w-px bg-fg/20"></div>

            <div>
              <span className="opacity-60">LOC:</span> MOMBASA, KE
            </div>

            <div className="hidden sm:block h-3 w-px bg-fg/20"></div>

            <div>
              <span className="opacity-60">TIME:</span>{' '}
              <LiveClock />
            </div>
          </div>

          <h2 className="text-swiss-green font-mono text-sm tracking-[0.45em] uppercase">
            {contentMatrix[language].subtitle}
          </h2>

          <h1 className="text-5xl sm:text-6xl md:text-[7rem] lg:text-[7.5rem] font-black leading-[0.9] select-none break-words">
  <span className="text-swiss-green tracking-[0.06em]">
    TOFINA
  </span>
  <span className="text-fg inline-block animate-bounce">
    .
  </span>
</h1>

          <div className="w-full overflow-hidden py-2">
            <div className="flex gap-8 whitespace-nowrap animate-marquee font-mono text-[11px] tracking-[0.25em] uppercase text-fg/50">

              {contentMatrix[language].marquee.map((item, i) => (
                <span key={i}>◆ {item}</span>
              ))}

              {contentMatrix[language].marquee.map((item, i) => (
                <span key={`dup-${i}`}>◆ {item}</span>
              ))}

            </div>
          </div>

          <p className="text-swiss-grey text-xl md:text-2xl max-w-xl leading-relaxed">
            {contentMatrix[language].pitch}
            <span className="text-swiss-green font-bold underline underline-offset-8 decoration-swiss-green/30">
              {currentStrings[index]}
            </span>
          </p>

          <p className="text-fg/70 text-base max-w-xl leading-relaxed">
            {contentMatrix[language].support}
          </p>

          <div className="flex flex-col gap-4 pt-4 sm:flex-row sm:items-center sm:justify-start">
            <a
              href="#projects"
              className="w-full sm:w-auto inline-flex justify-center px-8 sm:px-10 py-4 bg-swiss-green text-swiss-dark rounded-full font-black uppercase tracking-widest text-xs hover:scale-105 transition"
            >
              {contentMatrix[language].btnExplore}
            </a>

            <a
              href={SITE.cv}
              download
              className="w-full sm:w-auto inline-flex justify-center px-8 py-4 border border-fg/10 rounded-xl font-mono uppercase text-xs hover:bg-fg/5 transition"
            >
              {contentMatrix[language].btnCV}
            </a>
          </div>

        </div>

        <div className="min-w-0 w-full lg:col-span-6 flex justify-center lg:justify-end">

          <div className="bg-swiss-navy/70 border border-fg/10 rounded-[1.25rem] sm:rounded-[2rem] overflow-hidden shadow-2xl p-2 w-full max-w-full sm:max-w-[520px] lg:max-w-[560px] mx-auto lg:mx-0">

            <div className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 border-b border-fg/10 font-mono text-[10px] uppercase">

              <span className="w-2 h-2 rounded-full bg-red-400"></span>
              <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
              <span className="w-2 h-2 rounded-full bg-swiss-green"></span>

              <span className="ml-2 text-swiss-green font-bold">
                creative_gallery.exe
              </span>

            </div>

            <div className="aspect-[4/3] overflow-hidden rounded-2xl relative">

              <img
                src={mockupImages[imageIndex]}
                alt="Creative Work"
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
              />

              <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-md px-4 py-2 rounded-xl">

                <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#E8672C]">
                  LIVE PREVIEW
                </p>

                <h4 className="text-white font-bold">
                  Creative Gallery
                </h4>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Hero;