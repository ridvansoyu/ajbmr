"use client";
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { 
  User, 
  FileText, 
  BookOpen, 
  Users, 
  ClipboardList, 
  BarChart3, 
  Settings, 
  Mail,
  Menu,
  X,
  Crown,
  Shield,
  PenTool
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

interface MenuItem {
  id: string;
  label: { en: string; tr: string };
  icon: React.ReactNode;
  href: string;
  badge?: number;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const { language } = useLanguage();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Author menu items
  const authorMenuItems: MenuItem[] = [
    {
      id: 'profile',
      label: { en: 'Personal Information', tr: 'Kişisel Bilgiler' },
      icon: <User className="h-5 w-5" />,
      href: '/dashboard/profile'
    },
    {
      id: 'drafts',
      label: { en: 'My Drafts', tr: 'Taslaklarım' },
      icon: <FileText className="h-5 w-5" />,
      href: '/dashboard/drafts',
      badge: 2 // Example badge count
    },
    {
      id: 'published',
      label: { en: 'Published Manuscripts', tr: 'Yayınlanan Makaleler' },
      icon: <BookOpen className="h-5 w-5" />,
      href: '/dashboard/published'
    },
    {
      id: 'reviews',
      label: { en: 'Review Decisions', tr: 'İnceleme Kararları' },
      icon: <Users className="h-5 w-5" />,
      href: '/dashboard/reviews'
    },
    {
      id: 'tasks',
      label: { en: 'My Tasks', tr: 'Görevlerim' },
      icon: <ClipboardList className="h-5 w-5" />,
      href: '/dashboard/tasks'
    },
    {
      id: 'statistics',
      label: { en: 'Statistics', tr: 'İstatistikler' },
      icon: <BarChart3 className="h-5 w-5" />,
      href: '/dashboard/statistics'
    },
    {
      id: 'settings',
      label: { en: 'Account Settings', tr: 'Hesap Ayarları' },
      icon: <Settings className="h-5 w-5" />,
      href: '/dashboard/settings'
    },
    {
      id: 'email-preferences',
      label: { en: 'Email Preferences', tr: 'E-posta Tercihleri' },
      icon: <Mail className="h-5 w-5" />,
      href: '/dashboard/email-preferences'
    }
  ];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            {language === 'en' ? 'Access Denied' : 'Erişim Reddedildi'}
          </h2>
          <p className="text-gray-600 mb-6">
            {language === 'en' 
              ? 'Please log in to access the dashboard.' 
              : 'Panoya erişmek için lütfen giriş yapın.'}
          </p>
          <Link href="/login" className="btn btn-primary">
            {language === 'en' ? 'Go to Login' : 'Giriş Yap'}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 flex flex-col
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* User Information at Top */}
        <div className="border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {/* User Avatar */}
              <div className="h-10 w-10 bg-primary-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {user?.username?.[0] || 'U'}
                </span>
              </div>
              
              {/* User Details */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user?.username || 'User'}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user?.email}
                </p>
                <div className="flex items-center space-x-1 mt-1">
                  {user?.role === 'author' && <PenTool className="h-3 w-3 text-blue-600" />}
                  {user?.role === 'editor' && <Shield className="h-3 w-3 text-green-600" />}
                  {user?.role === 'admin' && <Crown className="h-3 w-3 text-purple-600" />}
                  <span className="text-xs text-gray-500 capitalize">
                    {user?.role || 'Author'}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Mobile Close Button */}
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="mt-6 px-3 flex-1">
          <ul className="space-y-2">
            {authorMenuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className={`
                      flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors
                      ${isActive 
                        ? 'bg-primary-100 text-primary-700 border-r-2 border-primary-600' 
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                      }
                    `}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="mr-3">{item.icon}</span>
                    <span className="flex-1">{item.label[language]}</span>
                    {item.badge && (
                      <span className="ml-auto bg-primary-600 text-white text-xs font-medium px-2 py-1 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64 flex-1">
        {/* Mobile Menu Button */}
        <div className="lg:hidden bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center h-16 px-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-md text-gray-400 hover:text-gray-600"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Page Content */}
        <main className="p-6 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
