import React, { useState } from "react";

const designs = [
  {
    id: 1,
    title: "Tofina Sparkle Solutions Flyer",
    description:
      "Marketing flyer designed to promote professional residential and commercial cleaning services.",
    category: "Flyer",
    year: "2026",
    imageUrl: "/design1.png",
  },
  {
    id: 2,
    title: "Social Media Campaign",
    description:
      "Instagram and Facebook promotional artwork created to increase engagement and brand awareness.",
    category: "Social Media",
    year: "2026",
    imageUrl: "/design2.png",
  },
  {
    id: 3,
    title: "Business Branding",
    description:
      "Professional branding assets including logo presentation, colour palette and identity layout.",
    category: "Brand Identity",
    year: "2026",
    imageUrl: "/design3.png",
  },
  {
    id: 4,
    title: "Business Card Design",
    description:
      "Minimal and modern business card designed for client networking and brand consistency.",
    category: "Print Design",
    year: "2026",
    imageUrl: "/design4.png",
  },
  {
  id: 5,
  title: "Logo Collection",
  description:
    "A collection of custom logo concepts designed for businesses and personal brands, focusing on simplicity, versatility, and memorable visual identity.",
  category: "Logo Design",
  year: "2026",
  imageUrl: "/logo-showcase.png",
},
  {
    id: 6,
    title: "Promotional Poster",
    description:
      "Large-format promotional poster designed with strong typography and visual hierarchy.",
    category: "Poster",
    year: "2026",
    imageUrl: "/design6.png",
  },
];

const Blog = () => {
  const [selectedDesign, setSelectedDesign] = useState(null);

  return (
    <section
      id="gallery"
      className="py-24 bg-swiss-dark px-6 border-t border-white/5 scroll-mt-28"
    >
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-16">
          <span className="text-swiss-green font-mono text-xs tracking-[0.4em] uppercase block mb-3">
            Creative / Portfolio
          </span>

          <h2 className="text-4xl font-black text-white tracking-tight">
            Creative Gallery
            <span className="text-swiss-green">.</span>
          </h2>

          <p className="text-swiss-grey mt-5 max-w-2xl mx-auto leading-relaxed">
            A curated collection of graphic design work created using Canva,
            showcasing branding, marketing, print and digital media projects.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">

          {designs.map((design) => (

            <div
              key={design.id}
              className="group bg-swiss-navy/30 border border-white/5 rounded-3xl overflow-hidden hover:border-swiss-green/30 transition-all duration-500 flex flex-col"
            >

              <div className="overflow-hidden">

                <img
                  src={design.imageUrl}
                  alt={design.title}
                  className="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-105"
                />

              </div>

              <div className="p-7 flex flex-col flex-grow">

                <div className="flex justify-between items-center mb-5">

                  <span className="text-[10px] uppercase tracking-[0.35em] text-swiss-green font-mono">
                    {design.category}
                  </span>

                  <span className="text-xs text-swiss-grey">
                    {design.year}
                  </span>

                </div>

                <h3 className="text-xl font-black text-white mb-4 group-hover:text-swiss-green transition-colors">
                  {design.title}
                </h3>

                <p className="text-sm text-swiss-grey leading-relaxed flex-grow">
                  {design.description}
                </p>

                <button
                  onClick={() => setSelectedDesign(design)}
                  className="mt-8 py-3 rounded-xl border border-swiss-green text-swiss-green font-semibold hover:bg-swiss-green hover:text-swiss-dark transition-all duration-300"
                >
                  View Design
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

      {selectedDesign && (

        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6">

          <div
            className="absolute inset-0"
            onClick={() => setSelectedDesign(null)}
          ></div>

          <div className="relative bg-swiss-navy rounded-3xl border border-white/10 max-w-4xl w-full overflow-hidden shadow-2xl">

            <img
              src={selectedDesign.imageUrl}
              alt={selectedDesign.title}
              className="w-full max-h-[70vh] object-contain bg-swiss-dark"
            />

            <div className="p-8">

              <div className="flex justify-between items-center mb-5">

                <span className="text-swiss-green uppercase tracking-[0.35em] text-xs font-mono">
                  {selectedDesign.category}
                </span>

                <span className="text-swiss-grey text-sm">
                  {selectedDesign.year}
                </span>

              </div>

              <h3 className="text-3xl font-black text-white mb-5">
                {selectedDesign.title}
              </h3>

              <p className="text-swiss-grey leading-relaxed">
                {selectedDesign.description}
              </p>

              <div className="mt-8 border-t border-white/5 pt-6 flex justify-end">

                <button
                  onClick={() => setSelectedDesign(null)}
                  className="px-6 py-3 rounded-xl border border-white/10 text-white hover:bg-white/5 transition-all"
                >
                  Close Preview
                </button>

              </div>

            </div>

          </div>

        </div>

      )}
    </section>
  );
};

export default Blog;