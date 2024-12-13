import { useState, useRef, useEffect, lazy, Suspense } from 'react';
import { Download, Mail, Loader2, CheckCircle2, Phone, Linkedin, Award as AwardIcon, Building2Icon, BuildingIcon, Users } from 'lucide-react';
import { ImageFallback } from '../components/ImageFallback';
import { getAbout, getSkills, getCertificates, getStats, About as AboutType, Certificate, Stats } from '../services/firebaseService';
import { getAffiliations, type Affiliation } from '../services/firebaseService';
import { getPublications, type Publication } from '../services/firebaseService';
import { getAwards, type Award as AwardData } from '../services/firebaseService';

// Lazy load heavy components
const ImageModal = lazy(() => import('../components/ImageModal').then(module => ({ default: module.ImageModal })));
const Publications = lazy(() => import('../components/Publications').then(module => ({ default: module.Publications })));
const Awards = lazy(() => import('../components/Awards').then(module => ({ default: module.Awards })));

// Lazy load icons to reduce initial bundle size
const IconComponents = lazy(() => import('lucide-react').then(module => ({
  default: {
    Building2Icon: module.Building2,
    BuildingIcon: module.Building,
    AwardIcon: module.Award,
    Users: module.Users,
    CheckCircle2: module.CheckCircle2,
    Phone: module.Phone,
    Linkedin: module.Linkedin
  }
})));

interface Certificate {
  title: string;
  organization: string;
  year: string;
  description: string;
  image: string;
  verified: boolean;
}

