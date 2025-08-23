"use client";
import { useLanguage } from '@/context/LanguageContext';
import { dummyBoardMembers } from '@/data/dummyBoardMembers';
import SectionHeader from '@/components/ui/SectionHeader';
import { Mail, ExternalLink, Users } from 'lucide-react';

export default function EditorialBoardPage() {
  const { t, language } = useLanguage();

  const editorInChief = dummyBoardMembers.filter((m) => m.position.en === 'Editor-in-Chief');
  const associateEditors = dummyBoardMembers.filter((m) => m.position.en === 'Associate Editor');
  const boardMembers = dummyBoardMembers.filter((m) => m.position.en === 'Editorial Board Member');

  return (
    <div className="bg-white pb-16">
      {/* Hero Section */}
      <div className="bg-primary-900 text-white py-4 md:py-8">
        <div className="container-custom max-w-xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-serif font-medium text-white mb-3">{t('editorial.title')}</h1>
          <p className="text-base md:text-lg text-gray-200">
            {language === 'en' ? 'Meet the editorial team responsible for maintaining the highest standards of scholarly publishing.' : 'Bilimsel yayıncılığın en yüksek standartlarını korumaktan sorumlu editöryal ekiple tanışın.'}
          </p>
        </div>
      </div>

      {/* Editor in Chief Section */}
      <section className="py-12 md:py-16">
        <div className="container-custom">
          <SectionHeader title={t('editorial.editor-in-chief')} />

          {editorInChief.map((editor) => (
            <div key={editor.id} className="max-w-4xl mx-auto">
              <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200 flex flex-col">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="mb-6 md:mb-0 md:mr-8">
                    <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden">
                      <img src={editor.image} alt={editor.name} className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-2xl font-serif font-medium mb-2 text-primary-900">{editor.name}</h3>
                    <p className="text-secondary-700 font-medium mb-4">
                      {language === 'en' ? editor.position.en : editor.position.tr}
                    </p>
                    <p className="text-gray-600 mb-4">{language === 'en' ? editor.affiliation.en : editor.affiliation.tr}</p>
                    <p className="text-gray-700 mb-0">{language === 'en' ? editor.bio.en : editor.bio.tr}</p>
                  </div>
                </div>
                <div className="flex justify-start space-x-4 mt-4">
                  <a href={`mailto:editor@example.com`} className="flex items-center text-primary-600 hover:text-primary-700">
                    <Mail className="h-4 w-4 mr-2" />
                    <span>editor@example.com</span>
                  </a>
                  <a href="#" className="flex items-center text-primary-600 hover:text-primary-700">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    <span>{language === 'en' ? 'Profile' : 'Profil'}</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Associate Editors Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container-custom">
          <SectionHeader title={t('editorial.associate-editors')} />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {associateEditors.map((editor) => (
              <div key={editor.id} className="flex flex-col h-full">
                <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex-1 flex flex-col">
                  <div className="flex items-center mb-3">
                    <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                      <img src={editor.image} alt={editor.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-primary-900">{editor.name}</h3>
                      <p className="text-sm text-secondary-700">
                        {language === 'en' ? editor.position.en : editor.position.tr}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    {language === 'en' ? editor.affiliation.en : editor.affiliation.tr}
                  </p>
                  <p className="text-sm text-gray-700">{language === 'en' ? editor.bio.en : editor.bio.tr}</p>
                  <div className="flex space-x-3 mt-auto pt-4">
                    <a href={`mailto:associate.editor@example.com`} className="text-xs flex items-center text-primary-600 hover:text-primary-700">
                      <Mail className="h-3 w-3 mr-1" />
                      <span>Email</span>
                    </a>
                    <a href="#" className="text-xs flex items-center text-primary-600 hover:text-primary-700">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      <span>{language === 'en' ? 'Profile' : 'Profil'}</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Board Members Section */}
      <section className="py-12 md:py-16">
        <div className="container-custom">
          <SectionHeader title={t('editorial.editorial-board')} />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {boardMembers.map((member) => (
              <div key={member.id} className="flex flex-col h-full">
                <div className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex-1 flex flex-col">
                  <div className="flex items-center mb-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                      <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-primary-900">{member.name}</h3>
                      <p className="text-xs text-gray-600">
                        {(language === 'en' ? member.affiliation.en : member.affiliation.tr).split(',')[0]}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 line-clamp-3">{language === 'en' ? member.bio.en : member.bio.tr}</p>
                  <div className="mt-auto pt-3">
                    <a href="#" className="text-xs inline-flex items-center text-primary-600 hover:text-primary-700">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      <span>{language === 'en' ? 'View Profile' : 'Profil Görüntüle'}</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* International Advisory Board Note */}
      <section className="py-12 md:py-16 bg-primary-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <Users className="h-12 w-12 mx-auto text-primary-600 mb-6" />
            <h2 className="text-2xl md:3xl font-serif font-medium mb-6">
              {language === 'en' ? 'International Advisory Board' : 'Uluslararası Danışma Kurulu'}
            </h2>
            <p className="text-gray-700 mb-8">
              {language === 'en'
                ? "In addition to our editorial team, the journal is supported by an International Advisory Board comprising distinguished scholars from leading institutions worldwide. These experts provide strategic guidance on the journal's direction and help maintain its position at the forefront of academic publishing."
                : 'Editoryal ekibimize ek olarak, dergi, dünyanın önde gelen kurumlarından seçkin akademisyenlerden oluşan bir Uluslararası Danışma Kurulu tarafından desteklenmektedir. Bu uzmanlar, derginin yönü hakkında stratejik rehberlik sağlar ve akademik yayıncılığın ön saflarındaki konumunu korumasına yardımcı olur.'}
            </p>
            <a href="#" className="btn btn-outline inline-flex items-center">
              <span>
                {language === 'en' ? 'View Advisory Board Members' : 'Danışma Kurulu Üyelerini Görüntüle'}
              </span>
              <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Join Us CTA */}
      <section className="py-12 md:py-16">
        <div className="container-custom">
          <div className="bg-gradient-to-r from-primary-800 to-primary-900 rounded-lg shadow-xl overflow-hidden">
            <div className="p-8 md:p-12 text-white text-center max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-serif font-medium mb-4 text-white">
                {language === 'en'
                  ? 'Interested in Joining Our Editorial Team?'
                  : 'Editöryal Ekibimize Katılmak İster misiniz?'}
              </h2>
              <p className="text-gray-200 mb-8">
                {language === 'en'
                  ? "We are always looking for experienced researchers to join our team of reviewers and potentially our editorial board. If you are interested in contributing to the journal's peer review process, please get in touch with our editorial office."
                  : 'Her zaman hakem ekibimize ve potansiyel olarak yayın kurulumuza katılacak deneyimli araştırmacılar arıyoruz. Derginin hakem değerlendirme sürecine katkıda bulunmakla ilgileniyorsanız, lütfen yayın ofisimizle iletişime geçin.'}
              </p>
              <a href="/contact" className="btn bg-white text-primary-900 hover:bg-gray-100">
                {language === 'en' ? 'Contact Us' : 'Bize Ulaşın'}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


