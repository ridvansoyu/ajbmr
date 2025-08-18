"use client";
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import ProfileForm from '@/components/profile/ProfileForm';

export default function ProfilePage() {
	const { language } = useLanguage();
	return (
		<div className="bg-white pb-16">
			<div className="bg-primary-900 text-white py-10">
				<div className="container-custom">
					<h1 className="text-3xl md:text-4xl font-serif font-medium text-white">{language === 'en' ? 'Profile Information' : 'Profil Bilgileri'}</h1>
					<p className="text-gray-200 mt-2">{language === 'en' ? 'View and update your personal details' : 'Kişisel bilgilerinizi görüntüleyin ve güncelleyin'}</p>
				</div>
			</div>
			<div className="container-custom py-10">
				<div className="max-w-3xl mx-auto bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
					<ProfileForm />
				</div>
			</div>
		</div>
	);
}


