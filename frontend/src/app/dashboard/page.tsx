"use client";
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { 
  FileText, 
  BookOpen, 
  Users, 
  ClipboardList, 
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  PenTool,
  Shield,
  Crown
} from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const { language } = useLanguage();
  const { user } = useAuth();

  // Mock data - in real app, this would come from API
  const stats = {
    totalPublished: 12,
    totalReviews: 8,
    pendingDrafts: 2,
    activeTasks: 3
  };

  const recentDrafts = [
    {
      id: 1,
      title: 'Machine Learning Applications in Healthcare',
      status: 'Under Review',
      lastUpdated: '2024-01-15',
      progress: 75
    },
    {
      id: 2,
      title: 'Sustainable Energy Solutions',
      status: 'Draft',
      lastUpdated: '2024-01-10',
      progress: 45
    }
  ];

  const recentTasks = [
    {
      id: 1,
      title: 'Review: AI in Education',
      type: 'Reviewer',
      dueDate: '2024-01-20',
      priority: 'High'
    },
    {
      id: 2,
      title: 'Editor: Climate Change Research',
      type: 'Editor',
      dueDate: '2024-01-25',
      priority: 'Medium'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'under review':
        return 'text-blue-600 bg-blue-100';
      case 'draft':
        return 'text-gray-600 bg-gray-100';
      case 'published':
        return 'text-green-600 bg-green-100';
      case 'rejected':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'text-red-600 bg-red-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'low':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                {language === 'en' ? 'Welcome back,' : 'Tekrar hoş geldiniz,'} {user?.username}!
              </h1>
              <p className="text-gray-600">
                {language === 'en' 
                  ? 'Here\'s what\'s happening with your manuscripts and tasks.'
                  : 'Makaleleriniz ve görevlerinizle ilgili güncel durumlar.'}
              </p>
            </div>
            
            {/* Role Badge */}
            <div className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg">
              {user?.role === 'author' && <PenTool className="h-5 w-5 text-blue-600" />}
              {user?.role === 'editor' && <Shield className="h-5 w-5 text-green-600" />}
              {user?.role === 'admin' && <Crown className="h-5 w-5 text-purple-600" />}
              <div>
                <p className="text-sm font-medium text-blue-800 capitalize">
                  {user?.role || 'Author'}
                </p>
                <p className="text-xs text-blue-600">
                  {language === 'en' ? 'Role' : 'Rol'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  {language === 'en' ? 'Published' : 'Yayınlanan'}
                </p>
                <p className="text-2xl font-semibold text-gray-900">{stats.totalPublished}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  {language === 'en' ? 'Reviews' : 'İncelemeler'}
                </p>
                <p className="text-2xl font-semibold text-gray-900">{stats.totalReviews}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <FileText className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  {language === 'en' ? 'Drafts' : 'Taslaklar'}
                </p>
                <p className="text-2xl font-semibold text-gray-900">{stats.pendingDrafts}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <ClipboardList className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  {language === 'en' ? 'Tasks' : 'Görevler'}
                </p>
                <p className="text-2xl font-semibold text-gray-900">{stats.activeTasks}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Drafts */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">
                  {language === 'en' ? 'Recent Drafts' : 'Son Taslaklar'}
                </h3>
                <Link 
                  href="/dashboard/drafts"
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                >
                  {language === 'en' ? 'View all' : 'Tümünü gör'}
                </Link>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentDrafts.map((draft) => (
                  <div key={draft.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-1">{draft.title}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(draft.status)}`}>
                            {draft.status}
                          </span>
                          <span className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {draft.lastUpdated}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm text-gray-500 mb-1">
                          {language === 'en' ? 'Progress' : 'İlerleme'}
                        </div>
                        <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary-600 rounded-full"
                            style={{ width: `${draft.progress}%` }}
                          />
                        </div>
                        <div className="text-xs text-gray-500 mt-1">{draft.progress}%</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Tasks */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">
                  {language === 'en' ? 'Recent Tasks' : 'Son Görevler'}
                </h3>
                <Link 
                  href="/dashboard/tasks"
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                >
                  {language === 'en' ? 'View all' : 'Tümünü gör'}
                </Link>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentTasks.map((task) => (
                  <div key={task.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-1">{task.title}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-600">
                            {task.type}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                            {task.priority}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4 text-right">
                        <div className="text-sm text-gray-500">
                          {language === 'en' ? 'Due' : 'Son Tarih'}
                        </div>
                        <div className="text-sm font-medium text-gray-900">{task.dueDate}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {language === 'en' ? 'Quick Actions' : 'Hızlı İşlemler'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link 
              href="/submit"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors"
            >
              <FileText className="h-6 w-6 text-primary-600 mr-3" />
              <div>
                <div className="font-medium text-gray-900">
                  {language === 'en' ? 'Submit Manuscript' : 'Makale Gönder'}
                </div>
                <div className="text-sm text-gray-500">
                  {language === 'en' ? 'Submit a new manuscript' : 'Yeni makale gönder'}
                </div>
              </div>
            </Link>

            <Link 
              href="/dashboard/profile"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors"
            >
              <Users className="h-6 w-6 text-primary-600 mr-3" />
              <div>
                <div className="font-medium text-gray-900">
                  {language === 'en' ? 'Update Profile' : 'Profili Güncelle'}
                </div>
                <div className="text-sm text-gray-500">
                  {language === 'en' ? 'Edit personal information' : 'Kişisel bilgileri düzenle'}
                </div>
              </div>
            </Link>

            <Link 
              href="/dashboard/statistics"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors"
            >
              <TrendingUp className="h-6 w-6 text-primary-600 mr-3" />
              <div>
                <div className="font-medium text-gray-900">
                  {language === 'en' ? 'View Statistics' : 'İstatistikleri Gör'}
                </div>
                <div className="text-sm text-gray-500">
                  {language === 'en' ? 'Check your performance' : 'Performansınızı kontrol edin'}
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}


