/**
 * Header Organism - Application header
 * Complex component consisting of molecules and atoms
 */

import type React from 'react';
import { StyleSheet, type ViewStyle } from 'react-native';

import { Button } from '@/components/atoms/Button';
import { Heading3, Text } from '@/components/atoms/Text';
import { ThemedView } from '@/components/themed-view';
import { ComponentHeights, Sizes } from '@/constants/styles/spacing';
import { Colors } from '@/constants/theme/colors';
import { useColorScheme } from '@/hooks/use-color-scheme';

export interface HeaderAction {
  /** Action icon */
  icon: string;
  /** Action text */
  label?: string;
  /** Press handler */
  onPress: () => void;
  /** Show badge */
  badge?: string | number;
  /** Is action disabled */
  disabled?: boolean;
}

export interface HeaderProps {
  /** Title */
  title?: string;
  /** Subtitle */
  subtitle?: string;
  /** Show back button */
  showBackButton?: boolean;
  /** Back button handler */
  onBackPress?: () => void;
  /** Right side actions */
  actions?: HeaderAction[];
  /** Show search */
  showSearch?: boolean;
  /** Search handler */
  onSearchPress?: () => void;
  /** Container for styling */
  containerStyle?: ViewStyle;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  showBackButton = false,
  onBackPress,
  actions = [],
  showSearch = false,
  onSearchPress,
  containerStyle,
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <ThemedView style={[styles.container, containerStyle]}>
      {/* Left section */}
      <ThemedView style={styles.leftSection}>
        {showBackButton && (
          <Button
            variant="ghost"
            size="sm"
            leftIcon="chevron.left"
            onPress={onBackPress}
            style={styles.backButton}
          />
        )}
      </ThemedView>

      {/* Center section */}
      <ThemedView style={styles.centerSection}>
        {title && <Heading3 style={styles.title}>{title}</Heading3>}
        {subtitle && (
          <Text size="sm" color="muted" style={styles.subtitle}>
            {subtitle}
          </Text>
        )}
      </ThemedView>

      {/* Right section */}
      <ThemedView style={styles.rightSection}>
        {showSearch && (
          <Button
            variant="ghost"
            size="sm"
            leftIcon="magnifyingglass"
            onPress={onSearchPress}
            style={styles.actionButton}
          />
        )}

        {actions.map((action, index) => (
          <Button
            key={index}
            variant="ghost"
            size="sm"
            leftIcon={action.icon}
            onPress={action.onPress}
            disabled={action.disabled}
            style={styles.actionButton}
          >
            {action.badge && (
              <ThemedView
                style={[styles.badge, { backgroundColor: colors.error }]}
              >
                <Text size="xs" color="default" style={styles.badgeText}>
                  {action.badge}
                </Text>
              </ThemedView>
            )}
          </Button>
        ))}
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: ComponentHeights.header,
    paddingHorizontal: Sizes.md,
    paddingTop: Sizes.sm,
  },

  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 60,
  },

  centerSection: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: Sizes.sm,
  },

  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 60,
    justifyContent: 'flex-end',
  },

  backButton: {
    paddingHorizontal: Sizes.sm,
  },

  title: {
    textAlign: 'center',
  },

  subtitle: {
    textAlign: 'center',
    marginTop: 2,
  },

  actionButton: {
    paddingHorizontal: Sizes.sm,
    marginLeft: Sizes.xs,
  },

  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },

  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
});
