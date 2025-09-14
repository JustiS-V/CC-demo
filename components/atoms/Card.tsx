/**
 * Card Atom - Basic card component
 * Foundation for all cards in the application
 */

import type React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  type TouchableOpacityProps,
  type ViewStyle,
} from 'react-native';

import { ThemedView } from '@/components/themed-view';
import { BorderRadius, Shadows, Sizes } from '@/constants/styles/spacing';
import { Colors } from '@/constants/theme/colors';
import { useColorScheme } from '@/hooks/use-color-scheme';

export interface CardProps extends TouchableOpacityProps {
  /** Card size */
  size?: 'sm' | 'md' | 'lg';
  /** Card variant */
  variant?: 'default' | 'elevated' | 'outlined' | 'filled';
  /** Pressable card */
  pressable?: boolean;
  /** Padding */
  padding?: keyof typeof Sizes;
  /** Child elements */
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  size = 'md',
  variant = 'default',
  pressable = false,
  padding = 'md',
  children,
  style,
  ...props
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const cardStyle: ViewStyle = [
    styles.base,
    styles[size],
    styles[variant],
    {
      backgroundColor: getBackgroundColor(variant, colors),
      borderColor: getBorderColor(variant, colors),
      padding: Sizes[padding],
    },
    style,
  ];

  if (pressable) {
    return (
      <TouchableOpacity style={cardStyle} activeOpacity={0.8} {...props}>
        {children}
      </TouchableOpacity>
    );
  }

  return <ThemedView style={cardStyle}>{children}</ThemedView>;
};

// Helper functions
const getBackgroundColor = (variant: string, colors: any): string => {
  switch (variant) {
    case 'filled':
      return colors.surface;
    case 'elevated':
      return colors.background;
    case 'outlined':
    case 'default':
    default:
      return colors.background;
  }
};

const getBorderColor = (variant: string, colors: any): string => {
  switch (variant) {
    case 'outlined':
      return colors.border;
    case 'elevated':
    case 'filled':
    case 'default':
    default:
      return 'transparent';
  }
};

const styles = StyleSheet.create({
  base: {
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
  },

  // Sizes
  sm: {
    minHeight: 80,
  },
  md: {
    minHeight: 120,
  },
  lg: {
    minHeight: 160,
  },

  // Variants
  default: {
    borderWidth: 0,
  },
  elevated: {
    ...Shadows.md,
    borderWidth: 0,
  },
  outlined: {
    borderWidth: 1,
  },
  filled: {
    borderWidth: 0,
  },
});
