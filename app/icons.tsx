/**
 * Icons Screen - Demonstration of all icons
 * Useful for development and testing
 */

import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import { Button } from '@/components/atoms/Button';
import { Heading2, Text } from '@/components/atoms/Text';
import { IconGrid } from '@/components/molecules/IconGrid';
import { Header } from '@/components/organisms/Header';
import { ThemedView } from '@/components/themed-view';
import { Sizes } from '@/constants/styles/spacing';
import { Colors } from '@/constants/theme/colors';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function IconsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const [showMode, setShowMode] = useState<'all' | 'svg' | 'system'>('all');

  const handleBack = () => {
    // Back navigation
  };

  const handleModeChange = (mode: 'all' | 'svg' | 'system') => {
    setShowMode(mode);
  };

  return (
    <ThemedView style={styles.container}>
      <Header
        title="Icons"
        subtitle="Demonstration of all available icons"
        showBackButton
        onBackPress={handleBack}
      />

      <ScrollView style={styles.content}>
        <ThemedView style={styles.section}>
          <Heading2 style={styles.sectionTitle}>Filters</Heading2>
          <ThemedView style={styles.filterButtons}>
            <Button
              variant={showMode === 'all' ? 'primary' : 'outline'}
              size="sm"
              onPress={() => handleModeChange('all')}
              style={styles.filterButton}
            >
              All
            </Button>
            <Button
              variant={showMode === 'svg' ? 'primary' : 'outline'}
              size="sm"
              onPress={() => handleModeChange('svg')}
              style={styles.filterButton}
            >
              SVG
            </Button>
            <Button
              variant={showMode === 'system' ? 'primary' : 'outline'}
              size="sm"
              onPress={() => handleModeChange('system')}
              style={styles.filterButton}
            >
              System
            </Button>
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.section}>
          <Heading2 style={styles.sectionTitle}>
            {showMode === 'all' && 'All Icons'}
            {showMode === 'svg' && 'SVG Icons'}
            {showMode === 'system' && 'System Icons'}
          </Heading2>

          <IconGrid
            svgOnly={showMode === 'svg'}
            systemOnly={showMode === 'system'}
            iconSize={40}
            columns={3}
          />
        </ThemedView>

        <ThemedView style={styles.section}>
          <Heading2 style={styles.sectionTitle}>Information</Heading2>
          <Text style={styles.infoText}>
            {showMode === 'all' &&
              'Showing all available icons: SVG and system.'}
            {showMode === 'svg' &&
              'Showing only SVG icons created specifically for the application.'}
            {showMode === 'system' &&
              'Showing only iOS/SF Symbols system icons.'}
          </Text>

          <Text style={styles.infoText}>
            SVG icons support color and size customization, system icons use
            standard platform colors and styles.
          </Text>
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  section: {
    padding: Sizes.md,
    marginBottom: Sizes.sm,
  },
  sectionTitle: {
    marginBottom: Sizes.md,
  },
  filterButtons: {
    flexDirection: 'row',
    gap: Sizes.sm,
  },
  filterButton: {
    flex: 1,
  },
  infoText: {
    marginBottom: Sizes.sm,
    lineHeight: 20,
  },
});
