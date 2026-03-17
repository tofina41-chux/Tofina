import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
    
    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("Message Sent! I'll get back to you soon.");
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus("Something went wrong. Try again.");
      }
    } catch (err) {
      setStatus("Error connecting to server.");
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
              type="text" placeholder="Name" 
              className="w-full p-4 bg-swiss-dark border border-white/10 rounded-2xl text-white focus:border-swiss-green outline-none transition-all placeholder:text-swiss-grey/50"
              // ... state logic
            />
            <input 
              type="email" placeholder="Email" 
              className="w-full p-4 bg-swiss-dark border border-white/10 rounded-2xl text-white focus:border-swiss-green outline-none transition-all placeholder:text-swiss-grey/50"
              // ... state logic
            />
          </div>
          <textarea 
            placeholder="Your message..." rows="5"
            className="w-full p-4 bg-swiss-dark border border-white/10 rounded-2xl text-white focus:border-swiss-green outline-none transition-all placeholder:text-swiss-grey/50"
            // ... state logic
          ></textarea>
          
          <button type="submit" className="w-full py-4 bg-swiss-green text-swiss-dark font-black rounded-2xl hover:brightness-110 hover:shadow-[0_10px_40px_rgba(1,195,141,0.2)] transition-all uppercase tracking-widest text-sm">
            Send Message
          </button>
        </form>
        {status && <p className="mt-6 text-swiss-green text-center font-mono text-sm">{status}</p>}
      </div>
    </section>
  );
};

export default Contact;