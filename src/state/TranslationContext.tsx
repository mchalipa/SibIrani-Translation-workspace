import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { TranslationContextValue, TranslationData } from "../types";

const STORAGE_KEY = "SibIrani-translations-v1";
const initialData: TranslationData = {
  languages: [
    { code: "en", name: "English", nativeName: "English", direction: "ltr" },
    { code: "fa", name: "Persian", nativeName: "فارسی", direction: "rtl" },
    { code: "es", name: "Spanish", nativeName: "Español", direction: "ltr" },
  ],
  keywords: [
    {
      id: "hello",
      key: "Hello",
      translations: { en: "Hello", fa: "سلام", es: "Hola" },
    },
    {
      id: "world",
      key: "World",
      translations: { en: "World", fa: "جهان", es: "Mundo" },
    },
    {
      id: "apple",
      key: "Apple",
      translations: { en: "Apple", fa: "سیب", es: "Manzana" },
    },
    {
      id: "book",
      key: "Book",
      translations: { en: "Book", fa: "کتاب", es: "Libro" },
    },
    { id: "key", key: "Key", translations: { en: "Key", fa: "", es: "Llave" } },
    {
      id: "head",
      key: "Head",
      translations: { en: "Head", fa: "سر", es: "Cabeza" },
    },
    {
      id: "green",
      key: "Green",
      translations: { en: "Green", fa: "سبز", es: "Verde" },
    },
    {
      id: "food",
      key: "Food",
      translations: { en: "Food", fa: "", es: "Comida" },
    },
  ],
};

function isValidData(value: unknown): value is TranslationData {
  if (!value || typeof value !== "object") return false;
  const data = value as Partial<TranslationData>;
  return (
    Array.isArray(data.languages) &&
    data.languages.length > 0 &&
    Array.isArray(data.keywords) &&
    data.languages.every((language) => language.code && language.name && language.nativeName) &&
    data.keywords.every(
      (keyword) => keyword.id && keyword.key && keyword.translations && typeof keyword.translations === "object",
    )
  );
}

function loadData(): TranslationData {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return initialData;
    const parsed = JSON.parse(stored);
    return isValidData(parsed) ? parsed : initialData;
  } catch {
    return initialData;
  }
}

const TranslationContext = createContext<TranslationContextValue | null>(null);

interface TranslationProviderProps { children: ReactNode }

export function TranslationProvider({ children }: TranslationProviderProps) {
  const [data, setData] = useState(loadData);
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // The app remains usable in browsers where localStorage is unavailable.
    }
  }, [data]);

  const actions = useMemo<Omit<TranslationContextValue, "data">>(
    () => ({
      updateTranslation(id, language, value) {
        setData((current) => ({
          ...current,
          keywords: current.keywords.map((item) =>
            item.id === id
              ? {
                  ...item,
                  translations: { ...item.translations, [language]: value },
                }
              : item,
          ),
        }));
      },
      addKeyword(key, language, translation) {
        const cleanKey = key.trim();
        setData((current) => {
          if (
            !cleanKey ||
            current.keywords.some(
              (item) => item.key.toLowerCase() === cleanKey.toLowerCase(),
            )
          )
            return current;
          const id = `${cleanKey.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now().toString(36)}`;
          const translations: Record<string, string> = Object.fromEntries(
            current.languages.map((item) => [item.code, ""]),
          );
          translations[language] = translation.trim();
          return {
            ...current,
            keywords: [
              ...current.keywords,
              { id, key: cleanKey, translations },
            ],
          };
        });
      },
      reorderKeywords(fromId, toId) {
        setData((current) => {
          const from = current.keywords.findIndex((item) => item.id === fromId);
          const to = current.keywords.findIndex((item) => item.id === toId);
          if (from < 0 || to < 0 || from === to) return current;
          const keywords = [...current.keywords];
          const [moved] = keywords.splice(from, 1);
          if (!moved) return current;
          keywords.splice(to, 0, moved);
          return { ...current, keywords };
        });
      },
      deleteKeyword(id) {
        setData((current) => ({
          ...current,
          keywords: current.keywords.filter((item) => item.id !== id),
        }));
      },
    }),
    [],
  );

  const value = useMemo(() => ({ ...actions, data }), [actions, data]);
  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslations(): TranslationContextValue {
  const context = useContext(TranslationContext);
  if (!context)
    throw new Error("useTranslations must be used within TranslationProvider");
  return context;
}
