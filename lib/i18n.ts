/**
 * i18n Configuration for Crazy Cooker
 * Supports Russian and English languages
 */

import * as Localization from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import en from './locales/en.json';
import ru from './locales/ru.json';

// Language resources
const resources = {
  en: {
    translation: en,
  },
  ru: {
    translation: ru,
  },
};

// Available languages
export const LANGUAGES = {
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸',
  },
  ru: {
    code: 'ru',
    name: 'Russian',
    nativeName: 'Русский',
    flag: '🇷🇺',
  },
} as const;

export type LanguageCode = keyof typeof LANGUAGES;

// Initialize i18n
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: Localization.locale.split('-')[0] || 'en', // Use device locale or fallback to English
    fallbackLng: 'en',
    
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    
    // React Native specific options
    react: {
      useSuspense: false,
    },
    
    // Debug mode (only in development)
    debug: __DEV__,
  });

export default i18n;
