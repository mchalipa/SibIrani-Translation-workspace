import { useState } from "react";
import type { FormEvent, MouseEvent } from "react";
import { AddKeywordDialogProps } from "../types/translation.type";

export function AddKeywordDialog({
  onAdd,
  onCancel,
  languages,
  defaultLanguage,
}: AddKeywordDialogProps) {
  const [keyword, setKeyword] = useState("");
  const [translation, setTranslation] = useState("");
  return (
    <div
      className="dialog-backdrop"
      onMouseDown={(event: MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) onCancel();
      }}
    >
      <form
        className="add-dialog"
        onSubmit={(event: FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          onAdd(keyword, translation, defaultLanguage);
        }}
      >
        <h2>Add Keyword</h2>
        <label>
          Keyword
          <input
            autoFocus
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            required
          />
        </label>
        <label>
          Translation ·{" "}
          {
            languages.find((language) => language.code === defaultLanguage)
              ?.nativeName
          }
          <input
            value={translation}
            onChange={(event) => setTranslation(event.target.value)}
          />
        </label>
        <div className="dialog-actions">
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit">Add Keyword</button>
        </div>
      </form>
    </div>
  );
}
