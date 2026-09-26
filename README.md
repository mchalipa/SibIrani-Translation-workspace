# SibIrani — Translation workspace

A responsive React + TypeScript translation management app. The interface is built from small, focused components, styled with Tailwind CSS, and stores glossary changes in browser `localStorage` through a shared React Context.

## Run locally

Requirements: Node.js 18+ and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. Run `npm run typecheck` to check TypeScript, `npm run build` to type-check and create the production bundle, or `npm run preview` to preview it locally.

## Features

- Inline translation editing and language selection.
- Add keywords with a translation in the selected language; other language values start empty.
- Empty translations are highlighted for easy identification.
- Responsive layouts for desktop and mobile.
- Automatic localStorage persistence and safe fallback to the starter dataset if saved JSON is missing or invalid.

## Assumptions

- The starter language set is English, Persian, and Spanish, with sample words and translations. Persian is the initial editing language to reflect the supplied design.
- Keywords are unique, case-insensitively. They serve as the source-language label and are not separately editable.
- Languages are a configured set in this prototype. Adding a new language would require a language-management workflow; each keyword's translation map already supports additional language codes.
- Data is local to the current browser and device. No backend or cross-user synchronization is included.
- The management screen is intentionally focused on translation editing and adding words.

## Data model

```js
{
  languages: [{ code: 'en', name: 'English', nativeName: 'English', direction: 'ltr' }],
  keywords: [{
    id: 'hello',
    key: 'hello',
    translations: { en: 'Hello', fa: 'سلام', es: 'Hola' }
  }]
}
```

## Written questions

### 1. Why this data structure, and how does it hold up when a language is added?

The dataset separates the language catalog from the keyword records. Each keyword has a stable ID for React rendering and reordering, a source key, and a `translations` object keyed by language code. Looking up or updating one translation is direct (`translations[languageCode]`), and a missing or empty value naturally represents work that has not been translated. Keeping display metadata such as native name and writing direction in the language catalog avoids repeating it for every word. The ordered keyword array also makes the dashboard's drag order explicit and lets the public page use the exact same order.

Adding a language does not require changing the keyword shape: add its code to the language catalog and add an empty value for that code to each keyword. In a larger app, the language catalog would be managed separately, and missing translation keys could be treated as equivalent to empty values during migration. Stable language codes (for example, `pt-BR`) are important so labels can change without invalidating stored translations. This structure suits a small local-first glossary; if records became very large, the array could be normalized into an ID-indexed object with a separate ordered ID list.

### 2. How would you scale to thousands of keywords and many languages? What becomes the first bottleneck?

The first bottleneck here would be browser storage and client-side rendering, rather than translation lookup. Every edit serializes the complete dataset to localStorage, which is synchronous and has a small per-origin quota. Rendering every keyword at once also increases DOM work as the glossary grows. I would move persistence and collaboration to an API/database, save only changed records (with debouncing or batched requests), and paginate or virtualize long lists. Search and filtering should be server-side once the dataset is too large to scan on each keystroke. An indexed data model and database indexes on keyword and language would make lookup predictable. For collaborative editing, I would add authentication, authorization, revision/conflict handling, and possibly real-time updates. If the product remains offline-first, IndexedDB is a better local store than localStorage, with a sync queue to reconcile updates when connectivity returns.

## Incomplete / future work

- Language creation/removal, keyword renaming/deletion, reordering, a separate public view, JSON import/export, and backend sync are not included in this focused interface.
- Unit tests are not included.
- Storage quota and browser privacy settings are handled by keeping the UI functional, but persistence cannot be guaranteed if the browser disables storage.
