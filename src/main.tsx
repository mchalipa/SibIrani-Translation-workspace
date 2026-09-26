import "./styles.css";
import React from "react";
import App from "./App";
import { createRoot } from "react-dom/client";
import { TranslationProvider } from "./state/TranslationContext";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element was not found");

createRoot(rootElement).render(
  <React.StrictMode>
    <TranslationProvider>
      <App />
    </TranslationProvider>
  </React.StrictMode>,
);
