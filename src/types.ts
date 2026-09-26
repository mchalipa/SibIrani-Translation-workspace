export interface Language {
  code: string;
  name: string;
  nativeName: string;
  direction: "ltr" | "rtl";
}

export interface Keyword {
  id: string;
  key: string;
  translations: Record<string, string>;
}

export interface TranslationData {
  languages: Language[];
  keywords: Keyword[];
}

export interface TranslationContextValue {
  data: TranslationData;
  updateTranslation: (id: string, language: string, value: string) => void;
  addKeyword: (key: string, language: string, translation: string) => void;
  reorderKeywords: (fromId: string, toId: string) => void;
  deleteKeyword: (id: string) => void;
}
