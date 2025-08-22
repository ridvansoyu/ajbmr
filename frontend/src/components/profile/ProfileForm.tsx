"use client";
import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { User, Mail, Phone, Building2, CalendarClock, Type, UserCircle2, FileText, PhoneCall, CheckCircle2, AlertCircle } from 'lucide-react';

type ProfileData = {
	firstName: string;
	lastName: string;
	email: string;
	title: string;
	organization: string;
	mobilePhone: string;
	workPhone: string;
	gender: string;
	birthDate: string; // ISO yyyy-mm-dd
	biography: string;
};

const ProfileForm: React.FC = () => {
	const { language } = useLanguage();
	const { user, isAuthenticated, isReady, accessToken } = useAuth();
	const [saved, setSaved] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<ProfileData>({
		firstName: '',
		lastName: '',
		email: '',
		title: '',
		organization: '',
		mobilePhone: '',
		workPhone: '',
		gender: '',
		birthDate: '',
		biography: '',
	});

	const API = process.env.NEXT_PUBLIC_API_BASE_URL || '';

	useEffect(() => {
		// Only fetch profile data when auth is ready and user is authenticated
		if (!isReady) {
			console.log('⏳ Auth not ready yet');
			return;
		}
		
		if (!isAuthenticated || !accessToken) {
			console.log('❌ Not authenticated or no access token:', { isAuthenticated, hasToken: !!accessToken });
			setLoading(false);
			return;
		}

		console.log('🔄 Fetching profile data...');
		(async () => {
			try {
				setLoading(true);
				const r = await fetch(`${API}/api/users/profile/`, {
					headers: { Authorization: `Bearer ${accessToken}` },
				});
				console.log('📊 Profile response status:', r.status);
				
				if (r.ok) {
					const j = await r.json();
					console.log('✅ Profile data received:', j);
					setData((prev) => ({
						...prev,
						email: user?.email || prev.email,
						firstName: (j.first_name || user?.username || prev.firstName),
						lastName: (j.last_name || prev.lastName),
						organization: j.affiliation || '',
						mobilePhone: j.mobile_phone || '',
						workPhone: j.work_phone || '',
						gender: j.gender || '',
						birthDate: j.birth_date || '',
						biography: j.bio || '',
						title: j.title || '',
					}));
				} else {
					console.error('❌ Failed to fetch profile:', r.status, r.statusText);
				}
			} catch (err) {
				console.error('❌ Error fetching profile:', err);
			} finally {
				setLoading(false);
			}
		})();
	}, [isReady, isAuthenticated, accessToken, user?.email, user?.username, API]);

	const onChange = (field: keyof ProfileData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		setData((prev) => ({ ...prev, [field]: e.target.value }));
	};

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError('');
		setSaved('');
		
		if (!isAuthenticated || !accessToken) {
			setError(language === 'en' ? 'You must be logged in to save your profile.' : 'Profilinizi kaydetmek için giriş yapmalısınız.');
			return;
		}

		try {
			const r = await fetch(`${API}/api/users/profile/`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${accessToken}`,
				},
				body: JSON.stringify({
					first_name: data.firstName,
					last_name: data.lastName,
					affiliation: data.organization,
					bio: data.biography,
					mobile_phone: data.mobilePhone,
					work_phone: data.workPhone,
					gender: data.gender,
					birth_date: data.birthDate || null,
					title: data.title,
				}),
			});
			if (!r.ok) throw new Error('Save failed');
			setSaved(language === 'en' ? 'Profile saved successfully.' : 'Profil başarıyla kaydedildi.');
		} catch (err) {
			setError(language === 'en' ? 'Failed to save profile.' : 'Profil kaydedilemedi.');
		}
	};

	// Show loading state while auth is being determined
	if (!isReady || loading) {
		return (
			<div className="flex items-center justify-center py-8">
				<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
				<span className="ml-2 text-gray-600">
					{language === 'en' ? 'Loading profile...' : 'Profil yükleniyor...'}
				</span>
			</div>
		);
	}

	// Show message if not authenticated
	if (!isAuthenticated) {
		return (
			<div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
				<AlertCircle className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
				<h3 className="text-lg font-medium text-yellow-800 mb-2">
					{language === 'en' ? 'Authentication Required' : 'Kimlik Doğrulama Gerekli'}
				</h3>
				<p className="text-yellow-700">
					{language === 'en' 
						? 'You must be logged in to view and edit your profile.' 
						: 'Profilinizi görüntülemek ve düzenlemek için giriş yapmalısınız.'}
				</p>
			</div>
		);
	}

	return (
		<form onSubmit={onSubmit} className="space-y-6">
			{(() => {
				const total = 10; // fields considered in completeness
				const filled = [
					data.firstName,
					data.lastName,
					data.email,
					data.title,
					data.organization,
					data.mobilePhone,
					data.workPhone,
					data.gender,
					data.birthDate,
					data.biography,
				].filter(v => (typeof v === 'string' ? v.trim().length > 0 : Boolean(v))).length;
				const pct = Math.round((filled / total) * 100);
				return (
					<div className="rounded-lg border border-gray-200 p-4 bg-white">
						<div className="flex items-center justify-between mb-2">
							<span className="text-sm font-medium">{language === 'en' ? 'Profile completeness' : 'Profil tamamlama'}</span>
							<span className="text-sm text-gray-600">{pct}%</span>
						</div>
						<div className="w-full bg-gray-200 rounded h-2 overflow-hidden">
							<div className="h-2 bg-primary-600 transition-all" style={{ width: `${pct}%` }} />
						</div>
						<p className="text-xs text-gray-500 mt-2">
							{language === 'en'
								? 'Fill in your name, contact, organization, and biography to complete your profile.'
								: 'Profilinizi tamamlamak için ad, iletişim, kurum ve biyografi bilgilerinizi doldurun.'}
						</p>
					</div>
				);
			})()}
			{saved && (
				<div className="bg-green-50 text-green-700 p-3 rounded-md flex items-center">
					<CheckCircle2 className="h-5 w-5 mr-2" />
					<span>{saved}</span>
				</div>
			)}
			{error && (
				<div className="bg-red-50 text-red-600 p-3 rounded-md flex items-center">
					<AlertCircle className="h-5 w-5 mr-2" />
					<span>{error}</span>
				</div>
			)}

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">{language === 'en' ? 'First name' : 'Ad'}</label>
					<div className="relative">
						<User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
						<input value={data.firstName} onChange={onChange('firstName')} className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500" />
					</div>
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">{language === 'en' ? 'Last name' : 'Soyad'}</label>
					<div className="relative">
						<UserCircle2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
						<input value={data.lastName} onChange={onChange('lastName')} className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500" />
					</div>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">{language === 'en' ? 'Email' : 'E-posta'}</label>
					<div className="relative">
						<Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
						<input type="email" value={data.email} onChange={onChange('email')} className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500" />
					</div>
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">{language === 'en' ? 'Title' : 'Unvan'}</label>
					<div className="relative">
						<Type className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
						<input value={data.title} onChange={onChange('title')} className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500" placeholder={language === 'en' ? 'Prof., Dr., Mr., Ms., ...' : 'Prof., Dr., Bay, Bayan, ...'} />
					</div>
				</div>
			</div>

			<div>
				<label className="block text-sm font-medium text-gray-700 mb-1">{language === 'en' ? 'Organization' : 'Kurum'}</label>
				<div className="relative">
					<Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
					<input value={data.organization} onChange={onChange('organization')} className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500" />
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">{language === 'en' ? 'Mobile phone' : 'Cep telefonu'}</label>
					<div className="relative">
						<Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
						<input value={data.mobilePhone} onChange={onChange('mobilePhone')} className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500" placeholder={language === 'en' ? '+90 5xx xxx xx xx' : '+90 5xx xxx xx xx'} />
					</div>
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">{language === 'en' ? 'Work/School phone' : 'İş/Okul telefonu'}</label>
					<div className="relative">
						<PhoneCall className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
						<input value={data.workPhone} onChange={onChange('workPhone')} className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500" />
					</div>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">{language === 'en' ? 'Gender' : 'Cinsiyet'}</label>
					<select value={data.gender} onChange={onChange('gender')} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500">
						<option value="">{language === 'en' ? 'Select' : 'Seçin'}</option>
						<option value="female">{language === 'en' ? 'Female' : 'Kadın'}</option>
						<option value="male">{language === 'en' ? 'Male' : 'Erkek'}</option>
						<option value="other">{language === 'en' ? 'Other' : 'Diğer'}</option>
					</select>
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">{language === 'en' ? 'Birth date' : 'Doğum tarihi'}</label>
					<div className="relative">
						<CalendarClock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
						<input type="date" value={data.birthDate} onChange={onChange('birthDate')} className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500" />
					</div>
				</div>
			</div>

			<div>
				<label className="block text-sm font-medium text-gray-700 mb-1">{language === 'en' ? 'Biography' : 'Biyografi'}</label>
				<div className="relative">
					<FileText className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
					<textarea value={data.biography} onChange={onChange('biography')} rows={5} className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500" placeholder={language === 'en' ? 'Tell us about yourself...' : 'Kendinizden bahsedin...'} />
				</div>
			</div>

			<div className="flex justify-end">
				<button type="submit" className="btn btn-primary">
					{language === 'en' ? 'Save changes' : 'Değişiklikleri kaydet'}
				</button>
			</div>
		</form>
	);
};

export default ProfileForm;