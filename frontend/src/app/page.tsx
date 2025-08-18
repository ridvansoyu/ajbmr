"use client";
import Link from 'next/link';
import Image from 'next/image';
import { Download, Calendar, Clock, FileText, TrendingUp } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import ArticleCard from '@/components/articles/ArticleCard';
import { dummyArticles } from '@/data/dummyData';

export default function Home() {
  const { t, language } = useLanguage();
  const latestArticles = dummyArticles.slice(0, 4);

  return (
    <div>
      <section className="bg-gradient-to-r from-primary-900 to-primary-800 text-white py-16 md:py-24">
        <div className="container-custom mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-white leading-tight">{t('home.title')}</h1>
              <p className="text-xl text-gray-200">{t('home.subtitle')}</p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link href="/submit" className="btn bg-accent-500 text-primary-900 hover:bg-accent-600">
                  {t('home.submit-manuscript')}
                </Link>
                <Link href="/issues" className="btn bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm">
                  {t('home.current-issue')}
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-64 h-64 bg-secondary-500/20 rounded-full blur-3xl" />
                <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-accent-400/20 rounded-full blur-3xl" />
                <Image
                  src="https://images.pexels.com/photos/256520/pexels-photo-256520.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Academic Journal"
                  width={1260}
                  height={750}
                  className="w-full h-auto rounded-lg shadow-2xl relative z-10"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container-custom mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-serif font-medium mb-4">{t('home.latest-articles')}</h2>
            <div className="w-24 h-1 bg-primary-600 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {latestArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/issues" className="btn btn-outline">
              {t('issues.view-all')}
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container-custom mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-serif font-medium mb-4">{t('home.journal-metrics')}</h2>
            <div className="w-24 h-1 bg-primary-600 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-primary-50 text-primary-600 rounded-full mb-4">
                <TrendingUp className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium mb-2">{t('home.acceptance-rate')}</h3>
              <p className="text-3xl font-bold text-primary-600">34%</p>
              <p className="text-sm text-gray-500 mt-2">{language === 'en' ? 'Based on 2024 submissions' : '2024 başvurularına göre'}</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-primary-50 text-primary-600 rounded-full mb-4">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium mb-2">{t('home.time-to-first-decision')}</h3>
              <p className="text-3xl font-bold text-primary-600">4.2 {language === 'en' ? 'weeks' : 'hafta'}</p>
              <p className="text-sm text-gray-500 mt-2">{language === 'en' ? 'Average processing time' : 'Ortalama işlem süresi'}</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-primary-50 text-primary-600 rounded-full mb-4">
                <Calendar className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium mb-2">{t('home.time-to-publication')}</h3>
              <p className="text-3xl font-bold text-primary-600">8.5 {language === 'en' ? 'weeks' : 'hafta'}</p>
              <p className="text-sm text-gray-500 mt-2">{language === 'en' ? 'After acceptance' : 'Kabul sonrası'}</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-primary-50 text-primary-600 rounded-full mb-4">
                <FileText className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium mb-2">{t('home.published-issues')}</h3>
              <p className="text-3xl font-bold text-primary-600">36</p>
              <p className="text-sm text-gray-500 mt-2">{language === 'en' ? 'Since 2015' : "2015'ten beri"}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container-custom mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-serif font-medium mb-4">{t('home.announcements')}</h2>
            <div className="w-24 h-1 bg-primary-600 mx-auto" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
              <div className="text-sm text-gray-500 mb-4">{language === 'en' ? 'June 15, 2024' : '15 Haziran 2024'}</div>
              <h3 className="text-xl font-serif font-medium mb-3">
                {language === 'en' ? 'Call for Papers: Special Issue on Sustainability' : 'Makale Çağrısı: Sürdürülebilirlik Özel Sayısı'}
              </h3>
              <p className="text-gray-600 mb-4">
                {language === 'en'
                  ? 'We are accepting submissions for our upcoming special issue on sustainability and environmental sciences.'
                  : 'Yaklaşan sürdürülebilirlik ve çevre bilimleri özel sayımız için makale başvurularını kabul ediyoruz.'}
              </p>
              <Link href="#" className="text-primary-600 font-medium hover:text-primary-700 inline-flex items-center mt-auto">
                {t('home.read-more')}
                <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>

            <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
              <div className="text-sm text-gray-500 mb-4">{language === 'en' ? 'May 28, 2024' : '28 Mayıs 2024'}</div>
              <h3 className="text-xl font-serif font-medium mb-3">
                {language === 'en' ? 'Journal Now Indexed in Scopus' : "Dergi Artık Scopus'ta İndeksleniyor"}
              </h3>
              <p className="text-gray-600 mb-4">
                {language === 'en'
                  ? 'We are pleased to announce that our journal has been accepted for indexing in Scopus starting from Volume 9.'
                  : "Dergimizin 9. Cilt'ten itibaren Scopus'ta indekslenmeye kabul edildiğini duyurmaktan memnuniyet duyarız."}
              </p>
              <Link href="#" className="text-primary-600 font-medium hover:text-primary-700 inline-flex items-center mt-auto">
                {t('home.read-more')}
                <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>

            <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
              <div className="text-sm text-gray-500 mb-4">{language === 'en' ? 'April 10, 2024' : '10 Nisan 2024'}</div>
              <h3 className="text-xl font-serif font-medium mb-3">
                {language === 'en' ? 'Updated Author Guidelines Released' : 'Güncellenmiş Yazar Rehberi Yayınlandı'}
              </h3>
              <p className="text-gray-600 mb-4">
                {language === 'en'
                  ? 'We have updated our author guidelines and manuscript templates for 2024. Please review before submitting.'
                  : '2024 için yazar rehberi ve makale şablonlarımızı güncelledik. Lütfen göndermeden önce inceleyiniz.'}
              </p>
              <Link href="/guidelines" className="text-primary-600 font-medium hover:text-primary-700 inline-flex items-center mt-auto">
                {t('home.read-more')}
                <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-accent-50">
        <div className="container-custom mx-auto">
          <div className="bg-accent-500 rounded-lg shadow-lg overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-2/3 p-8 lg:p-12">
                <h2 className="text-2xl lg:text-3xl font-serif font-medium text-primary-900 mb-4">
                  {language === 'en' ? 'Ready to contribute to the academic community?' : 'Akademik topluluğa katkıda bulunmaya hazır mısınız?'}
                </h2>
                <p className="text-primary-900 mb-6 text-lg">
                  {language === 'en'
                    ? 'Submit your manuscript today and join our community of researchers contributing to the advancement of knowledge.'
                    : 'Makalenizi bugün gönderin ve bilginin ilerlemesine katkıda bulunan araştırmacı topluluğumuza katılın.'}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/submit" className="btn bg-primary-800 text-white hover:bg-primary-900">
                    {t('home.submit-manuscript')}
                  </Link>
                  <Link href="/guidelines" className="btn bg-white text-primary-900 hover:bg-gray-100">
                    <Download className="h-4 w-4 mr-2" />
                    {t('guidelines.download-template')}
                  </Link>
                </div>
              </div>
              <div className="lg:w-1/3 bg-primary-900 flex items-center justify-center p-8 lg:p-0">
                <Image
                  src="https://images.pexels.com/photos/590493/pexels-photo-590493.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Research"
                  width={1260}
                  height={750}
                  className="w-full h-full object-cover rounded-lg lg:rounded-none"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


