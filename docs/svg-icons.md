# 🎨 Working with SVG Icons

This document describes the icon system in Crazy Cooker, including SVG file support and system icons.

## 📁 Icon Structure

```
assets/
└── icons/
    └── svg/                    # SVG icon files
        ├── chef-hat.svg
        ├── recipe-book.svg
        ├── cooking-pot.svg
        ├── fork-knife.svg
        ├── timer.svg
        └── index.tsx           # SVG component exports

components/
└── atoms/
    ├── Icon.tsx               # Universal icon component
    ├── IconButton.tsx         # Icon button component
    └── SvgIcon.tsx            # SVG-specific component
```

## 🚀 Quick Start

### 1. Using Universal Icon Component

```tsx
import { Icon } from '@/components/atoms';

// SVG icon
<Icon name="chef-hat" size={24} color="#FF6B6B" />

// System icon
<Icon name="house.fill" size={24} color="#FF6B6B" />
```

### 2. Using Preset Icons

```tsx
import { ChefHatIcon, StarIcon, HeartIcon } from '@/components/atoms';

<ChefHatIcon size={24} color="#FF6B6B" />
<StarIcon size={20} color="#FFD700" />
<HeartIcon size={18} color="#F44336" />
```

### 3. Using Icon Buttons

```tsx
import { IconButton, ChefHatButton } from '@/components/atoms';

// Generic icon button
<IconButton
  iconName="plus"
  text="Add Recipe"
  onPress={() => console.log('Add recipe')}
/>

// Preset icon button
<ChefHatButton
  text="Chef"
  onPress={() => console.log('Chef')}
/>
```

## 🎯 Available Icons

### SVG Icons (Cooking Theme)

| Icon          | Name         | Description   | Usage                |
| ------------- | ------------ | ------------- | -------------------- |
| `chef-hat`    | Chef Hat     | Chef's hat    | Professional cooking |
| `recipe-book` | Recipe Book  | Recipe book   | Recipe management    |
| `cooking-pot` | Cooking Pot  | Cooking pot   | Cooking process      |
| `fork-knife`  | Fork & Knife | Cutlery       | Dining, utensils     |
| `timer`       | Timer        | Cooking timer | Time management      |
| `star`        | Star         | Rating star   | Ratings, favorites   |
| `heart`       | Heart        | Heart icon    | Likes, favorites     |
| `search`      | Search       | Search icon   | Search functionality |
| `plus`        | Plus         | Plus icon     | Add, create          |
| `user`        | User         | User icon     | Profile, account     |

### System Icons (iOS/SF Symbols)

| Icon              | Description | Usage                   |
| ----------------- | ----------- | ----------------------- |
| `house.fill`      | Home        | Navigation, home screen |
| `magnifyingglass` | Search      | Search functionality    |
| `person.fill`     | Profile     | User profile            |
| `gear`            | Settings    | Settings, configuration |
| `pencil`          | Edit        | Edit functionality      |
| `trash`           | Delete      | Delete, remove          |
| `share`           | Share       | Share functionality     |
| `heart.fill`      | Favorite    | Favorites, likes        |
| `star.fill`       | Rating      | Ratings, reviews        |
| `checkmark`       | Checkmark   | Success, confirmation   |

## 🛠 Creating New SVG Icons

### 1. Create SVG File

Create a new SVG file in `assets/icons/svg/`:

```svg
<!-- new-icon.svg -->
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"/>
</svg>
```

### 2. Add to Icon Component

Update `components/atoms/Icon.tsx`:

```typescript
import NewIconSvg from '@/assets/icons/svg/new-icon.svg';

const SVG_ICONS = {
  // ... existing icons
  'new-icon': NewIconSvg,
} as const;

export type SvgIconName = keyof typeof SVG_ICONS;
```

### 3. Create Preset Component

```typescript
export const NewIcon: React.FC<Omit<IconProps, 'name'>> = (props) => (
  <Icon name="new-icon" {...props} />
);
```

### 4. Update Exports

Add to `components/atoms/index.ts`:

```typescript
export { NewIcon } from './Icon';
```

## 🎨 Icon Customization

### Sizes

```tsx
// Small icons (16-20px)
<Icon name="star" size={16} />

// Medium icons (24-28px) - default
<Icon name="heart" size={24} />

// Large icons (32-40px)
<Icon name="chef-hat" size={32} />

// Extra large icons (48px+)
<Icon name="chef-hat" size={48} />
```

### Colors

