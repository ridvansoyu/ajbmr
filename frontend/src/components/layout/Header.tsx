"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Menu, X, Book, Globe } from 'lucide-react';

const navItems: Array<{ href: string; key: string }> = [
  { href: '/about', key: 'nav.about' },
  { href: '/editorial-board', key: 'nav.editorial-board' },
  { href: '/issues', key: 'nav.issues' },
  { href: '/guidelines', key: 'nav.guidelines' },
  { href: '/contact', key: 'nav.contact' },
];

export default function Header() {
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-white/95'
      }`}
    >
      <div className="container-custom mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center space-x-2">
            <Book className="h-8 w-8 text-primary-600" />
            <div className="flex flex-col">
              <span className="text-lg font-serif font-bold text-primary-600">
                {language === 'en' ? 'Academic Journal' : 'Akademik Dergi'}
              </span>
              <span className="text-xs text-primary-500">
                {language === 'en' ? 'Advanced Studies' : 'İleri Araştırmalar'}
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition-colors hover:text-primary-600 ${
                    active ? 'text-primary-600' : 'text-gray-700'
                  }`}
                >
                  {t(item.key)}
                </Link>
              );
            })}

            <Link href="/submit" className="btn btn-primary">{t('nav.submit')}</Link>

            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 text-sm text-gray-700 hover:text-primary-600">
                  <span className="uppercase">{user?.username}</span>
                  <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.122l3.71-3.89a.75.75 0 111.08 1.04l-4.24 4.45a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd"/></svg>
                </button>
                <div className="absolute right-0 mt-2 w-48 rounded-md border border-gray-200 bg-white shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <div className="py-2 text-sm">
                    <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-50 text-gray-700">{language === 'en' ? 'Dashboard' : 'Kontrol Paneli'}</Link>
                    <Link href="/dashboard/profile" className="block px-4 py-2 hover:bg-gray-50 text-gray-700">{language === 'en' ? 'Settings' : 'Ayarlar'}</Link>
                    <Link href="/dashboard/publications" className="block px-4 py-2 hover:bg-gray-50 text-gray-700">{language === 'en' ? 'My Publications' : 'Yayınlarım'}</Link>
                    <button
                      onClick={() => { logout(); router.push('/'); }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700"
                    >
                      {language === 'en' ? 'Log out' : 'Çıkış Yap'}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link href="/login" className="text-sm text-gray-700 hover:text-primary-600">
                  {language === 'en' ? 'Log in' : 'Giriş Yap'}
                </Link>
                <Link href="/register" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                  {language === 'en' ? 'Register' : 'Kayıt Ol'}
                </Link>
              </div>
            )}

            <button
              onClick={() => setLanguage(language === 'en' ? 'tr' : 'en')}
              className="flex items-center space-x-1 text-gray-700 hover:text-primary-600"
              aria-label="Toggle language"
            >
              <Globe className="h-4 w-4" />
              <span className="text-sm font-medium uppercase">{language}</span>
            </button>
          </nav>

          <div className="flex items-center md:hidden space-x-4">
            <button
              onClick={() => setLanguage(language === 'en' ? 'tr' : 'en')}
              className="flex items-center text-gray-700"
              aria-label="Toggle language"
            >
              <Globe className="h-5 w-5" />
              <span className="ml-1 text-sm font-medium uppercase">{language}</span>
            </button>

            <button
              onClick={() => setIsOpen((v) => !v)}
              className="p-2 rounded-md hover:bg-gray-100"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-6 w-6 text-primary-600" />
              ) : (
                <Menu className="h-6 w-6 text-primary-600" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`md:hidden bg-white overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-screen shadow-lg' : 'max-h-0'
        }`}
      >
        <nav className="container-custom py-6 space-y-6">
          <div className="flex flex-col space-y-4">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium px-4 py-2 rounded-md transition-colors ${
                    active ? 'bg-primary-50 text-primary-600' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {t(item.key)}
                </Link>
              );
            })}

            <Link href="/submit" className="block w-full text-center btn btn-primary">{t('nav.submit')}</Link>
            {isAuthenticated ? (
              <div className="flex flex-col space-y-2">
                <Link href="/dashboard" className="block w-full text-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">{language === 'en' ? 'Dashboard' : 'Kontrol Paneli'}</Link>
                <Link href="/dashboard/profile" className="block w-full text-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">{language === 'en' ? 'Settings' : 'Ayarlar'}</Link>
                <Link href="/dashboard/publications" className="block w-full text-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">{language === 'en' ? 'My Publications' : 'Yayınlarım'}</Link>
                <button
                  onClick={() => { logout(); router.push('/'); }}
                  className="block w-full text-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  {language === 'en' ? 'Log out' : 'Çıkış Yap'}
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-4">
                <Link href="/login" className="block text-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                  {language === 'en' ? 'Log in' : 'Giriş Yap'}
                </Link>
                <Link href="/register" className="block text-center px-4 py-2 text-sm text-primary-600 hover:text-primary-700">
                  {language === 'en' ? 'Register' : 'Kayıt Ol'}
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}


