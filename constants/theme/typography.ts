/**
 * Crazy Cooker App Typography
 * Defines font sizes, weights and spacing
 */

import { Platform } from 'react-native';

// Font sizes
export const FontSizes = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 28,
  '4xl': 32,
  '5xl': 36,
  '6xl': 48,
} as const;

// Font weights
export const FontWeights = {
  light: '300' as const,
  normal: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
  extrabold: '800' as const,
};

// Line heights
export const LineHeights = {
  tight: 1.2,
  normal: 1.4,
  relaxed: 1.6,
  loose: 1.8,
} as const;

// Font families
export const FontFamilies = Platform.select({
  ios: {
    /** iOS system font */
    sans: 'system-ui',
    /** iOS serif font */
    serif: 'ui-serif',
    /** iOS rounded font */
    rounded: 'ui-rounded',
    /** iOS monospace font */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});

// Preset text styles
export const TextStyles = {
  // Headings
  h1: {
    fontSize: FontSizes['4xl'],
    fontWeight: FontWeights.bold,
    lineHeight: FontSizes['4xl'] * LineHeights.tight,
  },
  h2: {
    fontSize: FontSizes['3xl'],
    fontWeight: FontWeights.bold,
    lineHeight: FontSizes['3xl'] * LineHeights.tight,
  },
  h3: {
    fontSize: FontSizes['2xl'],
    fontWeight: FontWeights.semibold,
    lineHeight: FontSizes['2xl'] * LineHeights.normal,
  },
  h4: {
    fontSize: FontSizes.xl,
    fontWeight: FontWeights.semibold,
    lineHeight: FontSizes.xl * LineHeights.normal,
  },

  // Main text
  body: {
    fontSize: FontSizes.base,
    fontWeight: FontWeights.normal,
    lineHeight: FontSizes.base * LineHeights.normal,
  },
  bodyLarge: {
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.normal,
    lineHeight: FontSizes.lg * LineHeights.normal,
  },
  bodySmall: {
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.normal,
    lineHeight: FontSizes.sm * LineHeights.normal,
  },

  // Special styles
  caption: {
    fontSize: FontSizes.xs,
    fontWeight: FontWeights.normal,
    lineHeight: FontSizes.xs * LineHeights.normal,
  },
  button: {
    fontSize: FontSizes.base,
    fontWeight: FontWeights.semibold,
    lineHeight: FontSizes.base * LineHeights.normal,
  },
  label: {
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.medium,
    lineHeight: FontSizes.sm * LineHeights.normal,
  },
} as const;