```tsx
// Semantic colors
<Icon name="heart" color="error" />
<Icon name="star" color="warning" />
<Icon name="checkmark" color="success" />

// Custom colors
<Icon name="chef-hat" color="#FF6B6B" />
<Icon name="star" color="#FFD700" />

// Theme colors
<Icon name="heart" color={Colors.light.tint} />
```

### Styles

```tsx
// Custom styles
<Icon
  name='chef-hat'
  size={24}
  color='#FF6B6B'
  style={{
    marginRight: 8,
    opacity: 0.8,
  }}
/>
```

## 🔧 Advanced Usage

### Icon Button Variants

```tsx
// Text with icon
<IconButton
  iconName="plus"
  text="Add Recipe"
  onPress={() => console.log('Add')}
/>

// Icon only
<IconButton
  iconName="heart"
  iconOnly
  onPress={() => console.log('Like')}
/>

// Custom size and color
<IconButton
  iconName="star"
  iconSize={20}
  iconColor="#FFD700"
  text="Rate"
  onPress={() => console.log('Rate')}
/>
```

### Conditional Icons

```tsx
const RecipeCard = ({ recipe }) => (
  <View>
    <Icon
      name={recipe.isFavorite ? 'heart' : 'heart'}
      color={recipe.isFavorite ? 'error' : 'muted'}
      onPress={() => toggleFavorite(recipe.id)}
    />

    <Icon name='star' color={getDifficultyColor(recipe.difficulty)} />
  </View>
);
```

### Icon with Badge

```tsx
const IconWithBadge = ({ iconName, badge }) => (
  <View style={{ position: 'relative' }}>
    <Icon name={iconName} size={24} />
    {badge && (
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{badge}</Text>
      </View>
    )}
  </View>
);
```

## 📱 Platform Considerations

### iOS (SF Symbols)

- Use system icons for native feel
- SF Symbols automatically adapt to system settings
- Support for Dynamic Type and Dark Mode

```tsx
// iOS-specific icons
<Icon name="house.fill" size={24} />
<Icon name="person.fill" size={24} />
<Icon name="gear" size={24} />
```

### Android (Material Icons)

- Use SVG icons for consistency
- Custom icons provide better control
- Support for Material Design guidelines

```tsx
// Android-optimized icons
<Icon name="chef-hat" size={24} />
<Icon name="recipe-book" size={24} />
<Icon name="cooking-pot" size={24} />
```

### Web

- SVG icons work best for web
- System icons may not be available
- Consider fallbacks for unsupported icons

```tsx
// Web-compatible icons
<Icon name="chef-hat" size={24} />
<Icon name="star" size={24} />
<Icon name="heart" size={24} />
```

## 🚀 Performance Tips

### 1. Use Preset Components

```tsx
// ✅ Good - preset component
<ChefHatIcon size={24} />

// ❌ Less optimal - generic component
<Icon name="chef-hat" size={24} />
```

### 2. Optimize SVG Files

```svg
<!-- ✅ Good - optimized SVG -->
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"/>
</svg>

<!-- ❌ Bad - unoptimized SVG -->
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"/>
  </g>
</svg>
```

### 3. Use Consistent Sizes

```tsx
// ✅ Good - consistent sizing
const ICON_SIZES = {
  small: 16,
  medium: 24,
  large: 32,
} as const;

<Icon name='star' size={ICON_SIZES.medium} />;
```

## 🔍 Troubleshooting

### Common Issues

1. **Icon not displaying**
   - Check if SVG file exists
   - Verify import path
   - Check Metro configuration

2. **System icon not working**
   - Verify icon name (iOS SF Symbols)
   - Check platform compatibility
   - Use SVG fallback

3. **Color not applying**
   - Use `currentColor` in SVG
   - Check color prop format
   - Verify theme colors

### Debug Tips

```tsx
// Debug icon rendering
const DebugIcon = ({ name, ...props }) => {
  console.log('Rendering icon:', name);
  return <Icon name={name} {...props} />;
};

// Check available icons
import { SVG_ICONS } from '@/components/atoms/Icon';
console.log('Available SVG icons:', Object.keys(SVG_ICONS));
```

## 📚 Additional Resources

- [React Native SVG Documentation](https://github.com/react-native-svg/react-native-svg)
- [SF Symbols (iOS)](https://developer.apple.com/sf-symbols/)
- [Material Icons (Android)](https://fonts.google.com/icons)
- [SVG Optimization Guide](https://jakearchibald.github.io/svgomg/)

For more advanced usage, see the [Complete SVG Icons Guide](./svg-icons-complete.md).
