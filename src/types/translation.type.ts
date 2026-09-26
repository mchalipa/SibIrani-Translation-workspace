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
export interface AddKeywordButtonProps {
  onClick: () => void;
}

export interface AddKeywordDialogProps {
  onAdd: (keyword: string, translation: string, language: string) => void;
  onCancel: () => void;
  languages: Language[];
  defaultLanguage: string;
}

export interface KeywordListProps {
  keywords: Keyword[];
  language: string;
  direction: "ltr" | "rtl" | undefined;
  onTranslationChange: (id: string, language: string, value: string) => void;
}

export interface LanguagePickerProps {
  languages: Language[];
  value: string;
  onChange: (value: string) => void;
}

export interface TranslationRowProps {
  keyword: string;
  translation: string;
  onChange: (value: string) => void;
  direction: "ltr" | "rtl" | undefined;
  incomplete: boolean;
}
