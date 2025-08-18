export interface BoardMember {
  id: number;
  name: string;
  position: { en: string; tr: string };
  affiliation: { en: string; tr: string };
  bio: { en: string; tr: string };
  image: string;
}

export interface EditorialBoardGroups {
  editorInChief: BoardMember[];
  associateEditors: BoardMember[];
  editorialBoardMembers: BoardMember[];
  internationalAdvisoryBoard: BoardMember[];
}


