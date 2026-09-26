import type { ChangeEvent } from "react";
import { ChevronDown } from "lucide-react";
import { LanguagePickerProps } from "../types/translation.type";

export function LanguagePicker({
  value,
  onChange,
  languages,
}: LanguagePickerProps) {
  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    onChange(event.target.value);
  }

  return (
    <label className="language-picker">
      <select
        aria-label="Choose translation language"
        value={value}
        onChange={handleChange}
      >
        {languages.map((language) => (
          <option key={language.code} value={language.code}>
            {language.nativeName}
          </option>
        ))}
      </select>
      <ChevronDown aria-hidden="true" />
    </label>
  );
}
