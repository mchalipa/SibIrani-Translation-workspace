import type { ChangeEvent } from "react";
import { TranslationRowProps } from "../types/translation.type";

export function TranslationRow({ keyword, translation, onChange, direction, incomplete }: TranslationRowProps) {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onChange(event.target.value);
  }

  return <div className={`translation-row ${incomplete ? 'incomplete' : ''}`}>
    <span className="source-word">{keyword}</span>
    <input className="translation-field" aria-label={`${keyword} translation`} dir={direction || 'auto'} value={translation} onChange={handleChange} placeholder={incomplete ? '•••••' : ''} />
  </div>;
}
