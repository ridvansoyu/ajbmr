"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { dummyIssues, dummyArticles } from '@/data/dummyData';
import { Calendar, BookOpen, Download, ArrowLeft, Users, FileText } from 'lucide-react';

export default function IssuePage() {
  const params = useParams<{ volume: string; issue: string }>();
  const { t, language } = useLanguage();
  const volume = Number(params.volume);
  const issue = Number(params.issue);

  const currentIssue = dummyIssues.find((i) => i.volume === volume && i.issue === issue);
  if (!currentIssue) {
    return (
      <div className="container-custom py-16 text-center">
        <p className="text-gray-600">Issue not found.</p>
        <Link href="/issues" className="text-primary-600 hover:text-primary-700">{t('issues.view-all')}</Link>
      </div>
    );
  }

  const issueArticles = dummyArticles.filter((a) => currentIssue.articles.includes(a.id));

  return (
    <div className="bg-white pb-16">
      <div className="bg-primary-900 text-white py-12 md:py-16">
        <div className="container-custom">
          <Link href="/issues" className="inline-flex items-center text-gray-300 hover:text-white mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span>{language === 'en' ? 'Back to All Issues' : 'Tüm Sayılara Dön'}</span>
          </Link>

          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/3 lg:w-1/4">
              <div className="rounded-lg overflow-hidden shadow-lg">
                <Image src={currentIssue.coverImage} alt={language === 'en' ? currentIssue.title.en : currentIssue.title.tr} width={400} height={500} />
              </div>
            </div>
            <div className="md:w-2/3 lg:w-3/4">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-lg bg-white/10 px-3 py-1 rounded-full">{t('issues.volume')} {currentIssue.volume}</span>
                <span className="text-lg bg-white/10 px-3 py-1 rounded-full">{t('issues.issue')} {currentIssue.issue}</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-serif font-medium text-white mb-4">{language === 'en' ? currentIssue.title.en : currentIssue.title.tr}</h1>
              <div className="flex items-center text-gray-300 mb-6">
                <Calendar className="h-5 w-5 mr-2" />
                <span>{language === 'en' ? currentIssue.publishedDate.en : currentIssue.publishedDate.tr}</span>
              </div>
              <p className="text-xl text-gray-200 mb-6">{language === 'en' ? currentIssue.description.en : currentIssue.description.tr}</p>
              <div className="flex flex-wrap gap-4">
                <button className="btn bg-white/10 text-white hover:bg-white/20 inline-flex items-center">
                  <BookOpen className="h-4 w-4 mr-2" />
                  <span>{language === 'en' ? 'Read Online' : 'Çevrimiçi Oku'}</span>
                </button>
                <button className="btn bg-white/10 text-white hover:bg-white/20 inline-flex items-center">
                  <Download className="h-4 w-4 mr-2" />
                  <span>{language === 'en' ? 'Download PDF' : 'PDF İndir'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="py-12 md:py-16">
        <div className="container-custom">
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-serif font-medium mb-4">{t('issues.articles')}</h2>
            <div className="w-24 h-1 bg-primary-600" />
          </div>

          <div className="space-y-6">
            {issueArticles.map((article) => (
              <div key={article.id} className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/4 lg:w-1/5">
                    <div className="aspect-[3/2] rounded-md overflow-hidden">
                      <Image src={article.coverImage} alt={language === 'en' ? article.title.en : article.title.tr} width={400} height={266} className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <div className="md:w-3/4 lg:w-4/5">
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="text-xs font-medium text-secondary-600 bg-secondary-50 rounded-full px-2.5 py-0.5">{article.category}</span>
                      <span className="text-xs font-medium text-gray-600 bg-gray-100 rounded-full px-2.5 py-0.5">DOI: {article.doi}</span>
                    </div>
                    <Link href={`/article/${article.id}`}>
                      <h3 className="text-xl font-serif font-medium mb-3 text-primary-800 hover:text-primary-600 transition-colors">
                        {language === 'en' ? article.title.en : article.title.tr}
                      </h3>
                    </Link>
                    <div className="flex items-center text-gray-600 mb-4">
                      <Users className="h-4 w-4 mr-2" />
                      <span className="text-sm">{article.authors.join(', ')}</span>
                    </div>
                    <p className="text-gray-700 mb-4">{language === 'en' ? article.abstract.en.substring(0, 200) + '...' : article.abstract.tr.substring(0, 200) + '...'}</p>
                    <div className="flex flex-wrap gap-4">
                      <Link href={`/article/${article.id}`} className="btn btn-outline text-sm">
                        {language === 'en' ? 'Read Article' : 'Makaleyi Oku'}
                      </Link>
                      <button className="btn bg-gray-100 text-gray-700 hover:bg-gray-200 text-sm inline-flex items-center">
                        <Download className="h-4 w-4 mr-2" />
                        <span>PDF</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container-custom">
          <div className="mt-10 text-center">
            <Link href="/issues" className="btn btn-outline">
              {t('issues.view-all')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}


