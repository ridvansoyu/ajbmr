"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import ManuscriptSubmissionForm from '@/components/submission/ManuscriptSubmissionForm';
import Link from 'next/link';
import { FileText, Download, UserCircle } from 'lucide-react';

export default function DashboardPage() {
  const { user, isAuthenticated, isReady } = useAuth();
  const { language } = useLanguage();
  const [showSubmissionForm, setShowSubmissionForm] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!isReady) return;
    if (!isAuthenticated) router.replace('/submit');
  }, [isReady, isAuthenticated, router]);

  if (!isReady) return null;
  if (!isAuthenticated) return null;

  const handleSubmission = (data: FormData) => {
    console.log('Manuscript submitted:', data.get('title'));
    setShowSubmissionForm(false);
  };

  const templates = [
    {
      id: 'manuscript',
      name: language === 'en' ? 'Manuscript Template' : 'Makale Şablonu',
      description:
        language === 'en'
          ? 'Word template with preformatted styles and sections for research articles.'
          : 'Araştırma makaleleri için önceden biçimlendirilmiş stiller ve bölümler içeren Word şablonu.',
      file: '/templates/manuscript-template.docx',
    },
    {
      id: 'cover-letter',
      name: language === 'en' ? 'Cover Letter Template' : 'Kapak Mektubu Şablonu',
      description:
        language === 'en'
          ? 'Template for preparing your cover letter to accompany your submission.'
          : 'Gönderiminize eşlik edecek kapak mektubunuzu hazırlamak için şablon.',
      file: '/templates/cover-letter-template.docx',
    },
    {
      id: 'copyright',
      name: language === 'en' ? 'Copyright Transfer Form' : 'Telif Hakkı Devir Formu',
      description:
        language === 'en'
          ? 'Form to be completed and signed by all authors upon acceptance.'
          : 'Kabul üzerine tüm yazarlar tarafından doldurulup imzalanacak form.',
      file: '/templates/copyright-transfer-form.pdf',
    },
    {
      id: 'conflict',
      name: language === 'en' ? 'Conflict of Interest Form' : 'Çıkar Çatışması Formu',
      description:
        language === 'en'
          ? 'Form to declare any potential conflicts of interest.'
          : 'Olası çıkar çatışmalarını beyan etmek için form.',
      file: '/templates/conflict-of-interest-form.pdf',
    },
  ];

  return (
    <div className="bg-white pb-16">
      <div className="bg-primary-900 text-white py-12">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-serif font-medium text-white mb-4">
            {language === 'en' ? 'Dashboard' : 'Kontrol Paneli'}
          </h1>
          <p className="text-xl text-gray-200">
            {language === 'en' ? `Welcome back, ${user?.username}!` : `Hoş geldiniz, ${user?.username}!`}
          </p>
        </div>
      </div>

      <div className="container-custom py-12">
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-serif font-medium">
              {language === 'en' ? 'Submit New Manuscript' : 'Yeni Makale Gönder'}
            </h2>
            <button onClick={() => setShowSubmissionForm(!showSubmissionForm)} className="btn btn-primary">
              {showSubmissionForm
                ? language === 'en'
                  ? 'Cancel Submission'
                  : 'Gönderimi İptal Et'
                : language === 'en'
                ? 'New Submission'
                : 'Yeni Gönderi'}
            </button>
          </div>

          {showSubmissionForm && (
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <ManuscriptSubmissionForm onSubmit={handleSubmission} />
            </div>
          )}
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-serif font-medium mb-6">
            {language === 'en' ? 'Account Profile' : 'Hesap Profili'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href="/dashboard/profile" className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-start">
                <div className="bg-primary-50 p-3 rounded-lg mr-4">
                  <UserCircle className="h-8 w-8 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">{language === 'en' ? 'Profile Information' : 'Profil Bilgileri'}</h3>
                  <p className="text-gray-600 text-sm">{language === 'en' ? 'View and update your profile (organization, phones, biography, etc.)' : 'Profilinizi görüntüleyin ve güncelleyin (kurum, telefonlar, biyografi vb.)'}</p>
                </div>
              </div>
            </Link>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-serif font-medium mb-6">
            {language === 'en' ? 'Templates and Forms' : 'Şablonlar ve Formlar'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {templates.map((template) => (
              <div
                key={template.id}
                className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-start">
                  <div className="bg-primary-50 p-3 rounded-lg mr-4">
                    <FileText className="h-8 w-8 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">{template.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{template.description}</p>
                    <a href={template.file} download className="btn btn-outline inline-flex items-center text-sm">
                      <Download className="h-4 w-4 mr-2" />
                      <span>{language === 'en' ? 'Download' : 'İndir'}</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


