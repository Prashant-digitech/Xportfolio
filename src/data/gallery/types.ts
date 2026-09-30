export interface GalleryItem {
  id: string;
  title: string;
  category: string; // matches category id
  categoryLabel: string;
  image: string;
  year: string;
  tools: string[];
  role: string;
  description: string;
  dimensions?: string;
  credits?: string;
  tags: string[];
  specs?: string;
  highResAvailable?: boolean;
}

export interface GalleryCategory {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  coverImage: string;
  discipline: string;
  accent: string;
  tags: string[];
  items: GalleryItem[];
}
