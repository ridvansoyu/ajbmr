"use client";
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { FileText, Check, Download, BookOpen, CheckCircle } from 'lucide-react';

export default function GuidelinesPage() {
  const { t, language } = useLanguage();

  return (
    <div className="bg-white pb-16">
      <div className="bg-primary-900 text-white py-12 md:py-16">
        <div className="container-custom">
          <h1 className="text-3xl md:text-5xl font-serif font-medium text-white mb-6">{t('guidelines.title')}</h1>
          <p className="text-xl text-gray-200 max-w-3xl">
            {language === 'en'
              ? 'Guidelines and instructions for preparing and submitting manuscripts to the journal.'
              : 'Dergiye makale hazırlama ve gönderme ile ilgili kurallar ve talimatlar.'}
          </p>
        </div>
      </div>

      <section className="border-b border-gray-200">
        <div className="container-custom">
          <div className="flex overflow-x-auto py-4 scrollbar-hide">
            <a href="#manuscript-preparation" className="flex-shrink-0 px-4 py-2 mx-1 rounded-md hover:bg-gray-100 text-primary-600 font-medium">
              {t('guidelines.manuscript-preparation')}
            </a>
            <a href="#format" className="flex-shrink-0 px-4 py-2 mx-1 rounded-md hover:bg-gray-100 text-primary-600 font-medium">
              {t('guidelines.format')}
            </a>
            <a href="#references" className="flex-shrink-0 px-4 py-2 mx-1 rounded-md hover:bg-gray-100 text-primary-600 font-medium">
              {t('guidelines.references')}
            </a>
            <a href="#templates" className="flex-shrink-0 px-4 py-2 mx-1 rounded-md hover:bg-gray-100 text-primary-600 font-medium">
              {t('guidelines.download-template')}
            </a>
            <a href="#submission-checklist" className="flex-shrink-0 px-4 py-2 mx-1 rounded-md hover:bg-gray-100 text-primary-600 font-medium">
              {language === 'en' ? 'Submission Checklist' : 'Gönderim Kontrol Listesi'}
            </a>
          </div>
        </div>
      </section>

      <div className="py-12">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-10">
            <div className="lg:w-1/4">
              <div className="sticky top-24">
                <div className="bg-primary-50 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-medium mb-4 text-primary-800">{language === 'en' ? 'Quick Links' : 'Hızlı Erişim'}</h3>
                  <ul className="space-y-2">
                    <li>
                      <a href="#manuscript-preparation" className="text-primary-600 hover:text-primary-700 flex items-center">
                        <Check className="h-4 w-4 mr-2" />
                        <span>{t('guidelines.manuscript-preparation')}</span>
                      </a>
                    </li>
                    <li>
                      <a href="#format" className="text-primary-600 hover:text-primary-700 flex items-center">
                        <Check className="h-4 w-4 mr-2" />
                        <span>{t('guidelines.format')}</span>
                      </a>
                    </li>
                    <li>
                      <a href="#references" className="text-primary-600 hover:text-primary-700 flex items-center">
                        <Check className="h-4 w-4 mr-2" />
                        <span>{t('guidelines.references')}</span>
                      </a>
                    </li>
                    <li>
                      <a href="#templates" className="text-primary-600 hover:text-primary-700 flex items-center">
                        <Check className="h-4 w-4 mr-2" />
                        <span>{t('guidelines.download-template')}</span>
                      </a>
                    </li>
                    <li>
                      <a href="#submission-checklist" className="text-primary-600 hover:text-primary-700 flex items-center">
                        <Check className="h-4 w-4 mr-2" />
                        <span>{language === 'en' ? 'Submission Checklist' : 'Gönderim Kontrol Listesi'}</span>
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="bg-secondary-50 rounded-lg p-6">
                  <h3 className="text-lg font-medium mb-4 text-secondary-800">{language === 'en' ? 'Need Help?' : 'Yardıma mı İhtiyacınız Var?'}</h3>
                  <p className="text-gray-700 mb-4">
                    {language === 'en'
                      ? 'If you have any questions about the submission process or guidelines, please contact our editorial office.'
                      : 'Gönderim süreci veya kurallar hakkında herhangi bir sorunuz varsa, lütfen yayın ofisimizle iletişime geçin.'}
                  </p>
                  <Link href="/contact" className="btn btn-secondary">{language === 'en' ? 'Contact Us' : 'Bize Ulaşın'}</Link>
                </div>
              </div>
            </div>

            <div className="lg:w-3/4">
              <section id="manuscript-preparation" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl md:text-3xl font-serif font-medium mb-6 text-primary-800">{t('guidelines.manuscript-preparation')}</h2>
                <div className="prose prose-lg max-w-none">
                  <p>
                    {language === 'en'
                      ? 'All manuscripts submitted to the Academic Journal of Advanced Studies should be prepared according to the following guidelines. Manuscripts that do not conform to these guidelines may be returned to the authors for revision before peer review.'
                      : "İleri Araştırmalar Akademik Dergisi'ne gönderilen tüm makaleler aşağıdaki kurallara göre hazırlanmalıdır. Bu kurallara uymayan makaleler, hakem değerlendirmesinden önce revizyon için yazarlara iade edilebilir."}
                  </p>
                  <h3>{language === 'en' ? 'General Requirements' : 'Genel Gereksinimler'}</h3>
                  <ul>
                    <li>{language === 'en' ? 'Manuscripts must be submitted in either English or Turkish.' : 'Makaleler İngilizce veya Türkçe olarak gönderilmelidir.'}</li>
                    <li>{language === 'en' ? 'The manuscript should not have been published elsewhere or be under consideration for publication in another journal.' : 'Makale başka bir yerde yayınlanmamış veya başka bir dergide yayınlanmak üzere değerlendirme aşamasında olmamalıdır.'}</li>
                    <li>{language === 'en' ? 'Manuscripts should be between 6,000 and 10,000 words in length, including references, tables, and figures.' : 'Makaleler, referanslar, tablolar ve şekiller dahil olmak üzere 6.000 ila 10.000 kelime uzunluğunda olmalıdır.'}</li>
                    <li>{language === 'en' ? 'All submissions must include an abstract of 150-250 words and 4-6 keywords.' : 'Tüm başvurular, 150-250 kelimelik bir özet ve 4-6 anahtar kelime içermelidir.'}</li>
                    <li>{language === 'en' ? 'Manuscripts must follow the format and style guidelines described below.' : 'Makaleler, aşağıda açıklanan format ve stil kurallarına uymalıdır.'}</li>
                  </ul>
                  <h3>{language === 'en' ? 'Types of Articles' : 'Makale Türleri'}</h3>
                  <p>{language === 'en' ? 'The journal accepts the following types of manuscripts:' : 'Dergi aşağıdaki makale türlerini kabul etmektedir:'}</p>
                  <ol>
                    <li>
                      <strong>{language === 'en' ? 'Research Articles' : 'Araştırma Makaleleri'}</strong>
                      <p>{language === 'en' ? 'Original research papers presenting new findings and analysis.' : 'Yeni bulgular ve analizler sunan orijinal araştırma makaleleri.'}</p>
                    </li>
                    <li>
                      <strong>{language === 'en' ? 'Review Articles' : 'Derleme Makaleleri'}</strong>
                      <p>{language === 'en' ? 'Comprehensive reviews of existing research on a specific topic.' : 'Belirli bir konuda mevcut araştırmaların kapsamlı derlemeleri.'}</p>
                    </li>
                    <li>
                      <strong>{language === 'en' ? 'Case Studies' : 'Vaka Çalışmaları'}</strong>
                      <p>{language === 'en' ? "In-depth analyses of specific cases or examples relevant to the journal's scope." : 'Derginin kapsamıyla ilgili belirli vakaların veya örneklerin derinlemesine analizleri.'}</p>
                    </li>
                    <li>
                      <strong>{language === 'en' ? 'Theoretical Papers' : 'Teorik Makaleler'}</strong>
                      <p>{language === 'en' ? 'Articles that develop or critique theoretical frameworks without new empirical data.' : 'Yeni ampirik veriler olmadan teorik çerçeveleri geliştiren veya eleştiren makaleler.'}</p>
                    </li>
                  </ol>
                </div>
              </section>

              <section id="format" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl md:text-3xl font-serif font-medium mb-6 text-primary-800">{t('guidelines.format')}</h2>
                <div className="prose prose-lg max-w-none">
                  <h3>{language === 'en' ? 'Document Format' : 'Belge Formatı'}</h3>
                  <ul>
                    <li>{language === 'en' ? 'Manuscripts should be submitted as Microsoft Word (.docx) files.' : 'Makaleler Microsoft Word (.docx) dosyaları olarak gönderilmelidir.'}</li>
                    <li>{language === 'en' ? 'Use A4 page size with 2.5 cm (1 inch) margins on all sides.' : 'Tüm kenarlarda 2,5 cm (1 inç) kenar boşluklarıyla A4 sayfa boyutu kullanın.'}</li>
                    <li>{language === 'en' ? 'Text should be double-spaced.' : 'Metin çift satır aralıklı olmalıdır.'}</li>
                    <li>{language === 'en' ? 'Use a 12-point Times New Roman font for the main text.' : 'Ana metin için 12 punto Times New Roman yazı tipi kullanın.'}</li>
                    <li>{language === 'en' ? 'Pages should be numbered consecutively.' : 'Sayfalar ardışık olarak numaralandırılmalıdır.'}</li>
                  </ul>
                  <h3>{language === 'en' ? 'Structure' : 'Yapı'}</h3>
                  <p>{language === 'en' ? 'Research articles should generally include the following sections:' : 'Araştırma makaleleri genellikle aşağıdaki bölümleri içermelidir:'}</p>
                  <ol>
                    <li><strong>{language === 'en' ? 'Title Page' : 'Başlık Sayfası'}</strong></li>
                    <li><strong>{language === 'en' ? 'Abstract and Keywords' : 'Özet ve Anahtar Kelimeler'}</strong></li>
                    <li><strong>{language === 'en' ? 'Introduction' : 'Giriş'}</strong></li>
                    <li><strong>{language === 'en' ? 'Methodology' : 'Metodoloji'}</strong></li>
                    <li><strong>{language === 'en' ? 'Results' : 'Sonuçlar'}</strong></li>
                    <li><strong>{language === 'en' ? 'Discussion' : 'Tartışma'}</strong></li>
                    <li><strong>{language === 'en' ? 'Conclusion' : 'Sonuç'}</strong></li>
                    <li><strong>{language === 'en' ? 'References' : 'Kaynakça'}</strong></li>
                    <li><strong>{language === 'en' ? 'Appendices (if applicable)' : 'Ekler (varsa)'}</strong></li>
                  </ol>
                </div>
              </section>

              <section id="references" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl md:text-3xl font-serif font-medium mb-6 text-primary-800">{t('guidelines.references')}</h2>
                <div className="prose prose-lg max-w-none">
                  <p>{language === 'en' ? 'The journal uses the APA (7th edition) reference style. All references cited in the text must appear in the reference list, and all references in the list must be cited in the text.' : 'Dergi, APA (7. baskı) referans stilini kullanmaktadır. Metinde atıfta bulunulan tüm kaynaklar kaynakça listesinde yer almalı ve listedeki tüm kaynaklara metinde atıfta bulunulmalıdır.'}</p>
                </div>
              </section>

              <section id="templates" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl md:text-3xl font-serif font-medium mb-6 text-primary-800">{language === 'en' ? 'Templates and Forms' : 'Şablonlar ve Formlar'}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="flex items-start">
                      <div className="bg-primary-50 p-3 rounded-lg mr-4">
                        <FileText className="h-8 w-8 text-primary-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium mb-2">{language === 'en' ? 'Manuscript Template' : 'Makale Şablonu'}</h3>
                        <p className="text-gray-600 text-sm mb-4">{language === 'en' ? 'Word template with preformatted styles and sections for research articles.' : 'Araştırma makaleleri için önceden biçimlendirilmiş stiller ve bölümler içeren Word şablonu.'}</p>
                        <a href="#" className="btn btn-outline inline-flex items-center text-sm">
                          <Download className="h-4 w-4 mr-2" />
                          <span>{language === 'en' ? 'Download Template (DOCX)' : 'Şablonu İndir (DOCX)'}</span>
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="flex items-start">
                      <div className="bg-primary-50 p-3 rounded-lg mr-4">
                        <FileText className="h-8 w-8 text-primary-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium mb-2">{language === 'en' ? 'Cover Letter Template' : 'Kapak Mektubu Şablonu'}</h3>
                        <p className="text-gray-600 text-sm mb-4">{language === 'en' ? 'Template for preparing your cover letter to accompany your submission.' : 'Gönderiminize eşlik edecek kapak mektubunuzu hazırlamak için şablon.'}</p>
                        <a href="#" className="btn btn-outline inline-flex items-center text-sm">
                          <Download className="h-4 w-4 mr-2" />
                          <span>{language === 'en' ? 'Download Template (DOCX)' : 'Şablonu İndir (DOCX)'}</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section id="submission-checklist" className="scroll-mt-24">
                <h2 className="text-2xl md:text-3xl font-serif font-medium mb-6 text-primary-800">{language === 'en' ? 'Submission Checklist' : 'Gönderim Kontrol Listesi'}</h2>
                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                  <p className="text-gray-700 mb-6">{language === 'en' ? 'Before submitting your manuscript, please ensure that you have addressed all of the following points:' : 'Makalenizi göndermeden önce, lütfen aşağıdaki tüm noktaları ele aldığınızdan emin olun:'}</p>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                      <p className="text-gray-700">{language === 'en' ? 'The manuscript has not been previously published and is not under consideration for publication elsewhere.' : 'Makale daha önce yayınlanmamış ve başka bir yerde yayınlanmak üzere değerlendirme aşamasında değildir.'}</p>
                    </div>
                  </div>
                </div>
              </section>

              <div className="mt-12 text-center">
                <Link href="/submit" className="btn btn-primary inline-flex items-center">
                  <BookOpen className="h-5 w-5 mr-2" />
                  <span>{language === 'en' ? 'Submit Your Manuscript' : 'Makalenizi Gönderin'}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container-custom">
          <div className="mb-10 text-center">
            <h2 className="text-2xl md:text-3xl font-serif font-medium mb-4">{language === 'en' ? 'Frequently Asked Questions' : 'Sıkça Sorulan Sorular'}</h2>
            <div className="w-24 h-1 bg-primary-600 mx-auto"></div>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-medium mb-3">{language === 'en' ? 'How long does the review process take?' : 'İnceleme süreci ne kadar sürer?'}</h3>
                <p className="text-gray-700">{language === 'en' ? 'The typical peer review process takes 8-12 weeks...' : 'Tipik hakem değerlendirme süreci 8-12 hafta sürer...'}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


