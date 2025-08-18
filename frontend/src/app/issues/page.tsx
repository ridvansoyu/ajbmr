"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { dummyIssues } from '@/data/dummyData';
import { Calendar, FileText, ChevronRight, Search } from 'lucide-react';
import { useMemo, useState } from 'react';

export default function IssuesPage() {
  const { t, language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');

  const { issuesByVolume, sortedVolumes, filteredVolumes } = useMemo(() => {
    const grouped = dummyIssues.reduce((acc: Record<number, typeof dummyIssues>, issue) => {
      (acc[issue.volume] ||= []).push(issue);
      return acc;
    }, {} as Record<number, typeof dummyIssues>);
    const volumes = Object.keys(grouped).map(Number).sort((a, b) => b - a);
    const filtered = searchTerm.trim()
      ? volumes.filter((volume) => {
          const issues = grouped[volume];
          const search = searchTerm.toLowerCase();
          return issues.some((issue) => {
            const titleEn = issue.title.en.toLowerCase();
            const titleTr = issue.title.tr.toLowerCase();
            const descEn = issue.description.en.toLowerCase();
            const descTr = issue.description.tr.toLowerCase();
            return (
              titleEn.includes(search) ||
              titleTr.includes(search) ||
              descEn.includes(search) ||
              descTr.includes(search) ||
              `volume ${volume}`.includes(search) ||
              `cilt ${volume}`.includes(search) ||
              issues.some((i) => `issue ${i.issue}`.includes(search) || `sayı ${i.issue}`.includes(search))
            );
          });
        })
      : volumes;
    return { issuesByVolume: grouped, sortedVolumes: volumes, filteredVolumes: filtered };
  }, [searchTerm]);

  return (
    <div className="bg-white pb-16">
      <div className="bg-primary-900 text-white py-12 md:py-16">
        <div className="container-custom">
          <h1 className="text-3xl md:text-5xl font-serif font-medium text-white mb-6">{t('issues.title')}</h1>
          <p className="text-xl text-gray-200 max-w-3xl">
            {language === 'en'
              ? 'Browse all published issues of the journal by volume and issue number.'
              : 'Derginin yayınlanan tüm sayılarını cilt ve sayı numarasına göre inceleyin.'}
          </p>
        </div>
      </div>

      <section className="py-8 border-b border-gray-200">
        <div className="container-custom">
          <div className="max-w-md mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder={language === 'en' ? 'Search issues...' : 'Sayıları ara...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
      </section>

      {filteredVolumes.length > 0 ? (
        filteredVolumes.map((volume) => (
          <section key={volume} className="py-10 border-b border-gray-100">
            <div className="container-custom">
              <h2 className="text-2xl font-serif font-medium mb-6 flex items-center">
                <Calendar className="h-6 w-6 mr-2 text-primary-600" />
                {t('issues.volume')} {volume}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {issuesByVolume[volume]
                  .filter(() => true)
                  .sort((a, b) => b.issue - a.issue)
                  .map((issue) => (
                    <Link
                      href={`/issues/${issue.volume}/${issue.issue}`}
                      key={issue.id}
                      className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full"
                    >
                      <div className="h-48 overflow-hidden">
                        <Image
                          src={issue.coverImage}
                          alt={language === 'en' ? issue.title.en : issue.title.tr}
                          width={800}
                          height={450}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                      <div className="p-6 flex flex-col flex-grow">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-sm font-medium text-gray-500">{t('issues.issue')} {issue.issue}</span>
                          <span className="text-sm text-gray-500">{language === 'en' ? issue.publishedDate.en : issue.publishedDate.tr}</span>
                        </div>
                        <h3 className="text-lg font-serif font-medium mb-2 text-primary-800 flex-grow">
                          {language === 'en' ? issue.title.en : issue.title.tr}
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">{language === 'en' ? issue.description.en : issue.description.tr}</p>
                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                          <div className="flex items-center text-gray-600">
                            <FileText className="h-4 w-4 mr-1" />
                            <span className="text-sm">{issue.articles.length} {language === 'en' ? 'articles' : 'makale'}</span>
                          </div>
                          <div className="text-primary-600 flex items-center text-sm font-medium">
                            <span>{language === 'en' ? 'View Issue' : 'Sayıyı Görüntüle'}</span>
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </section>
        ))
      ) : (
        <section className="py-16 text-center">
          <div className="container-custom">
            <p className="text-lg text-gray-600">
              {language === 'en' ? 'No issues found matching your search criteria.' : 'Arama kriterlerinize uygun sayı bulunamadı.'}
            </p>
            <button onClick={() => setSearchTerm('')} className="mt-4 text-primary-600 font-medium hover:text-primary-700">
              {t('issues.view-all')}
            </button>
          </div>
        </section>
      )}

      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-serif font-medium mb-6">{language === 'en' ? 'Journal Archiving and Indexing' : 'Dergi Arşivleme ve İndeksleme'}</h2>
            <p className="text-gray-700 mb-8">
              {language === 'en'
                ? 'All issues of the journal are permanently archived and accessible through multiple platforms. Our content is indexed in major academic databases to ensure wide visibility and accessibility.'
                : 'Derginin tüm sayıları kalıcı olarak arşivlenir ve birden fazla platform aracılığıyla erişilebilir. İçeriğimiz, geniş görünürlük ve erişilebilirlik sağlamak için önemli akademik veritabanlarında indekslenmektedir.'}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}


