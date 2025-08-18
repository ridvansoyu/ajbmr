"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import LoginForm from '@/components/auth/LoginForm';
import { Upload, CheckCircle, User, BookOpen, Lock, FileText, HelpCircle } from 'lucide-react';

export default function SubmitPage() {
  const { t, language } = useLanguage();
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="bg-white pb-16">
      <div className="bg-primary-900 text-white py-12 md:py-16">
        <div className="container-custom">
          <h1 className="text-3xl md:text-5xl font-serif font-medium text-white mb-6">{t('submit.title')}</h1>
          <p className="text-xl text-gray-200 max-w-3xl">
            {language === 'en'
              ? 'Submit your manuscript for consideration in our peer-reviewed journal. Please read our guidelines before submitting.'
              : 'Makalenizi hakemli dergimizde değerlendirilmek üzere gönderin. Lütfen göndermeden önce kurallarımızı okuyun.'}
          </p>
        </div>
      </div>

      <section className="py-12 md:py-16">
        <div className="container-custom">
          <div className="mb-12 text-center">
            <h2 className="text-2xl md:text-3xl font-serif font-medium mb-4">{language === 'en' ? 'Submission Process' : 'Gönderim Süreci'}</h2>
            <div className="w-24 h-1 bg-primary-600 mx-auto mb-8"></div>
            <p className="text-gray-700 max-w-3xl mx-auto">
              {language === 'en'
                ? 'Our journal uses an online manuscript submission and tracking system through OJS Cloud. Follow these steps to submit your manuscript.'
                : 'Dergimiz, OJS Cloud aracılığıyla çevrimiçi makale gönderimi ve takip sistemi kullanmaktadır. Makalenizi göndermek için şu adımları izleyin.'}
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="relative">
              <div className="absolute left-16 top-0 h-full w-1 bg-gray-200 hidden md:block"></div>
              <div className="space-y-12">
                <div className="relative flex flex-col md:flex-row">
                  <div className="md:w-32 flex items-center justify-center">
                    <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center text-white relative z-10">
                      <User className="h-8 w-8" />
                    </div>
                  </div>
                  <div className="pt-4 md:pt-0 md:ml-8 flex-1">
                    <h3 className="text-xl font-medium mb-4">{language === 'en' ? 'Register or Log In' : 'Kayıt Olun veya Giriş Yapın'}</h3>
                    <p className="text-gray-700 mb-6">{language === 'en' ? 'You need to have an account in our system to submit a manuscript...' : 'Makale göndermek için sistemimizde bir hesabınızın olması gerekir...'}</p>
                    <div className="flex flex-wrap gap-4">
                      <button onClick={() => setShowLogin(true)} className="btn btn-primary">{t('submit.login')}</button>
                      <Link href="/register" className="btn btn-outline">{t('submit.register')}</Link>
                    </div>
                  </div>
                </div>

                <div className="relative flex flex-col md:flex-row">
                  <div className="md:w-32 flex items-center justify-center">
                    <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center text-white relative z-10">
                      <BookOpen className="h-8 w-8" />
                    </div>
                  </div>
                  <div className="pt-4 md:pt-0 md:ml-8 flex-1">
                    <h3 className="text-xl font-medium mb-4">{language === 'en' ? 'Read Guidelines' : 'Kuralları Okuyun'}</h3>
                    <p className="text-gray-700 mb-6">{language === 'en' ? 'Before submitting, make sure you have read our author guidelines...' : 'Göndermeden önce, yazar kurallarımızı okuduğunuzdan...'}</p>
                    <Link href="/guidelines" className="btn btn-outline inline-flex items-center">
                      <FileText className="h-4 w-4 mr-2" />
                      <span>{t('submit.author-guidelines')}</span>
                    </Link>
                  </div>
                </div>

                <div className="relative flex flex-col md:flex-row">
                  <div className="md:w-32 flex items-center justify-center">
                    <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center text-white relative z-10">
                      <CheckCircle className="h-8 w-8" />
                    </div>
                  </div>
                  <div className="pt-4 md:pt-0 md:ml-8 flex-1">
                    <h3 className="text-xl font-medium mb-4">{language === 'en' ? 'Complete Submission Checklist' : 'Gönderim Kontrol Listesini Tamamlayın'}</h3>
                    <p className="text-gray-700 mb-6">{language === 'en' ? 'Ensure your submission meets all the requirements...' : 'Gönderiminizin ... tüm gereksinimleri karşıladığından emin olun.'}</p>
                    <Link href="/guidelines#submission-checklist" className="btn btn-outline inline-flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      <span>{t('submit.submission-checklist')}</span>
                    </Link>
                  </div>
                </div>

                <div className="relative flex flex-col md:flex-row">
                  <div className="md:w-32 flex items-center justify-center">
                    <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center text-white relative z-10">
                      <Upload className="h-8 w-8" />
                    </div>
                  </div>
                  <div className="pt-4 md:pt-0 md:ml-8 flex-1">
                    <h3 className="text-xl font-medium mb-4">{language === 'en' ? 'Upload Your Manuscript' : 'Makalenizi Yükleyin'}</h3>
                    <p className="text-gray-700 mb-6">{language === 'en' ? 'Follow the system prompts to upload your manuscript...' : 'Makalenizi ve tüm ek dosyaları yüklemek için...'}</p>
                    <button onClick={() => setShowLogin(true)} className="btn btn-primary inline-flex items-center">
                      <Upload className="h-4 w-4 mr-2" />
                      <span>{language === 'en' ? 'Start Submission' : 'Gönderime Başla'}</span>
                    </button>
                  </div>
                </div>

                <div className="relative flex flex-col md:flex-row">
                  <div className="md:w-32 flex items-center justify-center">
                    <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center text-white relative z-10">
                      <Lock className="h-8 w-8" />
                    </div>
                  </div>
                  <div className="pt-4 md:pt-0 md:ml-8 flex-1">
                    <h3 className="text-xl font-medium mb-4">{language === 'en' ? 'Track Your Submission' : 'Gönderiminizi Takip Edin'}</h3>
                    <p className="text-gray-700 mb-6">{language === 'en' ? 'After submission, you can track the status...' : 'Gönderimden sonra, yazar hesabınız aracılığıyla...'}</p>
                    <button onClick={() => setShowLogin(true)} className="btn btn-outline inline-flex items-center">
                      <Lock className="h-4 w-4 mr-2" />
                      <span>{language === 'en' ? 'Check Submission Status' : 'Gönderim Durumunu Kontrol Et'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

		<section className="py-12 md:py-16 bg-gray-50">
			<div className="container-custom">
				<div className="flex flex-col lg:flex-row items-center gap-12">
					<div className="lg:w-1/2">
						<Image
							src="https://images.pexels.com/photos/6476584/pexels-photo-6476584.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
							alt="OJS Cloud System"
							width={1260}
							height={750}
							className="rounded-lg shadow-lg"
						/>
					</div>
					<div className="lg:w-1/2">
						<h2 className="text-2xl md:text-3xl font-serif font-medium mb-6">
							{language === 'en' ? 'OJS Cloud Integration' : 'OJS Cloud Entegrasyonu'}
						</h2>
						<p className="text-gray-700 mb-4">
							{language === 'en'
								? 'Our journal uses Open Journal Systems (OJS) Cloud, a comprehensive manuscript management system that streamlines the entire editorial process from submission to publication.'
								: 'Dergimiz, gönderimden yayına kadar tüm editöryal süreci kolaylaştıran kapsamlı bir makale yönetim sistemi olan Open Journal Systems (OJS) Cloud kullanmaktadır.'}
						</p>
						<p className="text-gray-700 mb-6">
							{language === 'en'
								? 'This system allows authors to submit manuscripts online, track their progress through the review process, and communicate with editors and reviewers. It also facilitates efficient peer review management and editorial decision-making.'
								: 'Bu sistem, yazarların çevrimiçi olarak makale göndermesine, inceleme sürecindeki ilerlemelerini takip etmesine ve editörler ve hakemlerle iletişim kurmasına olanak tanır. Ayrıca, verimli hakem değerlendirmesi yönetimini ve editoryal karar vermeyi kolaylaştırır.'}
						</p>
						<div className="space-y-4">
							<div className="flex items-start">
								<CheckCircle className="h-5 w-5 text-primary-600 mt-0.5 mr-3 flex-shrink-0" />
								<p className="text-gray-700">{language === 'en' ? 'Secure and encrypted file transfer' : 'Güvenli ve şifrelenmiş dosya transferi'}</p>
							</div>
							<div className="flex items-start">
								<CheckCircle className="h-5 w-5 text-primary-600 mt-0.5 mr-3 flex-shrink-0" />
								<p className="text-gray-700">{language === 'en' ? 'Real-time submission tracking' : 'Gerçek zamanlı gönderim takibi'}</p>
							</div>
							<div className="flex items-start">
								<CheckCircle className="h-5 w-5 text-primary-600 mt-0.5 mr-3 flex-shrink-0" />
								<p className="text-gray-700">{language === 'en' ? 'Automated email notifications' : 'Otomatik e-posta bildirimleri'}</p>
							</div>
							<div className="flex items-start">
								<CheckCircle className="h-5 w-5 text-primary-600 mt-0.5 mr-3 flex-shrink-0" />
								<p className="text-gray-700">{language === 'en' ? 'Integrated communication tools' : 'Entegre iletişim araçları'}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>

      <section className="py-12">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto bg-primary-50 rounded-lg p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="md:w-1/4 flex justify-center">
                <div className="bg-primary-100 rounded-full p-6">
                  <HelpCircle className="h-16 w-16 text-primary-600" />
                </div>
              </div>
              <div className="md:w-3/4">
                <h3 className="text-xl font-medium mb-4 text-primary-800">{language === 'en' ? 'Need Assistance?' : 'Yardıma mı İhtiyacınız Var?'}</h3>
                <p className="text-gray-700 mb-6">{language === 'en' ? 'If you encounter any issues during the submission process...' : 'Gönderim süreci sırasında herhangi bir sorunla karşılaşırsanız...'}</p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/contact" className="btn btn-primary">{language === 'en' ? 'Contact Editorial Office' : 'Yayın Ofisiyle İletişime Geçin'}</Link>
                  <a href="#" className="btn btn-outline">{language === 'en' ? 'View FAQs' : "SSS'leri Görüntüle"}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {showLogin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowLogin(false)} />
          <div className="relative bg-white w-full max-w-md mx-auto rounded-lg shadow-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">
                {language === 'en' ? 'Sign in' : 'Giriş Yap'}
              </h3>
              <button
                aria-label="Close"
                onClick={() => setShowLogin(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <LoginForm onClose={() => setShowLogin(false)} />
            <div className="mt-4 text-center text-sm">
              <span className="text-gray-600">
                {language === 'en' ? "Don't have an account?" : 'Hesabınız yok mu?'}
              </span>{' '}
              <Link href="/register" className="text-primary-600 hover:text-primary-700 font-medium">
                {t('submit.register')}
              </Link>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-200 text-center text-xs text-gray-600">
              {language === 'en'
                ? 'By logging in, you agree to our Terms of Service and Privacy Policy.'
                : 'Giriş yaparak Hizmet Şartlarımızı ve Gizlilik Politikamızı kabul etmiş olursunuz.'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


