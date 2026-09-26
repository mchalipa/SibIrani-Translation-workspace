import { useState } from "react";
import { KeywordList } from "./KeywordList";
import { LanguagePicker } from "./LanguagePicker";
import { AddKeywordButton } from "./AddKeywordButton";
import { AddKeywordDialog } from "./AddKeywordDialog";
import { useTranslations } from "../state/TranslationContext";

export function TranslationManagement() {
  const { data, updateTranslation, addKeyword } = useTranslations();
  const [language, setLanguage] = useState("fa");
  const [isAdding, setIsAdding] = useState(false);
  const activeLanguage =
    data.languages.find((item: any) => item.code === language) ||
    data.languages[0];

  function handleAdd(
    keyword: string,
    translation: string,
    selectedLanguage: string,
  ) {
    addKeyword(keyword, selectedLanguage, translation);
    setIsAdding(false);
  }

  return (
    <main className="management-page">
      <div className="management-content">
        <header className="management-heading">
          <h1>Translation Management</h1>
          <LanguagePicker
            languages={data.languages}
            value={activeLanguage.code}
            onChange={setLanguage}
          />
        </header>
        <section
          className="translation-panel"
          aria-label="Keyword translations"
        >
          <KeywordList
            keywords={data.keywords}
            language={activeLanguage.code}
            direction={activeLanguage.direction}
            onTranslationChange={updateTranslation}
          />
        </section>
        <AddKeywordButton onClick={() => setIsAdding(true)} />
      </div>
      {isAdding && (
        <AddKeywordDialog
          languages={data.languages}
          defaultLanguage={activeLanguage.code}
          onCancel={() => setIsAdding(false)}
          onAdd={handleAdd}
        />
      )}
    </main>
  );
}
