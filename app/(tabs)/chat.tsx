import React from 'react';
import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function ChatScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type='title' style={styles.title}>
        Чат 💬
      </ThemedText>
      <ThemedText style={styles.subtitle}>
        Здесь будет ИИ генератор рецептов
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    opacity: 0.7,
  },
});
