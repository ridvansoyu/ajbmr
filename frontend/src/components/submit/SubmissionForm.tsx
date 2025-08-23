"use client";
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useNotification } from '@/context/NotificationContext';
import { 
  ChevronLeft, 
  ChevronRight, 
  FileText, 
  Users, 
  Search, 
  Mail, 
  Plus, 
  X,
  Upload,
  CheckCircle
} from 'lucide-react';

interface Author {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  affiliation: string;
}

interface Reviewer {
  id: string;
  name: string;
  email: string;
  expertise: string;
}

interface SubmissionData {
  title: string;
  abstract: string;
  keywords: string[];
  authors: Author[];
  selectedReviewers: Reviewer[];
  coverLetter: string;
  manuscriptFile: File | null;
}

const SubmissionForm: React.FC = () => {
  const { language } = useLanguage();
  const { showSuccess, showError } = useNotification();
  const [currentStep, setCurrentStep] = useState(1);
  const [isClient, setIsClient] = useState(false);
  const [submissionData, setSubmissionData] = useState<SubmissionData>({
    title: '',
    abstract: '',
    keywords: [],
    authors: [{ id: '1', firstName: '', lastName: '', email: '', affiliation: '' }],
    selectedReviewers: [],
    coverLetter: '',
    manuscriptFile: null,
  });

  const [keywordInput, setKeywordInput] = useState('');
  const [availableReviewers] = useState<Reviewer[]>([
    { id: '1', name: 'Dr. John Smith', email: 'john.smith@university.edu', expertise: 'Computer Science' },
    { id: '2', name: 'Prof. Maria Garcia', email: 'maria.garcia@research.org', expertise: 'Physics' },
    { id: '3', name: 'Dr. Ahmed Hassan', email: 'ahmed.hassan@institute.com', expertise: 'Mathematics' },
    { id: '4', name: 'Prof. Sarah Johnson', email: 'sarah.johnson@college.edu', expertise: 'Biology' },
  ]);

  // Ensure client-side rendering
  useEffect(() => {
    setIsClient(true);
  }, []);

  const steps = [
    { id: 1, title: language === 'en' ? 'Title & Abstract' : 'Başlık ve Özet', icon: FileText },
    { id: 2, title: language === 'en' ? 'Keywords' : 'Anahtar Kelimeler', icon: Search },
    { id: 3, title: language === 'en' ? 'Authors' : 'Yazarlar', icon: Users },
    { id: 4, title: language === 'en' ? 'Reviewers' : 'Hakemler', icon: Users },
    { id: 5, title: language === 'en' ? 'Cover Letter' : 'Kapak Mektubu', icon: Mail },
    { id: 6, title: language === 'en' ? 'Upload File' : 'Dosya Yükle', icon: Upload },
  ];

  const addKeyword = () => {
    if (keywordInput.trim() && !submissionData.keywords.includes(keywordInput.trim())) {
      setSubmissionData(prev => ({
        ...prev,
        keywords: [...prev.keywords, keywordInput.trim()]
      }));
      setKeywordInput('');
    }
  };

  const removeKeyword = (keyword: string) => {
    setSubmissionData(prev => ({
      ...prev,
      keywords: prev.keywords.filter(k => k !== keyword)
    }));
  };

  const addAuthor = () => {
    const newId = (submissionData.authors.length + 1).toString();
    setSubmissionData(prev => ({
      ...prev,
      authors: [...prev.authors, { id: newId, firstName: '', lastName: '', email: '', affiliation: '' }]
    }));
  };

  const removeAuthor = (id: string) => {
    if (submissionData.authors.length > 1) {
      setSubmissionData(prev => ({
        ...prev,
        authors: prev.authors.filter(author => author.id !== id)
      }));
    }
  };

  const updateAuthor = (id: string, field: keyof Author, value: string) => {
    setSubmissionData(prev => ({
      ...prev,
      authors: prev.authors.map(author =>
        author.id === id ? { ...author, [field]: value } : author
      )
    }));
  };

  const toggleReviewer = (reviewer: Reviewer) => {
    setSubmissionData(prev => ({
      ...prev,
      selectedReviewers: prev.selectedReviewers.some(r => r.id === reviewer.id)
        ? prev.selectedReviewers.filter(r => r.id !== reviewer.id)
        : [...prev.selectedReviewers, reviewer]
    }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSubmissionData(prev => ({ ...prev, manuscriptFile: file }));
    }
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return submissionData.title.trim() !== '' && submissionData.abstract.trim() !== '';
      case 2:
        return submissionData.keywords.length >= 3;
      case 3:
        return submissionData.authors.every(author => 
          author.firstName.trim() !== '' && 
          author.lastName.trim() !== '' && 
          author.email.trim() !== '' && 
          author.affiliation.trim() !== ''
        );
      case 4:
        return submissionData.selectedReviewers.length >= 2;
      case 5:
        return submissionData.coverLetter.trim() !== '';
      case 6:
        return submissionData.manuscriptFile !== null;
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length));
    } else {
      showError('SUBMISSION.VALIDATION_ERROR');
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (validateStep(currentStep)) {
      try {
        // Here you would typically send the data to your backend
        console.log('Submission data:', submissionData);
        showSuccess('SUBMISSION.SUBMIT_SUCCESS');
        // Reset form or redirect
      } catch (error) {
        showError('SUBMISSION.SUBMIT_ERROR');
      }
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'en' ? 'Title of the Work' : 'Çalışmanın Başlığı'} *
              </label>
              <input
                type="text"
                value={submissionData.title}
                onChange={(e) => setSubmissionData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder={language === 'en' ? 'Enter the title of your manuscript' : 'Makalenizin başlığını girin'}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'en' ? 'Abstract' : 'Özet'} *
              </label>
              <textarea
                value={submissionData.abstract}
                onChange={(e) => setSubmissionData(prev => ({ ...prev, abstract: e.target.value }))}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder={language === 'en' ? 'Enter the abstract of your manuscript (250-300 words)' : 'Makalenizin özetini girin (250-300 kelime)'}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'en' ? 'Keywords' : 'Anahtar Kelimeler'} * ({language === 'en' ? 'Minimum 3' : 'En az 3'})
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={keywordInput}
                  onChange={(e) => setKeywordInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addKeyword())}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder={language === 'en' ? 'Enter keyword and press Enter' : 'Anahtar kelime girin ve Enter\'a basın'}
                />
                <button
                  type="button"
                  onClick={addKeyword}
                  className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {submissionData.keywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-800"
                  >
                    {keyword}
                    <button
                      type="button"
                      onClick={() => removeKeyword(keyword)}
                      className="ml-2 text-primary-600 hover:text-primary-800"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">
                {language === 'en' ? 'Authors & Affiliations' : 'Yazarlar ve Kurumlar'} *
              </h3>
              <button
                type="button"
                onClick={addAuthor}
                className="flex items-center px-3 py-1 text-sm bg-primary-600 text-white rounded-md hover:bg-primary-700"
              >
                <Plus className="h-4 w-4 mr-1" />
                {language === 'en' ? 'Add Author' : 'Yazar Ekle'}
              </button>
            </div>
            {submissionData.authors.map((author, index) => (
              <div key={author.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium">
                    {language === 'en' ? `Author ${index + 1}` : `Yazar ${index + 1}`}
                  </h4>
                  {submissionData.authors.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeAuthor(author.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {language === 'en' ? 'First Name' : 'Ad'} *
                    </label>
                    <input
                      type="text"
                      value={author.firstName}
                      onChange={(e) => updateAuthor(author.id, 'firstName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {language === 'en' ? 'Last Name' : 'Soyad'} *
                    </label>
                    <input
                      type="text"
                      value={author.lastName}
                      onChange={(e) => updateAuthor(author.id, 'lastName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {language === 'en' ? 'Email' : 'E-posta'} *
                    </label>
                    <input
                      type="email"
                      value={author.email}
                      onChange={(e) => updateAuthor(author.id, 'email', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {language === 'en' ? 'Affiliation' : 'Kurum'} *
                    </label>
                    <input
                      type="text"
                      value={author.affiliation}
                      onChange={(e) => updateAuthor(author.id, 'affiliation', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">
                {language === 'en' ? 'Select Suggested Reviewers' : 'Önerilen Hakemleri Seçin'} * ({language === 'en' ? 'Minimum 2' : 'En az 2'})
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                {language === 'en' 
                  ? 'Select at least 2 reviewers from the list below. You can also suggest additional reviewers.'
                  : 'Aşağıdaki listeden en az 2 hakem seçin. Ek hakemler de önerebilirsiniz.'
                }
              </p>
              <div className="space-y-3">
                {availableReviewers.map((reviewer) => (
                  <div
                    key={reviewer.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      submissionData.selectedReviewers.some(r => r.id === reviewer.id)
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => toggleReviewer(reviewer)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{reviewer.name}</h4>
                        <p className="text-sm text-gray-600">{reviewer.email}</p>
                        <p className="text-sm text-gray-500">{reviewer.expertise}</p>
                      </div>
                      {submissionData.selectedReviewers.some(r => r.id === reviewer.id) && (
                        <CheckCircle className="h-5 w-5 text-primary-600" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'en' ? 'Cover Letter' : 'Kapak Mektubu'} *
              </label>
              <textarea
                value={submissionData.coverLetter}
                onChange={(e) => setSubmissionData(prev => ({ ...prev, coverLetter: e.target.value }))}
                rows={8}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder={language === 'en' 
                  ? 'Please provide a cover letter explaining the significance of your work, its contribution to the field, and why it should be published in our journal.'
                  : 'Lütfen çalışmanızın önemini, alana katkısını ve neden dergimizde yayınlanması gerektiğini açıklayan bir kapak mektubu sağlayın.'
                }
              />
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'en' ? 'Upload Manuscript File' : 'Makale Dosyasını Yükleyin'} *
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                  id="manuscript-file"
                />
                <label
                  htmlFor="manuscript-file"
                  className="cursor-pointer text-primary-600 hover:text-primary-700 font-medium"
                >
                  {language === 'en' ? 'Choose file' : 'Dosya seç'}
                </label>
                <p className="text-sm text-gray-500 mt-2">
                  {language === 'en' ? 'PDF, DOC, or DOCX files only' : 'Sadece PDF, DOC veya DOCX dosyaları'}
                </p>
                {submissionData.manuscriptFile && (
                  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
                    <p className="text-sm text-green-800">
                      {language === 'en' ? 'File selected:' : 'Seçilen dosya:'} {submissionData.manuscriptFile.name}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Don't render until client-side
  if (!isClient) {
    return (
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          <span className="ml-2 text-gray-600">
            {language === 'en' ? 'Loading...' : 'Yükleniyor...'}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
      {/* Step Indicator */}
      <div className="border-b border-gray-200 p-6">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                currentStep >= step.id ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {currentStep > step.id ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <step.icon className="h-5 w-5" />
                )}
              </div>
              <div className="ml-3">
                <p className={`text-sm font-medium ${
                  currentStep >= step.id ? 'text-primary-600' : 'text-gray-500'
                }`}>
                  {step.title}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-16 h-0.5 mx-4 ${
                  currentStep > step.id ? 'bg-primary-600' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="p-6">
        {renderStepContent()}
      </div>

      {/* Navigation */}
      <div className="border-t border-gray-200 p-6 flex justify-between">
        <button
          type="button"
          onClick={prevStep}
          disabled={currentStep === 1}
          className={`flex items-center px-4 py-2 rounded-md ${
            currentStep === 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          {language === 'en' ? 'Previous' : 'Önceki'}
        </button>

        {currentStep < steps.length ? (
          <button
            type="button"
            onClick={nextStep}
            className="flex items-center px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
          >
            {language === 'en' ? 'Next' : 'Sonraki'}
            <ChevronRight className="h-4 w-4 ml-2" />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            className="flex items-center px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            {language === 'en' ? 'Submit Manuscript' : 'Makaleyi Gönder'}
          </button>
        )}
      </div>
    </div>
  );
};

export default SubmissionForm;
