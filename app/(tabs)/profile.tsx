import React from 'react';
import { Alert, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

import { LanguageSwitcher } from '@/components/molecules/LanguageSwitcher';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const { user, logout } = useAuth();
  const { t } = useLanguage();

  const menuItems = [
    {
      id: 1,
      title: t('profile.myRecipes'),
      icon: 'book.fill',
      onPress: () =>
        Alert.alert(t('profile.myRecipes'), t('profile.myRecipesDescription')),
    },
    {
      id: 2,
      title: t('profile.favorites'),
      icon: 'heart.fill',
      onPress: () =>
        Alert.alert(t('profile.favorites'), t('profile.favoritesDescription')),
    },
    {
      id: 3,
      title: t('profile.settings'),
      icon: 'gear',
      onPress: () =>
        Alert.alert(t('profile.settings'), t('profile.settingsDescription')),
    },
    {
      id: 4,
      title: t('profile.about'),
      icon: 'info.circle.fill',
      onPress: () =>
        Alert.alert(t('profile.about'), t('profile.aboutDescription')),
    },
  ];

  const handleLogout = async () => {
    Alert.alert(t('profile.logout'), t('profile.logoutConfirm'), [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('profile.logout'),
        style: 'destructive',
        onPress: async () => {
          try {
            await logout();
          } catch (error) {
            Alert.alert(t('common.error'), t('profile.logoutError'));
          }
        },
      },
    ]);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <ThemedView style={styles.header}>
        <ThemedView style={styles.avatarContainer}>
          <IconSymbol
            name="person.circle.fill"
            size={80}
            color={Colors[colorScheme ?? 'light'].tint}
          />
        </ThemedView>
        <ThemedText type="title" style={styles.userName}>
          {user?.displayName || 'Chef'}
        </ThemedText>
        <ThemedText style={styles.userEmail}>
          {user?.email || 'user@example.com'}
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.statsContainer}>
        <ThemedView style={styles.statItem}>
          <ThemedText type="subtitle" style={styles.statNumber}>
            12
          </ThemedText>
          <ThemedText style={styles.statLabel}>
            {t('profile.recipesCreated')}
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.statItem}>
          <ThemedText type="subtitle" style={styles.statNumber}>
            8
          </ThemedText>
          <ThemedText style={styles.statLabel}>
            {t('profile.inFavorites')}
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.statItem}>
          <ThemedText type="subtitle" style={styles.statNumber}>
            5
          </ThemedText>
          <ThemedText style={styles.statLabel}>
            {t('profile.popular')}
          </ThemedText>
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.menuContainer}>
        {menuItems.map(item => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.menuItem,
              {
                borderBottomColor: Colors[colorScheme ?? 'light'].border,
              },
            ]}
            onPress={item.onPress}
          >
            <ThemedView style={styles.menuItemLeft}>
              <IconSymbol
                name={item.icon}
                size={24}
                color={Colors[colorScheme ?? 'light'].tint}
              />
              <ThemedText style={styles.menuItemTitle}>{item.title}</ThemedText>
            </ThemedView>
            <IconSymbol
              name="chevron.right"
              size={16}
              color={Colors[colorScheme ?? 'light'].tabIconDefault}
            />
          </TouchableOpacity>
        ))}
      </ThemedView>

      <ThemedView style={styles.languageContainer}>
        <ThemedText style={styles.languageTitle}>
          {t('settings.language')}
        </ThemedText>
        <LanguageSwitcher variant="inline" />
      </ThemedView>

      <TouchableOpacity
        style={[styles.logoutButton, { backgroundColor: '#FF3B30' }]}
        onPress={handleLogout}
      >
        <IconSymbol
          name="rectangle.portrait.and.arrow.right"
          size={20}
          color="white"
        />
        <ThemedText style={styles.logoutText}>{t('profile.logout')}</ThemedText>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    padding: 30,
    paddingTop: 80,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  userEmail: {
    fontSize: 16,
    opacity: 0.7,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginHorizontal: 20,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    opacity: 0.7,
    textAlign: 'center',
  },
  languageContainer: {
    marginHorizontal: 20,
    marginVertical: 16,
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 122, 255, 0.05)',
  },
  languageTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  menuContainer: {
    margin: 20,
    borderRadius: 12,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuItemTitle: {
    fontSize: 16,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
