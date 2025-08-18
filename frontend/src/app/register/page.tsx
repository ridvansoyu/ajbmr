"use client";
import React, { useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import RegisterForm from '@/components/auth/RegisterForm';
import { UserPlus } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
	const { language } = useLanguage();
	const { isAuthenticated } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (isAuthenticated) router.replace('/dashboard');
	}, [isAuthenticated, router]);

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8">
				<div className="text-center">
					<div className="flex justify-center">
						<div className="bg-primary-600 p-3 rounded-full">
							<UserPlus className="h-8 w-8 text-white" />
						</div>
					</div>
					<h2 className="mt-6 text-3xl font-bold text-gray-900">
						{language === 'en' ? 'Create your account' : 'Hesabınızı oluşturun'}
					</h2>
					<p className="mt-2 text-sm text-gray-600">
						{language === 'en' ? 'Join our academic journal platform' : 'Akademik dergi platformumuza katılın'}
					</p>
				</div>

				<div className="bg-white py-8 px-6 shadow-lg rounded-lg border border-gray-200">
					<RegisterForm />
				</div>

				<div className="text-center text-sm text-gray-600">
					{language === 'en' ? 'Already have an account?' : 'Zaten bir hesabınız var mı?'}{' '}
					<a href="/login" className="text-primary-600 hover:text-primary-700">{language === 'en' ? 'Sign in' : 'Giriş yapın'}</a>
				</div>
			</div>
		</div>
	);
}


