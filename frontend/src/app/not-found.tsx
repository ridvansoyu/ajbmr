"use client";
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { Home, AlertTriangle, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  const { language } = useLanguage();
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 sm:p-8">
          <div className="flex justify-center mb-6">
            <div className="bg-primary-50 p-3 rounded-full">
              <AlertTriangle className="h-12 w-12 text-primary-600" />
            </div>
          </div>
          <h1 className="text-3xl font-serif font-medium text-center mb-2 text-primary-900">404</h1>
          <h2 className="text-xl font-medium text-center mb-4 text-gray-800">{language === 'en' ? 'Page Not Found' : 'Sayfa Bulunamadı'}</h2>
          <p className="text-gray-600 text-center mb-8">
            {language === 'en'
              ? 'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.'
              : 'Aradığınız sayfa kaldırılmış, adı değiştirilmiş veya geçici olarak kullanılamıyor olabilir.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/" className="btn btn-primary inline-flex items-center justify-center">
              <Home className="h-4 w-4 mr-2" />
              <span>{language === 'en' ? 'Go to Homepage' : 'Ana Sayfaya Git'}</span>
            </Link>
            <button onClick={() => history.back()} className="btn btn-outline inline-flex items-center justify-center">
              <ArrowLeft className="h-4 w-4 mr-2" />
              <span>{language === 'en' ? 'Go Back' : 'Geri Dön'}</span>
            </button>
          </div>
        </div>
        <div className="bg-gray-50 px-6 py-4 sm:px-8 sm:py-6 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-600">
            {language === 'en' ? 'If you believe this is an error, please contact the editorial office.' : 'Bunun bir hata olduğunu düşünüyorsanız, lütfen yayın ofisiyle iletişime geçin.'}
          </p>
          <div className="text-center mt-2">
            <Link href="/contact" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
              {language === 'en' ? 'Contact Us' : 'Bize Ulaşın'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}


