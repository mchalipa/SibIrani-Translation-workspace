"use client";

import App from "../src/App";
import { TranslationProvider } from "../src/state/TranslationContext";

export default function Page() {
  return (
    <TranslationProvider>
      <App />
    </TranslationProvider>
  );
}
