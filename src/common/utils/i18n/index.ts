import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import { StorageKeys } from 'common/utils/constants';

// translation resources
import en from './locales/en';
import es from './locales/es';
import fr from './locales/fr';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // logging
    debug: true,

    // languages, namespaces, and resources
    supportedLngs: ['en', 'es', 'fr'],
    fallbackLng: 'en',
    ns: ['common', 'users'],
    defaultNS: 'common',
    resources: {
      en,
      es,
      fr,
    },

    // translation defaults
    interpolation: {
      escapeValue: false,
    },

    // plugin - language detector
    detection: {
      lookupLocalStorage: StorageKeys.Language,
    },
  });

export default i18n;
