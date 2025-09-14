/**
 * TabButton Molecule - Tab button
 * Specialized button for tab navigation
 */

import { Button, ButtonProps } from '@/components/atoms/Button';
import { Text } from '@/components/atoms/Text';
import { BorderRadius, ComponentHeights } from '@/constants/styles/spacing';
import { Colors } from '@/constants/theme/colors';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';

export interface TabButtonProps extends Omit<ButtonProps, 'children' | 'variant'> {
  /** Is button active */
  active?: boolean;
  /** Tab icon */
  icon?: string;
  /** Tab text */
  label?: string;
  /** Show only icon */
  iconOnly?: boolean;
  /** Show badge */
  badge?: string | number;
  /** Press handler */
  onPress?: () => void;
}

export const TabButton: React.FC<TabButtonProps> = ({
  active = false,
  icon,
  label,
  iconOnly = false,
  badge,
  onPress,
  style,
  ...buttonProps
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const buttonStyle: ViewStyle = [
    styles.button,
    active && styles.activeButton,
    iconOnly && styles.iconOnlyButton,
    style,
  ];

  const iconColor = active ? colors.tabIconSelected : colors.tabIconDefault;
  const textColor = active ? colors.tabIconSelected : colors.tabIconDefault;

  return (
    <Button
      {...buttonProps}
      variant="ghost"
      size="md"
      onPress={onPress}
      style={buttonStyle}
      leftIcon={icon}
    >
      {!iconOnly && label && (
        <Text 
          size="sm" 
          weight="medium" 
          color={active ? 'primary' : 'muted'}
          style={styles.label}
        >
          {label}
        </Text>
      )}
      
      {badge && (
        <ThemedView style={[styles.badge, { backgroundColor: colors.error }]}>
          <Text size="xs" color="default" style={styles.badgeText}>
            {badge}
          </Text>
        </ThemedView>
      )}
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: BorderRadius.md,
    minHeight: ComponentHeights.button.sm,
  },
  
  activeButton: {
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
  },
  
  iconOnlyButton: {
    paddingHorizontal: 8,
  },
  
  label: {
    marginTop: 4,
  },
  
  badge: {
    position: 'absolute',
    top: 4,
    right: 4,
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
