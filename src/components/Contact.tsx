import React, { useState, FormEvent, useEffect } from 'react';
import { Mail, Phone, MapPin, Clock, Send, Linkedin, Instagram } from 'lucide-react';
import { submitMessage, getAbout } from '../services/firebaseService';
import type { About } from '../services/firebaseService';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  projectType: string;
  customProjectType: string;
  message: string;
}

export function Contact() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    projectType: '',
    customProjectType: '',
    message: ''
  });

  const [status, setStatus] = useState<{
    type: 'idle' | 'loading' | 'success' | 'error';
    message?: string;
  }>({ type: 'idle' });

  const [about, setAbout] = useState<About | null>(null);

  useEffect(() => {
    async function fetchAboutData() {
      const data = await getAbout();
      setAbout(data);
    }
    fetchAboutData();
  }, []);

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
      const result = await submitMessage({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        projectType: formData.projectType === 'Other' ? formData.customProjectType : formData.projectType,
        message: formData.message
      });
      
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
          customProjectType: '',
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold font-playfair mb-4">Let's Talk</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have a project in mind? I'd love to hear about it. Let's discuss how we can work together to bring your vision to life.
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
                    placeholder="Jane"
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
                    placeholder="Smith"
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
                  placeholder="jane@example.com"
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
                  required
                >
                  <option value="">Select a project type</option>
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Interior">Interior Design</option>
                  <option value="Landscape">Landscape</option>
                  <option value="Employment">Employment</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {formData.projectType === 'Other' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Specify Project Type
                  </label>
                  <input
                    type="text"
                    name="customProjectType"
                    value={formData.customProjectType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black/5 focus:outline-none"
                    placeholder="Please specify your project type"
                    required
                  />
                </div>
              )}

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
          <div className="bg-gray-50 p-8 rounded-xl">
            <h3 className="text-xl font-playfair font-bold mb-8">Contact Information</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-4">Location</h4>
                <div className="flex items-start space-x-3 text-gray-600">
                  <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                  <div>
                    <p>{about?.city}, {about?.country}</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-4">Email Address</h4>
                <a 
                  href={`mailto:${about?.email}`}
                  className="flex items-center space-x-3 text-gray-600 hover:text-black transition-colors"
                >
                  <Mail className="w-5 h-5 flex-shrink-0" />
                  <span>{about?.email}</span>
                </a>
              </div>

              <div>
                <h4 className="font-medium mb-4">Phone Number</h4>
                <a 
                  href={`tel:${about?.phone}`}
                  className="flex items-center space-x-3 text-gray-600 hover:text-black transition-colors"
                >
                  <Phone className="w-5 h-5 flex-shrink-0" />
                  <span>{about?.phone}</span>
                </a>
              </div>

              <div>
                <h4 className="font-medium mb-4">Follow Me</h4>
                <div className="flex items-center space-x-4">
                  <a
                    href={about?.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-black transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href={about?.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-black transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
