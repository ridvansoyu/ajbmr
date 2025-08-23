// Centralized notification messages for the application
// This file contains all notification messages used throughout the app

export const NOTIFICATIONS = {
  // Authentication related notifications
  AUTH: {
    LOGIN_SUCCESS: {
      en: 'Successfully logged in!',
      tr: 'Başarıyla giriş yapıldı!'
    },
    LOGIN_ERROR: {
      en: 'Login failed. Please check your credentials.',
      tr: 'Giriş başarısız. Kimlik bilgilerinizi kontrol edin.'
    },
    LOGOUT_SUCCESS: {
      en: 'Successfully logged out!',
      tr: 'Başarıyla çıkış yapıldı!'
    },
    REGISTER_SUCCESS: {
      en: 'Account created successfully! Welcome aboard!',
      tr: 'Hesap başarıyla oluşturuldu! Hoş geldiniz!'
    },
    REGISTER_ERROR: {
      en: 'Registration failed. Please try again.',
      tr: 'Kayıt başarısız. Lütfen tekrar deneyin.'
    },
    UNAUTHORIZED: {
      en: 'You must be logged in to perform this action.',
      tr: 'Bu işlemi gerçekleştirmek için giriş yapmalısınız.'
    }
  },

  // Profile related notifications
  PROFILE: {
    UPDATE_SUCCESS: {
      en: 'Profile information updated successfully!',
      tr: 'Profil bilgileri başarıyla güncellendi!'
    },
    UPDATE_ERROR: {
      en: 'Failed to update profile. Please try again.',
      tr: 'Profil güncellenemedi. Lütfen tekrar deneyin.'
    },
    FETCH_ERROR: {
      en: 'Failed to load profile information.',
      tr: 'Profil bilgileri yüklenemedi.'
    },
    SAVE_SUCCESS: {
      en: 'Profile saved successfully!',
      tr: 'Profil başarıyla kaydedildi!'
    },
    SAVE_ERROR: {
      en: 'Failed to save profile.',
      tr: 'Profil kaydedilemedi.'
    }
  },

  // Manuscript related notifications
  MANUSCRIPT: {
    SUBMIT_SUCCESS: {
      en: 'Manuscript submitted successfully!',
      tr: 'Makale başarıyla gönderildi!'
    },
    SUBMIT_ERROR: {
      en: 'Failed to submit manuscript. Please try again.',
      tr: 'Makale gönderilemedi. Lütfen tekrar deneyin.'
    },
    UPDATE_SUCCESS: {
      en: 'Manuscript updated successfully!',
      tr: 'Makale başarıyla güncellendi!'
    },
    DELETE_SUCCESS: {
      en: 'Manuscript deleted successfully!',
      tr: 'Makale başarıyla silindi!'
    }
  },

  // General notifications
  GENERAL: {
    LOADING: {
      en: 'Loading...',
      tr: 'Yükleniyor...'
    },
    SUCCESS: {
      en: 'Operation completed successfully!',
      tr: 'İşlem başarıyla tamamlandı!'
    },
    ERROR: {
      en: 'An error occurred. Please try again.',
      tr: 'Bir hata oluştu. Lütfen tekrar deneyin.'
    },
    NETWORK_ERROR: {
      en: 'Network error. Please check your connection.',
      tr: 'Ağ hatası. Bağlantınızı kontrol edin.'
    },
    VALIDATION_ERROR: {
      en: 'Please check your input and try again.',
      tr: 'Girdilerinizi kontrol edin ve tekrar deneyin.'
    }
  },

  // Form related notifications
  FORM: {
    REQUIRED_FIELDS: {
      en: 'Please fill in all required fields.',
      tr: 'Lütfen tüm zorunlu alanları doldurun.'
    },
    INVALID_EMAIL: {
      en: 'Please enter a valid email address.',
      tr: 'Lütfen geçerli bir e-posta adresi girin.'
    },
    PASSWORD_MISMATCH: {
      en: 'Passwords do not match.',
      tr: 'Şifreler eşleşmiyor.'
    },
    WEAK_PASSWORD: {
      en: 'Password is too weak. Please use a stronger password.',
      tr: 'Şifre çok zayıf. Lütfen daha güçlü bir şifre kullanın.'
    }
  }
};

// Helper function to get notification message by key and language
export const getNotification = (key: string, language: 'en' | 'tr' = 'en'): string => {
  const keys = key.split('.');
  let current: any = NOTIFICATIONS;
  
  for (const k of keys) {
    if (current[k]) {
      current = current[k];
    } else {
      console.warn(`Notification key not found: ${key}`);
      return key;
    }
  }
  
  if (typeof current === 'object' && current[language]) {
    return current[language];
  }
  
  console.warn(`Language not found for notification: ${key}`);
  return key;
};

// Type definitions for better TypeScript support
export type NotificationKey = 
  | 'AUTH.LOGIN_SUCCESS'
  | 'AUTH.LOGIN_ERROR'
  | 'AUTH.LOGOUT_SUCCESS'
  | 'AUTH.REGISTER_SUCCESS'
  | 'AUTH.REGISTER_ERROR'
  | 'AUTH.UNAUTHORIZED'
  | 'PROFILE.UPDATE_SUCCESS'
  | 'PROFILE.UPDATE_ERROR'
  | 'PROFILE.FETCH_ERROR'
  | 'PROFILE.SAVE_SUCCESS'
  | 'PROFILE.SAVE_ERROR'
  | 'MANUSCRIPT.SUBMIT_SUCCESS'
  | 'MANUSCRIPT.SUBMIT_ERROR'
  | 'MANUSCRIPT.UPDATE_SUCCESS'
  | 'MANUSCRIPT.DELETE_SUCCESS'
  | 'GENERAL.LOADING'
  | 'GENERAL.SUCCESS'
  | 'GENERAL.ERROR'
  | 'GENERAL.NETWORK_ERROR'
  | 'GENERAL.VALIDATION_ERROR'
  | 'FORM.REQUIRED_FIELDS'
  | 'FORM.INVALID_EMAIL'
  | 'FORM.PASSWORD_MISMATCH'
  | 'FORM.WEAK_PASSWORD';
