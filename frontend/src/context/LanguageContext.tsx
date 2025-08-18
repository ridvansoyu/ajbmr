"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'tr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<string, { en: string; tr: string }> = {
  // Navigation
  'nav.home': { en: 'Home', tr: 'Ana Sayfa' },
  'nav.about': { en: 'About', tr: 'Hakkında' },
  'nav.editorial-board': { en: 'Editorial Board', tr: 'Yayın Kurulu' },
  'nav.issues': { en: 'Issues', tr: 'Sayılar' },
  'nav.submit': { en: 'Submit', tr: 'Makale Gönder' },
  'nav.guidelines': { en: 'Guidelines', tr: 'Yazım Kuralları' },
  'nav.contact': { en: 'Contact', tr: 'İletişim' },
  'home.title': {
    en: 'Academic Journal of Advanced Studies',
    tr: 'İleri Araştırmalar Akademik Dergisi',
  },
  'home.subtitle': {
    en: 'A peer-reviewed journal dedicated to advancing research across multiple disciplines',
    tr: 'Çoklu disiplinlerde araştırmaları ilerletmeye adanmış hakemli bir dergi',
  },
  'home.current-issue': { en: 'Current Issue', tr: 'Güncel Sayı' },
  'home.read-more': { en: 'Read More', tr: 'Devamını Oku' },
  'home.submit-manuscript': { en: 'Submit Manuscript', tr: 'Makale Gönder' },
  'home.latest-articles': { en: 'Latest Articles', tr: 'Son Makaleler' },
  'home.announcements': { en: 'Announcements', tr: 'Duyurular' },
  'home.journal-metrics': { en: 'Journal Metrics', tr: 'Dergi Metrikleri' },
  'home.acceptance-rate': { en: 'Acceptance Rate', tr: 'Kabul Oranı' },
  'home.time-to-first-decision': { en: 'Time to First Decision', tr: 'İlk Karar Süresi' },
  'home.time-to-publication': { en: 'Time to Publication', tr: 'Yayın Süresi' },
  'home.published-issues': { en: 'Published Issues', tr: 'Yayınlanan Sayılar' },
  'issues.view-all': { en: 'View All Issues', tr: 'Tüm Sayıları Görüntüle' },
  'guidelines.download-template': { en: 'Download Template', tr: 'Şablon İndir' },
  // About Page
  'about.title': { en: 'About the Journal', tr: 'Dergi Hakkında' },
  'about.aims-scope': { en: 'Aims and Scope', tr: 'Amaç ve Kapsam' },
  'about.history': { en: 'History', tr: 'Tarihçe' },
  'about.indexing': { en: 'Indexing and Abstracting', tr: 'İndeksleme ve Özetleme' },
  'about.ethics': { en: 'Publication Ethics', tr: 'Yayın Etiği' },
  'about.open-access': { en: 'Open Access Policy', tr: 'Açık Erişim Politikası' },
  // Contact Page
  'contact.title': { en: 'Contact Us', tr: 'İletişim' },
  'contact.editorial-office': { en: 'Editorial Office', tr: 'Yayın Ofisi' },
  'contact.address': { en: 'Address', tr: 'Adres' },
  'contact.email': { en: 'Email', tr: 'E-posta' },
  'contact.phone': { en: 'Phone', tr: 'Telefon' },
  'contact.message': { en: 'Message', tr: 'Mesaj' },
  'contact.send': { en: 'Send Message', tr: 'Mesaj Gönder' },
  // Guidelines Page
  'guidelines.title': { en: 'Author Guidelines', tr: 'Yazım Kuralları' },
  'guidelines.manuscript-preparation': { en: 'Manuscript Preparation', tr: 'Makale Hazırlama' },
  'guidelines.format': { en: 'Format and Style', tr: 'Format ve Stil' },
  'guidelines.references': { en: 'References', tr: 'Kaynakça' },
  // Submit Page
  'submit.title': { en: 'Submit a Manuscript', tr: 'Makale Gönderimi' },
  'submit.login': { en: 'Login', tr: 'Giriş Yap' },
  'submit.register': { en: 'Register', tr: 'Kayıt Ol' },
  'submit.author-guidelines': { en: 'Author Guidelines', tr: 'Yazar Rehberi' },
  'submit.submission-checklist': { en: 'Submission Checklist', tr: 'Gönderim Kontrol Listesi' },
  // Issues
  'issues.title': { en: 'Issues', tr: 'Sayılar' },
  'issues.volume': { en: 'Volume', tr: 'Cilt' },
  'issues.issue': { en: 'Issue', tr: 'Sayı' },
  'issues.published': { en: 'Published', tr: 'Yayınlanma Tarihi' },
  'issues.articles': { en: 'Articles', tr: 'Makaleler' },
  // Footer
  'footer.copyright': { en: 'All rights reserved', tr: 'Tüm hakları saklıdır' },
  'footer.privacy': { en: 'Privacy Policy', tr: 'Gizlilik Politikası' },
  'footer.terms': { en: 'Terms of Use', tr: 'Kullanım Koşulları' },
  'footer.subscription': { en: 'Subscribe to our newsletter', tr: 'Bültenimize abone olun' },
  'footer.subscribe': { en: 'Subscribe', tr: 'Abone Ol' },
  // Editorial Board
  'editorial.title': { en: 'Editorial Board', tr: 'Yayın Kurulu' },
  'editorial.editor-in-chief': { en: 'Editor-in-Chief', tr: 'Baş Editör' },
  'editorial.associate-editors': { en: 'Associate Editors', tr: 'Yardımcı Editörler' },
  'editorial.editorial-board': { en: 'Editorial Board Members', tr: 'Yayın Kurulu Üyeleri' },
  'editorial.international-advisory-board': { en: 'International Advisory Board', tr: 'Uluslararası Danışma Kurulu' },
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    if (!translations[key]) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`Translation key not found: ${key}`);
      }
      return key;
    }
    return translations[key][language];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};


