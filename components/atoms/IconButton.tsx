/**
 * IconButton Atom - Button with icon
 * Combination of Button and Icon components
 */

import type React from 'react';

import { ICON_SIZES } from '@/lib/icons';

import { Button, type ButtonProps } from './Button';
import { Icon } from './Icon';

export interface IconButtonProps extends Omit<ButtonProps, 'children'> {
  /** Icon name */
  iconName: string;
  /** Icon size */
  iconSize?: keyof typeof ICON_SIZES | number;
  /** Icon color */
  iconColor?: string;
  /** Button text (optional) */
  text?: string;
  /** Show only icon */
  iconOnly?: boolean;
}

export const IconButton: React.FC<IconButtonProps> = ({
  iconName,
  iconSize = 'MD',
  iconColor,
  text,
  iconOnly = false,
  size = 'md',
  ...buttonProps
}) => {
  const iconSizeValue =
    typeof iconSize === 'number' ? iconSize : ICON_SIZES[iconSize];

  return (
    <Button
      {...buttonProps}
      size={size}
      leftIcon={iconOnly ? undefined : iconName}
    >
      {iconOnly ? (
        <Icon name={iconName} size={iconSizeValue} color={iconColor} />
      ) : (
        text
      )}
    </Button>
  );
};

// Preset icon buttons
export const ChefHatButton: React.FC<
  Omit<IconButtonProps, 'iconName'>
> = props => <IconButton iconName="chef-hat" {...props} />;

export const RecipeBookButton: React.FC<
  Omit<IconButtonProps, 'iconName'>
> = props => <IconButton iconName="recipe-book" {...props} />;

export const CookingPotButton: React.FC<
  Omit<IconButtonProps, 'iconName'>
> = props => <IconButton iconName="cooking-pot" {...props} />;

export const ForkKnifeButton: React.FC<
  Omit<IconButtonProps, 'iconName'>
> = props => <IconButton iconName="fork-knife" {...props} />;

export const TimerButton: React.FC<
  Omit<IconButtonProps, 'iconName'>
> = props => <IconButton iconName="timer" {...props} />;

export const StarButton: React.FC<
  Omit<IconButtonProps, 'iconName'>
> = props => <IconButton iconName="star" {...props} />;

export const HeartButton: React.FC<
  Omit<IconButtonProps, 'iconName'>
> = props => <IconButton iconName="heart" {...props} />;

export const SearchButton: React.FC<
  Omit<IconButtonProps, 'iconName'>
> = props => <IconButton iconName="search" {...props} />;

export const PlusButton: React.FC<
  Omit<IconButtonProps, 'iconName'>
> = props => <IconButton iconName="plus" {...props} />;

export const UserButton: React.FC<
  Omit<IconButtonProps, 'iconName'>
> = props => <IconButton iconName="user" {...props} />;
