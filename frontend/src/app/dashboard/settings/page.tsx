"use client";
import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { useNotification } from '@/context/NotificationContext';
import { 
  Settings, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff,
  Save,
  CheckCircle
} from 'lucide-react';

export default function SettingsPage() {
  const { language } = useLanguage();
  const { user } = useAuth();
  const { showSuccess, showError } = useNotification();
  const [isLoading, setIsLoading] = useState(false);

  // Password change form
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    showCurrentPassword: false,
    showNewPassword: false,
    showConfirmPassword: false
  });

  // Email change form
  const [emailForm, setEmailForm] = useState({
    currentEmail: user?.email || '',
    newEmail: '',
    password: '',
    showPassword: false
  });

  const handlePasswordChange = (field: string, value: string) => {
    setPasswordForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleEmailChange = (field: string, value: string) => {
    setEmailForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const togglePasswordVisibility = (field: string) => {
    setPasswordForm(prev => ({
      ...prev,
      [field]: !prev[field as keyof typeof prev]
    }));
  };

  const toggleEmailPasswordVisibility = () => {
    setEmailForm(prev => ({
      ...prev,
      showPassword: !prev.showPassword
    }));
  };

  const validatePassword = (password: string) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return {
      isValid: password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar,
      errors: {
        length: password.length < minLength,
        uppercase: !hasUpperCase,
        lowercase: !hasLowerCase,
        numbers: !hasNumbers,
        special: !hasSpecialChar
      }
    };
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      showError('FORM.PASSWORD_MISMATCH');
      return;
    }

    const passwordValidation = validatePassword(passwordForm.newPassword);
    if (!passwordValidation.isValid) {
      showError('FORM.WEAK_PASSWORD');
      return;
    }

    setIsLoading(true);
    try {
      // In real app, this would make an API call
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      showSuccess('PROFILE.PASSWORD_UPDATED');
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        showCurrentPassword: false,
        showNewPassword: false,
        showConfirmPassword: false
      });
    } catch (error) {
      showError('PROFILE.PASSWORD_UPDATE_ERROR');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!emailForm.password) {
      showError('FORM.REQUIRED_FIELDS');
      return;
    }

    setIsLoading(true);
    try {
      // In real app, this would make an API call
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      showSuccess('PROFILE.EMAIL_UPDATED');
      setEmailForm(prev => ({
        ...prev,
        newEmail: '',
        password: '',
        showPassword: false
      }));
    } catch (error) {
      showError('PROFILE.EMAIL_UPDATE_ERROR');
    } finally {
      setIsLoading(false);
    }
  };

  const passwordValidation = validatePassword(passwordForm.newPassword);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            {language === 'en' ? 'Account Settings' : 'Hesap Ayarları'}
          </h1>
          <p className="text-gray-600 mt-1">
            {language === 'en' 
              ? 'Manage your account settings and security preferences.'
              : 'Hesap ayarlarınızı ve güvenlik tercihlerinizi yönetin.'}
          </p>
        </div>

        {/* Password Change Section */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center">
              <Lock className="h-6 w-6 text-gray-600 mr-3" />
              <h2 className="text-lg font-medium text-gray-900">
                {language === 'en' ? 'Change Password' : 'Şifre Değiştir'}
              </h2>
            </div>
          </div>
          <div className="p-6">
            <form onSubmit={handlePasswordSubmit} className="space-y-6">
              {/* Current Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'en' ? 'Current Password' : 'Mevcut Şifre'}
                </label>
                <div className="relative">
                  <input
                    type={passwordForm.showCurrentPassword ? 'text' : 'password'}
                    value={passwordForm.currentPassword}
                    onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                    required
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('showCurrentPassword')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {passwordForm.showCurrentPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'en' ? 'New Password' : 'Yeni Şifre'}
                </label>
                <div className="relative">
                  <input
                    type={passwordForm.showNewPassword ? 'text' : 'password'}
                    value={passwordForm.newPassword}
                    onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                    required
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('showNewPassword')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {passwordForm.showNewPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                </div>

                {/* Password Strength Indicator */}
                {passwordForm.newPassword && (
                  <div className="mt-2">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${
                            passwordValidation.isValid ? 'bg-green-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${Math.min(100, (passwordForm.newPassword.length / 8) * 100)}%` }}
                        />
                      </div>
                      {passwordValidation.isValid && (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className={`flex items-center ${passwordValidation.errors.length ? 'text-red-600' : 'text-green-600'}`}>
                        <div className={`w-2 h-2 rounded-full mr-2 ${passwordValidation.errors.length ? 'bg-red-500' : 'bg-green-500'}`} />
                        {language === 'en' ? 'At least 8 characters' : 'En az 8 karakter'}
                      </div>
                      <div className={`flex items-center ${passwordValidation.errors.uppercase ? 'text-red-600' : 'text-green-600'}`}>
                        <div className={`w-2 h-2 rounded-full mr-2 ${passwordValidation.errors.uppercase ? 'bg-red-500' : 'bg-green-500'}`} />
                        {language === 'en' ? 'Uppercase letter' : 'Büyük harf'}
                      </div>
                      <div className={`flex items-center ${passwordValidation.errors.lowercase ? 'text-red-600' : 'text-green-600'}`}>
                        <div className={`w-2 h-2 rounded-full mr-2 ${passwordValidation.errors.lowercase ? 'bg-red-500' : 'bg-green-500'}`} />
                        {language === 'en' ? 'Lowercase letter' : 'Küçük harf'}
                      </div>
                      <div className={`flex items-center ${passwordValidation.errors.numbers ? 'text-red-600' : 'text-green-600'}`}>
                        <div className={`w-2 h-2 rounded-full mr-2 ${passwordValidation.errors.numbers ? 'bg-red-500' : 'bg-green-500'}`} />
                        {language === 'en' ? 'Number' : 'Rakam'}
                      </div>
                      <div className={`flex items-center ${passwordValidation.errors.special ? 'text-red-600' : 'text-green-600'}`}>
                        <div className={`w-2 h-2 rounded-full mr-2 ${passwordValidation.errors.special ? 'bg-red-500' : 'bg-green-500'}`} />
                        {language === 'en' ? 'Special character' : 'Özel karakter'}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'en' ? 'Confirm New Password' : 'Yeni Şifreyi Onayla'}
                </label>
                <div className="relative">
                  <input
                    type={passwordForm.showConfirmPassword ? 'text' : 'password'}
                    value={passwordForm.confirmPassword}
                    onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                    required
                    className={`w-full px-3 py-2 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                      passwordForm.confirmPassword && passwordForm.newPassword !== passwordForm.confirmPassword
                        ? 'border-red-300'
                        : 'border-gray-300'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('showConfirmPassword')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {passwordForm.showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                </div>
                {passwordForm.confirmPassword && passwordForm.newPassword !== passwordForm.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">
                    {language === 'en' ? 'Passwords do not match' : 'Şifreler eşleşmiyor'}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading || !passwordValidation.isValid || passwordForm.newPassword !== passwordForm.confirmPassword}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                <Save className="h-4 w-4 mr-2" />
                {isLoading 
                  ? (language === 'en' ? 'Updating...' : 'Güncelleniyor...')
                  : (language === 'en' ? 'Update Password' : 'Şifreyi Güncelle')
                }
              </button>
            </form>
          </div>
        </div>

        {/* Email Change Section */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center">
              <Mail className="h-6 w-6 text-gray-600 mr-3" />
              <h2 className="text-lg font-medium text-gray-900">
                {language === 'en' ? 'Change Email Address' : 'E-posta Adresini Değiştir'}
              </h2>
            </div>
          </div>
          <div className="p-6">
            <form onSubmit={handleEmailSubmit} className="space-y-6">
              {/* Current Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'en' ? 'Current Email' : 'Mevcut E-posta'}
                </label>
                <input
                  type="email"
                  value={emailForm.currentEmail}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
                />
              </div>

              {/* New Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'en' ? 'New Email Address' : 'Yeni E-posta Adresi'}
                </label>
                <input
                  type="email"
                  value={emailForm.newEmail}
                  onChange={(e) => handleEmailChange('newEmail', e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              {/* Password Confirmation */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'en' ? 'Current Password' : 'Mevcut Şifre'}
                </label>
                <div className="relative">
                  <input
                    type={emailForm.showPassword ? 'text' : 'password'}
                    value={emailForm.password}
                    onChange={(e) => handleEmailChange('password', e.target.value)}
                    required
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                  <button
                    type="button"
                    onClick={toggleEmailPasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {emailForm.showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  {language === 'en' 
                    ? 'Enter your current password to confirm the email change'
                    : 'E-posta değişikliğini onaylamak için mevcut şifrenizi girin'}
                </p>
              </div>

              <button
                type="submit"
                disabled={isLoading || !emailForm.newEmail || !emailForm.password}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                <Save className="h-4 w-4 mr-2" />
                {isLoading 
                  ? (language === 'en' ? 'Updating...' : 'Güncelleniyor...')
                  : (language === 'en' ? 'Update Email' : 'E-postayı Güncelle')
                }
              </button>
            </form>
          </div>
        </div>

        {/* Security Information */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start">
            <Settings className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium text-blue-900 mb-2">
                {language === 'en' ? 'Security Information' : 'Güvenlik Bilgileri'}
              </h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• {language === 'en' ? 'Your password should be at least 8 characters long' : 'Şifreniz en az 8 karakter uzunluğunda olmalıdır'}</li>
                <li>• {language === 'en' ? 'Use a combination of uppercase, lowercase, numbers, and special characters' : 'Büyük harf, küçük harf, rakam ve özel karakterlerin kombinasyonunu kullanın'}</li>
                <li>• {language === 'en' ? 'Never share your password with anyone' : 'Şifrenizi kimseyle paylaşmayın'}</li>
                <li>• {language === 'en' ? 'Change your password regularly for better security' : 'Daha iyi güvenlik için şifrenizi düzenli olarak değiştirin'}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
