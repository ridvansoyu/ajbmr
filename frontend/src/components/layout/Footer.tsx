"use client";
import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { Book, Mail, Facebook, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  const { t, language } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-900 text-white pt-12 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Book className="h-7 w-7 text-white" />
              <div className="flex flex-col">
                <span className="text-lg font-serif font-bold text-white">
                  {language === 'en' ? 'Academic Journal' : 'Akademik Dergi'}
                </span>
                <span className="text-xs text-gray-300">
                  {language === 'en' ? 'Advanced Studies' : 'İleri Araştırmalar'}
                </span>
              </div>
            </Link>
            <p className="text-sm text-gray-300 mb-6">
              {language === 'en'
                ? 'A peer-reviewed journal dedicated to advancing research across multiple disciplines.'
                : 'Çoklu disiplinlerde araştırmaları ilerletmeye adanmış hakemli bir dergi.'}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="md:col-span-1">
            <h4 className="font-serif text-lg mb-6 text-white border-b border-primary-700 pb-2">
              {language === 'en' ? 'Quick Links' : 'Hızlı Erişim'}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-gray-300 hover:text-white transition-colors">
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link href="/editorial-board" className="text-sm text-gray-300 hover:text-white transition-colors">
                  {t('nav.editorial-board')}
                </Link>
              </li>
              <li>
                <Link href="/issues" className="text-sm text-gray-300 hover:text-white transition-colors">
                  {t('nav.issues')}
                </Link>
              </li>
              <li>
                <Link href="/submit" className="text-sm text-gray-300 hover:text-white transition-colors">
                  {t('nav.submit')}
                </Link>
              </li>
              <li>
                <Link href="/guidelines" className="text-sm text-gray-300 hover:text-white transition-colors">
                  {t('nav.guidelines')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-300 hover:text-white transition-colors">
                  {t('nav.contact')}
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-1">
            <h4 className="font-serif text-lg mb-6 text-white border-b border-primary-700 pb-2">
              {language === 'en' ? 'Contact' : 'İletişim'}
            </h4>
            <address className="not-italic">
              <p className="text-sm text-gray-300 mb-2">
                {language === 'en' ? 'Editorial Office' : 'Yayın Ofisi'}
              </p>
              <p className="text-sm text-gray-300 mb-2">
                {language === 'en'
                  ? 'Academic Building, University Campus'
                  : 'Akademik Bina, Üniversite Kampüsü'}
              </p>
              <p className="text-sm text-gray-300 mb-2">
                {language === 'en' ? 'Ankara, Turkey' : 'Ankara, Türkiye'}
              </p>
              <p className="text-sm text-gray-300 mb-2 flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                <a href="mailto:journal@example.com" className="hover:text-white transition-colors">
                  journal@example.com
                </a>
              </p>
            </address>
          </div>

          <div className="md:col-span-1">
            <h4 className="font-serif text-lg mb-6 text-white border-b border-primary-700 pb-2">
              {t('footer.subscription')}
            </h4>
            <p className="text-sm text-gray-300 mb-4">
              {language === 'en'
                ? 'Stay updated with our latest issues and announcements.'
                : 'En son sayılar ve duyurulardan haberdar olun.'}
            </p>
            <form className="space-y-2" onSubmit={(e) => e.preventDefault()}>
              <div>
                <input
                  type="email"
                  placeholder={language === 'en' ? 'Your email address' : 'E-posta adresiniz'}
                  className="w-full px-4 py-2 rounded text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-accent-400"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-accent-500 text-primary-900 px-4 py-2 rounded text-sm font-medium hover:bg-accent-600 transition-colors"
              >
                {t('footer.subscribe')}
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 mt-8 border-t border-primary-800 text-center text-sm text-gray-400">
          <p>
            &copy; {currentYear} {language === 'en' ? 'Academic Journal of Advanced Studies' : 'İleri Araştırmalar Akademik Dergisi'}. {t('footer.copyright')}.
          </p>
          <div className="mt-2 space-x-4">
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              {t('footer.privacy')}
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              {t('footer.terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}


