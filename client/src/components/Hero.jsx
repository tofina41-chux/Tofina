import React, { useState, useEffect } from 'react';

const Hero = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [index, setIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const [time, setTime] = useState(new Date());
  const [language, setLanguage] = useState('EN');

  // Gallery Preview Images
  const mockupImages = [
    "/logo-showcase.png",
  "/logo.png",
  "/logo1.png",
  "/design1.png",
  "/design2.png",
  "/design3.png",
  "/design4.png",
  "/design6.png",
  ];

  const contentMatrix = {
    EN: {
      subtitle: 'Frontend Developer & Creative Technologist',
      marquee: [
        'Full-Stack Automation',
        'UI/UX Design',
        'AWS Cloud Infrastructure',
        'Custom Digital Tools'
      ],
      pitch: 'I build clean websites, automation systems, and digital tools for ',
      strings: ['CREATORS.', 'DEVELOPERS.', 'LOCAL BUSINESSES.', 'BRANDS.'],
      btnExplore: 'Explore Work',
      btnCV: 'Download CV'
    },
    SW: {
      subtitle: 'Msanidi Programu wa Frontend na Mtaalamu wa Ubunifu',
      marquee: [
        'Mifumo ya Kiotomatiki',
        'Ubunifu wa UI/UX',
        'Miundombinu ya AWS Cloud',
        'Zana Maalum za Kidijitali'
      ],
      pitch: 'Mimi huunda tovuti safi, mifumo ya kiotomatiki, na zana za kidijitali kwa ',
      strings: ['WABUNIFU.', 'WASANIDI PROGRAMU.', 'BIASHARA ZA MTAANI.', 'MASHIRIKA.'],
      btnExplore: 'Kagua Kazi Zangu',
      btnCV: 'Pakua CV Yangu'
    }
  };

  const currentStrings = contentMatrix[language].strings;

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) =>
      setMousePos({ x: e.clientX, y: e.clientY });

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

  const formatTime = (date) =>
    date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });

  return (
    <section
      id="home"
      className="min-h-screen bg-white text-swiss-dark dark:bg-swiss-dark dark:text-white flex flex-col justify-center px-6 pt-32 relative overflow-hidden transition-colors duration-300 scroll-mt-28"
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
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-swiss-navy/40 blur-[140px] rounded-full animate-float-delayed"></div>
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-700 opacity-60"
        style={{
          background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(1,195,141,.05), transparent 60%)`,
        }}
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

        <div className="lg:col-span-6 flex flex-col items-start text-left space-y-6">

          <div className="inline-flex items-center gap-3 bg-swiss-dark/5 dark:bg-white/5 border border-swiss-green text-swiss-dark dark:text-white px-4 py-2 rounded-xl font-mono text-[10px] tracking-wider shadow-md">

            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-swiss-green opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-swiss-green"></span>
              </span>

              <span className="font-black text-swiss-green">
                SYS_NOMINAL
              </span>
            </div>

            <div className="h-3 w-px bg-white/20"></div>

            <div>
              <span className="opacity-60">LOC:</span> MOMBASA, KE
            </div>

            <div className="h-3 w-px bg-white/20"></div>

            <div>
              <span className="opacity-60">TIME:</span>{' '}
              <span className="text-swiss-green font-bold">
                {formatTime(time)}
              </span>
            </div>
          </div>

          <h2 className="text-swiss-green font-mono text-sm tracking-[0.45em] uppercase">
            {contentMatrix[language].subtitle}
          </h2>

          <h1 className="text-7xl md:text-[7rem] lg:text-[7.5rem] font-black leading-[0.9] select-none">
  <span className="text-swiss-green tracking-[0.06em]">
    TOFINA
  </span>
  <span className="text-swiss-dark dark:text-white inline-block animate-bounce">
    .
  </span>
</h1>

          <div className="w-full overflow-hidden py-2">
            <div className="flex gap-8 whitespace-nowrap animate-marquee font-mono text-[11px] tracking-[0.25em] uppercase text-swiss-dark/50 dark:text-white/40">

              {contentMatrix[language].marquee.map((item, i) => (
                <span key={i}>◆ {item}</span>
              ))}

              {contentMatrix[language].marquee.map((item, i) => (
                <span key={`dup-${i}`}>◆ {item}</span>
              ))}

            </div>
          </div>

          <p className="text-swiss-dark/80 dark:text-swiss-grey text-xl md:text-2xl max-w-xl leading-relaxed">
            {contentMatrix[language].pitch}
            <span className="text-swiss-green font-bold underline underline-offset-8 decoration-swiss-green/30">
              {currentStrings[index]}
            </span>
          </p>

          <div className="flex gap-4 pt-4">
            <a
              href="#projects"
              className="px-10 py-4 bg-swiss-green text-swiss-dark rounded-full font-black uppercase tracking-widest text-xs hover:scale-105 transition"
            >
              {contentMatrix[language].btnExplore}
            </a>

            <a
              href="/uploads/Cynthia_Wafula_CV.pdf"
              download
              className="px-8 py-4 border border-white/10 rounded-xl font-mono uppercase text-xs hover:bg-white/5 transition"
            >
              {contentMatrix[language].btnCV}
            </a>
          </div>

        </div>

        <div className="lg:col-span-6">

          <div className="bg-swiss-navy/70 border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl p-2">

            <div className="flex items-center gap-2 px-4 py-2 border-b border-white/10 font-mono text-[10px] uppercase">

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

                <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-swiss-green">
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