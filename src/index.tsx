import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Application from "./Application";
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-xhr-backend";
import { I18nextProvider } from "react-i18next";

i18n.use(Backend)
    .use(LanguageDetector)
    .init({
        fallbackLng: "en",
        debug: true,
        interpolation: {
            escapeValue: false,
        },
        backend: {
            loadPath: "/locales/{{lng}}/translation.json",
        },
    });

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
    <I18nextProvider i18n={i18n}>
        <Application />
    </I18nextProvider>
);
