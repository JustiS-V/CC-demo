/**
 * Button Atom - Basic button component
 * Foundation for all buttons in the application
 */

import type React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  type TouchableOpacityProps,
  type ViewStyle,
} from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import {
  BorderRadius,
  ComponentHeights,
  Shadows,
} from '@/constants/styles/spacing';
import { Colors } from '@/constants/theme/colors';
import { useColorScheme } from '@/hooks/use-color-scheme';

export interface ButtonProps extends TouchableOpacityProps {
  /** Button size */
  size?: 'sm' | 'md' | 'lg';
  /** Button variant */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  /** Show loading state */
  loading?: boolean;
  /** Left icon */
  leftIcon?: string;
  /** Right icon */
  rightIcon?: string;
  /** Full width */
  fullWidth?: boolean;
  /** Child elements */
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  size = 'md',
  variant = 'primary',
  loading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  children,
  style,
  disabled,
  ...props
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const buttonStyle: ViewStyle = [
    styles.base,
    styles[size],
    styles[variant],
    {
      backgroundColor: getBackgroundColor(variant, colors),
      borderColor: getBorderColor(variant, colors),
    },
    fullWidth && styles.fullWidth,
    disabled && styles.disabled,
    style,
  ];

  const textColor = getTextColor(variant, colors, disabled);

  return (
    <TouchableOpacity
      style={buttonStyle}
      disabled={disabled || loading}
      activeOpacity={0.8}
      {...props}
    >
      {leftIcon && !loading && (
        <IconSymbol
          name={leftIcon}
          size={getIconSize(size)}
          color={textColor}
          style={styles.leftIcon}
        />
      )}

      {loading && (
        <IconSymbol
          name="arrow.clockwise"
          size={getIconSize(size)}
          color={textColor}
          style={styles.loadingIcon}
        />
      )}

      <ThemedText
        style={[styles.text, styles[`${size}Text`], { color: textColor }]}
      >
        {children}
      </ThemedText>

      {rightIcon && !loading && (
        <IconSymbol
          name={rightIcon}
          size={getIconSize(size)}
          color={textColor}
          style={styles.rightIcon}
        />
      )}
    </TouchableOpacity>
  );
};

// Helper functions
const getBackgroundColor = (variant: string, colors: any): string => {
  switch (variant) {
    case 'primary':
      return colors.primary;
    case 'secondary':
      return colors.secondary;
    case 'outline':
    case 'ghost':
      return 'transparent';
    case 'danger':
      return colors.error;
    default:
      return colors.primary;
  }
};

const getBorderColor = (variant: string, colors: any): string => {
  switch (variant) {
    case 'outline':
      return colors.border;
    case 'primary':
    case 'secondary':
    case 'danger':
      return 'transparent';
    case 'ghost':
      return 'transparent';
    default:
      return 'transparent';
  }
};

const getTextColor = (
  variant: string,
  colors: any,
  disabled?: boolean
): string => {
  if (disabled) return colors.tabIconDefault;

  switch (variant) {
    case 'primary':
    case 'danger':
      return '#FFFFFF';
    case 'secondary':
      return '#FFFFFF';
    case 'outline':
    case 'ghost':
      return colors.text;
    default:
      return '#FFFFFF';
  }
};

const getIconSize = (size: string): number => {
  switch (size) {
    case 'sm':
      return 16;
    case 'md':
      return 20;
    case 'lg':
      return 24;
    default:
      return 20;
  }
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    ...Shadows.sm,
  },

  // Sizes
  sm: {
    height: ComponentHeights.button.sm,
    paddingHorizontal: 12,
    gap: 6,
  },
  md: {
    height: ComponentHeights.button.md,
    paddingHorizontal: 16,
    gap: 8,
  },
  lg: {
    height: ComponentHeights.button.lg,
    paddingHorizontal: 20,
    gap: 10,
  },

  // Variants
  primary: {},
  secondary: {},
  outline: {},
  ghost: {},
  danger: {},

  // States
  disabled: {
    opacity: 0.5,
  },
  fullWidth: {
    width: '100%',
  },

  // Text
  text: {
    fontWeight: '600',
  },
  smText: {
    fontSize: 14,
  },
  mdText: {
    fontSize: 16,
  },
  lgText: {
    fontSize: 18,
  },

  // Icons
  leftIcon: {
    marginRight: 4,
  },
  rightIcon: {
    marginLeft: 4,
  },
  loadingIcon: {
    marginRight: 4,
  },
});
