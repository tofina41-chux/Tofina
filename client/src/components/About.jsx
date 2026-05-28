import React, { useState, useEffect } from 'react';
import { API_BASE } from '../api';

const About = () => {
  // Pulling from the server so the displayed avatar updates after admin upload
  const [profileImg, setProfileImg] = useState(`${API_BASE}/uploads/avatar.jpg`);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const loadProfileImage = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/profile-image`);
        const data = await response.json();
        if (response.ok && data.success && data.imageUrl) {
          setProfileImg(data.imageUrl);
        }
      } catch (err) {
        console.error('Failed to load current profile image:', err);
      }
    };

    loadProfileImage();
  }, []);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('profileImage', file);

    setUploading(true);

    try {
      const response = await fetch(`${API_BASE}/api/upload-profile`, {
        method: 'POST',
        body: formData, // Sending multi-part form streaming data
      });

      const data = await response.json();
      if (data.success) {
        setProfileImg(data.imageUrl); // Instantly update view with the fresh profile URL
      } else {
        alert("Upload failed.");
      }
    } catch (err) {
      console.error("Error uploading image:", err);
      alert("Error connecting to server.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <section id="about" className="py-24 bg-swiss-navy px-6 relative overflow-hidden">
      <div className="absolute left-0 top-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>

      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          {/* Visual Side with Built-in Admin Upload Control */}
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden group shadow-2xl bg-swiss-dark flex items-center justify-center">
            
            <img 
              src={profileImg} 
              alt="Cynthia Wafula" 
              onError={() => setProfileImg("https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80")}
              className="w-full h-full object-cover grayscale contrast-115 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
            />
            
    

            <div className="absolute bottom-6 left-6 z-20 pointer-events-none">
              <p className="text-xs font-mono tracking-widest text-swiss-green uppercase mb-1">Identity</p>
              <h3 className="text-xl font-bold text-white tracking-tight">Wafula</h3>
            </div>
          </div>

          {/* Text Side */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <span className="w-8 h-[1px] bg-swiss-green"></span>
              <span className="text-swiss-green font-mono text-xs tracking-widest uppercase">01 / Background</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tight leading-none">
              Engineering <span className="text-swiss-green">Systems</span> With Aesthetic Precision.
            </h2>
            
            <p className="text-white/80 text-lg mb-6 leading-relaxed">
              I am an IT professional and Creative Designer based in Kenya. I bridge the gap between heavy infrastructure architecture and clean frontend user interaction, turning complex code pipelines into lightweight digital assets.
            </p>

            <p className="text-swiss-grey text-base mb-8 leading-relaxed">
              Specializing in the <span className="text-white font-medium">MERN Stack, Django, and AWS Cloud deployments</span>, I scale solutions tailored for efficiency. With deep domain knowledge in digital asset optimization and technical communication, I shape automation workflows that help digital products gain visibility and run smoothly.
            </p>

            <div className="grid grid-cols-3 gap-4 border-t border-white/5 pt-8">
              <div>
                <p className="text-3xl font-black text-white tracking-tight mb-1">MERN</p>
                <p className="text-xs font-mono text-swiss-grey tracking-wider uppercase">Architecture</p>
              </div>
              <div>
                <p className="text-3xl font-black text-swiss-green tracking-tight mb-1">AWS</p>
                <p className="text-xs font-mono text-swiss-grey tracking-wider uppercase">Cloud Sync</p>
              </div>
              <div>
                <p className="text-3xl font-black text-white tracking-tight mb-1">UI/UX</p>
                <p className="text-xs font-mono text-swiss-grey tracking-wider uppercase">Optimization</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;