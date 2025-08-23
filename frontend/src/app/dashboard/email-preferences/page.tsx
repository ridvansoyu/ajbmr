"use client";
import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useLanguage } from '@/context/LanguageContext';
import { useNotification } from '@/context/NotificationContext';
import { 
  Mail, 
  Bell, 
  CheckCircle, 
  Save,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';

interface EmailPreference {
  id: string;
  category: string;
  title: { en: string; tr: string };
  description: { en: string; tr: string };
  enabled: boolean;
}

export default function EmailPreferencesPage() {
  const { language } = useLanguage();
  const { showSuccess } = useNotification();
  const [hasChanges, setHasChanges] = useState(false);

  // Mock data - in real app, this would come from API
  const [emailPreferences, setEmailPreferences] = useState<EmailPreference[]>([
    {
      id: '1',
      category: 'submission',
      title: { en: 'Submission Status Updates', tr: 'Gönderim Durumu Güncellemeleri' },
      description: { 
        en: 'Receive notifications when your manuscript status changes (submitted, under review, accepted, etc.)',
        tr: 'Makalenizin durumu değiştiğinde bildirim alın (gönderildi, incelemede, kabul edildi vb.)'
      },
      enabled: true
    },
    {
      id: '2',
      category: 'review',
      title: { en: 'Review Requests', tr: 'İnceleme Talepleri' },
      description: { 
        en: 'Get notified when you are asked to review a manuscript',
        tr: 'Bir makaleyi incelemek üzere davet edildiğinizde bildirim alın'
      },
      enabled: true
    },
    {
      id: '3',
      category: 'editorial',
      title: { en: 'Editorial Decisions', tr: 'Editöryal Kararlar' },
      description: { 
        en: 'Receive notifications about editorial decisions on your manuscripts',
        tr: 'Makaleleriniz hakkında editöryal kararlar konusunda bildirim alın'
      },
      enabled: true
    },
    {
      id: '4',
      category: 'revision',
      title: { en: 'Revision Requests', tr: 'Revizyon Talepleri' },
      description: { 
        en: 'Get notified when revisions are requested for your manuscripts',
        tr: 'Makaleleriniz için revizyon istendiğinde bildirim alın'
      },
      enabled: true
    },
    {
      id: '5',
      category: 'publication',
      title: { en: 'Publication Notifications', tr: 'Yayın Bildirimleri' },
      description: { 
        en: 'Receive notifications when your manuscripts are published',
        tr: 'Makaleleriniz yayınlandığında bildirim alın'
      },
      enabled: false
    },
    {
      id: '6',
      category: 'journal',
      title: { en: 'Journal Updates', tr: 'Dergi Güncellemeleri' },
      description: { 
        en: 'Receive general updates about the journal (new issues, special calls, etc.)',
        tr: 'Dergi hakkında genel güncellemeler alın (yeni sayılar, özel çağrılar vb.)'
      },
      enabled: true
    },
    {
      id: '7',
      category: 'system',
      title: { en: 'System Notifications', tr: 'Sistem Bildirimleri' },
      description: { 
        en: 'Receive important system notifications and maintenance updates',
        tr: 'Önemli sistem bildirimleri ve bakım güncellemeleri alın'
      },
      enabled: false
    },
    {
      id: '8',
      category: 'marketing',
      title: { en: 'Marketing Communications', tr: 'Pazarlama İletişimleri' },
      description: { 
        en: 'Receive promotional emails about journal services and conferences',
        tr: 'Dergi hizmetleri ve konferanslar hakkında promosyon e-postaları alın'
      },
      enabled: false
    }
  ]);

  const togglePreference = (id: string) => {
    setEmailPreferences(prev => 
      prev.map(pref => 
        pref.id === id ? { ...pref, enabled: !pref.enabled } : pref
      )
    );
    setHasChanges(true);
  };

  const handleSave = () => {
    // In real app, this would make an API call to save preferences
    setHasChanges(false);
    showSuccess('PROFILE.EMAIL_PREFERENCES_UPDATED');
  };

  const handleSelectAll = () => {
    setEmailPreferences(prev => prev.map(pref => ({ ...pref, enabled: true })));
    setHasChanges(true);
  };

  const handleDeselectAll = () => {
    setEmailPreferences(prev => prev.map(pref => ({ ...pref, enabled: false })));
    setHasChanges(true);
  };

  const enabledCount = emailPreferences.filter(pref => pref.enabled).length;
  const totalCount = emailPreferences.length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              {language === 'en' ? 'Email Preferences' : 'E-posta Tercihleri'}
            </h1>
            <p className="text-gray-600 mt-1">
              {language === 'en' 
                ? 'Manage your email notification preferences and stay updated on your manuscripts.'
                : 'E-posta bildirim tercihlerinizi yönetin ve makaleleriniz hakkında güncel kalın.'}
            </p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={handleDeselectAll}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              {language === 'en' ? 'Deselect All' : 'Tümünü Kaldır'}
            </button>
            <button
              onClick={handleSelectAll}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              {language === 'en' ? 'Select All' : 'Tümünü Seç'}
            </button>
            <button
              onClick={handleSave}
              disabled={!hasChanges}
              className="px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center"
            >
              <Save className="h-4 w-4 mr-2" />
              {language === 'en' ? 'Save Changes' : 'Değişiklikleri Kaydet'}
            </button>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center">
            <Mail className="h-5 w-5 text-blue-600 mr-3" />
            <div>
              <p className="text-sm font-medium text-blue-900">
                {language === 'en' ? 'Email Preferences Summary' : 'E-posta Tercihleri Özeti'}
              </p>
              <p className="text-sm text-blue-700">
                {language === 'en' 
                  ? `${enabledCount} of ${totalCount} notification types are enabled`
                  : `${totalCount} bildirim türünden ${enabledCount} tanesi etkin`}
              </p>
            </div>
          </div>
        </div>

        {/* Preferences List */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">
              {language === 'en' ? 'Notification Types' : 'Bildirim Türleri'}
            </h2>
          </div>
          <div className="divide-y divide-gray-200">
            {emailPreferences.map((preference) => (
              <div key={preference.id} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h3 className="text-base font-medium text-gray-900">
                        {preference.title[language]}
                      </h3>
                      {preference.enabled && (
                        <CheckCircle className="h-4 w-4 text-green-600 ml-2" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600">
                      {preference.description[language]}
                    </p>
                  </div>
                  <div className="ml-6">
                    <button
                      onClick={() => togglePreference(preference.id)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                        preference.enabled ? 'bg-primary-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          preference.enabled ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Settings */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">
              {language === 'en' ? 'Additional Settings' : 'Ek Ayarlar'}
            </h2>
          </div>
          <div className="p-6 space-y-6">
            {/* Email Frequency */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'en' ? 'Email Frequency' : 'E-posta Sıklığı'}
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                <option value="immediate">
                  {language === 'en' ? 'Immediate' : 'Anında'}
                </option>
                <option value="daily">
                  {language === 'en' ? 'Daily Digest' : 'Günlük Özet'}
                </option>
                <option value="weekly">
                  {language === 'en' ? 'Weekly Digest' : 'Haftalık Özet'}
                </option>
              </select>
            </div>

            {/* Email Format */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'en' ? 'Email Format' : 'E-posta Formatı'}
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="emailFormat"
                    value="html"
                    defaultChecked
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    {language === 'en' ? 'HTML (Rich formatting)' : 'HTML (Zengin biçimlendirme)'}
                  </span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="emailFormat"
                    value="text"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    {language === 'en' ? 'Plain Text' : 'Düz Metin'}
                  </span>
                </label>
              </div>
            </div>

            {/* Language Preference */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'en' ? 'Email Language' : 'E-posta Dili'}
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                <option value="en">English</option>
                <option value="tr">Türkçe</option>
              </select>
            </div>
          </div>
        </div>

        {/* Unsubscribe Info */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="flex items-start">
            <Bell className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-900 mb-1">
                {language === 'en' ? 'Unsubscribe Information' : 'Abonelikten Çıkma Bilgisi'}
              </p>
              <p className="text-sm text-gray-600">
                {language === 'en' 
                  ? 'You can unsubscribe from any email type at any time by toggling the switches above. You can also contact our support team if you need assistance.'
                  : 'Yukarıdaki anahtarları kullanarak istediğiniz zaman herhangi bir e-posta türünden abonelikten çıkabilirsiniz. Yardıma ihtiyacınız varsa destek ekibimizle iletişime geçebilirsiniz.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
