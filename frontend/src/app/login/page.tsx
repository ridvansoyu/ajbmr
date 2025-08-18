"use client";
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import LoginForm from '@/components/auth/LoginForm';
import { Book, Users, FileText, Globe } from 'lucide-react';

export default function LoginPage() {
  const { user, isAuthenticated } = useAuth();
  const { language } = useLanguage();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated && user) {
      router.replace('/dashboard');
    }
  }, [isAuthenticated, user, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <div className="bg-primary-600 p-3 rounded-full">
              <Book className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            {language === 'en' ? 'Sign in to your account' : 'Hesabınıza giriş yapın'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {language === 'en' ? 'Access your academic journal dashboard' : 'Akademik dergi kontrol panelinize erişin'}
          </p>
        </div>

        <div className="bg-white py-8 px-6 shadow-lg rounded-lg border border-gray-200">
          <LoginForm />
        </div>

        <div className="text-center text-sm">
          <span className="text-gray-600">{language === 'en' ? "Don't have an account?" : 'Hesabınız yok mu?'}</span>{' '}
          <a href="/register" className="text-primary-600 hover:text-primary-700 font-medium">
            {language === 'en' ? 'Register' : 'Kayıt Ol'}
          </a>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-blue-900 mb-2">
            {language === 'en' ? 'Test Credentials:' : 'Test Kimlik Bilgileri:'}
          </h3>
          <div className="text-xs text-blue-800 space-y-1">
            <div className="flex items-center">
              <Users className="h-3 w-3 mr-1" />
              <strong>Admin:</strong> admin@journal.com / admin123
            </div>
            <div className="flex items-center">
              <FileText className="h-3 w-3 mr-1" />
              <strong>Author:</strong> author1@example.com / author123
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-500 mb-4">
            {language === 'en' ? 'Academic Journal Management System' : 'Akademik Dergi Yönetim Sistemi'}
          </p>
          <div className="flex justify-center space-x-6 text-xs text-gray-400">
            <div className="flex items-center">
              <Globe className="h-3 w-3 mr-1" />
              <span>{language === 'en' ? 'Bilingual' : 'İki Dilli'}</span>
            </div>
            <div className="flex items-center">
              <FileText className="h-3 w-3 mr-1" />
              <span>{language === 'en' ? 'Submissions' : 'Gönderimler'}</span>
            </div>
            <div className="flex items-center">
              <Users className="h-3 w-3 mr-1" />
              <span>{language === 'en' ? 'Reviews' : 'İncelemeler'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


