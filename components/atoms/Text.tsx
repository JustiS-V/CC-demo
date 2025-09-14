/**
 * Text Atom - Basic text component
 * Extended version of ThemedText with additional styles
 */

import type React from 'react';
import type { TextStyle } from 'react-native';

import { ThemedText, type ThemedTextProps } from '@/components/themed-text';
import { Colors } from '@/constants/theme/colors';
import {
  FontSizes,
  FontWeights,
  TextStyles,
} from '@/constants/theme/typography';
import { useColorScheme } from '@/hooks/use-color-scheme';

export interface TextProps extends ThemedTextProps {
  /** Preset text style */
  variant?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'body'
    | 'bodyLarge'
    | 'bodySmall'
    | 'caption'
    | 'button'
    | 'label';
  /** Font size */
  size?: keyof typeof FontSizes;
  /** Font weight */
  weight?: keyof typeof FontWeights;
  /** Text color */
  color?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'error'
    | 'info'
    | 'muted'
    | 'default';
  /** Text alignment */
  align?: 'left' | 'center' | 'right' | 'justify';
  /** Text decoration */
  decoration?: 'none' | 'underline' | 'line-through';
  /** Text transformation */
  transform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
  /** Number of lines */
  numberOfLines?: number;
  /** Ellipsize text */
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
}

export const Text: React.FC<TextProps> = ({
  variant,
  size,
  weight,
  color = 'default',
  align = 'left',
  decoration = 'none',
  transform = 'none',
  numberOfLines,
  ellipsizeMode = 'tail',
  style,
  children,
  ...props
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const textStyle: TextStyle = [
    // Apply preset style if specified
    variant && TextStyles[variant],

    // Apply custom size and weight
    size && { fontSize: FontSizes[size] },
    weight && { fontWeight: FontWeights[weight] },

    // Apply color
    { color: getTextColor(color, colors) },

    // Apply alignment
    { textAlign: align },

    // Apply decoration
    { textDecorationLine: decoration },

    // Apply transformation
    { textTransform: transform },

    // Apply custom styles
    style,
  ];

  return (
    <ThemedText
      style={textStyle}
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
      {...props}
    >
      {children}
    </ThemedText>
  );
};

// Helper function for getting color
const getTextColor = (color: string, colors: any): string => {
  switch (color) {
    case 'primary':
      return colors.primary;
    case 'secondary':
      return colors.secondary;
    case 'success':
      return colors.success;
    case 'warning':
      return colors.warning;
    case 'error':
      return colors.error;
    case 'info':
      return colors.info;
    case 'muted':
      return colors.tabIconDefault;
    case 'default':
    default:
      return colors.text;
  }
};

// Preset components for convenience
export const Heading1: React.FC<Omit<TextProps, 'variant'>> = props => (
  <Text variant="h1" {...props} />
);

export const Heading2: React.FC<Omit<TextProps, 'variant'>> = props => (
  <Text variant="h2" {...props} />
);

export const Heading3: React.FC<Omit<TextProps, 'variant'>> = props => (
  <Text variant="h3" {...props} />
);

export const Heading4: React.FC<Omit<TextProps, 'variant'>> = props => (
  <Text variant="h4" {...props} />
);

export const Body: React.FC<Omit<TextProps, 'variant'>> = props => (
  <Text variant="body" {...props} />
);

export const BodyLarge: React.FC<Omit<TextProps, 'variant'>> = props => (
  <Text variant="bodyLarge" {...props} />
);

export const BodySmall: React.FC<Omit<TextProps, 'variant'>> = props => (
  <Text variant="bodySmall" {...props} />
);

export const Caption: React.FC<Omit<TextProps, 'variant'>> = props => (
  <Text variant="caption" {...props} />
);

export const Label: React.FC<Omit<TextProps, 'variant'>> = props => (
  <Text variant="label" {...props} />
);
