"use client";
import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useLanguage } from '@/context/LanguageContext';
import { 
  BookOpen, 
  Calendar, 
  Users, 
  Download, 
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Search,
  Filter,
  Eye
} from 'lucide-react';

interface PublishedManuscript {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  volume: string;
  issue: string;
  pages: string;
  publicationDate: string;
  doi: string;
  abstract: string;
  keywords: string[];
  citations: number;
  downloads: number;
  pdfUrl: string;
  journalUrl: string;
}

export default function PublishedPage() {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [yearFilter, setYearFilter] = useState<string>('all');

  // Mock data - in real app, this would come from API
  const [publishedManuscripts] = useState<PublishedManuscript[]>([
    {
      id: '1',
      title: 'Machine Learning Applications in Healthcare: A Comprehensive Review',
      authors: ['John Doe', 'Jane Smith', 'Michael Johnson'],
      journal: 'Journal of Medical Informatics',
      volume: '15',
      issue: '3',
      pages: '245-260',
      publicationDate: '2024-01-15',
      doi: '10.1000/123456789',
      abstract: 'This comprehensive review examines the current state of machine learning applications in healthcare, focusing on diagnostic tools, treatment optimization, and patient outcome prediction. We analyze recent developments in deep learning, natural language processing, and computer vision as applied to medical data.',
      keywords: ['Machine Learning', 'Healthcare', 'Artificial Intelligence', 'Medical Informatics', 'Deep Learning'],
      citations: 12,
      downloads: 156,
      pdfUrl: '/papers/paper1.pdf',
      journalUrl: 'https://journal.example.com/paper1'
    },
    {
      id: '2',
      title: 'Sustainable Energy Solutions for Urban Development',
      authors: ['John Doe', 'Emily Brown'],
      journal: 'Environmental Science & Technology',
      volume: '28',
      issue: '2',
      pages: '89-104',
      publicationDate: '2023-11-20',
      doi: '10.1000/987654321',
      abstract: 'This study presents innovative approaches to sustainable energy integration in urban environments. We evaluate the effectiveness of renewable energy systems, smart grid technologies, and energy storage solutions in reducing carbon emissions and improving energy efficiency.',
      keywords: ['Sustainable Energy', 'Urban Development', 'Renewable Energy', 'Smart Grid', 'Carbon Emissions'],
      citations: 8,
      downloads: 89,
      pdfUrl: '/papers/paper2.pdf',
      journalUrl: 'https://journal.example.com/paper2'
    },
    {
      id: '3',
      title: 'Blockchain Technology in Supply Chain Management',
      authors: ['John Doe', 'David Wilson', 'Sarah Johnson'],
      journal: 'International Journal of Supply Chain Management',
      volume: '12',
      issue: '4',
      pages: '312-328',
      publicationDate: '2023-08-10',
      doi: '10.1000/456789123',
      abstract: 'This research investigates the implementation of blockchain technology in supply chain management systems. We examine the benefits, challenges, and practical applications of distributed ledger technology in improving transparency, traceability, and efficiency.',
      keywords: ['Blockchain', 'Supply Chain', 'Distributed Ledger', 'Transparency', 'Traceability'],
      citations: 15,
      downloads: 203,
      pdfUrl: '/papers/paper3.pdf',
      journalUrl: 'https://journal.example.com/paper3'
    }
  ]);

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const filteredManuscripts = publishedManuscripts.filter(manuscript => {
    const matchesSearch = manuscript.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         manuscript.authors.some(author => author.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesYear = yearFilter === 'all' || manuscript.publicationDate.startsWith(yearFilter);
    return matchesSearch && matchesYear;
  });

  const handleDownload = (manuscriptId: string) => {
    // In real app, this would trigger file download
    console.log('Download manuscript:', manuscriptId);
  };

  const handleViewJournal = (journalUrl: string) => {
    window.open(journalUrl, '_blank');
  };

  const getPublicationYear = (date: string) => {
    return new Date(date).getFullYear();
  };

  const availableYears = Array.from(new Set(publishedManuscripts.map(m => getPublicationYear(m.publicationDate)))).sort((a, b) => b - a);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            {language === 'en' ? 'Published Manuscripts' : 'Yayınlanan Makaleler'}
          </h1>
          <p className="text-gray-600 mt-1">
            {language === 'en' 
              ? 'View your published research papers and track their impact.'
              : 'Yayınlanan araştırma makalelerinizi görüntüleyin ve etkilerini takip edin.'}
          </p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder={language === 'en' ? 'Search by title or author...' : 'Başlık veya yazar ara...'}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>

            {/* Year Filter */}
            <div className="md:w-48">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <select
                  value={yearFilter}
                  onChange={(e) => setYearFilter(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 appearance-none bg-white"
                >
                  <option value="all">{language === 'en' ? 'All Years' : 'Tüm Yıllar'}</option>
                  {availableYears.map(year => (
                    <option key={year} value={year.toString()}>{year}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  {language === 'en' ? 'Total Publications' : 'Toplam Yayın'}
                </p>
                <p className="text-2xl font-semibold text-gray-900">{publishedManuscripts.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  {language === 'en' ? 'Total Citations' : 'Toplam Atıf'}
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {publishedManuscripts.reduce((sum, m) => sum + m.citations, 0)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <Download className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  {language === 'en' ? 'Total Downloads' : 'Toplam İndirme'}
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {publishedManuscripts.reduce((sum, m) => sum + m.downloads, 0)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Manuscripts List */}
        <div className="space-y-4">
          {filteredManuscripts.map((manuscript) => {
            const isExpanded = expandedItems.has(manuscript.id);
            return (
              <div key={manuscript.id} className="bg-white rounded-lg shadow-sm border border-gray-200">
                {/* Header */}
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">{manuscript.title}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                        <span className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {manuscript.authors.join(', ')}
                        </span>
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(manuscript.publicationDate).toLocaleDateString()}
                        </span>
                        <span className="flex items-center">
                          <BookOpen className="h-4 w-4 mr-1" />
                          {manuscript.journal}, Vol. {manuscript.volume}({manuscript.issue}), pp. {manuscript.pages}
                        </span>
                      </div>
                      
                      {/* Metrics */}
                      <div className="flex items-center space-x-6 text-sm">
                        <span className="text-blue-600 font-medium">
                          {manuscript.citations} {language === 'en' ? 'citations' : 'atıf'}
                        </span>
                        <span className="text-green-600 font-medium">
                          {manuscript.downloads} {language === 'en' ? 'downloads' : 'indirme'}
                        </span>
                        <span className="text-gray-500">
                          DOI: {manuscript.doi}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        onClick={() => handleDownload(manuscript.id)}
                        className="p-2 text-gray-400 hover:text-gray-600"
                        title={language === 'en' ? 'Download PDF' : 'PDF İndir'}
                      >
                        <Download className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleViewJournal(manuscript.journalUrl)}
                        className="p-2 text-gray-400 hover:text-gray-600"
                        title={language === 'en' ? 'View in Journal' : 'Dergide Görüntüle'}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => toggleExpanded(manuscript.id)}
                        className="p-2 text-gray-400 hover:text-gray-600"
                        title={language === 'en' ? 'Toggle Details' : 'Detayları Aç/Kapat'}
                      >
                        {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="border-t border-gray-200 p-6 bg-gray-50">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Abstract */}
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">
                          {language === 'en' ? 'Abstract' : 'Özet'}
                        </h4>
                        <p className="text-sm text-gray-600 leading-relaxed">{manuscript.abstract}</p>
                      </div>

                      {/* Keywords */}
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">
                          {language === 'en' ? 'Keywords' : 'Anahtar Kelimeler'}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {manuscript.keywords.map((keyword, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                            >
                              {keyword}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-6 flex items-center space-x-4">
                      <button
                        onClick={() => handleDownload(manuscript.id)}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        {language === 'en' ? 'Download PDF' : 'PDF İndir'}
                      </button>
                      <button
                        onClick={() => handleViewJournal(manuscript.journalUrl)}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        {language === 'en' ? 'View in Journal' : 'Dergide Görüntüle'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {filteredManuscripts.length === 0 && (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {language === 'en' ? 'No published manuscripts found' : 'Yayınlanan makale bulunamadı'}
              </h3>
              <p className="text-gray-500">
                {language === 'en' 
                  ? 'Try adjusting your search or filter criteria.'
                  : 'Arama veya filtre kriterlerinizi ayarlamayı deneyin.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
