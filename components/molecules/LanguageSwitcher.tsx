/**
 * Language Switcher Component
 * Allows users to change the app language
 */

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { BorderRadius, Shadows, Sizes } from '@/constants/styles/spacing';
import { Colors } from '@/constants/theme/colors';
import { useLanguage } from '@/contexts/LanguageContext';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React, { useState } from 'react';
import { FlatList, Modal, StyleSheet, TouchableOpacity, View } from 'react-native';

interface LanguageSwitcherProps {
  /** Show as button or inline */
  variant?: 'button' | 'inline';
  /** Button size */
  size?: 'sm' | 'md' | 'lg';
  /** Show language flag */
  showFlag?: boolean;
  /** Show language name */
  showName?: boolean;
  /** Custom style */
  style?: any;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  variant = 'button',
  size = 'md',
  showFlag = true,
  showName = true,
  style,
}) => {
  const { currentLanguage, availableLanguages, changeLanguage } = useLanguage();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const currentLang = availableLanguages[currentLanguage];

  const handleLanguageChange = async (languageCode: LanguageCode) => {
    try {
      await changeLanguage(languageCode);
      setIsModalVisible(false);
    } catch (error) {
      console.error('Error changing language:', error);
    }
  };

  const renderLanguageItem = ({ item }: { item: typeof currentLang }) => {
    const isSelected = item.code === currentLanguage;
    
    return (
      <TouchableOpacity
        style={[
          styles.languageItem,
          {
            backgroundColor: isSelected ? colors.tint : colors.surface,
            borderColor: isSelected ? colors.tint : colors.border,
          },
        ]}
        onPress={() => handleLanguageChange(item.code)}
      >
        <View style={styles.languageItemContent}>
          {showFlag && (
            <ThemedText style={styles.flag}>{item.flag}</ThemedText>
          )}
          {showName && (
            <View style={styles.languageTextContainer}>
              <ThemedText
                style={[
                  styles.languageName,
                  { color: isSelected ? colors.background : colors.text },
                ]}
              >
                {item.nativeName}
              </ThemedText>
              <ThemedText
                style={[
                  styles.languageCode,
                  { color: isSelected ? colors.background : colors.tabIconDefault },
                ]}
              >
                {item.name}
              </ThemedText>
            </View>
          )}
        </View>
        {isSelected && (
          <IconSymbol
            name="checkmark"
            size={20}
            color={colors.background}
          />
        )}
      </TouchableOpacity>
    );
  };

  if (variant === 'inline') {
    return (
      <View style={[styles.inlineContainer, style]}>
        {Object.values(availableLanguages).map((lang) => (
          <TouchableOpacity
            key={lang.code}
            style={[
              styles.inlineItem,
              {
                backgroundColor: lang.code === currentLanguage ? colors.tint : colors.surface,
                borderColor: lang.code === currentLanguage ? colors.tint : colors.border,
              },
            ]}
            onPress={() => handleLanguageChange(lang.code)}
          >
            {showFlag && (
              <ThemedText style={styles.inlineFlag}>{lang.flag}</ThemedText>
            )}
            {showName && (
              <ThemedText
                style={[
                  styles.inlineText,
                  { color: lang.code === currentLanguage ? colors.background : colors.text },
                ]}
              >
                {lang.code.toUpperCase()}
              </ThemedText>
            )}
          </TouchableOpacity>
        ))}
      </View>
    );
  }

  return (
    <>
      <TouchableOpacity
        style={[
          styles.button,
          styles[size],
          {
            backgroundColor: colors.surface,
            borderColor: colors.border,
          },
          style,
        ]}
        onPress={() => setIsModalVisible(true)}
      >
        <View style={styles.buttonContent}>
          {showFlag && (
            <ThemedText style={styles.buttonFlag}>{currentLang.flag}</ThemedText>
          )}
          {showName && (
            <ThemedText style={[styles.buttonText, { color: colors.text }]}>
              {currentLang.nativeName}
            </ThemedText>
          )}
          <IconSymbol
            name="chevron.down"
            size={16}
            color={colors.tabIconDefault}
          />
        </View>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsModalVisible(false)}
        >
          <ThemedView style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <ThemedText type="subtitle" style={styles.modalTitle}>
                {t('settings.language')}
              </ThemedText>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setIsModalVisible(false)}
              >
                <IconSymbol
                  name="xmark"
                  size={20}
                  color={colors.tabIconDefault}
                />
              </TouchableOpacity>
            </View>

            <FlatList
              data={Object.values(availableLanguages)}
              renderItem={renderLanguageItem}
              keyExtractor={(item) => item.code}
              style={styles.languageList}
              showsVerticalScrollIndicator={false}
            />
          </ThemedView>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  // Button styles
  button: {
    borderWidth: 1,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Sizes.md,
    paddingVertical: Sizes.sm,
    ...Shadows.sm,
  },
  sm: {
    paddingHorizontal: Sizes.sm,
    paddingVertical: Sizes.xs,
  },
  md: {
    paddingHorizontal: Sizes.md,
    paddingVertical: Sizes.sm,
  },
  lg: {
    paddingHorizontal: Sizes.lg,
    paddingVertical: Sizes.md,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonFlag: {
    fontSize: 18,
    marginRight: Sizes.sm,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
  },

  // Inline styles
  inlineContainer: {
    flexDirection: 'row',
    gap: Sizes.sm,
  },
  inlineItem: {
    borderWidth: 1,
    borderRadius: BorderRadius.sm,
    paddingHorizontal: Sizes.sm,
    paddingVertical: Sizes.xs,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 40,
  },
  inlineFlag: {
    fontSize: 16,
  },
  inlineText: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 2,
  },

  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Sizes.lg,
  },
  modalContent: {
    width: '100%',
    maxWidth: 400,
    borderRadius: BorderRadius.lg,
    padding: Sizes.lg,
    ...Shadows.lg,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Sizes.lg,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  closeButton: {
    padding: Sizes.sm,
  },

  // Language list styles
  languageList: {
    maxHeight: 300,
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Sizes.md,
    marginBottom: Sizes.sm,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
  },
  languageItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  flag: {
    fontSize: 24,
    marginRight: Sizes.md,
  },
  languageTextContainer: {
    flex: 1,
  },
  languageName: {
    fontSize: 16,
    fontWeight: '500',
  },
  languageCode: {
    fontSize: 14,
    marginTop: 2,
  },
});
