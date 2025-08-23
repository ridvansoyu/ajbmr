"use client";
import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Users, 
  FileText, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Clock,
  Star,
  MessageSquare,
  Download,
  Eye
} from 'lucide-react';

interface ReviewDecision {
  id: string;
  manuscriptTitle: string;
  reviewerName: string;
  reviewerInstitution: string;
  decision: 'accept' | 'minor_revision' | 'major_revision' | 'reject';
  rating: number;
  submittedDate: string;
  comments: string;
  recommendations: string[];
  canViewReport: boolean;
  reportUrl?: string;
}

export default function ReviewsPage() {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [decisionFilter, setDecisionFilter] = useState<string>('all');

  // Mock data - in real app, this would come from API
  const [reviewDecisions] = useState<ReviewDecision[]>([
    {
      id: '1',
      manuscriptTitle: 'Machine Learning Applications in Healthcare: A Comprehensive Review',
      reviewerName: 'Dr. Sarah Johnson',
      reviewerInstitution: 'Stanford University',
      decision: 'minor_revision',
      rating: 4,
      submittedDate: '2024-01-20',
      comments: 'This is a well-written and comprehensive review of machine learning applications in healthcare. The paper provides valuable insights and covers important aspects of the field. However, there are a few areas that could be improved to strengthen the manuscript.',
      recommendations: [
        'Add more recent references from 2023-2024',
        'Expand the discussion on ethical considerations',
        'Include more details on implementation challenges',
        'Strengthen the conclusion section'
      ],
      canViewReport: true,
      reportUrl: '/reports/review1.pdf'
    },
    {
      id: '2',
      manuscriptTitle: 'Machine Learning Applications in Healthcare: A Comprehensive Review',
      reviewerName: 'Prof. Michael Chen',
      reviewerInstitution: 'MIT',
      decision: 'accept',
      rating: 5,
      submittedDate: '2024-01-18',
      comments: 'Excellent review paper that provides a thorough analysis of machine learning applications in healthcare. The authors have done an outstanding job in synthesizing the current state of the field and identifying future research directions.',
      recommendations: [
        'Consider adding a section on emerging trends',
        'Minor grammatical corrections needed'
      ],
      canViewReport: true,
      reportUrl: '/reports/review2.pdf'
    },
    {
      id: '3',
      manuscriptTitle: 'Sustainable Energy Solutions for Urban Development',
      reviewerName: 'Dr. Emily Brown',
      reviewerInstitution: 'UC Berkeley',
      decision: 'major_revision',
      rating: 3,
      submittedDate: '2024-01-15',
      comments: 'The paper addresses an important topic but requires significant revisions before it can be considered for publication. The methodology needs to be more clearly explained and the results need better validation.',
      recommendations: [
        'Clarify the research methodology',
        'Add more detailed experimental results',
        'Improve the statistical analysis',
        'Address the limitations more thoroughly',
        'Revise the abstract to better reflect the content'
      ],
      canViewReport: true,
      reportUrl: '/reports/review3.pdf'
    },
    {
      id: '4',
      manuscriptTitle: 'Sustainable Energy Solutions for Urban Development',
      reviewerName: 'Prof. David Wilson',
      reviewerInstitution: 'Harvard University',
      decision: 'reject',
      rating: 2,
      submittedDate: '2024-01-12',
      comments: 'While the topic is relevant, the paper has significant methodological flaws and the conclusions are not well-supported by the data presented. The research design needs to be completely revised.',
      recommendations: [
        'Redesign the research methodology',
        'Conduct additional experiments',
        'Provide more robust statistical analysis',
        'Rewrite the entire discussion section'
      ],
      canViewReport: false
    }
  ]);

  const getDecisionInfo = (decision: ReviewDecision['decision']) => {
    switch (decision) {
      case 'accept':
        return {
          label: language === 'en' ? 'Accept' : 'Kabul',
          color: 'text-green-600 bg-green-100',
          icon: <CheckCircle className="h-4 w-4" />
        };
      case 'minor_revision':
        return {
          label: language === 'en' ? 'Minor Revision' : 'Küçük Revizyon',
          color: 'text-blue-600 bg-blue-100',
          icon: <AlertCircle className="h-4 w-4" />
        };
      case 'major_revision':
        return {
          label: language === 'en' ? 'Major Revision' : 'Büyük Revizyon',
          color: 'text-orange-600 bg-orange-100',
          icon: <Clock className="h-4 w-4" />
        };
      case 'reject':
        return {
          label: language === 'en' ? 'Reject' : 'Reddet',
          color: 'text-red-600 bg-red-100',
          icon: <XCircle className="h-4 w-4" />
        };
      default:
        return {
          label: decision,
          color: 'text-gray-600 bg-gray-100',
          icon: <AlertCircle className="h-4 w-4" />
        };
    }
  };

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const filteredDecisions = reviewDecisions.filter(decision => {
    const matchesSearch = decision.manuscriptTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         decision.reviewerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDecision = decisionFilter === 'all' || decision.decision === decisionFilter;
    return matchesSearch && matchesDecision;
  });

  const handleViewReport = (decisionId: string) => {
    // In real app, this would open the review report
    console.log('View report for decision:', decisionId);
  };

  const handleDownloadReport = (decisionId: string) => {
    // In real app, this would download the review report
    console.log('Download report for decision:', decisionId);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            {language === 'en' ? 'Review Decisions' : 'İnceleme Kararları'}
          </h1>
          <p className="text-gray-600 mt-1">
            {language === 'en' 
              ? 'View individual reviewer decisions and feedback for your manuscripts.'
              : 'Makaleleriniz için bireysel inceleyici kararlarını ve geri bildirimlerini görüntüleyin.'}
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <input
                type="text"
                placeholder={language === 'en' ? 'Search by manuscript title or reviewer...' : 'Makale başlığı veya inceleyici ara...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            {/* Decision Filter */}
            <div className="md:w-48">
              <select
                value={decisionFilter}
                onChange={(e) => setDecisionFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="all">{language === 'en' ? 'All Decisions' : 'Tüm Kararlar'}</option>
                <option value="accept">{language === 'en' ? 'Accept' : 'Kabul'}</option>
                <option value="minor_revision">{language === 'en' ? 'Minor Revision' : 'Küçük Revizyon'}</option>
                <option value="major_revision">{language === 'en' ? 'Major Revision' : 'Büyük Revizyon'}</option>
                <option value="reject">{language === 'en' ? 'Reject' : 'Reddet'}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Review Decisions List */}
        <div className="space-y-4">
          {filteredDecisions.map((decision) => {
            const decisionInfo = getDecisionInfo(decision.decision);
            return (
              <div key={decision.id} className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">{decision.manuscriptTitle}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                        <span className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {decision.reviewerName} ({decision.reviewerInstitution})
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {new Date(decision.submittedDate).toLocaleDateString()}
                        </span>
                      </div>
                      
                      {/* Decision and Rating */}
                      <div className="flex items-center space-x-6">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${decisionInfo.color}`}>
                          {decisionInfo.icon}
                          <span className="ml-1">{decisionInfo.label}</span>
                        </span>
                        <div className="flex items-center space-x-1">
                          {getRatingStars(decision.rating)}
                          <span className="text-sm text-gray-500 ml-2">({decision.rating}/5)</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      {decision.canViewReport && (
                        <>
                          <button
                            onClick={() => handleViewReport(decision.id)}
                            className="p-2 text-gray-400 hover:text-gray-600"
                            title={language === 'en' ? 'View Report' : 'Raporu Görüntüle'}
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDownloadReport(decision.id)}
                            className="p-2 text-gray-400 hover:text-gray-600"
                            title={language === 'en' ? 'Download Report' : 'Raporu İndir'}
                          >
                            <Download className="h-4 w-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Comments */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      {language === 'en' ? 'Reviewer Comments' : 'İnceleyici Yorumları'}
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed">{decision.comments}</p>
                  </div>

                  {/* Recommendations */}
                  {decision.recommendations.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">
                        {language === 'en' ? 'Recommendations' : 'Öneriler'}
                      </h4>
                      <ul className="space-y-1">
                        {decision.recommendations.map((recommendation, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-start">
                            <span className="text-primary-600 mr-2">•</span>
                            {recommendation}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {filteredDecisions.length === 0 && (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {language === 'en' ? 'No review decisions found' : 'İnceleme kararı bulunamadı'}
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
