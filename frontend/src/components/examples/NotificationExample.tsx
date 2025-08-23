"use client";
import React from 'react';
import { useNotification } from '@/context/NotificationContext';
import { useLanguage } from '@/context/LanguageContext';

const NotificationExample: React.FC = () => {
  const { showSuccess, showError, showWarning, showInfo } = useNotification();
  const { language } = useLanguage();

  const handleTestNotifications = () => {
    // Test different notification types
    showSuccess('GENERAL.SUCCESS');
    setTimeout(() => showError('GENERAL.ERROR'), 1000);
    setTimeout(() => showWarning('GENERAL.VALIDATION_ERROR'), 2000);
    setTimeout(() => showInfo('GENERAL.LOADING'), 3000);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">
        {language === 'en' ? 'Notification System Test' : 'Bildirim Sistemi Testi'}
      </h3>
      
      <div className="space-y-3">
        <button
          onClick={() => showSuccess('PROFILE.UPDATE_SUCCESS')}
          className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
        >
          {language === 'en' ? 'Show Success Notification' : 'Başarı Bildirimi Göster'}
        </button>
        
        <button
          onClick={() => showError('PROFILE.UPDATE_ERROR')}
          className="w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
        >
          {language === 'en' ? 'Show Error Notification' : 'Hata Bildirimi Göster'}
        </button>
        
        <button
          onClick={() => showWarning('FORM.REQUIRED_FIELDS')}
          className="w-full bg-yellow-600 text-white py-2 px-4 rounded hover:bg-yellow-700"
        >
          {language === 'en' ? 'Show Warning Notification' : 'Uyarı Bildirimi Göster'}
        </button>
        
        <button
          onClick={() => showInfo('GENERAL.LOADING')}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          {language === 'en' ? 'Show Info Notification' : 'Bilgi Bildirimi Göster'}
        </button>
        
        <button
          onClick={handleTestNotifications}
          className="w-full bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700"
        >
          {language === 'en' ? 'Test All Notifications' : 'Tüm Bildirimleri Test Et'}
        </button>
      </div>
      
      <div className="mt-6 p-4 bg-gray-50 rounded">
        <h4 className="font-medium mb-2">
          {language === 'en' ? 'How to use:' : 'Nasıl kullanılır:'}
        </h4>
        <pre className="text-sm text-gray-700">
{`import { useNotification } from '@/context/NotificationContext';

const { showSuccess, showError, showWarning, showInfo } = useNotification();

// Usage examples:
showSuccess('PROFILE.UPDATE_SUCCESS');
showError('AUTH.LOGIN_ERROR');
showWarning('FORM.REQUIRED_FIELDS');
showInfo('GENERAL.LOADING');`}
        </pre>
      </div>
    </div>
  );
};

export default NotificationExample;
