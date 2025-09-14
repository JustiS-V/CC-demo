/**
 * Compatibility with old theme.ts API
 * This file provides backward compatibility
 */

import { Colors as NewColors } from './theme/colors';
import { FontFamilies } from './theme/typography';

// Export new colors under old name
export const Colors = NewColors;

// Export fonts under old name
export const Fonts = FontFamilies;