import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import { StorageKeys } from 'utils/constants';

// translation resources
import translationsEN from './translations/en/en.json';
import translationsES from './translations/es/es.json';
import translationsFR from './translations/fr/fr.json';

const resources = {
  en: { translation: translationsEN },
  es: { translation: translationsES },
  fr: { translation: translationsFR },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    detection: {
      lookupLocalStorage: StorageKeys.Language,
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    resources,
    supportedLngs: ['en', 'es', 'fr'],
  });

export default i18n;
