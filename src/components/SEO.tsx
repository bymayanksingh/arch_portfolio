import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  type?: string;
}

export function SEO({ 
  title = 'Professional Architect | Innovative Design Solutions',
  description = 'Explore a portfolio of innovative architectural designs, sustainable solutions, and transformative spaces.',
  image = '/og-image.png',
  type = 'website'
}: SEOProps) {
  const location = useLocation();
  const domain = 'https://singhpragya.netlify.app/';
  const url = `${domain}${location.pathname}`;

  useEffect(() => {
    // Update meta tags
    document.title = title;
    
    // Primary Meta Tags
    updateMetaTag('description', description);
    
    // Open Graph
    updateMetaTag('og:title', title, 'property');
    updateMetaTag('og:description', description, 'property');
    updateMetaTag('og:image', image, 'property');
    updateMetaTag('og:url', url, 'property');
    updateMetaTag('og:type', type, 'property');
    
    // Twitter
    updateMetaTag('twitter:title', title, 'property');
    updateMetaTag('twitter:description', description, 'property');
    updateMetaTag('twitter:image', image, 'property');
    updateMetaTag('twitter:url', url, 'property');
    
    // Canonical
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', url);
    }
  }, [title, description, image, type, url]);

  return null;
}

function updateMetaTag(name: string, content: string, attributeName: 'name' | 'property' = 'name') {
  let element = document.querySelector(`meta[${attributeName}="${name}"]`);
  
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attributeName, name);
    document.head.appendChild(element);
  }
  
  element.setAttribute('content', content);
}
