import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Application from "./Application";
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-xhr-backend";
import { I18nextProvider } from "react-i18next";
import translationEN from "./locales/en.json";
import translationAR from "./locales/ar.json";
import { initReactI18next } from "react-i18next";

// const resources = {
//     en: {
//         translation: translationEN,
//     },
//     ar: {
//         translation: translationAR,
//     },
// };

// i18n.use(initReactI18next).init({
//     resources,
//     lng: "ar",
//     fallbackLng: "en",
// });

// i18n.use(Backend)
//     .use(LanguageDetector)
//     .init({
//         fallbackLng: "en",
//         debug: true,
//         interpolation: {
//             escapeValue: false,
//         },
//         backend: {
//             loadPath: "/locales/{{lng}}/translation.json",
//         },
//     });

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(<Application />);
