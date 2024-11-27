import React, { useEffect, useState, FormEvent } from 'react';
import { Mail, Phone, MapPin, Clock, Send, Linkedin, Instagram } from 'lucide-react';
import { getAbout, submitMessage } from '../services/firebaseService';
import type { About } from '../services/firebaseService';

export function Contact() {
  const [about, setAbout] = useState<About | null>(null);
  const [formData, setFormData] = useState({
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

  useEffect(() => {
    async function fetchAboutData() {
      const data = await getAbout();
      setAbout(data);
    }
    fetchAboutData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
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
          message: result.error || 'Something went wrong. Please try again.'
        });
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Failed to send message. Please try again.'
      });
    }
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  Project Type *
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
                    Specify Project Type *
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
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black/5 focus:outline-none resize-none"
                  placeholder="Tell me about your project..."
                  required
                ></textarea>
              </div>

              {status.message && (
                <div className={`p-4 rounded-lg ${
                  status.type === 'success' ? 'bg-green-50 text-green-800' : 
                  status.type === 'error' ? 'bg-red-50 text-red-800' : ''
                }`}>
                  {status.message}
                </div>
              )}

              <button
                type="submit"
                disabled={status.type === 'loading'}
                className={`w-full flex items-center justify-center px-8 py-4 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors ${
                  status.type === 'loading' ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {status.type === 'loading' ? (
                  <span>Sending...</span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-5 h-5 ml-2" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Details */}
            <div>
              <h3 className="text-xl font-playfair font-bold mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 mt-1 flex-shrink-0 text-gray-600" />
                  <div className="text-gray-600">
                    <p>{about?.address}</p>
                    <p>{about?.city}, {about?.country}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 flex-shrink-0 text-gray-600" />
                  <a 
                    href={`mailto:${about?.email}`}
                    className="text-gray-600 hover:text-black transition-colors"
                  >
                    {about?.email}
                  </a>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 flex-shrink-0 text-gray-600" />
                  <a 
                    href={`tel:${about?.phone}`}
                    className="text-gray-600 hover:text-black transition-colors"
                  >
                    {about?.phone}
                  </a>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-xl font-playfair font-bold mb-6">Follow Me</h3>
              <div className="flex space-x-4">
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
  );
}