/**
 * Language Context for Crazy Cooker
 * Manages language switching and provides translation utilities
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { useTranslation } from 'react-i18next';

import { LANGUAGES, type LanguageCode } from '@/lib/i18n';

interface LanguageContextType {
  currentLanguage: LanguageCode;
  availableLanguages: typeof LANGUAGES;
  changeLanguage: (language: LanguageCode) => Promise<void>;
  t: (key: string, options?: Record<string, unknown>) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

interface LanguageProviderProps {
  children: ReactNode;
}

const LANGUAGE_STORAGE_KEY = '@crazy_cooker_language';

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  const { i18n, t } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>('en');
  const [isRTL, setIsRTL] = useState(false);

  // Load saved language on app start
  useEffect(() => {
    const loadSavedLanguage = async () => {
      try {
        const savedLanguage = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
        if (savedLanguage && savedLanguage in LANGUAGES) {
          setCurrentLanguage(savedLanguage as LanguageCode);
          await i18n.changeLanguage(savedLanguage);
        }
      } catch {
        // Error loading saved language
      }
    };
    loadSavedLanguage();
  }, [i18n]);

  // Update RTL status when language changes
  useEffect(() => {
    setIsRTL(currentLanguage === 'ar' || currentLanguage === 'he'); // Add RTL languages if needed
  }, [currentLanguage]);

  const changeLanguage = async (language: LanguageCode) => {
    try {
      // Change i18n language
      await i18n.changeLanguage(language);

      // Update state
      setCurrentLanguage(language);

      // Save to storage
      await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    } catch (error) {
      throw error;
    }
  };

  const value: LanguageContextType = {
    currentLanguage,
    availableLanguages: LANGUAGES,
    changeLanguage,
    t,
    isRTL,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Hook for easy translation
export const useAppTranslation = () => {
  const { t } = useLanguage();
  return { t };
};

// Utility function for translation outside components
export const translate = (key: string): string => {
  // This function should be used carefully as it doesn't have access to the current language context
  // Consider using useLanguage hook instead
  return key; // Fallback to key for now
};
