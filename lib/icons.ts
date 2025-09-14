/**
 * Utilities for working with icons
 * Contains mappings, constants and helper functions
 */


// Icon categories
export const ICON_CATEGORIES = {
  COOKING: 'cooking',
  NAVIGATION: 'navigation',
  UI: 'ui',
  SOCIAL: 'social',
  SYSTEM: 'system',
} as const;

// Icons for cooking theme
export const COOKING_ICONS = {
  CHEF_HAT: 'chef-hat',
  RECIPE_BOOK: 'recipe-book',
  COOKING_POT: 'cooking-pot',
  FORK_KNIFE: 'fork-knife',
  TIMER: 'timer',
  STAR: 'star.fill',
  HEART: 'heart.fill',
  SEARCH: 'magnifyingglass',
  PLUS: 'plus',
  USER: 'person.fill',
} as const;

// Icons for navigation
export const NAVIGATION_ICONS = {
  HOME: 'house.fill',
  BACK: 'chevron.left',
  FORWARD: 'chevron.right',
  UP: 'chevron.up',
  DOWN: 'chevron.down',
  MENU: 'line.3.horizontal',
  CLOSE: 'xmark',
  CHECK: 'checkmark',
} as const;

// Icons for UI elements
export const UI_ICONS = {
  SETTINGS: 'gear',
  EDIT: 'pencil',
  DELETE: 'trash',
  SHARE: 'square.and.arrow.up',
  COPY: 'doc.on.doc',
  SAVE: 'square.and.arrow.down',
  REFRESH: 'arrow.clockwise',
  FILTER: 'line.3.horizontal.decrease',
} as const;

// Colors for icons by context
export const ICON_COLORS = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
  INFO: 'info',
  MUTED: 'muted',
  DEFAULT: 'default',
} as const;

// Icon sizes
export const ICON_SIZES = {
  XS: 12,
  SM: 16,
  MD: 20,
  LG: 24,
  XL: 28,
  '2XL': 32,
  '3XL': 40,
  '4XL': 48,
} as const;

// Function to get icon color by context
export const getIconColor = (context: string, colors: any): string => {
  switch (context) {
    case ICON_COLORS.PRIMARY:
      return colors.primary;
    case ICON_COLORS.SECONDARY:
      return colors.secondary;
    case ICON_COLORS.SUCCESS:
      return colors.success;
    case ICON_COLORS.WARNING:
      return colors.warning;
    case ICON_COLORS.ERROR:
      return colors.error;
    case ICON_COLORS.INFO:
      return colors.info;
    case ICON_COLORS.MUTED:
      return colors.tabIconDefault;
    case ICON_COLORS.DEFAULT:
    default:
      return colors.icon;
  }
};

// Function to get icon size
export const getIconSize = (size: keyof typeof ICON_SIZES): number => {
  return ICON_SIZES[size];
};

// Recipe categories to icons mapping
export const RECIPE_CATEGORY_ICONS = {
  breakfast: 'sun.max.fill',
  lunch: 'sun.max.fill',
  dinner: 'moon.fill',
  dessert: 'heart.fill',
  drinks: 'drop.fill',
  snacks: 'leaf.fill',
} as const;

// Recipe difficulty to icons mapping
export const DIFFICULTY_ICONS = {
  easy: 'star.fill',
  medium: 'star.leadinghalf.filled',
  hard: 'star.fill',
} as const;

// Function to get recipe category icon
export const getRecipeCategoryIcon = (category: string): string => {
  return RECIPE_CATEGORY_ICONS[category as keyof typeof RECIPE_CATEGORY_ICONS] || 'questionmark.circle';
};

// Function to get recipe difficulty icon
export const getDifficultyIcon = (difficulty: string): string => {
  return DIFFICULTY_ICONS[difficulty as keyof typeof DIFFICULTY_ICONS] || 'star.fill';
};
