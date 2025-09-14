/**
 * Icon Atom - Universal icon component
 * Supports SVG files, system icons and built-in SVG components
 */

import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme/colors';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React from 'react';

// Import SVG icons
import ChefHatSvg from '@/assets/icons/svg/chef-hat.svg';
import CookingPotSvg from '@/assets/icons/svg/cooking-pot.svg';
import ForkKnifeSvg from '@/assets/icons/svg/fork-knife.svg';
import HeartSvg from '@/assets/icons/svg/heart.svg';
import PlusSvg from '@/assets/icons/svg/plus.svg';
import RecipeBookSvg from '@/assets/icons/svg/recipe-book.svg';
import SearchSvg from '@/assets/icons/svg/search.svg';
import StarSvg from '@/assets/icons/svg/star.svg';
import TimerSvg from '@/assets/icons/svg/timer.svg';
import UserSvg from '@/assets/icons/svg/user.svg';

// Mapping icon names to SVG components
const SVG_ICONS = {
  'chef-hat': ChefHatSvg,
  'recipe-book': RecipeBookSvg,
  'cooking-pot': CookingPotSvg,
  'fork-knife': ForkKnifeSvg,
  'timer': TimerSvg,
  'star': StarSvg,
  'heart': HeartSvg,
  'search': SearchSvg,
  'plus': PlusSvg,
  'user': UserSvg,
} as const;

export type SvgIconName = keyof typeof SVG_ICONS;

export interface IconProps {
  /** Icon name */
  name: string;
  /** Icon size */
  size?: number;
  /** Icon color */
  color?: string;
  /** Icon style */
  style?: any;
}

export const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  color,
  style,
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  const iconColor = color || colors.icon;

  // Check if SVG version of the icon exists
  const SvgComponent = SVG_ICONS[name as SvgIconName];
  
  if (SvgComponent) {
    return (
      <SvgComponent
        width={size}
        height={size}
        color={iconColor}
        style={style}
      />
    );
  }

  // If no SVG version exists, use system icon
  return (
    <IconSymbol
      name={name}
      size={size}
      color={iconColor}
      style={style}
    />
  );
};

// Preset components for commonly used icons
export const ChefHatIcon: React.FC<Omit<IconProps, 'name'>> = (props) => (
  <Icon name="chef-hat" {...props} />
);

export const RecipeBookIcon: React.FC<Omit<IconProps, 'name'>> = (props) => (
  <Icon name="recipe-book" {...props} />
);

export const CookingPotIcon: React.FC<Omit<IconProps, 'name'>> = (props) => (
  <Icon name="cooking-pot" {...props} />
);

export const ForkKnifeIcon: React.FC<Omit<IconProps, 'name'>> = (props) => (
  <Icon name="fork-knife" {...props} />
);

export const TimerIcon: React.FC<Omit<IconProps, 'name'>> = (props) => (
  <Icon name="timer" {...props} />
);

export const StarIcon: React.FC<Omit<IconProps, 'name'>> = (props) => (
  <Icon name="star" {...props} />
);

export const HeartIcon: React.FC<Omit<IconProps, 'name'>> = (props) => (
  <Icon name="heart" {...props} />
);

export const SearchIcon: React.FC<Omit<IconProps, 'name'>> = (props) => (
  <Icon name="search" {...props} />
);

export const PlusIcon: React.FC<Omit<IconProps, 'name'>> = (props) => (
  <Icon name="plus" {...props} />
);

export const UserIcon: React.FC<Omit<IconProps, 'name'>> = (props) => (
  <Icon name="user" {...props} />
);
