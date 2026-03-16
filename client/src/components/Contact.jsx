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
    <section className="py-20 bg-slate-900 text-white px-6">
      <div className="max-w-3xl mx-auto border border-slate-800 p-8 rounded-2xl bg-slate-800/50">
        <h2 className="text-3xl font-bold mb-6">Let's Talk Business </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="text" placeholder="Your Name" required
            className="w-full p-3 rounded bg-slate-900 border border-slate-700 focus:border-sky-500 outline-none"
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            value={formData.name}
          />
          <input 
            type="email" placeholder="Your Email" required
            className="w-full p-3 rounded bg-slate-900 border border-slate-700 focus:border-sky-500 outline-none"
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            value={formData.email}
          />
          <textarea 
            placeholder="How can I help you?" rows="5" required
            className="w-full p-3 rounded bg-slate-900 border border-slate-700 focus:border-sky-500 outline-none"
            onChange={(e) => setFormData({...formData, message: e.target.value})}
            value={formData.message}
          ></textarea>
          <button type="submit" className="w-full bg-sky-500 py-3 rounded-lg font-bold hover:bg-sky-600 transition">
            Send Message
          </button>
        </form>
        {status && <p className="mt-4 text-sky-400 text-center">{status}</p>}
      </div>
    </section>
  );
};

export default Contact;