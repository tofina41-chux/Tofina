import { useState } from 'react';

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
      <div className="max-w-3xl mx-auto bg-swiss-navy/30 border border-white/5 p-10 rounded-[2rem] backdrop-blur-md">
        <div className="flex justify-center mb-6">
          <img 
            src="/logo.png" 
            alt="Tofina" 
            className="h-24 w-auto mb-4 hover:scale-110 transition-transform duration-500 drop-shadow-[0_0_15px_rgba(1,195,141,0.4)]" 
          />
        </div>
        <h2 className="text-4xl font-bold text-white mb-2">Let's <span className="text-swiss-green">Connect</span></h2>
        <p className="text-swiss-grey mb-10">Available for freelance opportunities and technical collaborations.</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <input 
              type="text" 
              name="name"
              placeholder="Name" 
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-4 bg-swiss-dark border border-white/10 rounded-2xl text-white focus:border-swiss-green outline-none transition-all placeholder:text-swiss-grey/50"
            />
            <input 
              type="email" 
              name="email"
              placeholder="Email" 
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-4 bg-swiss-dark border border-white/10 rounded-2xl text-white focus:border-swiss-green outline-none transition-all placeholder:text-swiss-grey/50"
            />
          </div>
          <textarea 
            name="message"
            placeholder="Your message..." 
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full p-4 bg-swiss-dark border border-white/10 rounded-2xl text-white focus:border-swiss-green outline-none transition-all placeholder:text-swiss-grey/50"
          ></textarea>
          
          <button
            type="submit"
            disabled={sending}
            className="w-full py-4 bg-swiss-green text-swiss-dark font-black rounded-2xl hover:brightness-110 hover:shadow-[0_10px_40px_rgba(1,195,141,0.2)] transition-all uppercase tracking-widest text-sm disabled:opacity-60 disabled:cursor-not-allowed"
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