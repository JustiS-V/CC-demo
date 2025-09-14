import React from 'react';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

interface IconProps {
  size?: number;
  color?: string;
}

export const ChefHatIcon: React.FC<IconProps> = ({ size = 24, color = '#000' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 2C8.5 2 6 4.5 6 8v1h12V8c0-3.5-2.5-6-6-6z"
      fill={color}
    />
    <Path
      d="M4 9h16v2c0 2.2-1.8 4-4 4H8c-2.2 0-4-1.8-4-4V9z"
      fill={color}
    />
    <Path
      d="M6 11h12v8c0 1.1-.9 2-2 2H8c-1.1 0-2-.9-2-2v-8z"
      fill={color}
    />
  </Svg>
);

export const RecipeBookIcon: React.FC<IconProps> = ({ size = 24, color = '#000' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect x="3" y="4" width="18" height="16" rx="2" fill={color} opacity="0.1" stroke={color} strokeWidth="2"/>
    <Path d="M8 8h8M8 12h6M8 16h4" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <Circle cx="16" cy="8" r="2" fill={color}/>
  </Svg>
);

export const CookingPotIcon: React.FC<IconProps> = ({ size = 24, color = '#000' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 2C8.5 2 6 4.5 6 8v8c0 2.2 1.8 4 4 4h4c2.2 0 4-1.8 4-4V8c0-3.5-2.5-6-6-6z"
      fill={color}
      opacity="0.1"
      stroke={color}
      strokeWidth="2"
    />
    <Path d="M8 8h8M8 12h8M8 16h6" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <Circle cx="16" cy="6" r="1" fill={color}/>
  </Svg>
);

export const ForkKnifeIcon: React.FC<IconProps> = ({ size = 24, color = '#000' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    {/* Fork */}
    <Path
      d="M3 2v20M3 6h4l2-4M3 10h4l1-2"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
    {/* Knife */}
    <Path
      d="M17 2l4 4-8 8-4-4 8-8z"
      fill={color}
      opacity="0.1"
      stroke={color}
      strokeWidth="2"
    />
    <Path
      d="M17 2l4 4M21 6l-8 8M13 14l-4-4"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </Svg>
);

export const TimerIcon: React.FC<IconProps> = ({ size = 24, color = '#000' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2"/>
    <Path d="M12 6v6l4 2" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </Svg>
);

export const StarIcon: React.FC<IconProps> = ({ size = 24, color = '#000' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
      fill={color}
    />
  </Svg>
);

export const HeartIcon: React.FC<IconProps> = ({ size = 24, color = '#000' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
      fill={color}
    />
  </Svg>
);

export const SearchIcon: React.FC<IconProps> = ({ size = 24, color = '#000' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="11" cy="11" r="8" stroke={color} strokeWidth="2"/>
    <Path d="m21 21-4.35-4.35" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </Svg>
);

export const PlusIcon: React.FC<IconProps> = ({ size = 24, color = '#000' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M12 5v14M5 12h14" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </Svg>
);

export const UserIcon: React.FC<IconProps> = ({ size = 24, color = '#000' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <Circle cx="12" cy="7" r="4" stroke={color} strokeWidth="2"/>
  </Svg>
);
