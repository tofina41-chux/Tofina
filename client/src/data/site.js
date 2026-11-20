// Single source of truth for contact details, services and projects.
// Edit here, not inside components.

const WA_NUMBER = '254729022127';

export const SITE = {
  brand: 'Tofina',
  name: 'Cynthia Wafula',
  url: 'https://tofinatech.com',
  email: 'tofina41@gmail.com', // TODO: replace with the SeloDigital email if different
  whatsappNumber: WA_NUMBER,
  whatsappDisplay: '0729 022 127',
  whatsappLink: `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
    "Hi Cynthia, I found your portfolio and I'd like to talk about a project."
  )}`,
  linkedin: 'https://www.linkedin.com/in/tofina-wafula-221317289',
  github: 'https://github.com/tofina41-chux',
  instagram: 'https://www.instagram.com/tofina41.chux',
  cv: '/Wafula_NOV_2026_CV.pdf',
  available: true,
};

export const SERVICES = [
  {
    title: 'Websites & Web Apps',
    text: 'Business websites, portfolios and small web applications built with React and Node.js, responsive on every screen.',
    points: ['Business & portfolio sites', 'Booking and request forms', 'Frontend + simple backend'],
  },
  {
    title: 'UI/UX & Branding',
    text: 'Clean interfaces, logos, posters and brand materials so your business looks consistent and trustworthy.',
    points: ['Posters & brand materials', 'Canva and AI-assisted design', 'Interface layouts'],
  },
  {
    title: 'Content & Social Media',
    text: 'Digital content and social media posts that match your brand and are ready to publish.',
    points: ['Social media content', 'Digital branding', 'Basic digital marketing'],
  },
  {
    title: 'IT & Digital Support',
    text: 'Practical help with everyday technology: setup, troubleshooting, documents, data and digital skills training.',
    points: ['Troubleshooting & user support', 'Spreadsheets & data cleaning', 'Digital literacy support'],
  },
];

// type: 'app' | 'site'. Leave liveLink/githubLink empty when there is no public link.
export const PROJECT_FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'app', label: 'Web Apps' },
  { key: 'site', label: 'Websites' },
];

export const PROJECTS = [
  {
    id: 'selodigital',
    title: 'SeloDigital',
    kind: 'Business Website',
    type: 'site',
    description:
      'Website for a Mombasa digital concierge and skills hub: customers see clear "from" prices, send a request on WhatsApp, and can learn digital and AI skills.',
    tags: ['Website', 'WhatsApp', 'Responsive'],
    image: '/selodigital.webp',
    liveLink: 'https://selodigital-website.vercel.app',
    githubLink: 'https://github.com/tofina41-chux/selodigital-website',
  },
  {
    id: 'myrna',
    title: 'MYR | Art Direction & Curatorial Archive',
    kind: 'Client Project',
    type: 'site',
    description:
      'A minimalist digital archive for Myrna, a Mombasa-based Art Director and Curator: a visual portfolio, a journal for field notes, and a catalogue of professional services.',
    tags: ['React', 'Node.js', 'Dashboard'],
    image: '/myrna.webp',
    liveLink: 'https://myr-art-direction.vercel.app',
    githubLink: 'https://github.com/tofina41-chux/MyrnA',
  },
  {
    id: 'tss',
    title: 'Tofina Sparkle Solutions',
    kind: 'Business Website',
    type: 'site',
    description:
      'A responsive website for a professional cleaning company with service showcases, quotation requests, project galleries and customer contact workflows.',
    tags: ['React', 'Business', 'Responsive'],
    image: '/tss.webp',
    liveLink: 'https://tofina-sparkle-solutions.vercel.app/',
    githubLink: 'https://github.com/tofina41-chux/Tofina-sparkle-solutions',
  },
  {
    id: 'storyforge',
    title: 'Story Forge',
    kind: 'Web Application',
    type: 'app',
    description:
      'An interactive storytelling platform where readers influence the narrative through collaborative voting and community participation.',
    tags: ['React', 'Interactive', 'AI-Assisted'],
    image: '/sfg.webp',
    liveLink: 'https://story-forge-vote.lovable.app/',
    githubLink: 'https://github.com/tofina41-chux/story-forge-vote',
  },
  {
    id: 'room-booking',
    title: 'Room Booking System',
    kind: 'Academic Project',
    type: 'app',
    description:
      'A full-stack room booking application built as an academic project, covering the booking flow from the interface through to the database.',
    tags: ['React', 'Tailwind CSS', 'Node.js / Express', 'MongoDB'],
    image: null,
    liveLink: '',
    githubLink: '',
  },
  {
    id: 'sanaa-sync',
    title: 'Sanaa-Sync',
    kind: 'Internship Project',
    type: 'app',
    description:
      'A platform developed for the Creative Department at Swahilipot Hub during my IT Attaché placement (Feb – Apr 2026).',
    tags: ['Swahilipot Hub', 'Full-stack'],
    image: null,
    liveLink: '',
    githubLink: '',
  },
  {
    id: 'portfolio',
    title: 'Tofina Portfolio',
    kind: 'Personal Portfolio',
    type: 'site',
    description:
      'This site: a React + Vite + Tailwind portfolio deployed on Vercel, with serverless API routes and a Supabase-backed admin for projects and CV uploads.',
    tags: ['React', 'Vercel', 'Supabase'],
    image: '/tofina.webp',
    liveLink: 'https://tofinatech.com',
    githubLink: 'https://github.com/tofina41-chux/Tofina',
  },
];
