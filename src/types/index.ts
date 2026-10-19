export interface HeroPhoto {
  id: string;
  index: number;
  title: string;
  subtitle: string;
  talent: string;
  discipline: string;
  client: string;
  year: string;
  location: string;
  description: string;
  cameraInfo: string;
  imageUrl: string;
  colorScheme: {
    bg: string;
    accent: string;
    text: string;
  };
}

export interface LandscapeWork {
  id: string;
  title: string;
  category: 'Weddings' | 'Pre-Wedding' | 'Maternity & Baby' | 'Fashion & Editorial' | 'Corporate & Events' | 'Destination';
  location: string;
  venue: string;
  year: string;
  description: string;
  cameraInfo: string;
  imageUrl: string;
  featuredOnHome?: boolean;
}

export interface Talent {
  id: string;
  name: string;
  discipline: 'Creative Direction' | 'Photography' | 'Fashion & Styling' | 'Motion & CGI' | 'Spatial & Set Design';
  location: string;
  bio: string;
  clients: string[];
  awards: string[];
  status: 'Available' | 'On Assignment' | 'Booked Q2';
  featuredWork: string;
  recentCampaign: string;
  rates: string;
  avatarUrl: string;
}

export interface AgencyService {
  number: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  leadTime: string;
  caseStudy: {
    client: string;
    outcome: string;
  };
}

export interface StudioLocation {
  city: string;
  region: string;
  address: string;
  timeZone: string;
  coordinates: string;
  contact: string;
  status: string;
}
