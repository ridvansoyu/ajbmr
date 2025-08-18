import type { BoardMember, EditorialBoardGroups } from '@/types/Editorial';

const editorInChief: BoardMember[] = [
  {
    id: 1,
    name: 'Prof. Dr. Ahmet Yılmaz',
    position: { en: 'Editor-in-Chief', tr: 'Baş Editör' },
    affiliation: {
      en: 'Ankara University, Department of International Relations',
      tr: 'Ankara Üniversitesi, Uluslararası İlişkiler Bölümü',
    },
    bio: {
      en: 'Leading researcher in international relations with 20+ years of editorial experience.',
      tr: 'Uluslararası ilişkiler alanında 20+ yıllık editörlük deneyimine sahip araştırmacı.',
    },
    image: 'https://images.pexels.com/photos/5384445/pexels-photo-5384445.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
];

const associateEditors: BoardMember[] = [
  {
    id: 2,
    name: 'Prof. Dr. Ayşe Kaya',
    position: { en: 'Associate Editor', tr: 'Yardımcı Editör' },
    affiliation: {
      en: 'Istanbul Technical University, Department of Environmental Engineering',
      tr: 'İstanbul Teknik Üniversitesi, Çevre Mühendisliği Bölümü',
    },
    bio: {
      en: 'Expert in environmental policy and sustainable development with focus on water resources.',
      tr: 'Çevre politikası ve sürdürülebilir kalkınma uzmanı; su kaynaklarına odaklı.',
    },
    image: 'https://images.pexels.com/photos/5704849/pexels-photo-5704849.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 3,
    name: 'Prof. Dr. Mehmet Demir',
    position: { en: 'Associate Editor', tr: 'Yardımcı Editör' },
    affiliation: {
      en: 'Boğaziçi University, Department of Economics',
      tr: 'Boğaziçi Üniversitesi, Ekonomi Bölümü',
    },
    bio: {
      en: 'Economist with research in development economics, trade, and growth.',
      tr: 'Kalkınma ekonomisi, ticaret ve büyüme alanlarında çalışan ekonomist.',
    },
    image: 'https://images.pexels.com/photos/5384429/pexels-photo-5384429.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 4,
    name: 'Prof. Dr. Zeynep Aydın',
    position: { en: 'Associate Editor', tr: 'Yardımcı Editör' },
    affiliation: {
      en: 'Middle East Technical University, Department of Computer Engineering',
      tr: 'Orta Doğu Teknik Üniversitesi, Bilgisayar Mühendisliği Bölümü',
    },
    bio: {
      en: 'Specialist in AI, machine learning, and big data analytics.',
      tr: 'Yapay zeka, makine öğrenimi ve büyük veri analitiği uzmanı.',
    },
    image: 'https://images.pexels.com/photos/5905885/pexels-photo-5905885.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
];

const editorialBoardMembers: BoardMember[] = [
  {
    id: 5,
    name: 'Prof. Dr. Okan Turan',
    position: { en: 'Editorial Board Member', tr: 'Yayın Kurulu Üyesi' },
    affiliation: {
      en: 'Hacettepe University, Department of Psychology',
      tr: 'Hacettepe Üniversitesi, Psikoloji Bölümü',
    },
    bio: {
      en: 'Research on cognitive psychology and behavioral economics.',
      tr: 'Bilişsel psikoloji ve davranışsal ekonomi üzerine araştırmalar.',
    },
    image: 'https://images.pexels.com/photos/8535207/pexels-photo-8535207.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 6,
    name: 'Prof. Dr. Elif Yılmaz',
    position: { en: 'Editorial Board Member', tr: 'Yayın Kurulu Üyesi' },
    affiliation: {
      en: 'Ege University, Department of Sociology',
      tr: 'Ege Üniversitesi, Sosyoloji Bölümü',
    },
    bio: {
      en: 'Urban sociology and migration studies specialist.',
      tr: 'Kent sosyolojisi ve göç çalışmaları uzmanı.',
    },
    image: 'https://images.pexels.com/photos/6437844/pexels-photo-6437844.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 7,
    name: 'Prof. Dr. Ali Kılıç',
    position: { en: 'Editorial Board Member', tr: 'Yayın Kurulu Üyesi' },
    affiliation: {
      en: 'Koç University, Department of International Relations',
      tr: 'Koç Üniversitesi, Uluslararası İlişkiler Bölümü',
    },
    bio: {
      en: 'Interests in foreign policy analysis and regional security.',
      tr: 'Dış politika analizi ve bölgesel güvenlik ilgi alanları.',
    },
    image: 'https://images.pexels.com/photos/5325840/pexels-photo-5325840.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
];

const internationalAdvisoryBoard: BoardMember[] = [
  {
    id: 8,
    name: 'Prof. Dr. Selin Öztürk',
    position: { en: 'Advisory Board Member', tr: 'Danışma Kurulu Üyesi' },
    affiliation: {
      en: 'Bilkent University, Department of Political Science',
      tr: 'Bilkent Üniversitesi, Siyaset Bilimi Bölümü',
    },
    bio: {
      en: 'Comparative politics and democratization expert.',
      tr: 'Karşılaştırmalı siyaset ve demokratikleşme uzmanı.',
    },
    image: 'https://images.pexels.com/photos/5704826/pexels-photo-5704826.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
];

export const editorialBoardGroups: EditorialBoardGroups = {
  editorInChief,
  associateEditors,
  editorialBoardMembers,
  internationalAdvisoryBoard,
};


