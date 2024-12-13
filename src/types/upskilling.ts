import { Timestamp } from 'firebase/firestore';

export interface UpskillFeature {
  id: string;
  icon: string;
  title: string;
  description: string;
  order: number;
}

export interface Upskilling {
  id: string;
  title: string;
  description: string;
  status: {
    icon: string;
    text: string;
    isActive: boolean;
  };
  image: {
    url: string;
    alt: string;
  };
  cta: {
    text: string;
    url: string;
  };
  features: UpskillFeature[];
  updatedAt: Timestamp;
}
