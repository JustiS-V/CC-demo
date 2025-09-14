/**
 * SvgIcon Atom - Universal component for SVG icons
 * Supports custom SVG files and system icons
 */

import { Colors } from '@/constants/theme/colors';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React from 'react';
import { SvgProps } from 'react-native-svg';

export interface SvgIconProps extends Omit<SvgProps, 'width' | 'height'> {
  /** Icon size */
  size?: number;
  /** Icon color */
  color?: string;
  /** System icon name */
  name?: string;
  /** Path to SVG file */
  source?: any;
}

export const SvgIcon: React.FC<SvgIconProps> = ({
  size = 24,
  color,
  name,
  source,
  style,
  ...props
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  const iconColor = color || colors.icon;

  // If source (SVG file) is provided, use it
  if (source) {
    const SvgComponent = source;
    return (
      <SvgComponent
        width={size}
        height={size}
        color={iconColor}
        style={style}
        {...props}
      />
    );
  }

  // If name is provided, use system icons
  if (name) {
    // System icon to SVG mapping can be added here
    // For now, return null for system icons
    return null;
  }

  return null;
};
