"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { Mail, Lock, User, Building2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const RegisterForm: React.FC = () => {
	const { language } = useLanguage();
	const { loginWithJwt } = useAuth();
	const router = useRouter();
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		confirmPassword: '',
		affiliation: '',
		consent: false,
	});
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	const API = process.env.NEXT_PUBLIC_API_BASE_URL || '';

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError('');
		setSuccess('');

		if (formData.password.length < 6) {
			setError(language === 'en' ? 'Password must be at least 6 characters.' : 'Şifre en az 6 karakter olmalıdır.');
			return;
		}
		if (formData.password !== formData.confirmPassword) {
			setError(language === 'en' ? 'Passwords do not match.' : 'Şifreler eşleşmiyor.');
			return;
		}
		if (!formData.consent) {
			setError(language === 'en' ? 'Please accept the terms to continue.' : 'Devam etmek için şartları kabul edin.');
			return;
		}

		try {
			const reg = await fetch(`${API}/api/users/register/`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					email: formData.email,
					password: formData.password,
					first_name: formData.firstName,
					last_name: formData.lastName,
					organization: formData.affiliation,
					biography: '',
				}),
			});
			if (!reg.ok) {
				const j = await reg.json().catch(() => ({} as any));
				throw new Error((j && (j.email?.[0] || j.detail)) || (language === 'en' ? 'Registration failed' : 'Kayıt başarısız'));
			}

			const tok = await fetch(`${API}/api/users/token/`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ username: formData.email, password: formData.password }),
			});
			if (!tok.ok) throw new Error(language === 'en' ? 'Login failed' : 'Giriş başarısız');
			const { access, refresh } = await tok.json();
			const displayName = `${formData.firstName} ${formData.lastName}`.trim();
			loginWithJwt(formData.email, access, displayName, refresh);

			// Persist initial profile values immediately
			await fetch(`${API}/api/users/profile/`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${access}` },
				body: JSON.stringify({
					first_name: formData.firstName,
					last_name: formData.lastName,
					affiliation: formData.affiliation,
				}),
			});
			router.push('/dashboard');
		} catch (err: any) {
			setError(err.message || (language === 'en' ? 'Registration failed.' : 'Kayıt başarısız.'));
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
			{success && (
				<div className="bg-green-50 text-green-700 p-3 rounded-md flex items-center">
					<CheckCircle2 className="h-5 w-5 mr-2" />
					<span>{success}</span>
				</div>
			)}

			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
				<div>
					<label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
						{language === 'en' ? 'First name' : 'Ad'}
					</label>
					<div className="relative">
						<User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
						<input
							type="text"
							id="firstName"
							value={formData.firstName}
							onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
							className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
							required
						/>
					</div>
				</div>
				<div>
					<label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
						{language === 'en' ? 'Last name' : 'Soyad'}
					</label>
					<div className="relative">
						<User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
						<input
							type="text"
							id="lastName"
							value={formData.lastName}
							onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
							className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
							required
						/>
					</div>
				</div>
			</div>

			<div>
				<label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
					{language === 'en' ? 'Email' : 'E-posta'}
				</label>
				<div className="relative">
					<Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
					<input
						type="email"
						id="email"
						value={formData.email}
						onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
						className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
						required
					/>
				</div>
			</div>

			<div>
				<label htmlFor="affiliation" className="block text-sm font-medium text-gray-700 mb-1">
					{language === 'en' ? 'Affiliation (optional)' : 'Kurum (isteğe bağlı)'}
				</label>
				<div className="relative">
					<Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
					<input
						type="text"
						id="affiliation"
						value={formData.affiliation}
						onChange={(e) => setFormData(prev => ({ ...prev, affiliation: e.target.value }))}
						className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
					/>
				</div>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
				<div>
					<label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
						{language === 'en' ? 'Password' : 'Şifre'}
					</label>
					<div className="relative">
						<Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
						<input
							type="password"
							id="password"
							value={formData.password}
							onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
							className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
							required
						/>
					</div>
				</div>
				<div>
					<label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
						{language === 'en' ? 'Confirm password' : 'Şifreyi doğrulayın'}
					</label>
					<div className="relative">
						<Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
						<input
							type="password"
							id="confirmPassword"
							value={formData.confirmPassword}
							onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
							className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
							required
						/>
					</div>
				</div>
			</div>

			<div className="flex items-start space-x-2">
				<input
					type="checkbox"
					id="consent"
					checked={formData.consent}
					onChange={(e) => setFormData(prev => ({ ...prev, consent: e.target.checked }))}
					className="mt-1 h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
				/>
				<label htmlFor="consent" className="text-sm text-gray-700">
					{language === 'en'
						? 'By registering, you agree to our Terms of Service and Privacy Policy.'
						: 'Kayıt olarak Hizmet Şartlarımızı ve Gizlilik Politikamızı kabul edersiniz.'}
				</label>
			</div>

			<button type="submit" className="w-full btn btn-primary">
				{language === 'en' ? 'Create account' : 'Hesap oluştur'}
			</button>
		</form>
	);
};

export default RegisterForm;


