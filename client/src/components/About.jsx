import React from 'react';

const About = () => {
  const profileImg = "/profile.webp";

  return (
    <section id="about" className="py-24 bg-swiss-navy px-6 relative overflow-hidden scroll-mt-28">
      <div className="absolute left-0 top-0 w-full h-[1px] bg-gradient-to-r from-transparent via-fg/5 to-transparent"></div>

      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden group shadow-2xl bg-swiss-green/10 flex items-center justify-center">
            <img
              src={profileImg}
              alt="Cynthia Wafula"
              loading="lazy"
              decoding="async"
              onError={(e) => {
                e.currentTarget.src = "/logo.png";
              }}
              className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700 ease-out"
            />

            <div className="absolute bottom-6 left-6 z-20 pointer-events-none">
              <p className="text-xs font-mono tracking-widest text-swiss-green uppercase mb-1">Identity</p>
              <h3 className="text-xl font-bold text-fg tracking-tight">Cynthia Wafula</h3>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-4 mb-6">
              <span className="w-8 h-[1px] bg-swiss-green"></span>
              <span className="text-swiss-green font-mono text-xs tracking-widest uppercase">01 / Background</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-fg mb-8 tracking-tight leading-none">
              Web, Design &amp; <span className="text-swiss-green">Digital Support</span>, Done Properly.
            </h2>

            <p className="text-fg/80 text-lg mb-6 leading-relaxed">
              I'm Cynthia Wafula, an IT and digital support professional and web &amp; creative designer
              based in Mombasa, Kenya. I build websites and web apps, create branding and social content,
              and help people and teams get their digital work done.
            </p>

            <p className="text-swiss-grey text-base mb-4 leading-relaxed">
              I started in IT support in 2016, helping learners and customers at a cyber caf&eacute; with
              computer packages and digital literacy. Since then I've worked across operations, photography
              project coordination and, in 2026, as an IT Att&aring;ch&eacute; at Swahilipot Hub, where I built
              Sanaa-Sync for the Creative Department.
            </p>

            <p className="text-swiss-grey text-base mb-8 leading-relaxed">
              Today I take on freelance web and creative projects while completing my Diploma in
              Information Technology at Mount Kenya University.
            </p>

            <div className="grid grid-cols-3 gap-4 border-t border-fg/5 pt-8">
              <div>
                <p className="text-3xl font-black text-fg tracking-tight mb-1">Web</p>
                <p className="text-xs font-mono text-swiss-grey tracking-wider uppercase">Sites &amp; Apps</p>
              </div>
              <div>
                <p className="text-3xl font-black text-swiss-green tracking-tight mb-1">Design</p>
                <p className="text-xs font-mono text-swiss-grey tracking-wider uppercase">Brand &amp; Content</p>
              </div>
              <div>
                <p className="text-3xl font-black text-fg tracking-tight mb-1">IT</p>
                <p className="text-xs font-mono text-swiss-grey tracking-wider uppercase">Support &amp; Training</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
