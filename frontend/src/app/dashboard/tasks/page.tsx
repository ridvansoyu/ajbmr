"use client";
import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useLanguage } from '@/context/LanguageContext';
import { 
  ClipboardList, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Calendar,
  Users,
  FileText,
  Eye,
  Download,
  ExternalLink,
  Filter,
  Search
} from 'lucide-react';

interface Task {
  id: string;
  title: string;
  type: 'reviewer' | 'editor' | 'associate_editor';
  status: 'pending' | 'in_progress' | 'completed' | 'overdue';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  dueDate: string;
  assignedDate: string;
  manuscriptTitle: string;
  authors: string[];
  description: string;
  canView: boolean;
  canDownload: boolean;
  manuscriptUrl?: string;
}

export default function TasksPage() {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  // Mock data - in real app, this would come from API
  const [tasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Review: AI in Education',
      type: 'reviewer',
      status: 'in_progress',
      priority: 'high',
      dueDate: '2024-01-25',
      assignedDate: '2024-01-15',
      manuscriptTitle: 'Artificial Intelligence Applications in Educational Technology',
      authors: ['Dr. Sarah Johnson', 'Prof. Michael Chen'],
      description: 'Please review this manuscript on AI applications in education. Focus on methodology, results, and contribution to the field.',
      canView: true,
      canDownload: true,
      manuscriptUrl: '/manuscripts/ai-education.pdf'
    },
    {
      id: '2',
      title: 'Editor: Climate Change Research',
      type: 'editor',
      status: 'pending',
      priority: 'medium',
      dueDate: '2024-01-30',
      assignedDate: '2024-01-18',
      manuscriptTitle: 'Impact of Climate Change on Urban Infrastructure',
      authors: ['Dr. Emily Brown', 'Prof. David Wilson'],
      description: 'As the handling editor, please oversee the review process and make editorial decisions based on reviewer feedback.',
      canView: true,
      canDownload: true,
      manuscriptUrl: '/manuscripts/climate-change.pdf'
    },
    {
      id: '3',
      title: 'Review: Blockchain in Healthcare',
      type: 'reviewer',
      status: 'overdue',
      priority: 'urgent',
      dueDate: '2024-01-20',
      assignedDate: '2024-01-10',
      manuscriptTitle: 'Blockchain Technology for Healthcare Data Management',
      authors: ['Dr. Lisa Anderson', 'Prof. Robert Taylor'],
      description: 'Review this manuscript on blockchain applications in healthcare. This is an urgent review request.',
      canView: true,
      canDownload: true,
      manuscriptUrl: '/manuscripts/blockchain-healthcare.pdf'
    },
    {
      id: '4',
      title: 'Associate Editor: Machine Learning',
      type: 'associate_editor',
      status: 'completed',
      priority: 'low',
      dueDate: '2024-01-15',
      assignedDate: '2024-01-05',
      manuscriptTitle: 'Deep Learning Approaches for Medical Image Analysis',
      authors: ['Dr. John Smith', 'Dr. Maria Garcia'],
      description: 'As associate editor, you have completed the review process for this manuscript.',
      canView: true,
      canDownload: false
    }
  ]);

  const getStatusInfo = (status: Task['status']) => {
    switch (status) {
      case 'pending':
        return {
          label: language === 'en' ? 'Pending' : 'Beklemede',
          color: 'text-yellow-600 bg-yellow-100',
          icon: <Clock className="h-4 w-4" />
        };
      case 'in_progress':
        return {
          label: language === 'en' ? 'In Progress' : 'Devam Ediyor',
          color: 'text-blue-600 bg-blue-100',
          icon: <AlertCircle className="h-4 w-4" />
        };
      case 'completed':
        return {
          label: language === 'en' ? 'Completed' : 'Tamamlandı',
          color: 'text-green-600 bg-green-100',
          icon: <CheckCircle className="h-4 w-4" />
        };
      case 'overdue':
        return {
          label: language === 'en' ? 'Overdue' : 'Gecikmiş',
          color: 'text-red-600 bg-red-100',
          icon: <AlertCircle className="h-4 w-4" />
        };
      default:
        return {
          label: status,
          color: 'text-gray-600 bg-gray-100',
          icon: <Clock className="h-4 w-4" />
        };
    }
  };

  const getPriorityInfo = (priority: Task['priority']) => {
    switch (priority) {
      case 'low':
        return {
          label: language === 'en' ? 'Low' : 'Düşük',
          color: 'text-green-600 bg-green-100'
        };
      case 'medium':
        return {
          label: language === 'en' ? 'Medium' : 'Orta',
          color: 'text-yellow-600 bg-yellow-100'
        };
      case 'high':
        return {
          label: language === 'en' ? 'High' : 'Yüksek',
          color: 'text-orange-600 bg-orange-100'
        };
      case 'urgent':
        return {
          label: language === 'en' ? 'Urgent' : 'Acil',
          color: 'text-red-600 bg-red-100'
        };
      default:
        return {
          label: priority,
          color: 'text-gray-600 bg-gray-100'
        };
    }
  };

  const getTypeInfo = (type: Task['type']) => {
    switch (type) {
      case 'reviewer':
        return {
          label: language === 'en' ? 'Reviewer' : 'İnceleyici',
          color: 'text-blue-600 bg-blue-100'
        };
      case 'editor':
        return {
          label: language === 'en' ? 'Editor' : 'Editör',
          color: 'text-purple-600 bg-purple-100'
        };
      case 'associate_editor':
        return {
          label: language === 'en' ? 'Associate Editor' : 'Yardımcı Editör',
          color: 'text-indigo-600 bg-indigo-100'
        };
      default:
        return {
          label: type,
          color: 'text-gray-600 bg-gray-100'
        };
    }
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date();
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.manuscriptTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || task.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
    return matchesSearch && matchesType && matchesStatus && matchesPriority;
  });

  const handleViewManuscript = (taskId: string) => {
    // In real app, this would open the manuscript
    console.log('View manuscript for task:', taskId);
  };

  const handleDownloadManuscript = (taskId: string) => {
    // In real app, this would download the manuscript
    console.log('Download manuscript for task:', taskId);
  };

  const pendingTasks = tasks.filter(task => task.status === 'pending' || task.status === 'in_progress').length;
  const overdueTasks = tasks.filter(task => task.status === 'overdue').length;
  const completedTasks = tasks.filter(task => task.status === 'completed').length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            {language === 'en' ? 'My Tasks' : 'Görevlerim'}
          </h1>
          <p className="text-gray-600 mt-1">
            {language === 'en' 
              ? 'Manage your assigned tasks as a reviewer, editor, or associate editor.'
              : 'İnceleyici, editör veya yardımcı editör olarak atanan görevlerinizi yönetin.'}
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  {language === 'en' ? 'Pending Tasks' : 'Bekleyen Görevler'}
                </p>
                <p className="text-2xl font-semibold text-gray-900">{pendingTasks}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <AlertCircle className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  {language === 'en' ? 'Overdue Tasks' : 'Gecikmiş Görevler'}
                </p>
                <p className="text-2xl font-semibold text-gray-900">{overdueTasks}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  {language === 'en' ? 'Completed Tasks' : 'Tamamlanan Görevler'}
                </p>
                <p className="text-2xl font-semibold text-gray-900">{completedTasks}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder={language === 'en' ? 'Search tasks...' : 'Görev ara...'}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>

            {/* Type Filter */}
            <div>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="all">{language === 'en' ? 'All Types' : 'Tüm Türler'}</option>
                <option value="reviewer">{language === 'en' ? 'Reviewer' : 'İnceleyici'}</option>
                <option value="editor">{language === 'en' ? 'Editor' : 'Editör'}</option>
                <option value="associate_editor">{language === 'en' ? 'Associate Editor' : 'Yardımcı Editör'}</option>
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="all">{language === 'en' ? 'All Status' : 'Tüm Durumlar'}</option>
                <option value="pending">{language === 'en' ? 'Pending' : 'Beklemede'}</option>
                <option value="in_progress">{language === 'en' ? 'In Progress' : 'Devam Ediyor'}</option>
                <option value="completed">{language === 'en' ? 'Completed' : 'Tamamlandı'}</option>
                <option value="overdue">{language === 'en' ? 'Overdue' : 'Gecikmiş'}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tasks List */}
        <div className="space-y-4">
          {filteredTasks.map((task) => {
            const statusInfo = getStatusInfo(task.status);
            const priorityInfo = getPriorityInfo(task.priority);
            const typeInfo = getTypeInfo(task.type);
            const overdue = isOverdue(task.dueDate);

            return (
              <div key={task.id} className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-medium text-gray-900">{task.title}</h3>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${typeInfo.color}`}>
                          {typeInfo.label}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                        <span className="flex items-center">
                          <FileText className="h-4 w-4 mr-1" />
                          {task.manuscriptTitle}
                        </span>
                        <span className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {task.authors.join(', ')}
                        </span>
                      </div>

                      {/* Status and Priority */}
                      <div className="flex items-center space-x-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.color}`}>
                          {statusInfo.icon}
                          <span className="ml-1">{statusInfo.label}</span>
                        </span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${priorityInfo.color}`}>
                          {priorityInfo.label}
                        </span>
                        <span className={`flex items-center text-sm ${overdue ? 'text-red-600' : 'text-gray-500'}`}>
                          <Calendar className="h-4 w-4 mr-1" />
                          {language === 'en' ? 'Due:' : 'Son Tarih:'} {new Date(task.dueDate).toLocaleDateString()}
                          {overdue && (
                            <span className="ml-2 text-xs text-red-600 font-medium">
                              ({language === 'en' ? 'Overdue' : 'Gecikmiş'})
                            </span>
                          )}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      {task.canView && (
                        <button
                          onClick={() => handleViewManuscript(task.id)}
                          className="p-2 text-gray-400 hover:text-gray-600"
                          title={language === 'en' ? 'View Manuscript' : 'Makaleyi Görüntüle'}
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                      )}
                      {task.canDownload && (
                        <button
                          onClick={() => handleDownloadManuscript(task.id)}
                          className="p-2 text-gray-400 hover:text-gray-600"
                          title={language === 'en' ? 'Download Manuscript' : 'Makaleyi İndir'}
                        >
                          <Download className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      {language === 'en' ? 'Task Description' : 'Görev Açıklaması'}
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed">{task.description}</p>
                  </div>

                  {/* Action Buttons */}
                  {(task.status === 'pending' || task.status === 'in_progress') && (
                    <div className="mt-4 flex items-center space-x-3">
                      <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700">
                        {language === 'en' ? 'Start Task' : 'Görevi Başlat'}
                      </button>
                      <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                        {language === 'en' ? 'Request Extension' : 'Uzatma Talep Et'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {filteredTasks.length === 0 && (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <ClipboardList className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {language === 'en' ? 'No tasks found' : 'Görev bulunamadı'}
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
