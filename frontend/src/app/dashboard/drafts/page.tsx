"use client";
import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useLanguage } from '@/context/LanguageContext';
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Edit3,
  Eye,
  Download,
  Search,
  Filter
} from 'lucide-react';

interface Draft {
  id: string;
  title: string;
  status: 'draft' | 'submitted' | 'under_review' | 'revision_requested' | 'accepted' | 'rejected';
  submissionDate: string;
  lastUpdated: string;
  progress: number;
  canEdit: boolean;
  reviewers: string[];
  editorComments?: string;
}

export default function DraftsPage() {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Mock data - in real app, this would come from API
  const [drafts] = useState<Draft[]>([
    {
      id: '1',
      title: 'Machine Learning Applications in Healthcare: A Comprehensive Review',
      status: 'under_review',
      submissionDate: '2024-01-15',
      lastUpdated: '2024-01-20',
      progress: 75,
      canEdit: false,
      reviewers: ['Dr. Sarah Johnson', 'Prof. Michael Chen']
    },
    {
      id: '2',
      title: 'Sustainable Energy Solutions for Urban Development',
      status: 'revision_requested',
      submissionDate: '2024-01-10',
      lastUpdated: '2024-01-18',
      progress: 60,
      canEdit: true,
      reviewers: ['Dr. Emily Brown', 'Prof. David Wilson'],
      editorComments: 'Please address the reviewers\' comments and provide additional data for section 3.2.'
    },
    {
      id: '3',
      title: 'Blockchain Technology in Supply Chain Management',
      status: 'draft',
      submissionDate: '2024-01-05',
      lastUpdated: '2024-01-12',
      progress: 45,
      canEdit: true,
      reviewers: []
    },
    {
      id: '4',
      title: 'Artificial Intelligence in Educational Technology',
      status: 'accepted',
      submissionDate: '2023-12-20',
      lastUpdated: '2024-01-15',
      progress: 100,
      canEdit: false,
      reviewers: ['Dr. Lisa Anderson', 'Prof. Robert Taylor']
    }
  ]);

  const getStatusInfo = (status: Draft['status']) => {
    switch (status) {
      case 'draft':
        return {
          label: language === 'en' ? 'Draft' : 'Taslak',
          color: 'text-gray-600 bg-gray-100',
          icon: <FileText className="h-4 w-4" />
        };
      case 'submitted':
        return {
          label: language === 'en' ? 'Submitted' : 'Gönderildi',
          color: 'text-blue-600 bg-blue-100',
          icon: <Clock className="h-4 w-4" />
        };
      case 'under_review':
        return {
          label: language === 'en' ? 'Under Review' : 'İncelemede',
          color: 'text-yellow-600 bg-yellow-100',
          icon: <AlertCircle className="h-4 w-4" />
        };
      case 'revision_requested':
        return {
          label: language === 'en' ? 'Revision Requested' : 'Revizyon İstendi',
          color: 'text-orange-600 bg-orange-100',
          icon: <Edit3 className="h-4 w-4" />
        };
      case 'accepted':
        return {
          label: language === 'en' ? 'Accepted' : 'Kabul Edildi',
          color: 'text-green-600 bg-green-100',
          icon: <CheckCircle className="h-4 w-4" />
        };
      case 'rejected':
        return {
          label: language === 'en' ? 'Rejected' : 'Reddedildi',
          color: 'text-red-600 bg-red-100',
          icon: <XCircle className="h-4 w-4" />
        };
      default:
        return {
          label: status,
          color: 'text-gray-600 bg-gray-100',
          icon: <FileText className="h-4 w-4" />
        };
    }
  };

  const filteredDrafts = drafts.filter(draft => {
    const matchesSearch = draft.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || draft.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleEdit = (draftId: string) => {
    // In real app, this would navigate to edit page or open edit modal
    console.log('Edit draft:', draftId);
  };

  const handleView = (draftId: string) => {
    // In real app, this would navigate to view page
    console.log('View draft:', draftId);
  };

  const handleDownload = (draftId: string) => {
    // In real app, this would trigger file download
    console.log('Download draft:', draftId);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            {language === 'en' ? 'My Drafts' : 'Taslaklarım'}
          </h1>
          <p className="text-gray-600 mt-1">
            {language === 'en' 
              ? 'Manage your submitted manuscripts and track their progress.'
              : 'Gönderdiğiniz makaleleri yönetin ve ilerlemelerini takip edin.'}
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
                  placeholder={language === 'en' ? 'Search manuscripts...' : 'Makale ara...'}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div className="md:w-48">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 appearance-none bg-white"
                >
                  <option value="all">{language === 'en' ? 'All Status' : 'Tüm Durumlar'}</option>
                  <option value="draft">{language === 'en' ? 'Draft' : 'Taslak'}</option>
                  <option value="submitted">{language === 'en' ? 'Submitted' : 'Gönderildi'}</option>
                  <option value="under_review">{language === 'en' ? 'Under Review' : 'İncelemede'}</option>
                  <option value="revision_requested">{language === 'en' ? 'Revision Requested' : 'Revizyon İstendi'}</option>
                  <option value="accepted">{language === 'en' ? 'Accepted' : 'Kabul Edildi'}</option>
                  <option value="rejected">{language === 'en' ? 'Rejected' : 'Reddedildi'}</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Drafts List */}
        <div className="space-y-4">
          {filteredDrafts.map((draft) => {
            const statusInfo = getStatusInfo(draft.status);
            return (
              <div key={draft.id} className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">{draft.title}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.color}`}>
                          {statusInfo.icon}
                          <span className="ml-1">{statusInfo.label}</span>
                        </span>
                        <span>
                          {language === 'en' ? 'Submitted:' : 'Gönderildi:'} {draft.submissionDate}
                        </span>
                        <span>
                          {language === 'en' ? 'Updated:' : 'Güncellendi:'} {draft.lastUpdated}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleView(draft.id)}
                        className="p-2 text-gray-400 hover:text-gray-600"
                        title={language === 'en' ? 'View' : 'Görüntüle'}
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDownload(draft.id)}
                        className="p-2 text-gray-400 hover:text-gray-600"
                        title={language === 'en' ? 'Download' : 'İndir'}
                      >
                        <Download className="h-4 w-4" />
                      </button>
                      {draft.canEdit && (
                        <button
                          onClick={() => handleEdit(draft.id)}
                          className="p-2 text-gray-400 hover:text-gray-600"
                          title={language === 'en' ? 'Edit' : 'Düzenle'}
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                      <span>{language === 'en' ? 'Progress' : 'İlerleme'}</span>
                      <span>{draft.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${draft.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Reviewers */}
                  {draft.reviewers.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">
                        {language === 'en' ? 'Reviewers' : 'İnceleyiciler'}:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {draft.reviewers.map((reviewer, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                          >
                            {reviewer}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Editor Comments */}
                  {draft.editorComments && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                      <h4 className="text-sm font-medium text-yellow-800 mb-2">
                        {language === 'en' ? 'Editor Comments' : 'Editör Yorumları'}:
                      </h4>
                      <p className="text-sm text-yellow-700">{draft.editorComments}</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {filteredDrafts.length === 0 && (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {language === 'en' ? 'No manuscripts found' : 'Makale bulunamadı'}
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
