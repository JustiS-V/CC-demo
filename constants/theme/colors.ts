/**
 * Crazy Cooker App Color Palette
 * Supports light and dark themes
 */

// Base colors
const tintColorLight = '#FF6B6B';
const tintColorDark = '#FF6B6B';

// Semantic colors
const successColor = '#4CAF50';
const warningColor = '#FF9800';
const errorColor = '#F44336';
const infoColor = '#2196F3';

export const Colors = {
  light: {
    // Main colors
    text: '#1A1A1A',
    background: '#FFFFFF',
    surface: '#F8F9FA',
    tint: tintColorLight,

    // Icons and UI elements
    icon: '#6B7280',
    tabIconDefault: '#9CA3AF',
    tabIconSelected: tintColorLight,

    // Borders and separators
    border: '#E5E7EB',
    separator: '#F3F4F6',

    // Semantic colors
    success: successColor,
    warning: warningColor,
    error: errorColor,
    info: infoColor,

    // Additional colors for recipes
    primary: '#FF6B6B',
    secondary: '#4ECDC4',
    accent: '#45B7D1',

    // Shadows and overlays
    shadow: 'rgba(0, 0, 0, 0.1)',
    overlay: 'rgba(0, 0, 0, 0.5)',
  },
  dark: {
    // Main colors
    text: '#F9FAFB',
    background: '#111827',
    surface: '#1F2937',
    tint: tintColorDark,

    // Icons and UI elements
    icon: '#9CA3AF',
    tabIconDefault: '#6B7280',
    tabIconSelected: tintColorDark,

    // Borders and separators
    border: '#374151',
    separator: '#2D3748',

    // Semantic colors
    success: successColor,
    warning: warningColor,
    error: errorColor,
    info: infoColor,

    // Additional colors for recipes
    primary: '#FF6B6B',
    secondary: '#4ECDC4',
    accent: '#45B7D1',

    // Shadows and overlays
    shadow: 'rgba(0, 0, 0, 0.3)',
    overlay: 'rgba(0, 0, 0, 0.7)',
  },
};

// Colors for recipe categories
export const RecipeCategoryColors = {
  breakfast: '#FFD700',
  lunch: '#FF6B6B',
  dinner: '#4ECDC4',
  dessert: '#FF9FF3',
  drinks: '#54A0FF',
  snacks: '#5F27CD',
};

// Gradients
export const Gradients = {
  primary: ['#FF6B6B', '#FF8E8E'],
  secondary: ['#4ECDC4', '#6ED5CC'],
  sunset: ['#FF6B6B', '#FFD700'],
  ocean: ['#4ECDC4', '#45B7D1'],
};
