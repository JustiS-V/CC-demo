# Internationalization (i18n) Guide

This document explains how to use the internationalization system in Crazy Cooker.

## Overview

The app supports multiple languages with automatic detection of the device's locale. Currently supported languages:
- English (en) - Default
- Russian (ru)

## Architecture

### Core Components

1. **i18n Configuration** (`lib/i18n.ts`)
   - Configures react-i18next
   - Sets up language detection
   - Defines fallback behavior

2. **Language Context** (`contexts/LanguageContext.tsx`)
   - Manages language state
   - Provides language switching functionality
   - Persists language preference

3. **Language Switcher** (`components/molecules/LanguageSwitcher.tsx`)
   - UI component for changing languages
   - Supports button and inline variants

## Usage

### Basic Translation

```tsx
import { useLanguage } from '@/contexts/LanguageContext';

function MyComponent() {
  const { t } = useLanguage();
  
  return (
    <Text>{t('common.loading')}</Text>
  );
}
```

### Translation Keys Structure

Translations are organized in nested objects:

```json
{
  "common": {
    "loading": "Loading...",
    "error": "Error"
  },
  "auth": {
    "welcome": "Welcome to Crazy Cooker!",
    "signIn": "Sign In"
  },
  "navigation": {
    "catalog": "Catalog",
    "profile": "Profile"
  }
}
```

### Language Switcher Component

```tsx
import { LanguageSwitcher } from '@/components/molecules/LanguageSwitcher';

// Button variant (default)
<LanguageSwitcher />

// Inline variant
<LanguageSwitcher variant="inline" />

// Custom styling
<LanguageSwitcher 
  size="lg" 
  showFlag={true} 
  showName={true} 
/>
```

## Adding New Languages

1. **Create translation file** in `locales/` directory:
   ```json
   // locales/es.json
   {
     "common": {
       "loading": "Cargando...",
       "error": "Error"
     }
   }
   ```

2. **Update language configuration** in `lib/i18n.ts`:
   ```typescript
   export const LANGUAGES = {
     en: { name: 'English', nativeName: 'English', flag: '🇺🇸' },
     ru: { name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' },
     es: { name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' }, // New language
   };
   ```

3. **Import translation** in `lib/i18n.ts`:
   ```typescript
   import en from '../locales/en.json';
   import ru from '../locales/ru.json';
   import es from '../locales/es.json'; // New import
   
   const resources = {
     en: { translation: en },
     ru: { translation: ru },
     es: { translation: es }, // New resource
   };
   ```

## Adding New Translation Keys

1. **Add to all language files**:
   ```json
   // locales/en.json
   {
     "newSection": {
       "newKey": "New Value"
     }
   }
   
   // locales/ru.json
   {
     "newSection": {
       "newKey": "Новое значение"
     }
   }
   ```

2. **Use in components**:
   ```tsx
   const { t } = useLanguage();
   return <Text>{t('newSection.newKey')}</Text>;
   ```

## Best Practices

### Translation Key Naming

- Use descriptive, hierarchical keys
- Group related translations in sections
- Use camelCase for consistency

```json
{
  "auth": {
    "signInButton": "Sign In",
    "signUpButton": "Sign Up",
    "forgotPasswordLink": "Forgot Password?"
  }
}
```

### Pluralization

For plural forms, use i18next's pluralization:

```json
{
  "recipe": {
    "count_one": "{{count}} recipe",
    "count_other": "{{count}} recipes"
  }
}
```

```tsx
const { t } = useLanguage();
return <Text>{t('recipe.count', { count: recipeCount })}</Text>;
```

### Interpolation

Use interpolation for dynamic values:

```json
{
  "welcome": "Welcome, {{name}}!"
}
```

```tsx
const { t } = useLanguage();
return <Text>{t('welcome', { name: user.name })}</Text>;
```

## Language Detection

The app automatically detects the device's language and falls back to English if the language is not supported.

### Manual Language Switching

```tsx
import { useLanguage } from '@/contexts/LanguageContext';

function LanguageButton() {
  const { changeLanguage, currentLanguage } = useLanguage();
  
  const switchToRussian = () => {
    changeLanguage('ru');
  };
  
  return (
    <Button onPress={switchToRussian}>
      Switch to Russian
    </Button>
  );
}
```

## Testing

### Testing Translations

1. **Change device language** in simulator/device settings
2. **Use language switcher** in the app
3. **Verify all UI elements** are translated
4. **Check fallback behavior** for missing translations

### Common Issues

1. **Missing translations**: Check console for missing key warnings
2. **Incorrect interpolation**: Verify parameter names match translation keys
3. **Language not persisting**: Check AsyncStorage permissions

## File Structure

```
locales/
├── en.json          # English translations
├── ru.json          # Russian translations
└── [lang].json      # Additional languages

lib/
└── i18n.ts          # i18n configuration

contexts/
└── LanguageContext.tsx  # Language management

components/molecules/
└── LanguageSwitcher.tsx # Language switcher UI
```

## Performance Considerations

- Translations are loaded once at app startup
- Language switching is instant (no network requests)
- Fallback translations prevent missing key errors
- AsyncStorage caching improves app startup time

## Future Enhancements

- [ ] Add more languages (Spanish, French, German)
- [ ] Implement RTL (Right-to-Left) support
- [ ] Add date/time localization
- [ ] Implement number/currency formatting
- [ ] Add translation management system
- [ ] Implement lazy loading for large translation files
