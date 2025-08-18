"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { Lock, Mail, AlertCircle } from 'lucide-react';

interface LoginFormProps {
  onClose?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onClose }) => {
  const { loginWithJwt } = useAuth();
  const { language } = useLanguage();
  const router = useRouter();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const API = process.env.NEXT_PUBLIC_API_BASE_URL || '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const resp = await fetch(`${API}/api/users/token/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: formData.email, password: formData.password }),
      });
      if (!resp.ok) throw new Error(language === 'en' ? 'Invalid credentials' : 'Geçersiz kimlik bilgileri');
      const { access, refresh } = await resp.json();
      // Fetch display name via profile endpoint
      const me = await fetch(`${API}/api/users/profile/`, { headers: { Authorization: `Bearer ${access}` } });
      let displayName: string | undefined;
      if (me.ok) {
        const j = await me.json();
        const fn = (j.first_name || '').trim();
        const ln = (j.last_name || '').trim();
        displayName = `${fn} ${ln}`.trim();
      }
      loginWithJwt(formData.email, access, displayName, refresh);
      if (onClose) onClose();
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || (language === 'en' ? 'Login failed' : 'Giriş başarısız'));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md flex items-center">
          <AlertCircle className="h-5 w-5 mr-2" />
          <span>{error}</span>
        </div>
      )}

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

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input type="checkbox" id="remember" className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500" />
          <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
            {language === 'en' ? 'Remember me' : 'Beni hatırla'}
          </label>
        </div>
        <a href="#" className="text-sm text-primary-600 hover:text-primary-700">
          {language === 'en' ? 'Forgot password?' : 'Şifremi unuttum?'}
        </a>
      </div>

      <button type="submit" className="w-full btn btn-primary">
        {language === 'en' ? 'Sign In' : 'Giriş Yap'}
      </button>
    </form>
  );
};

export default LoginForm;


