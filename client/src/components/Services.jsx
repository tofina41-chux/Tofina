import { SERVICES } from '../data/site';

const Services = () => (
  <section id="services" className="py-24 bg-swiss-dark px-6 scroll-mt-28">
    <div className="max-w-6xl mx-auto">
      <div className="mb-16">
        <span className="text-swiss-green font-mono text-xs tracking-[0.4em] uppercase block mb-3">
          What I Do
        </span>
        <h2 className="text-4xl font-black text-fg tracking-tight">
          Services<span className="text-swiss-green">.</span>
        </h2>
        <p className="text-swiss-grey mt-5 max-w-2xl leading-relaxed">
          Websites, design and everyday digital support for small businesses,
          creators and teams.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {SERVICES.map((s, i) => (
          <article
            key={s.title}
            className="bg-swiss-navy border border-fg/5 rounded-3xl p-8 flex flex-col hover:border-swiss-green/40 transition-colors duration-300"
          >
            <span className="text-swiss-green font-mono text-xs tracking-widest mb-6">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="text-xl font-black text-fg tracking-tight mb-3">{s.title}</h3>
            <p className="text-swiss-grey text-sm leading-relaxed mb-6">{s.text}</p>
            <ul className="mt-auto space-y-2 text-xs font-mono text-swiss-grey">
              {s.points.map((p) => (
                <li key={p} className="flex gap-2">
                  <span className="text-swiss-green" aria-hidden="true">◆</span>
                  {p}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="mt-12">
        <a
          href="#contact"
          className="inline-flex px-8 py-4 bg-swiss-green text-swiss-dark rounded-full font-black uppercase tracking-widest text-xs hover:scale-105 transition"
        >
          Start a project
        </a>
      </div>
    </div>
  </section>
);

export default Services;
