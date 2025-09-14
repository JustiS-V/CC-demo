/**
 * Input Atom - Basic input field component
 * Foundation for all input fields in the application
 */

import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { BorderRadius, ComponentHeights, Sizes } from '@/constants/styles/spacing';
import { Colors } from '@/constants/theme/colors';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React, { forwardRef } from 'react';
import { StyleSheet, TextInput, TextInputProps, TextStyle, ViewStyle } from 'react-native';

export interface InputProps extends TextInputProps {
  /** Input field size */
  size?: 'sm' | 'md' | 'lg';
  /** Input variant */
  variant?: 'default' | 'outline' | 'filled';
  /** Input state */
  state?: 'default' | 'error' | 'success' | 'warning';
  /** Left icon */
  leftIcon?: string;
  /** Right icon */
  rightIcon?: string;
  /** Hint text */
  hint?: string;
  /** Label */
  label?: string;
  /** Full width */
  fullWidth?: boolean;
  /** Container for styling */
  containerStyle?: ViewStyle;
}

export const Input = forwardRef<TextInput, InputProps>(({
  size = 'md',
  variant = 'outline',
  state = 'default',
  leftIcon,
  rightIcon,
  hint,
  label,
  fullWidth = false,
  containerStyle,
  style,
  ...props
}, ref) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const containerStyles: ViewStyle = [
    styles.container,
    fullWidth && styles.fullWidth,
    containerStyle,
  ];

  const inputContainerStyles: ViewStyle = [
    styles.inputContainer,
    styles[size],
    styles[variant],
    {
      backgroundColor: getBackgroundColor(variant, colors),
      borderColor: getBorderColor(state, colors),
    },
    state === 'error' && styles.errorBorder,
    state === 'success' && styles.successBorder,
    state === 'warning' && styles.warningBorder,
  ];

  const inputStyles: TextStyle = [
    styles.input,
    {
      color: colors.text,
    },
    style,
  ];

  const iconColor = getIconColor(state, colors);

  return (
    <ThemedView style={containerStyles}>
      {label && (
        <ThemedText style={[styles.label, { color: colors.text }]}>
          {label}
        </ThemedText>
      )}
      
      <ThemedView style={inputContainerStyles}>
        {leftIcon && (
          <IconSymbol 
            name={leftIcon} 
            size={getIconSize(size)} 
            color={iconColor} 
            style={styles.leftIcon}
          />
        )}
        
        <TextInput
          ref={ref}
          style={inputStyles}
          placeholderTextColor={colors.tabIconDefault}
          {...props}
        />
        
        {rightIcon && (
          <IconSymbol 
            name={rightIcon} 
            size={getIconSize(size)} 
            color={iconColor} 
            style={styles.rightIcon}
          />
        )}
      </ThemedView>
      
      {hint && (
        <ThemedText style={[styles.hint, { color: getHintColor(state, colors) }]}>
          {hint}
        </ThemedText>
      )}
    </ThemedView>
  );
});

// Helper functions
const getBackgroundColor = (variant: string, colors: any): string => {
  switch (variant) {
    case 'filled':
      return colors.surface;
    case 'outline':
    case 'default':
    default:
      return colors.background;
  }
};

const getBorderColor = (state: string, colors: any): string => {
  switch (state) {
    case 'error':
      return colors.error;
    case 'success':
      return colors.success;
    case 'warning':
      return colors.warning;
    default:
      return colors.border;
  }
};

const getIconColor = (state: string, colors: any): string => {
  switch (state) {
    case 'error':
      return colors.error;
    case 'success':
      return colors.success;
    case 'warning':
      return colors.warning;
    default:
      return colors.icon;
  }
};

const getHintColor = (state: string, colors: any): string => {
  switch (state) {
    case 'error':
      return colors.error;
    case 'success':
      return colors.success;
    case 'warning':
      return colors.warning;
    default:
      return colors.tabIconDefault;
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
  container: {
    marginBottom: Sizes.sm,
  },
  fullWidth: {
    width: '100%',
  },
  
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: Sizes.xs,
  },
  
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: BorderRadius.md,
    borderWidth: 1,
  },
  
  // Sizes
  sm: {
    height: ComponentHeights.input.sm,
    paddingHorizontal: Sizes.sm,
  },
  md: {
    height: ComponentHeights.input.md,
    paddingHorizontal: Sizes.md,
  },
  lg: {
    height: ComponentHeights.input.lg,
    paddingHorizontal: Sizes.lg,
  },
  
  // Variants
  default: {},
  outline: {},
  filled: {},
  
  // States
  errorBorder: {
    borderWidth: 2,
  },
  successBorder: {
    borderWidth: 2,
  },
  warningBorder: {
    borderWidth: 2,
  },
  
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 0,
  },
  
  leftIcon: {
    marginRight: Sizes.sm,
  },
  rightIcon: {
    marginLeft: Sizes.sm,
  },
  
  hint: {
    fontSize: 12,
    marginTop: Sizes.xs,
  },
});
