export interface Language {
  id: string;
  type: string;
  attributes: {
    id: number;
    name: string;
    abbreviation: string;
  };
}
export interface LanguageList {
  id: number;
  name: string;
  abbreviation: string;
}

export interface LanguageData {
  data: Language[];
}
