"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { useNotification } from '@/context/NotificationContext';
import { Lock, Mail } from 'lucide-react';

interface LoginFormProps {
  onClose?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onClose }) => {
  const { loginWithJwt } = useAuth();
  const { language } = useLanguage();
  const { showSuccess, showError } = useNotification();
  const router = useRouter();

  const [formData, setFormData] = useState({ email: '', password: '' });

  const API = process.env.NEXT_PUBLIC_API_BASE_URL || '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('🔐 Login attempt started');
    console.log('📡 API URL:', API);
    console.log('📧 Email:', formData.email);
    
    try {
      console.log('🔄 Making token request...');
      const resp = await fetch(`${API}/api/users/token/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: formData.email, password: formData.password }),
      });
      
      console.log('📊 Token response status:', resp.status);
      
      if (!resp.ok) {
        const errorText = await resp.text();
        console.error('❌ Token request failed:', errorText);
        throw new Error(language === 'en' ? 'Invalid credentials' : 'Geçersiz kimlik bilgileri');
      }
      
      const { access, refresh } = await resp.json();
      console.log('✅ Token received:', { hasAccess: !!access, hasRefresh: !!refresh });
      
      // Fetch display name via profile endpoint
      console.log('🔄 Fetching profile data...');
      const me = await fetch(`${API}/api/users/profile/`, { 
        headers: { Authorization: `Bearer ${access}` } 
      });
      
      let displayName: string | undefined;
      if (me.ok) {
        const j = await me.json();
        const fn = (j.first_name || '').trim();
        const ln = (j.last_name || '').trim();
        displayName = `${fn} ${ln}`.trim();
        console.log('✅ Profile data received:', { fn, ln, displayName });
      } else {
        console.warn('⚠️ Profile request failed:', me.status);
      }
      
      console.log('➡️ Calling loginWithJwt...');
      loginWithJwt(formData.email, access, displayName, refresh);
      
      console.log('✅ Login successful, redirecting...');
      showSuccess('AUTH.LOGIN_SUCCESS');
      if (onClose) onClose();
      router.push('/dashboard');
    } catch (err: any) {
      console.error('❌ Login error:', err);
      showError('AUTH.LOGIN_ERROR');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          {language === 'en' ? 'Email' : 'E-posta'}
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder={language === 'en' ? 'Enter your email' : 'E-posta adresinizi girin'}
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          {language === 'en' ? 'Password' : 'Şifre'}
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
            className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder={language === 'en' ? 'Enter your password' : 'Şifrenizi girin'}
            required
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
      >
        {language === 'en' ? 'Sign In' : 'Giriş Yap'}
      </button>
    </form>
  );
};

export default LoginForm;