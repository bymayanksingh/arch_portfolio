import React, { useState, FormEvent } from 'react';
import { Mail, Phone, MapPin, Clock, Send, Linkedin, Instagram } from 'lucide-react';
import { submitMessage } from '../services/firebaseService';

export function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    projectType: '',
    message: ''
  });

  const [status, setStatus] = useState<{
    type: 'idle' | 'loading' | 'success' | 'error';
    message?: string;
  }>({ type: 'idle' });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.firstName || !formData.email || !formData.message) {
      setStatus({
        type: 'error',
        message: 'Please fill in all required fields'
      });
      return;
    }

    setStatus({ type: 'loading' });

    try {
      const result = await submitMessage(formData);
      
      if (result.success) {
        setStatus({
          type: 'success',
          message: 'Thank you for your message! I will get back to you soon.'
        });
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          projectType: '',
          message: ''
        });
      } else {
        setStatus({
          type: 'error',
          message: result.error || 'Failed to send message. Please try again.'
        });
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'An unexpected error occurred. Please try again.'
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">Get in Touch</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Let's discuss your project and create something extraordinary together
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              {status.message && (
                <div className={`p-4 rounded-lg ${
                  status.type === 'success' ? 'bg-green-50 text-green-700' : 
                  status.type === 'error' ? 'bg-red-50 text-red-700' : ''
                }`}>
                  {status.message}
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black/5 focus:outline-none"
                    placeholder="John"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black/5 focus:outline-none"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black/5 focus:outline-none"
                  placeholder="john@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Type
                </label>
                <select
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black/5 focus:outline-none"
                >
                  <option value="">Select a project type</option>
                  <option value="employment">Employment Opportunity</option>
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="interior">Interior Design</option>
                  <option value="renovation">Renovation</option>
                  <option value="consultation">Consultation</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black/5 focus:outline-none"
                  placeholder="Tell me about your project..."
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status.type === 'loading'}
                className={`w-full bg-black text-white py-4 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center justify-center ${
                  status.type === 'loading' ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {status.type === 'loading' ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-12">
            {/* Contact Details */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="w-6 h-6 text-gray-600 mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Location</h3>
                    <p className="text-gray-600">
                      123 Architecture Street<br />
                      Manchester, UK M1 1AB
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="w-6 h-6 text-gray-600 mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Email Address</h3>
                    <a href="mailto:contact@architect.com" className="text-gray-600 hover:text-black">
                      contact@architect.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="w-6 h-6 text-gray-600 mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Phone Number</h3>
                    <a href="tel:+1234567890" className="text-gray-600 hover:text-black">
                      +1 (234) 567-890
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Follow Me</h2>
              <div className="flex space-x-4">
                <a href="#" className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href="#" className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                  <Instagram className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
