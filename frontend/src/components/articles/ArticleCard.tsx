"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import type { Article } from '@/types/Article';
import { Clock, Users, ArrowUpRight } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
  bordered?: boolean;
}

export default function ArticleCard({ article, bordered = true }: ArticleCardProps) {
  const { language } = useLanguage();

  return (
    <div
      className={`bg-white rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg ${
        bordered ? 'border border-gray-200' : ''
      } flex flex-col h-full`}
    >
      <Link href={`/article/${article.id}`}>
        <div className="h-48 overflow-hidden">
          <Image
            src={article.coverImage}
            alt={article.title.en}
            width={600}
            height={300}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      </Link>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center mb-3">
          <span className="text-xs font-medium text-secondary-600 bg-secondary-50 rounded-full px-2.5 py-0.5">
            {article.category}
          </span>
          <span className="ml-auto text-xs text-gray-500">
            {language === 'en' ? article.publishedDate.en : article.publishedDate.tr}
          </span>
        </div>

        <Link href={`/article/${article.id}`} className="group">
          <h3 className="text-lg font-serif font-medium mb-2 group-hover:text-primary-600 transition-colors">
            {language === 'en' ? article.title.en : article.title.tr}
          </h3>
        </Link>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {language === 'en'
            ? article.abstract.en.substring(0, 120) + '...'
            : article.abstract.tr.substring(0, 120) + '...'}
        </p>

        <div className="flex items-center text-xs text-gray-500 mt-4 mb-3">
          <div className="flex items-center">
            <Users className="h-3.5 w-3.5 mr-1" />
            <span>{article.authors.join(', ')}</span>
          </div>
          <div className="flex items-center ml-4">
            <Clock className="h-3.5 w-3.5 mr-1" />
            <span>
              {article.readTime} {language === 'en' ? 'min read' : 'dk okuma'}
            </span>
          </div>
        </div>

        <Link
          href={`/article/${article.id}`}
          className="inline-flex items-center text-primary-600 text-sm font-medium hover:text-primary-700 mt-auto"
        >
          {language === 'en' ? 'Read Full Article' : 'Tam Makaleyi Oku'}
          <ArrowUpRight className="h-3.5 w-3.5 ml-1" />
        </Link>
      </div>
    </div>
  );
}