export function About() {
  const [aboutData, setAboutData] = useState<AboutType | null>(null);
  const [skills, setSkills] = useState<string[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [currentCertificateIndex, setCurrentCertificateIndex] = useState(0);
  const certificatesRef = useRef<HTMLDivElement>(null);
  const [affiliations, setAffiliations] = useState<Affiliation[]>([]);
  const [publications, setPublications] = useState<Publication[]>([]);
  const [awards, setAwards] = useState<AwardData[]>([]);

  // Memoize data fetching to prevent unnecessary re-renders
  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        const [
          aboutResult,
          skillsResult,
          certificatesResult,
          statsResult,
          affiliationsResult,
          publicationsResult,
          awardsResult
        ] = await Promise.all([
          getAbout(),
          getSkills(),
          getCertificates(),
          getStats(),
          getAffiliations(),
          getPublications(),
          getAwards()
        ]);
        
        if (!mounted) return;

        if (aboutResult) setAboutData(aboutResult);
        setSkills(skillsResult);
        setCertificates(certificatesResult);
        if (statsResult) setStats(statsResult);
        setAffiliations(affiliationsResult.sort((a, b) => b.order - a.order));
        setPublications(publicationsResult);
        setAwards(awardsResult);
        setError(null);
      } catch (err) {
        if (!mounted) return;
        setError('Failed to load data. Please try again later.');
        console.error('Error fetching data:', err);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, []);

  const scrollCertificates = (direction: 'left' | 'right') => {
    if (certificatesRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      certificatesRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handlePrevCertificate = () => {
    if (certificates.length === 0) return;
    const newIndex = currentCertificateIndex === 0 ? certificates.length - 1 : currentCertificateIndex - 1;
    setCurrentCertificateIndex(newIndex);
    const newCert = certificates[newIndex];
    if (newCert) {
      setSelectedCertificate(newCert);
    }
  };

  const handleNextCertificate = () => {
    if (certificates.length === 0) return;
    const newIndex = currentCertificateIndex === certificates.length - 1 ? 0 : currentCertificateIndex + 1;
    setCurrentCertificateIndex(newIndex);
    const newCert = certificates[newIndex];
    if (newCert) {
      setSelectedCertificate(newCert);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (error || !aboutData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h1 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">About Me</h1>
            <p className="text-xl text-gray-600 mb-8">
              Transforming spaces with innovative architectural solutions
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              {aboutData.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href={aboutData.resume} 
                className="inline-flex items-center px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download className="w-5 h-5 mr-2" />
                Download CV
              </a>
              <a 
                href="/contact" 
                className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Mail className="w-5 h-5 mr-2" />
                Contact Me
              </a>
            </div>
          </div>
          <div>
            <ImageFallback 
              src={aboutData.image} 
              alt="Profile" 
              className="rounded-2xl shadow-2xl w-full aspect-[4/3] object-cover"
            />
          </div>
        </div>

        {/* Stats Section */}
        <Suspense fallback={<div className="h-40 flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin" /></div>}>
          <div className="mb-20 text-center">
            <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">By the Numbers</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-12">
              A snapshot of my architectural journey and achievements
            </p>
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
              {stats?.items.map((stat, index) => (
                <Suspense key={index} fallback={<div className="h-40 animate-pulse bg-gray-100 rounded-xl" />}>
                  <StatCard stat={stat} />
                </Suspense>
              ))}
            </div>
          </div>
        </Suspense>

        {/* Certificates Section */}
        <div className="mb-20">
          <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-center">Professional Certifications</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-center mb-8">
            Recognized achievements and professional development milestones
          </p>
          <div className="relative">
            <div 
              ref={certificatesRef}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4"
            >
              {certificates.map((cert, index) => (
                <div 
                  key={cert.id || index}
                  onClick={() => {
                    setSelectedCertificate(cert);
                    setCurrentCertificateIndex(index);
                  }}
                  className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer aspect-[4/5]"
                >
                  <div className="absolute inset-0">
                    <ImageFallback 
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                    {/* Mini Grid Pattern */}
                    <div 
                      className="absolute inset-0 opacity-5"
                      style={{
                        backgroundImage: `linear-gradient(to right, rgb(0, 0, 0) 1px, transparent 1px),
                          linear-gradient(to bottom, rgb(0, 0, 0) 1px, transparent 1px)`,
                        backgroundSize: '20px 20px'
                      }}
                    />
                  </div>
                  <div className="relative h-full p-6 flex flex-col justify-end">
                    <div className="flex items-start mb-4">
                      {cert.verified && <CheckCircle2 className="w-6 h-6 text-green-400 mr-2 flex-shrink-0 mt-1" />}
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">{cert.title}</h3>
                        <p className="text-white/80 text-sm">{cert.organization}</p>
                      </div>
                    </div>
                    <p className="text-white/70 text-sm mb-3 line-clamp-2">{cert.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-white/60 text-sm">{cert.year}</span>
                      {cert.verified && (
                        <span className="px-3 py-1 bg-white/10 rounded-full text-white/90 text-sm backdrop-blur-sm">
                          Verified
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Publications Section */}
        <Suspense fallback={<div className="h-40 flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin" /></div>}>
          <Publications publications={publications} />
        </Suspense>

        {/* Awards Section */}
        <Suspense fallback={<div className="h-40 flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin" /></div>}>
          <Awards awards={awards} />
        </Suspense>

        {/* Skills Section */}
        <div className="mb-40">
          <div className="text-center mb-24">
            <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Skills & Expertise</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              My diverse skill set allows me to handle projects from concept to completion, 
              ensuring excellence at every stage of the architectural process.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-12 gap-20">
            {/* Skills Grid */}
            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-16 gap-x-20">
                {skills.map((skill, index) => (
                  <div 
                    key={index}
                    className="group relative"
                  >
                    {/* Top Line */}
                    <div className="absolute -top-3 left-0 w-6 h-[1px] bg-black/10 group-hover:w-full group-hover:bg-black/30 transition-all duration-700" />
                    
                    {/* Skill Content */}
                    <div className="pt-6">
                      {/* Skill Name and Percentage */}
                      <div className="flex items-baseline justify-between mb-6">
                        <h3 className="text-sm tracking-[0.2em] text-[#333] group-hover:text-black transition-colors duration-500">
                          {skill.toUpperCase()}
                        </h3>
                      </div>

                      {/* Progress Bar */}
                      <div className="relative h-px">
                        <div className="absolute inset-0 w-full bg-black/5" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Affiliations */}
            <div className="lg:col-span-4">
              <div className="relative bg-black text-white p-8 rounded-xl shadow-xl overflow-hidden group h-full">
                {/* Decorative Background Elements */}
                <div className="absolute inset-0 opacity-[0.1] group-hover:opacity-[0.15] transition-opacity duration-500">
                  <div className="absolute -right-6 -top-6 w-32 h-32 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2" />
                  <div className="absolute right-12 bottom-12 w-40 h-40 bg-white rounded-full transform translate-x-1/2 translate-y-1/2" />
                  <div className="absolute left-1/2 top-1/2 w-24 h-24 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2" />
                </div>

                {/* Grid Pattern */}
                <div 
                  className="absolute inset-0 opacity-[0.05] group-hover:opacity-[0.08] transition-opacity duration-500"
                  style={{
                    backgroundImage: `linear-gradient(to right, white 1px, transparent 1px),
                                    linear-gradient(to bottom, white 1px, transparent 1px)`,
                    backgroundSize: '20px 20px'
                  }}
                />

                <div className="relative h-full flex flex-col">
                  <h3 className="font-playfair text-2xl sm:text-3xl font-bold mb-8">Professional Affiliations</h3>
                  <div className="grid grid-cols-1 gap-y-6 flex-grow">
                    {affiliations.map((affiliation, index) => (
                      <div 
                        key={index} 
                        className="group flex items-start space-x-4 p-3 rounded-lg hover:bg-white/5 transition-colors duration-300"
                      >
                        <div className="p-2 rounded-lg bg-white/10 group-hover:bg-white/15 transition-colors duration-300">
                          <affiliation.icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-white/90 group-hover:text-white transition-colors duration-300 font-medium text-sm leading-tight">
                            {affiliation.name}
                          </span>
                          <span className="text-white/80 group-hover:text-white/90 transition-colors duration-300 text-sm mt-0.5">
                            {affiliation.role}
                          </span>
                          {affiliation.acronym && (
                            <span className="text-white/50 group-hover:text-white/70 transition-colors duration-300 text-xs mt-1">
                              {affiliation.acronym}
                            </span>
                          )}
                          <span className="text-white/50 group-hover:text-white/70 transition-colors duration-300 text-xs mt-1">
                            {affiliation.place}
                          </span>
                          <span className="text-white/50 group-hover:text-white/70 transition-colors duration-300 text-xs">
                            {affiliation.timeline}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Let's Work Together</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Have a project in mind? Let's create something extraordinary together.
            </p>
          </div>
          <div className="flex justify-center space-x-6">
            <a href={`mailto:${aboutData.email}`} className="flex items-center text-gray-600 hover:text-black">
              <Mail className="w-5 h-5 mr-2" />
              Email
            </a>
            <a href={`tel:${aboutData.phone}`} className="flex items-center text-gray-600 hover:text-black">
              <Phone className="w-5 h-5 mr-2" />
              Call
            </a>
            <a href={aboutData.linkedin} className="flex items-center text-gray-600 hover:text-black" target="_blank" rel="noopener noreferrer">
              <Linkedin className="w-5 h-5 mr-2" />
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      {/* Certificate Modal */}
      {selectedCertificate && (
        <Suspense fallback={<div className="fixed inset-0 bg-black/50 flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-white" /></div>}>
          <ImageModal
            isOpen={!!selectedCertificate}
            onClose={() => setSelectedCertificate(null)}
            image={selectedCertificate.image}
            onPrev={handlePrevCertificate}
            onNext={handleNextCertificate}
            title={selectedCertificate.title}
            showNavigation={certificates.length > 1}
          />
        </Suspense>
      )}
    </div>
  );
}

function StatCard({ stat }: { stat: any }) {
  const Icon = stat.icon === 'Building2' ? Building2Icon : 
              stat.icon === 'Building' ? BuildingIcon : 
              stat.icon === 'Award' ? AwardIcon : 
              stat.icon === 'Users' ? Users : Building2Icon;

  return (
    <div className="group">
      <div className="relative bg-white p-8 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 opacity-[0.02] group-hover:opacity-[0.04] transition-opacity duration-500">
          <div className="absolute -right-6 -top-6 w-32 h-32 bg-black rounded-full transform -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute right-12 bottom-12 w-40 h-40 bg-black rounded-full transform translate-x-1/2 translate-y-1/2" />
          <div className="absolute left-1/2 top-1/2 w-24 h-24 bg-black rounded-full transform -translate-x-1/2 -translate-y-1/2" />
        </div>

        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.015] group-hover:opacity-[0.03] transition-opacity duration-500"
          style={{
            backgroundImage: `linear-gradient(to right, black 1px, transparent 1px),
                              linear-gradient(to bottom, black 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}
        />

        <div className="relative flex flex-col items-center text-center">
          <div className="mb-4 p-3 rounded-full bg-black/5 group-hover:bg-black/10 transition-colors duration-300">
            <Icon className="w-6 h-6 text-black/70" />
          </div>
          <div className="relative mb-2">
            <div className="text-5xl font-playfair text-black/80 group-hover:text-black transition-colors duration-500">
              {stat.value}
            </div>
            <div className="absolute bottom-0 left-1/2 w-12 h-[1px] bg-black/10 group-hover:w-24 group-hover:bg-black/20 transform -translate-x-1/2 transition-all duration-700" />
          </div>
          <div className="text-base font-medium text-black/60 group-hover:text-black/70 transition-colors duration-500">
            {stat.label}
          </div>
        </div>
      </div>
    </div>
  );
}

<style jsx>{`
  @keyframes shine {
    from { 
      mask-position: 150%;
      -webkit-mask-position: 150%;
    }
    to { 
      mask-position: -50%;
      -webkit-mask-position: -50%;
    }
  }
`}</style>