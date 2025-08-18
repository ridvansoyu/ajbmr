"use client";
import { useLanguage } from '@/context/LanguageContext';
import { CheckCircle, BookOpen, History, Database, Shield, Globe } from 'lucide-react';

export default function AboutPage() {
  const { t, language } = useLanguage();

  return (
    <div className="bg-white pb-16">
      <div className="bg-primary-900 text-white py-12 md:py-16">
        <div className="container-custom">
          <h1 className="text-3xl md:text-5xl font-serif font-medium text-white mb-6">{t('about.title')}</h1>
          <p className="text-xl text-gray-200 max-w-3xl">
            {language === 'en'
              ? 'Advancing knowledge through rigorous peer-reviewed research across multiple disciplines.'
              : 'Birden fazla disiplinde titiz hakemli araştırmalar yoluyla bilgiyi ilerletmek.'}
          </p>
        </div>
      </div>

      <section className="py-12 md:py-16">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-1/3">
              <div className="sticky top-24">
                <h2 className="text-2xl md:text-3xl font-serif font-medium mb-6">{t('about.aims-scope')}</h2>
                <div className="w-16 h-1 bg-primary-600 mb-6"></div>
                <div className="flex items-center mb-6">
                  <BookOpen className="h-8 w-8 text-primary-600 mr-4" />
                  <span className="text-gray-500">{language === 'en' ? 'ISSN: 2345-6789' : 'ISSN: 2345-6789'}</span>
                </div>
                <p className="text-gray-600 mb-4">{language === 'en' ? 'Established in 2015' : '2015 yılında kuruldu'}</p>
                <p className="text-gray-600">{language === 'en' ? 'Quarterly Publication' : 'Üç Aylık Yayın'}</p>
              </div>
            </div>
            <div className="md:w-2/3">
              <p className="text-gray-700 mb-6 text-lg">
                {language === 'en'
                  ? 'The Academic Journal of Advanced Studies is a peer-reviewed, open-access journal that publishes original research papers, review articles, and case studies across multiple disciplines. Our goal is to promote scholarly exchange and innovation by providing a platform for researchers to share their findings with the global academic community.'
                  : 'İleri Araştırmalar Akademik Dergisi, birden fazla disiplinde orijinal araştırma makaleleri, derleme makaleler ve vaka çalışmaları yayınlayan hakemli, açık erişimli bir dergidir. Amacımız, araştırmacılara bulgularını küresel akademik toplulukla paylaşmaları için bir platform sağlayarak bilimsel alışverişi ve yeniliği teşvik etmektir.'}
              </p>
              <p className="text-gray-700 mb-8">
                {language === 'en'
                  ? 'The journal welcomes submissions from various fields including but not limited to social sciences, natural sciences, engineering, medicine, humanities, education, and interdisciplinary studies. We are particularly interested in research that addresses contemporary challenges and contributes to theoretical and practical advancements in their respective fields.'
                  : 'Dergi, sosyal bilimler, doğa bilimleri, mühendislik, tıp, beşeri bilimler, eğitim ve disiplinlerarası çalışmalar dahil ancak bunlarla sınırlı olmamak üzere çeşitli alanlardan başvuruları kabul etmektedir. Özellikle çağdaş zorluklara değinen ve ilgili alanlarda teorik ve pratik ilerlemelere katkıda bulunan araştırmalarla ilgileniyoruz.'}
              </p>

              <div className="border-l-4 border-primary-600 pl-6 mb-8 bg-primary-50 p-4 rounded-r-lg">
                <p className="text-gray-800 italic">
                  {language === 'en'
                    ? 'Our mission is to foster scholarly dialogue and disseminate high-quality research that contributes to the advancement of knowledge and addresses contemporary challenges across multiple disciplines.'
                    : 'Misyonumuz, bilimsel diyalogu teşvik etmek ve bilginin ilerlemesine katkıda bulunan ve birden fazla disiplinde çağdaş zorluklara değinen yüksek kaliteli araştırmaları yaymaktır.'}
                </p>
              </div>

              <h3 className="text-xl font-serif font-medium mb-4 text-primary-800">{language === 'en' ? 'Key Focus Areas' : 'Ana Odak Alanları'}</h3>

              <ul className="space-y-4 mb-8">
                <li className="flex">
                  <CheckCircle className="h-6 w-6 text-primary-600 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{language === 'en' ? 'Innovative research methodologies and interdisciplinary approaches' : 'Yenilikçi araştırma metodolojileri ve disiplinlerarası yaklaşımlar'}</span>
                </li>
                <li className="flex">
                  <CheckCircle className="h-6 w-6 text-primary-600 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{language === 'en' ? 'Sustainable development and environmental challenges' : 'Sürdürülebilir kalkınma ve çevresel zorluklar'}</span>
                </li>
                <li className="flex">
                  <CheckCircle className="h-6 w-6 text-primary-600 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{language === 'en' ? 'Technological innovations and digital transformation' : 'Teknolojik yenilikler ve dijital dönüşüm'}</span>
                </li>
                <li className="flex">
                  <CheckCircle className="h-6 w-6 text-primary-600 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{language === 'en' ? 'Social, economic, and political developments' : 'Sosyal, ekonomik ve politik gelişmeler'}</span>
                </li>
                <li className="flex">
                  <CheckCircle className="h-6 w-6 text-primary-600 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{language === 'en' ? 'Health sciences and public health challenges' : 'Sağlık bilimleri ve halk sağlığı zorlukları'}</span>
                </li>
                <li className="flex">
                  <CheckCircle className="h-6 w-6 text-primary-600 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{language === 'en' ? 'Educational research and pedagogical innovations' : 'Eğitim araştırmaları ve pedagojik yenilikler'}</span>
                </li>
              </ul>

              <h3 className="text-xl font-serif font-medium mb-4 text-primary-800">{language === 'en' ? 'Publication Frequency' : 'Yayın Sıklığı'}</h3>
              <p className="text-gray-700 mb-6">
                {language === 'en'
                  ? 'The journal is published quarterly (January, April, July, and October), with occasional special issues dedicated to specific themes or emerging research areas.'
                  : 'Dergi üç ayda bir (Ocak, Nisan, Temmuz ve Ekim aylarında) yayınlanmakta olup, belirli temalara veya gelişen araştırma alanlarına adanmış özel sayılar da yayınlanmaktadır.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container-custom">
          <div className="mb-10 text-center">
            <h2 className="text-2xl md:text-3xl font-serif font-medium mb-4">{t('about.history')}</h2>
            <div className="w-24 h-1 bg-primary-600 mx-auto"></div>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-primary-200"></div>
            <div className="grid grid-cols-1 gap-12">
              <div className="relative">
                <div className="flex items-center">
                  <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white">
                      <History className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="w-1/2 pr-8 text-right">
                    <h3 className="text-xl font-serif font-medium text-primary-800">2015</h3>
                    <p className="text-gray-600">{language === 'en' ? 'Foundation of the journal' : 'Derginin kuruluşu'}</p>
                  </div>
                  <div className="w-1/2 pl-8">
                    <p className="text-gray-700">{language === 'en' ? 'The journal was established with a focus on interdisciplinary research, initially publishing papers in social sciences and humanities.' : 'Dergi, disiplinlerarası araştırmalara odaklanarak kuruldu ve başlangıçta sosyal bilimler ve beşeri bilimler alanlarında makaleler yayınladı.'}</p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="flex items-center">
                  <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white">
                      <History className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="w-1/2 pr-8 text-right">
                    <h3 className="text-xl font-serif font-medium text-primary-800">2017</h3>
                    <p className="text-gray-600">{language === 'en' ? 'Expansion to STEM fields' : 'STEM alanlarına genişleme'}</p>
                  </div>
                  <div className="w-1/2 pl-8">
                    <p className="text-gray-700">{language === 'en' ? 'The journal expanded its scope to include research in science, technology, engineering, and mathematics, becoming truly multidisciplinary.' : 'Dergi kapsamını bilim, teknoloji, mühendislik ve matematik alanlarındaki araştırmaları içerecek şekilde genişleterek gerçekten çok disiplinli hale geldi.'}</p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="flex items-center">
                  <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white">
                      <History className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="w-1/2 pr-8 text-right">
                    <h3 className="text-xl font-serif font-medium text-primary-800">2019</h3>
                    <p className="text-gray-600">{language === 'en' ? 'International indexing' : 'Uluslararası indeksleme'}</p>
                  </div>
                  <div className="w-1/2 pl-8">
                    <p className="text-gray-700">{language === 'en' ? 'The journal was included in several reputable international indexing databases, significantly increasing its visibility and impact.' : 'Dergi, saygın uluslararası indeksleme veritabanlarına dahil edildi ve böylece görünürlüğü ve etkisi önemli ölçüde artırıldı.'}</p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="flex items-center">
                  <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white">
                      <History className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="w-1/2 pr-8 text-right">
                    <h3 className="text-xl font-serif font-medium text-primary-800">2020</h3>
                    <p className="text-gray-600">{language === 'en' ? 'Digital transformation' : 'Dijital dönüşüm'}</p>
                  </div>
                  <div className="w-1/2 pl-8">
                    <p className="text-gray-700">{language === 'en' ? 'Implemented a comprehensive online submission and peer review system, enhancing efficiency and transparency in the editorial process.' : 'Editoryal süreçte verimliliği ve şeffaflığı artıran kapsamlı bir çevrimiçi gönderim ve hakem değerlendirme sistemi uygulandı.'}</p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="flex items-center">
                  <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white">
                      <History className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="w-1/2 pr-8 text-right">
                    <h3 className="text-xl font-serif font-medium text-primary-800">2022</h3>
                    <p className="text-gray-600">{language === 'en' ? 'Launch of special issue series' : 'Özel sayı serisinin başlatılması'}</p>
                  </div>
                  <div className="w-1/2 pl-8">
                    <p className="text-gray-700">{language === 'en' ? 'Began publishing regular special issues focused on emerging research areas and contemporary global challenges, attracting contributions from leading researchers.' : 'Gelişen araştırma alanlarına ve çağdaş küresel zorluklara odaklanan düzenli özel sayılar yayınlamaya başladı ve önde gelen araştırmacılardan katkılar çekti.'}</p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="flex items-center">
                  <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white">
                      <History className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="w-1/2 pr-8 text-right">
                    <h3 className="text-xl font-serif font-medium text-primary-800">2024</h3>
                    <p className="text-gray-600">{language === 'en' ? 'Present day' : 'Günümüz'}</p>
                  </div>
                  <div className="w-1/2 pl-8">
                    <p className="text-gray-700">{language === 'en' ? 'Today, the journal continues to grow in scope and impact, with a strong international editorial board and contributors from around the world.' : 'Bugün, dergi güçlü bir uluslararası yayın kurulu ve dünyanın dört bir yanından katkıda bulunanlarla kapsam ve etki bakımından büyümeye devam etmektedir.'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="py-12 md:py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-6">
                <Database className="h-10 w-10 text-primary-600 mr-4" />
                <h3 className="text-xl font-serif font-medium">{t('about.indexing')}</h3>
              </div>
              <p className="text-gray-700 mb-4">{language === 'en' ? 'The journal is indexed in the following databases:' : 'Dergi aşağıdaki veritabanlarında indekslenmektedir:'}</p>
              <ul className="space-y-2 text-gray-700">
                <li>Scopus</li>
                <li>Web of Science (ESCI)</li>
                <li>DOAJ (Directory of Open Access Journals)</li>
                <li>ProQuest</li>
                <li>EBSCO</li>
                <li>TR Dizin</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-6">
                <Shield className="h-10 w-10 text-primary-600 mr-4" />
                <h3 className="text-xl font-serif font-medium">{t('about.ethics')}</h3>
              </div>
              <p className="text-gray-700 mb-4">{language === 'en' ? 'The journal adheres to the highest ethical standards in academic publishing:' : 'Dergi, akademik yayıncılıkta en yüksek etik standartlara bağlıdır:'}</p>
              <ul className="space-y-2 text-gray-700">
                <li>{language === 'en' ? 'Rigorous peer review process' : 'Titiz hakem değerlendirme süreci'}</li>
                <li>{language === 'en' ? 'Zero tolerance for plagiarism and data fabrication' : 'İntihal ve veri üretmeye karşı sıfır tolerans'}</li>
                <li>{language === 'en' ? 'Transparent conflict of interest disclosures' : 'Şeffaf çıkar çatışması açıklamaları'}</li>
                <li>{language === 'en' ? 'Adherence to COPE guidelines' : 'COPE yönergelerine bağlılık'}</li>
                <li>{language === 'en' ? 'Author contribution statements' : 'Yazar katkı beyanları'}</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-6">
                <Globe className="h-10 w-10 text-primary-600 mr-4" />
                <h3 className="text-xl font-serif font-medium">{t('about.open-access')}</h3>
              </div>
              <p className="text-gray-700 mb-4">{language === 'en' ? 'The journal is committed to open science principles:' : 'Dergi, açık bilim ilkelerine bağlıdır:'}</p>
              <ul className="space-y-2 text-gray-700">
                <li>{language === 'en' ? 'Full open access with no subscription barriers' : 'Abonelik engeli olmayan tam açık erişim'}</li>
                <li>{language === 'en' ? 'Articles published under CC BY 4.0 license' : 'CC BY 4.0 lisansı altında yayınlanan makaleler'}</li>
                <li>{language === 'en' ? 'Authors retain copyright of their work' : 'Yazarlar çalışmalarının telif hakkını korurlar'}</li>
                <li>{language === 'en' ? 'No article processing charges (APC)' : 'Makale işleme ücreti yok (APC)'}</li>
                <li>{language === 'en' ? 'Encouragement of data sharing and transparency' : 'Veri paylaşımı ve şeffaflığın teşvik edilmesi'}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


