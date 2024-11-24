import React from 'react';
import { Mail, Phone, Building2 } from 'lucide-react';

export function Contact() {
  return (
    <section id="contact" className="py-20 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">Let's Create Something Amazing</h2>
            <p className="text-lg mb-8">
              Whether you have a specific project in mind or want to explore possibilities,
              I'm here to help bring your architectural vision to life.
            </p>
            <div className="space-y-4">
              <a href="mailto:contact@architect.com" className="flex items-center space-x-3 text-white/80 hover:text-white">
                <Mail />
                <span>contact@architect.com</span>
              </a>
              <a href="tel:+1234567890" className="flex items-center space-x-3 text-white/80 hover:text-white">
                <Phone />
                <span>+1 (234) 567-890</span>
              </a>
              <div className="flex items-center space-x-3 text-white/80">
                <Building2 />
                <span>New York, NY</span>
              </div>
            </div>
          </div>
          <div>
            <form className="space-y-4">
              <input 
                type="text" 
                placeholder="Your Name"
                className="w-full p-3 bg-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/20"
              />
              <input 
                type="email" 
                placeholder="Email Address"
                className="w-full p-3 bg-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/20"
              />
              <textarea 
                placeholder="Your Message"
                rows={4}
                className="w-full p-3 bg-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/20"
              ></textarea>
              <button className="w-full bg-white text-black py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}