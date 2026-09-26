import { TranslationRow } from "./TranslationRow";
import { KeywordListProps } from "../types/translation.type";

export function KeywordList({
  keywords,
  language,
  direction,
  onTranslationChange,
}: KeywordListProps) {
  return (
    <div className="keyword-list">
      {keywords.map((item) => {
        const translation = item.translations[language] || "";
        return (
          <TranslationRow
            key={item.id}
            keyword={item.key}
            translation={translation}
            direction={direction}
            incomplete={!translation.trim()}
            onChange={(value) => onTranslationChange(item.id, language, value)}
          />
        );
      })}
    </div>
  );
}
