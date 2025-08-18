import type { Article, Issue } from '@/types/Article';

export const dummyArticles: Article[] = [
  {
    id: 1,
    title: {
      en: 'Sustainable Urban Planning in Emerging Economies: Challenges and Opportunities',
      tr: 'Gelişmekte Olan Ekonomilerde Sürdürülebilir Kentsel Planlama: Zorluklar ve Fırsatlar',
    },
    abstract: {
      en: 'This paper examines the challenges and opportunities of implementing sustainable urban planning in rapidly developing economies. Through case studies in major metropolitan areas, we identify key barriers to sustainability implementation and propose a framework for integrated planning that addresses environmental concerns while promoting economic growth.',
      tr: 'Bu makale, hızla gelişen ekonomilerde sürdürülebilir kentsel planlamanın uygulanmasının zorluklarını ve fırsatlarını incelemektedir. Büyük metropol alanlardaki vaka çalışmaları aracılığıyla, sürdürülebilirlik uygulamasının önündeki temel engelleri belirliyor ve ekonomik büyümeyi teşvik ederken çevresel kaygıları ele alan entegre planlama için bir çerçeve öneriyoruz.',
    },
    authors: ['Maria Rodriguez', 'David Chen'],
    publishedDate: { en: 'April 15, 2024', tr: '15 Nisan 2024' },
    doi: '10.1234/ajss.2024.001',
    volume: 10,
    issue: 2,
    category: 'Urban Planning',
    keywords: ['sustainable development', 'urban planning', 'emerging economies', 'environmental policy'],
    readTime: 18,
    coverImage: 'https://images.pexels.com/photos/1098460/pexels-photo-1098460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 2,
    title: {
      en: 'Machine Learning Applications in Early Disease Detection: A Comprehensive Review',
      tr: 'Erken Hastalık Tespitinde Makine Öğrenimi Uygulamaları: Kapsamlı Bir İnceleme',
    },
    abstract: {
      en: 'This review examines recent advances in machine learning applications for early disease detection across various medical fields. We analyze different algorithmic approaches, dataset requirements, and clinical validation methods, while highlighting ethical considerations and implementation challenges in healthcare settings.',
      tr: 'Bu inceleme, çeşitli tıbbi alanlarda erken hastalık tespiti için makine öğrenimi uygulamalarındaki son gelişmeleri incelemektedir. Farklı algoritmik yaklaşımları, veri seti gereksinimlerini ve klinik doğrulama yöntemlerini analiz ederken, sağlık ortamlarında etik hususları ve uygulama zorluklarını vurguluyoruz.',
    },
    authors: ['Sarah Johnson', 'Michael Lee', 'Ahmed Hassan'],
    publishedDate: { en: 'March 28, 2024', tr: '28 Mart 2024' },
    doi: '10.1234/ajss.2024.002',
    volume: 10,
    issue: 2,
    category: 'Medical Informatics',
    keywords: ['machine learning', 'disease detection', 'healthcare', 'artificial intelligence', 'medical diagnostics'],
    readTime: 25,
    coverImage: 'https://images.pexels.com/photos/6476254/pexels-photo-6476254.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 3,
    title: {
      en: 'Climate Change Impacts on Agricultural Productivity in Mediterranean Regions',
      tr: 'İklim Değişikliğinin Akdeniz Bölgelerindeki Tarımsal Üretkenlik Üzerindeki Etkileri',
    },
    abstract: {
      en: 'This study investigates the impacts of climate change on agricultural productivity in Mediterranean regions over the past three decades. Using long-term meteorological data and crop yield statistics, we identify significant correlations between changing climate patterns and crop productivity, while modeling potential future scenarios under various climate projections.',
      tr: 'Bu çalışma, son otuz yılda iklim değişikliğinin Akdeniz bölgelerindeki tarımsal üretkenlik üzerindeki etkilerini araştırmaktadır. Uzun vadeli meteorolojik verileri ve mahsul verimi istatistiklerini kullanarak, değişen iklim modelleri ile ürün verimliliği arasında önemli korelasyonlar belirlerken, çeşitli iklim projeksiyonları altında potansiyel gelecek senaryolarını modellemektedir.',
    },
    authors: ['Antonio Rossi', 'Fatima El-Tayeb'],
    publishedDate: { en: 'February 10, 2024', tr: '10 Şubat 2024' },
    doi: '10.1234/ajss.2024.003',
    volume: 10,
    issue: 1,
    category: 'Environmental Science',
    keywords: ['climate change', 'agriculture', 'Mediterranean', 'crop yields', 'adaptation strategies'],
    readTime: 20,
    coverImage: 'https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 4,
    title: {
      en: 'Digital Transformation in Higher Education: Post-Pandemic Perspectives',
      tr: 'Yükseköğretimde Dijital Dönüşüm: Pandemi Sonrası Perspektifler',
    },
    abstract: {
      en: 'This research explores how higher education institutions have adapted to digital transformation following the COVID-19 pandemic. Through surveys and interviews with administrators, faculty, and students across multiple countries, we identify successful implementation strategies, persistent challenges, and recommendations for sustainable digital integration in academia.',
      tr: 'Bu araştırma, yükseköğretim kurumlarının COVID-19 pandemisinin ardından dijital dönüşüme nasıl uyum sağladığını incelemektedir. Birden fazla ülkedeki yöneticiler, öğretim üyeleri ve öğrencilerle yapılan anketler ve görüşmeler aracılığıyla, başarılı uygulama stratejilerini, kalıcı zorlukları ve akademide sürdürülebilir dijital entegrasyon için önerileri belirliyoruz.',
    },
    authors: ['Jennifer Wilson', 'Carlos Mendez', 'Priya Sharma'],
    publishedDate: { en: 'January 25, 2024', tr: '25 Ocak 2024' },
    doi: '10.1234/ajss.2024.004',
    volume: 10,
    issue: 1,
    category: 'Education',
    keywords: ['digital transformation', 'higher education', 'online learning', 'educational technology', 'COVID-19'],
    readTime: 22,
    coverImage: 'https://images.pexels.com/photos/5212703/pexels-photo-5212703.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
];

export const dummyIssues: Issue[] = [
  {
    id: 1,
    volume: 10,
    issue: 2,
    publishedDate: { en: 'April 2024', tr: 'Nisan 2024' },
    title: {
      en: 'Special Issue: Sustainable Development and Technology',
      tr: 'Özel Sayı: Sürdürülebilir Kalkınma ve Teknoloji',
    },
    description: {
      en: 'This special issue explores the intersection of sustainable development and emerging technologies across various disciplines.',
      tr: 'Bu özel sayı, çeşitli disiplinlerde sürdürülebilir kalkınma ve gelişen teknolojilerin kesişimini araştırıyor.',
    },
    coverImage: 'https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    articles: [1, 2],
  },
  {
    id: 2,
    volume: 10,
    issue: 1,
    publishedDate: { en: 'January 2024', tr: 'Ocak 2024' },
    title: {
      en: 'Education and Environmental Sciences',
      tr: 'Eğitim ve Çevre Bilimleri',
    },
    description: {
      en: 'This issue covers recent research in educational technology and environmental sciences with a focus on interdisciplinary approaches.',
      tr: 'Bu sayı, disiplinlerarası yaklaşımlara odaklanarak eğitim teknolojisi ve çevre bilimlerindeki son araştırmaları kapsamaktadır.',
    },
    coverImage: 'https://images.pexels.com/photos/2659387/pexels-photo-2659387.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    articles: [3, 4],
  },
  {
    id: 3,
    volume: 9,
    issue: 4,
    publishedDate: { en: 'October 2023', tr: 'Ekim, 2023' },
    title: { en: 'Economics and Psychology', tr: 'Ekonomi ve Psikoloji' },
    description: {
      en: 'This issue presents research on economic developments and psychological impacts of changing work environments.',
      tr: 'Bu sayı, ekonomik gelişmeler ve değişen çalışma ortamlarının psikolojik etkileri üzerine araştırmalar sunmaktadır.',
    },
    coverImage: 'https://images.pexels.com/photos/7941807/pexels-photo-7941807.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    articles: [5, 6],
  },
  {
    id: 4,
    volume: 9,
    issue: 3,
    publishedDate: { en: 'July 2023', tr: 'Temmuz 2023' },
    title: {
      en: 'Technological Innovations in Energy and Law',
      tr: 'Enerji ve Hukukta Teknolojik Yenilikler',
    },
    description: {
      en: 'This issue explores technological innovations in energy sectors and legal systems with case studies from various regions.',
      tr: 'Bu sayı, çeşitli bölgelerden vaka çalışmalarıyla enerji sektörlerinde ve hukuk sistemlerinde teknolojik yenilikleri araştırıyor.',
    },
    coverImage: 'https://images.pexels.com/photos/3856174/pexels-photo-3856174.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    articles: [7, 8],
  },
];


