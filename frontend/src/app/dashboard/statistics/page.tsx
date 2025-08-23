"use client";
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useLanguage } from '@/context/LanguageContext';
import { 
  BarChart3, 
  BookOpen, 
  Users, 
  TrendingUp,
  Calendar,
  Download,
  Eye,
  Star,
  Award
} from 'lucide-react';

interface PublicationStats {
  year: number;
  publications: number;
  citations: number;
  downloads: number;
}

interface ReviewStats {
  year: number;
  reviews: number;
  averageRating: number;
}

export default function StatisticsPage() {
  const { language } = useLanguage();

  // Mock data - in real app, this would come from API
  const publicationStats: PublicationStats[] = [
    { year: 2020, publications: 3, citations: 15, downloads: 120 },
    { year: 2021, publications: 5, citations: 28, downloads: 245 },
    { year: 2022, publications: 4, citations: 42, downloads: 189 },
    { year: 2023, publications: 6, citations: 67, downloads: 312 },
    { year: 2024, publications: 2, citations: 12, downloads: 89 }
  ];

  const reviewStats: ReviewStats[] = [
    { year: 2020, reviews: 8, averageRating: 4.2 },
    { year: 2021, reviews: 12, averageRating: 4.5 },
    { year: 2022, reviews: 15, averageRating: 4.3 },
    { year: 2023, reviews: 18, averageRating: 4.6 },
    { year: 2024, reviews: 5, averageRating: 4.4 }
  ];

  const totalPublications = publicationStats.reduce((sum, stat) => sum + stat.publications, 0);
  const totalCitations = publicationStats.reduce((sum, stat) => sum + stat.citations, 0);
  const totalDownloads = publicationStats.reduce((sum, stat) => sum + stat.downloads, 0);
  const totalReviews = reviewStats.reduce((sum, stat) => sum + stat.reviews, 0);
  const averageRating = reviewStats.reduce((sum, stat) => sum + stat.averageRating, 0) / reviewStats.length;

  const hIndex = calculateHIndex(publicationStats.map(stat => stat.citations));
  const impactFactor = calculateImpactFactor(totalCitations, totalPublications);

  function calculateHIndex(citations: number[]): number {
    const sortedCitations = citations.sort((a, b) => b - a);
    let hIndex = 0;
    for (let i = 0; i < sortedCitations.length; i++) {
      if (sortedCitations[i] >= i + 1) {
        hIndex = i + 1;
      } else {
        break;
      }
    }
    return hIndex;
  }

  function calculateImpactFactor(citations: number, publications: number): number {
    return publications > 0 ? citations / publications : 0;
  }

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.round(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            {language === 'en' ? 'Statistics' : 'İstatistikler'}
          </h1>
          <p className="text-gray-600 mt-1">
            {language === 'en' 
              ? 'View your publication and review performance metrics.'
              : 'Yayın ve inceleme performans metriklerinizi görüntüleyin.'}
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  {language === 'en' ? 'Total Publications' : 'Toplam Yayın'}
                </p>
                <p className="text-2xl font-semibold text-gray-900">{totalPublications}</p>
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
                  {language === 'en' ? 'Total Citations' : 'Toplam Atıf'}
                </p>
                <p className="text-2xl font-semibold text-gray-900">{totalCitations}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Download className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  {language === 'en' ? 'Total Downloads' : 'Toplam İndirme'}
                </p>
                <p className="text-2xl font-semibold text-gray-900">{totalDownloads}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <BarChart3 className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  {language === 'en' ? 'Total Reviews' : 'Toplam İnceleme'}
                </p>
                <p className="text-2xl font-semibold text-gray-900">{totalReviews}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {language === 'en' ? 'H-Index' : 'H-İndeks'}
                </p>
                <p className="text-3xl font-bold text-gray-900">{hIndex}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Award className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {language === 'en' 
                ? 'H-index measures both productivity and citation impact'
                : 'H-indeks hem üretkenliği hem de atıf etkisini ölçer'}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {language === 'en' ? 'Impact Factor' : 'Etki Faktörü'}
                </p>
                <p className="text-3xl font-bold text-gray-900">{impactFactor.toFixed(2)}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {language === 'en' 
                ? 'Average citations per publication'
                : 'Yayın başına ortalama atıf'}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {language === 'en' ? 'Average Rating' : 'Ortalama Puan'}
                </p>
                <div className="flex items-center mt-1">
                  <div className="flex items-center space-x-1">
                    {getRatingStars(averageRating)}
                  </div>
                  <span className="text-lg font-semibold text-gray-900 ml-2">
                    {averageRating.toFixed(1)}
                  </span>
                </div>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Star className="h-8 w-8 text-yellow-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {language === 'en' 
                ? 'Average rating from review assignments'
                : 'İnceleme görevlerinden ortalama puan'}
            </p>
          </div>
        </div>

        {/* Publication Trends */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">
              {language === 'en' ? 'Publication Trends' : 'Yayın Trendleri'}
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {publicationStats.map((stat) => (
                <div key={stat.year} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{stat.year}</p>
                      <p className="text-sm text-gray-500">
                        {language === 'en' ? 'Publications' : 'Yayınlar'}: {stat.publications}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-6 text-sm">
                      <div>
                        <p className="font-medium text-blue-600">{stat.citations}</p>
                        <p className="text-gray-500">{language === 'en' ? 'Citations' : 'Atıf'}</p>
                      </div>
                      <div>
                        <p className="font-medium text-green-600">{stat.downloads}</p>
                        <p className="text-gray-500">{language === 'en' ? 'Downloads' : 'İndirme'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Review Performance */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">
              {language === 'en' ? 'Review Performance' : 'İnceleme Performansı'}
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {reviewStats.map((stat) => (
                <div key={stat.year} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Users className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{stat.year}</p>
                      <p className="text-sm text-gray-500">
                        {language === 'en' ? 'Reviews' : 'İncelemeler'}: {stat.reviews}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        {getRatingStars(stat.averageRating)}
                      </div>
                      <span className="font-medium text-gray-900">
                        {stat.averageRating.toFixed(1)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      {language === 'en' ? 'Average Rating' : 'Ortalama Puan'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Performance Summary */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg shadow-sm p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium mb-2">
                {language === 'en' ? 'Performance Summary' : 'Performans Özeti'}
              </h3>
              <p className="text-primary-100">
                {language === 'en' 
                  ? `You have published ${totalPublications} papers with ${totalCitations} total citations and completed ${totalReviews} reviews with an average rating of ${averageRating.toFixed(1)}/5.`
                  : `${totalPublications} makale yayınladınız, toplam ${totalCitations} atıf aldınız ve ${totalReviews} inceleme tamamladınız, ortalama puanınız ${averageRating.toFixed(1)}/5.`}
              </p>
            </div>
            <div className="p-3 bg-white bg-opacity-20 rounded-lg">
              <TrendingUp className="h-8 w-8" />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
