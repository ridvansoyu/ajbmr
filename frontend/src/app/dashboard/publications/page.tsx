"use client";
import React, { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';

export default function PublicationsPage() {
	const { isAuthenticated, isReady } = useAuth();
	const { language } = useLanguage();
	const router = useRouter();

	useEffect(() => {
		if (!isReady) return;
		if (!isAuthenticated) router.replace('/submit');
	}, [isReady, isAuthenticated, router]);

	if (!isReady || !isAuthenticated) return null;

	return (
		<div className="bg-white pb-16">
			<div className="bg-primary-900 text-white py-10">
				<div className="container-custom">
					<h1 className="text-3xl md:text-4xl font-serif font-medium">{language === 'en' ? 'My Publications' : 'Yayınlarım'}</h1>
					<p className="text-gray-200 mt-2">{language === 'en' ? 'Coming soon: your submissions and published articles' : 'Yakında: gönderimleriniz ve yayımlanan makaleleriniz'}</p>
				</div>
			</div>
			<div className="container-custom py-10">
				<div className="max-w-3xl mx-auto bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
					<p className="text-gray-700">{language === 'en' ? 'We will list your manuscripts here.' : 'Makaleleriniz burada listelenecek.'}</p>
				</div>
			</div>
		</div>
	);
}


