/**
 * IconGrid Molecule - Icon grid for demonstration
 * Useful for development and testing of icons
 */

import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import { Icon } from '@/components/atoms/Icon';
import { Caption, Heading3 } from '@/components/atoms/Text';
import { ThemedView } from '@/components/themed-view';
import { Sizes } from '@/constants/styles/spacing';
import { Colors } from '@/constants/theme/colors';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface IconItem {
  name: string;
  label: string;
  category: string;
}

const SVG_ICONS: IconItem[] = [
  { name: 'chef-hat', label: 'Chef Hat', category: 'Cooking' },
  { name: 'recipe-book', label: 'Recipe Book', category: 'Cooking' },
  { name: 'cooking-pot', label: 'Cooking Pot', category: 'Cooking' },
  { name: 'fork-knife', label: 'Fork & Knife', category: 'Cooking' },
  { name: 'timer', label: 'Timer', category: 'Cooking' },
  { name: 'star', label: 'Star', category: 'UI' },
  { name: 'heart', label: 'Heart', category: 'UI' },
  { name: 'search', label: 'Search', category: 'UI' },
  { name: 'plus', label: 'Plus', category: 'UI' },
  { name: 'user', label: 'User', category: 'UI' },
];

const SYSTEM_ICONS: IconItem[] = [
  { name: 'house.fill', label: 'Home', category: 'Navigation' },
  { name: 'magnifyingglass', label: 'Search', category: 'Navigation' },
  { name: 'person.fill', label: 'Profile', category: 'Navigation' },
  { name: 'gear', label: 'Settings', category: 'UI' },
  { name: 'pencil', label: 'Edit', category: 'UI' },
  { name: 'trash', label: 'Delete', category: 'UI' },
  { name: 'share', label: 'Share', category: 'UI' },
  { name: 'heart.fill', label: 'Favorite', category: 'UI' },
  { name: 'star.fill', label: 'Rating', category: 'UI' },
  { name: 'checkmark', label: 'Checkmark', category: 'UI' },
];

export interface IconGridProps {
  /** Show only SVG icons */
  svgOnly?: boolean;
  /** Show only system icons */
  systemOnly?: boolean;
  /** Icon size */
  iconSize?: number;
  /** Number of columns */
  columns?: number;
}

export const IconGrid: React.FC<IconGridProps> = ({
  svgOnly = false,
  systemOnly = false,
  iconSize = 32,
  columns = 3,
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const iconsToShow = React.useMemo(() => {
    if (svgOnly) return SVG_ICONS;
    if (systemOnly) return SYSTEM_ICONS;
    return [...SVG_ICONS, ...SYSTEM_ICONS];
  }, [svgOnly, systemOnly]);

  const groupedIcons = React.useMemo(() => {
    const groups: { [key: string]: IconItem[] } = {};
    iconsToShow.forEach(icon => {
      if (!groups[icon.category]) {
        groups[icon.category] = [];
      }
      groups[icon.category].push(icon);
    });
    return groups;
  }, [iconsToShow]);

  const renderIconItem = (icon: IconItem) => (
    <ThemedView key={icon.name} style={styles.iconItem}>
      <Icon name={icon.name} size={iconSize} color={colors.icon} />
      <Caption style={styles.iconLabel} numberOfLines={2}>
        {icon.label}
      </Caption>
      <Caption style={styles.iconName} numberOfLines={1}>
        {icon.name}
      </Caption>
    </ThemedView>
  );

  const renderIconGroup = (category: string, icons: IconItem[]) => (
    <ThemedView key={category} style={styles.group}>
      <Heading3 style={styles.groupTitle}>{category}</Heading3>
      <ThemedView
        style={[
          styles.grid,
          {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          },
        ]}
      >
        {icons.map(renderIconItem)}
      </ThemedView>
    </ThemedView>
  );

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.content}>
        {Object.entries(groupedIcons).map(([category, icons]) =>
          renderIconGroup(category, icons)
        )}
      </ThemedView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: Sizes.md,
  },
  group: {
    marginBottom: Sizes.xl,
  },
  groupTitle: {
    marginBottom: Sizes.md,
    textAlign: 'center',
  },
  grid: {
    gap: Sizes.sm,
  },
  iconItem: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: Sizes.sm,
    borderRadius: Sizes.sm,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    width: '30%',
    marginBottom: Sizes.sm,
  },
  iconLabel: {
    textAlign: 'center',
    marginTop: Sizes.xs,
    fontWeight: '500',
  },
  iconName: {
    textAlign: 'center',
    marginTop: 2,
    opacity: 0.7,
    fontSize: 10,
  },
});
