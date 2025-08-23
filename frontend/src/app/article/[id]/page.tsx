"use client";
import { useParams, useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { dummyArticles } from '@/data/dummyData';
import { Calendar, Users, Clock, Download, Share2, BookOpen, ArrowLeft, Tag, Bookmark } from 'lucide-react';
import Link from 'next/link';

export default function ArticlePage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { language } = useLanguage();
  const id = Number(params?.id);
  const article = dummyArticles.find((a) => a.id === id);
  if (!article) {
    router.push('/issues');
    return null;
  }

  const relatedArticles = dummyArticles.filter((a) => a.category === article.category && a.id !== article.id).slice(0, 3);

  return (
    <div className="bg-white pb-16">
      <div className="bg-primary-900 text-white py-12">
        <div className="container-custom">
          <button onClick={() => router.push(`/issues/${article.volume}/${article.issue}`)} className="inline-flex items-center text-gray-300 hover:text-white mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span>{language === 'en' ? `Back to Volume ${article.volume}, Issue ${article.issue}` : `Cilt ${article.volume}, Sayı ${article.issue}'e Dön`}</span>
          </button>

          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="text-sm font-medium bg-secondary-600 text-white rounded-full px-3 py-1">{article.category}</span>
              <span className="text-sm font-medium bg-white/10 text-white rounded-full px-3 py-1">DOI: {article.doi}</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-serif font-medium text-white mb-6">{language === 'en' ? article.title.en : article.title.tr}</h1>

            <div className="flex flex-wrap items-center text-gray-300 gap-x-6 gap-y-3 mb-8">
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                <span>{article.authors.join(', ')}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                <span>{language === 'en' ? article.publishedDate.en : article.publishedDate.tr}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                <span>
                  {article.readTime} {language === 'en' ? 'min read' : 'dk okuma'}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <button className="btn bg-white text-primary-900 hover:bg-gray-100 inline-flex items-center">
                <BookOpen className="h-4 w-4 mr-2" />
                <span>{language === 'en' ? 'Read Online' : 'Çevrimiçi Oku'}</span>
              </button>
              <button className="btn bg-white/10 text-white hover:bg-white/20 inline-flex items-center">
                <Download className="h-4 w-4 mr-2" />
                <span>{language === 'en' ? 'Download PDF' : 'PDF İndir'}</span>
              </button>
              <button className="btn bg-white/10 text-white hover:bg-white/20 inline-flex items-center">
                <Share2 className="h-4 w-4 mr-2" />
                <span>{language === 'en' ? 'Share' : 'Paylaş'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <section className="py-12">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8">
              <h2 className="text-2xl font-serif font-medium mb-4">{language === 'en' ? 'Abstract' : 'Özet'}</h2>
              <p className="text-gray-700 mb-6 text-lg leading-relaxed">{language === 'en' ? article.abstract.en : article.abstract.tr}</p>
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium mb-3">{language === 'en' ? 'Keywords' : 'Anahtar Kelimeler'}</h3>
                <div className="flex flex-wrap gap-2">
                  {article.keywords.map((k, idx) => (
                    <span key={idx} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                      <Tag className="h-3 w-3 mr-1" />
                      {k}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-8">
              <div>
                <h2 className="text-2xl font-serif font-medium mb-4">{language === 'en' ? 'Introduction' : 'Giriş'}</h2>
                <p className="text-gray-700 mb-4">Lorem ipsum dolor sit amet...</p>
              </div>
            </div>

            <div className="mt-12 bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-medium mb-4">{language === 'en' ? 'Article Information' : 'Makale Bilgileri'}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                <div>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">{language === 'en' ? 'Volume:' : 'Cilt:'}</span> {article.volume}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">{language === 'en' ? 'Issue:' : 'Sayı:'}</span> {article.issue}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">{language === 'en' ? 'Published:' : 'Yayınlanma Tarihi:'}</span> {language === 'en' ? article.publishedDate.en : article.publishedDate.tr}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">DOI:</span> {article.doi}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">{language === 'en' ? 'Category:' : 'Kategori:'}</span> {article.category}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">{language === 'en' ? 'Authors:' : 'Yazarlar:'}</span> {article.authors.join(', ')}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <button className="btn btn-outline text-sm inline-flex items-center">
                  <Share2 className="h-4 w-4 mr-2" />
                  <span>{language === 'en' ? 'Share Article' : 'Makaleyi Paylaş'}</span>
                </button>
                <button className="btn btn-outline text-sm inline-flex items-center">
                  <Bookmark className="h-4 w-4 mr-2" />
                  <span>{language === 'en' ? 'Save to Library' : 'Kütüphaneye Kaydet'}</span>
                </button>
              </div>
            </div>

            <section className="py-6">
              <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                  <h3 className="text-lg font-medium mb-4">{language === 'en' ? 'How to Cite' : 'Nasıl Alıntılanır'}</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">APA</h4>
                      <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">{article.authors.join(', ')}. ({article.publishedDate.en.split(' ')[1]}). {language === 'en' ? article.title.en : article.title.tr}.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="py-12 bg-gray-50">
              <div className="mb-8">
                <h2 className="text-2xl font-serif font-medium mb-4">{language === 'en' ? 'Related Articles' : 'İlgili Makaleler'}</h2>
                <div className="w-24 h-1 bg-primary-600"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map((a) => (
                  <Link key={a.id} href={`/article/${a.id}`} className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full">
                    <div className="h-48 overflow-hidden">
                      <img src={a.coverImage} alt={language === 'en' ? a.title.en : a.title.tr} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-xs font-medium text-secondary-600 bg-secondary-50 rounded-full px-2.5 py-0.5">{a.category}</span>
                        <span className="text-xs text-gray-500">{language === 'en' ? a.publishedDate.en : a.publishedDate.tr}</span>
                      </div>
                      <h3 className="text-lg font-serif font-medium mb-2 text-primary-800 line-clamp-2">{language === 'en' ? a.title.en : a.title.tr}</h3>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-3">{language === 'en' ? a.abstract.en.substring(0, 120) + '...' : a.abstract.tr.substring(0, 120) + '...'}</p>
                      <div className="flex items-center text-xs text-gray-500 mt-auto">
                        <Users className="h-3.5 w-3.5 mr-1" />
                        <span>{a.authors.join(', ')}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}


