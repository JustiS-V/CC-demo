/**
 * Sizes, padding and spacing for Crazy Cooker
 * Based on 8px grid system
 */

// Base size for grid system
const BASE_SIZE = 8;

// Sizes
export const Sizes = {
  // Padding and spacing (multiples of 8px)
  xs: BASE_SIZE * 0.5,    // 4px
  sm: BASE_SIZE,          // 8px
  md: BASE_SIZE * 2,      // 16px
  lg: BASE_SIZE * 3,      // 24px
  xl: BASE_SIZE * 4,      // 32px
  '2xl': BASE_SIZE * 5,   // 40px
  '3xl': BASE_SIZE * 6,   // 48px
  '4xl': BASE_SIZE * 8,   // 64px
  '5xl': BASE_SIZE * 10,  // 80px
  '6xl': BASE_SIZE * 12,  // 96px
} as const;

// Border radius
export const BorderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 20,
  '3xl': 24,
  full: 9999,
} as const;

// Component heights
export const ComponentHeights = {
  button: {
    sm: 32,
    md: 44,
    lg: 56,
  },
  input: {
    sm: 36,
    md: 48,
    lg: 56,
  },
  tabBar: 80,
  header: 60,
  avatar: {
    sm: 32,
    md: 48,
    lg: 64,
    xl: 80,
  },
} as const;

// Component widths
export const ComponentWidths = {
  button: {
    sm: 80,
    md: 120,
    lg: 160,
    full: '100%',
  },
  card: {
    sm: 280,
    md: 320,
    lg: 360,
  },
  modal: {
    sm: 300,
    md: 400,
    lg: 500,
  },
} as const;

// Shadows
export const Shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
} as const;

// Z-index layers
export const ZIndex = {
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
} as const;

// Breakpoints for responsiveness
export const Breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;
