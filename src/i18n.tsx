import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import translationEN from "./locales/en/translation.json";
// import translationTH from "./locales/th/translation.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: translationEN,
      },
      // th: {
      //   translation: translationTH,
      // }
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  })
  .then(() => {
    let langLocal = localStorage.getItem("i18nextLng")
    if (langLocal?.indexOf('-')){
      let splitLang = langLocal.split('-')
      langLocal = splitLang[0]
    }
    localStorage.setItem("i18nextLng", langLocal ?? "en")
  })

export default i18n
