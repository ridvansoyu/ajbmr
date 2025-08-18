"use client";
import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Mail, MapPin, Phone, Send, AlertCircle } from 'lucide-react';

export default function ContactPage() {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [formErrors, setFormErrors] = useState({ name: false, email: false, subject: false, message: false });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: false } as any));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = {
      name: formData.name.trim() === '',
      email: !/^\S+@\S+\.\S+$/.test(formData.email),
      subject: formData.subject.trim() === '',
      message: formData.message.trim() === '',
    };
    setFormErrors(errors);
    if (!Object.values(errors).some(Boolean)) {
      setFormSubmitted(true);
    }
  };

  return (
    <div className="bg-white pb-16">
      <div className="bg-primary-900 text-white py-12 md:py-16">
        <div className="container-custom">
          <h1 className="text-3xl md:text-5xl font-serif font-medium text-white mb-6">{t('contact.title')}</h1>
          <p className="text-xl text-gray-200 max-w-3xl">
            {language === 'en'
              ? 'Get in touch with our editorial team for inquiries about manuscript submission, review process, or general questions.'
              : 'Makale gönderimi, inceleme süreci veya genel sorular hakkında bilgi almak için editoryal ekibimizle iletişime geçin.'}
          </p>
        </div>
      </div>

      <section className="py-12 md:py-16">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-1/3">
              <h2 className="text-2xl font-serif font-medium mb-6">{t('contact.editorial-office')}</h2>
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="bg-primary-50 p-3 rounded-lg mr-4">
                    <MapPin className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">{t('contact.address')}</h3>
                    <p className="text-gray-600">
                      {language === 'en' ? 'Academic Building, University Campus' : 'Akademik Bina, Üniversite Kampüsü'}
                      <br />
                      {language === 'en' ? 'Ankara, Turkey' : 'Ankara, Türkiye'}
                      <br />06800
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-primary-50 p-3 rounded-lg mr-4">
                    <Mail className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">{t('contact.email')}</h3>
                    <p className="text-gray-600">
                      <a href="mailto:journal@example.com" className="hover:text-primary-600 transition-colors">journal@example.com</a>
                      <br />
                      <a href="mailto:editor@example.com" className="hover:text-primary-600 transition-colors">editor@example.com</a>
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-primary-50 p-3 rounded-lg mr-4">
                    <Phone className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">{t('contact.phone')}</h3>
                    <p className="text-gray-600">
                      <a href="tel:+903125551234" className="hover:text-primary-600 transition-colors">+90 (312) 555 1234</a>
                      <br />
                      <span className="text-sm text-gray-500">
                        {language === 'en' ? 'Monday - Friday: 9:00 AM - 5:00 PM (GMT+3)' : 'Pazartesi - Cuma: 09:00 - 17:00 (GMT+3)'}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-2/3">
              <h2 className="text-2xl font-serif font-medium mb-6">{language === 'en' ? 'Send us a Message' : 'Bize Mesaj Gönderin'}</h2>

              {formSubmitted ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-green-100 p-2 rounded-full mr-4">
                      <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <h3 className="text-lg font-medium text-green-800">{language === 'en' ? 'Message Sent Successfully!' : 'Mesaj Başarıyla Gönderildi!'}</h3>
                  </div>
                  <p className="text-green-700 mb-4">
                    {language === 'en'
                      ? 'Thank you for contacting us. Our team will review your message and get back to you as soon as possible, usually within 1-2 business days.'
                      : 'Bizimle iletişime geçtiğiniz için teşekkür ederiz. Ekibimiz mesajınızı inceleyecek ve genellikle 1-2 iş günü içinde size geri dönecektir.'}
                  </p>
                  <button onClick={() => { setFormSubmitted(false); setFormData({ name: '', email: '', subject: '', message: '' }); }} className="btn bg-green-600 text-white hover:bg-green-700">
                    {language === 'en' ? 'Send Another Message' : 'Başka Bir Mesaj Gönder'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">{language === 'en' ? 'Full Name' : 'Ad Soyad'}*</label>
                      <input id="name" name="name" value={formData.name} onChange={handleChange} className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${formErrors.name ? 'border-red-500' : 'border-gray-300'}`} placeholder={language === 'en' ? 'Enter your full name' : 'Adınızı ve soyadınızı girin'} />
                      {formErrors.name && <p className="mt-1 text-sm text-red-600 flex items-center"><AlertCircle className="h-4 w-4 mr-1" />{language === 'en' ? 'Please enter your name' : 'Lütfen adınızı girin'}</p>}
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">{language === 'en' ? 'Email Address' : 'E-posta Adresi'}*</label>
                      <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${formErrors.email ? 'border-red-500' : 'border-gray-300'}`} placeholder={language === 'en' ? 'Enter your email address' : 'E-posta adresinizi girin'} />
                      {formErrors.email && <p className="mt-1 text-sm text-red-600 flex items-center"><AlertCircle className="h-4 w-4 mr-1" />{language === 'en' ? 'Please enter a valid email address' : 'Lütfen geçerli bir e-posta adresi girin'}</p>}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">{language === 'en' ? 'Subject' : 'Konu'}*</label>
                    <select id="subject" name="subject" value={formData.subject} onChange={handleChange} className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${formErrors.subject ? 'border-red-500' : 'border-gray-300'}`}>
                      <option value="" disabled>{language === 'en' ? 'Select a subject' : 'Bir konu seçin'}</option>
                      <option value="submission">{language === 'en' ? 'Manuscript Submission' : 'Makale Gönderimi'}</option>
                      <option value="review">{language === 'en' ? 'Review Process' : 'İnceleme Süreci'}</option>
                      <option value="technical">{language === 'en' ? 'Technical Support' : 'Teknik Destek'}</option>
                      <option value="general">{language === 'en' ? 'General Inquiry' : 'Genel Soru'}</option>
                      <option value="other">{language === 'en' ? 'Other' : 'Diğer'}</option>
                    </select>
                    {formErrors.subject && <p className="mt-1 text-sm text-red-600 flex items-center"><AlertCircle className="h-4 w-4 mr-1" />{language === 'en' ? 'Please select a subject' : 'Lütfen bir konu seçin'}</p>}
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">{t('contact.message')}*</label>
                    <textarea id="message" name="message" rows={6} value={formData.message} onChange={handleChange} className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${formErrors.message ? 'border-red-500' : 'border-gray-300'}`} placeholder={language === 'en' ? 'Enter your message here...' : 'Mesajınızı buraya girin...'} />
                    {formErrors.message && <p className="mt-1 text-sm text-red-600 flex items-center"><AlertCircle className="h-4 w-4 mr-1" />{language === 'en' ? 'Please enter your message' : 'Lütfen mesajınızı girin'}</p>}
                  </div>
                  <div className="flex items-start">
                    <input type="checkbox" id="consent" className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500 mt-1" />
                    <label htmlFor="consent" className="ml-2 text-sm text-gray-600">
                      {language === 'en'
                        ? 'I consent to having this website store my submitted information so they can respond to my inquiry.'
                        : 'Bu web sitesinin, soruma yanıt verebilmeleri için gönderdiğim bilgileri saklamasına izin veriyorum.'}
                    </label>
                  </div>
                  <div>
                    <button type="submit" className="btn btn-primary inline-flex items-center">
                      <Send className="h-4 w-4 mr-2" />
                      <span>{t('contact.send')}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto bg-white rounded-lg overflow-hidden shadow-md">
            <div className="aspect-w-16 aspect-h-9 w-full h-96">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d195884.63512269776!2d32.62759242582035!3d39.90409541201992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d345af5bf3ee09%3A0xc16292350ad432d4!2sAnkara%2C%20T%C3%BCrkiye!5e0!3m2!1str!2str!4v1693324576280!5m2!1str!2str"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


