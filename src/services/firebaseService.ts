import { collection, getDocs, doc, getDoc, query, where, addDoc, updateDoc, increment, limit } from 'firebase/firestore';
import { db } from '../config/firebase';

export interface Project {
  id?: string;
  title: string;
  category: string;
  location: string;
  date: string;
  year: number;
  coverImage: string;
  description: string;
  client: string;
  featured: boolean;
  source: string;
  area: string;
  status: string;
  details: string[];
  gallery: {
    url: string;
    caption: string;
  }[];
  claps: number;
  categories: string[];
}

export interface Hero {
  id?: string;
  name: string;
  title: string;
  subtitle: string;
  backgroundImage: string;
  stats: {
    projects: number;
    awards: number;
    experience: number;
  };
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  image: string;
  source: string;
}

export interface TimelineItem {
  id: string;
  year: number;
  event: string;
  description: string;
  icon: string;
  color: string;
  details: string;
}

export interface About {
  id: string;
  name: string;
  title: string;
  description: string;
  shortDescription: string;
  image: string;
  email: string;
  city: string;
  country: string;
  phone: string;
  linkedin: string;
  instagram: string;
  resume: string;
  services: string[];
}

export interface Contact {
  id?: string;
  title: string;
  description: string;
  email: string;
  phone: string;
  address: string;
  availability: string;
}

export interface Message {
  id?: string;
  firstName: string;
  lastName?: string;
  email: string;
  projectType?: string;
  message: string;
  createdAt: string;
}

export interface Stats {
  id: string;
  items: Array<{
    icon: string;
    label: string;
    value: string;
  }>;
}

export interface Certificate {
  id?: string;
  title: string;
  organization: string;
  year: string;
  description: string;
  image: string;
  verified: boolean;
}

export interface Affiliation {
  acronym: string;
  icon: string;
  name: string;
  place: string;
  timeline: string;
  role: string;
  order: number;
}

export interface Publication {
  id?: string;
  title: string;
  authors: string[];
  journal: string;
  year: number;
  link: string;
  abstract: string;
  coverImage: string;
  category: 'journal' | 'conference' | 'book' | 'article';
  doi?: string;
  order: number;
}

export interface Award {
  id?: string;
  title: string;
  organization: string;
  year: string;
  description: string;
  image?: string;
  category: 'competition' | 'academic' | 'professional';
  order: number;
}

export interface Upskilling {
  id?: string;
  title: string;
  description: string;
  image: string;
}

// Hero
export const getHero = async (): Promise<Hero | null> => {
  try {
    const snapshot = await getDocs(collection(db, 'hero'));
    const heroDoc = snapshot.docs[0];
    return heroDoc ? { id: heroDoc.id, ...heroDoc.data() } as Hero : null;
  } catch (error) {
    //console.error('Error fetching hero:', error);
    return null;
  }
};

// Projects
export const getProjects = async (): Promise<Project[]> => {
  try {
    const snapshot = await getDocs(collection(db, 'projects'));
    return snapshot.docs.map(doc => ({ ...doc.data() }) as Project);
  } catch (error) {
    //console.error('Error fetching projects:', error);
    return [];
  }
};

export const getProject = async (id: string): Promise<Project | null> => {
  try {
    const projectsRef = collection(db, 'projects');
    const q = query(projectsRef, where('id', '==', id));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return doc.data() as Project;
    }
    return null;
  } catch (error) {
    console.error('Error fetching project:', error);
    return null;
  }
};

export const getProjectsByCategory = async (category: string): Promise<Project[]> => {
  try {
    const q = query(collection(db, 'projects'), where('category', '==', category));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ ...doc.data() }) as Project);
  } catch (error) {
    //console.error('Error fetching projects by category:', error);
    return [];
  }
};

export async function updateProjectClaps(projectId: string, claps: number) {
  try {
    const projectsRef = collection(db, 'projects');
    const q = query(projectsRef, where('id', '==', projectId));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const docRef = querySnapshot.docs[0].ref;
      const currentClaps = querySnapshot.docs[0].data().claps || 0;
      await updateDoc(docRef, {
        claps: currentClaps + claps
      });
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error updating project claps:', error);
    return false;
  }
}

// Get related projects based on category
export const getRelatedProjects = async (currentProjectId: string, category: string): Promise<Project[]> => {
  try {
    if (!category) return [];
    
    const projectsRef = collection(db, 'projects');
    const q = query(
      projectsRef,
      where('category', '==', category),
      limit(4) // Get one extra in case current project is included
    );
    
    const querySnapshot = await getDocs(q);
    const projects: Project[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data() as Project;
      // Skip the current project using the project.id field
      if (data.id !== currentProjectId) {
        projects.push({
          ...data,
          coverImage: data.coverImage || '',
          title: data.title || '',
          description: data.description || '',
          category: data.category || '',
          shortDescription: data.description?.substring(0, 150) + '...' || ''
        });
      }
    });
    
    return projects.slice(0, 3);
  } catch (error) {
    console.error('Error fetching related projects:', error);
    return [];
  }
};

