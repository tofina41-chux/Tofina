import { useState } from 'react';
import { Mail, Linkedin, MessageCircle } from 'lucide-react';
import { SITE } from '../data/site';

const contactEmail = 'hello@tofinatech.com';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState(""); // 'success' | 'error' | ''
  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setStatus("Sending your message...");
    setStatusType("");

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("Message sent — I'll get back to you soon.");
        setStatusType("success");
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error(data.error || 'Something went wrong');
      }
    } catch {
      setStatus(
        `Couldn't send that automatically. Please email me directly at ${contactEmail}.`
      );
      setStatusType("error");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-swiss-dark px-6">
      <div className="max-w-3xl mx-auto bg-swiss-navy border border-fg/5 p-10 rounded-[2rem] backdrop-blur-md">
        <div className="flex justify-center mb-6">
          <img 
            src="/logo.png" 
            alt="Tofina" 
            className="h-24 w-auto mb-4 hover:scale-110 transition-transform duration-500 drop-shadow-[0_0_15px_rgba(232,103,44,0.4)]" 
          />
        </div>
        <h2 className="text-4xl font-bold text-fg mb-2">Let's <span className="text-swiss-green">Connect</span></h2>
        {SITE.available && (
          <p className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-swiss-green border border-swiss-green/40 rounded-full px-4 py-2 mb-4">
            <span className="h-2 w-2 rounded-full bg-swiss-green" aria-hidden="true"></span>
            Available for freelance projects
          </p>
        )}
        <p className="text-swiss-grey mb-8">Tell me what you need, or reach me directly below.</p>

        <div className="grid sm:grid-cols-3 gap-3 mb-10">
          <a href={SITE.whatsappLink} target="_blank" rel="noreferrer"
             className="flex items-center justify-center gap-2 py-3 rounded-2xl bg-swiss-green text-swiss-dark font-black text-sm hover:brightness-110 transition">
            <MessageCircle size={18} aria-hidden="true" /> WhatsApp
          </a>
          <a href={`mailto:${contactEmail}`}
             className="flex items-center justify-center gap-2 py-3 rounded-2xl border border-fg/10 text-fg font-semibold text-sm hover:border-swiss-green/40 transition">
            <Mail size={18} aria-hidden="true" /> Email
          </a>
          <a href={SITE.linkedin} target="_blank" rel="noreferrer"
             className="flex items-center justify-center gap-2 py-3 rounded-2xl border border-fg/10 text-fg font-semibold text-sm hover:border-swiss-green/40 transition">
            <Linkedin size={18} aria-hidden="true" /> LinkedIn
          </a>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <input 
              type="text" 
              name="name"
              placeholder="Name" aria-label="Your name" autoComplete="name" 
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-4 bg-swiss-dark border border-fg/10 rounded-2xl text-fg focus:border-swiss-green outline-none transition-all placeholder:text-swiss-grey/50"
            />
            <input 
              type="email" 
              name="email"
              placeholder="Email" aria-label="Your email" autoComplete="email" 
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-4 bg-swiss-dark border border-fg/10 rounded-2xl text-fg focus:border-swiss-green outline-none transition-all placeholder:text-swiss-grey/50"
            />
          </div>
          <textarea 
            name="message"
            placeholder="Your message..." aria-label="Your message" 
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full p-4 bg-swiss-dark border border-fg/10 rounded-2xl text-fg focus:border-swiss-green outline-none transition-all placeholder:text-swiss-grey/50"
          ></textarea>
          
          <button
            type="submit"
            disabled={sending}
            className="w-full py-4 bg-swiss-green text-swiss-dark font-black rounded-2xl hover:brightness-110 hover:shadow-[0_10px_40px_rgba(232,103,44,0.2)] transition-all uppercase tracking-widest text-sm disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {sending ? "Sending..." : "Send Message"}
          </button>
        </form>
        {status && (
          <p
            className={`mt-6 text-center font-mono text-sm ${
              statusType === "error" ? "text-red-400" : "text-swiss-green"
            }`}
          >
            {status}
          </p>
        )}
      </div>
    </section>
  );
};

export default Contact;