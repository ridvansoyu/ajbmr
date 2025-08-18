export interface Article {
  id: number;
  title: { en: string; tr: string };
  abstract: { en: string; tr: string };
  authors: string[];
  publishedDate: { en: string; tr: string };
  doi: string;
  volume: number;
  issue: number;
  category: string;
  keywords: string[];
  readTime: number;
  coverImage: string;
  pdfUrl?: string;
}

export interface Issue {
  id: number;
  volume: number;
  issue: number;
  publishedDate: { en: string; tr: string };
  title: { en: string; tr: string };
  description: { en: string; tr: string };
  coverImage: string;
  articles: number[];
}