// Skills
export const getSkills = async (): Promise<string[]> => {
  try {
    const snapshot = await getDocs(collection(db, 'skills'));
    const skillsDoc = snapshot.docs[0];
    return skillsDoc ? (skillsDoc.data().list as string[]) : [];
  } catch (error) {
    //console.error('Error fetching skills:', error);
    return [];
  }
};

// Testimonials
export const getTestimonials = async (): Promise<Testimonial[]> => {
  try {
    const snapshot = await getDocs(collection(db, 'testimonials'));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Testimonial);
  } catch (error) {
    //console.error('Error fetching testimonials:', error);
    return [];
  }
};

// Timeline
export const getTimeline = async (): Promise<TimelineItem[]> => {
  try {
    const snapshot = await getDocs(collection(db, 'timeline'));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as TimelineItem);
  } catch (error) {
    //console.error('Error fetching timeline:', error);
    return [];
  }
};

// About
export const getAbout = async (): Promise<About | null> => {
  try {
    const aboutCollection = collection(db, 'about');
    const aboutSnapshot = await getDocs(aboutCollection);
    
    if (!aboutSnapshot.empty) {
      const aboutDoc = aboutSnapshot.docs[0];
      return { id: aboutDoc.id, ...aboutDoc.data() } as About;
    }
    
    return null;
  } catch (error) {
    //console.error('Error fetching about data:', error);
    return null;
  }
};

// Contact
export const getContact = async (): Promise<Contact | null> => {
  try {
    const snapshot = await getDocs(collection(db, 'contact'));
    const contactDoc = snapshot.docs[0];
    return contactDoc ? { id: contactDoc.id, ...contactDoc.data() } as Contact : null;
  } catch (error) {
    //console.error('Error fetching contact:', error);
    return null;
  }
};

// Stats
export const getStats = async (): Promise<Stats | null> => {
  try {
    const docRef = doc(db, 'stats', 'stats');
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data() as Stats;
    }
    return null;
  } catch (error) {
    //console.error('Error fetching stats:', error);
    return null;
  }
};

// Certificates
export const getCertificates = async (): Promise<Certificate[]> => {
  try {
    const snapshot = await getDocs(collection(db, 'certificates'));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Certificate);
  } catch (error) {
    //console.error('Error fetching certificates:', error);
    return [];
  }
};

// Affiliations
export const getAffiliations = async (): Promise<Affiliation[]> => {
  try {
    const affiliationsRef = collection(db, 'affiliations');
    const snapshot = await getDocs(affiliationsRef);
    return snapshot.docs.map(doc => doc.data() as Affiliation);
  } catch (error) {
    //console.error('Error fetching affiliations:', error);
    return [];
  }
};

// Publications
export const getPublications = async (): Promise<Publication[]> => {
  try {
    const publicationsRef = collection(db, 'publications');
    const querySnapshot = await getDocs(publicationsRef);
    const publications = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Publication[];
    
    // Sort by order field
    return publications.sort((a, b) => (a.order || 0) - (b.order || 0));
  } catch (error) {
    //console.error('Error fetching publications:', error);
    return [];
  }
};

// Awards
export const getAwards = async (): Promise<Award[]> => {
  try {
    const awardsRef = collection(db, 'awards');
    const querySnapshot = await getDocs(awardsRef);
    const awards = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Award[];
    
    // Sort by order field
    return awards.sort((a, b) => (a.order || 0) - (b.order || 0));
  } catch (error) {
    //console.error('Error fetching awards:', error);
    return [];
  }
};

// Upskilling
export async function getUpskilling(): Promise<Upskilling | null> {
  try {
    const docRef = doc(db, 'upskilling', 'bim-certification');
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Upskilling;
    }
    return null;
  } catch (error) {
    //console.error('Error fetching upskilling data:', error);
    return null;
  }
};

// Messages
export const submitMessage = async (messageData: Omit<Message, 'id'>): Promise<{ success: boolean; error?: string }> => {
  try {
    // Validate data before submission
    if (!messageData.firstName.match(/^[a-zA-Z\s-]{2,50}$/)) {
      throw new Error('Invalid first name format');
    }
    if (messageData.lastName && !messageData.lastName.match(/^[a-zA-Z\s-]{2,50}$/)) {
      throw new Error('Invalid last name format');
    }
    if (!messageData.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
      throw new Error('Invalid email format');
    }
    if (messageData.message.length < 10 || messageData.message.length > 1000) {
      throw new Error('Message must be between 10 and 1000 characters');
    }
    if (messageData.projectType && messageData.projectType.length > 100) {
      throw new Error('Project type is too long');
    }

    const messagesCollection = collection(db, 'contact');
    
    await addDoc(messagesCollection, messageData);
    return { success: true };
  } catch (error) {
    console.error('Error submitting message:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'An error occurred while submitting your message' 
    };
  }
};
