# 🎨 Complete SVG Icons Guide

This document contains complete information about the Crazy Cooker icon system, including usage, creation and automation.

## 📋 Table of Contents

1. [Quick Start](#quick-start)
2. [Available Icons](#available-icons)
3. [Usage](#usage)
4. [Creating New Icons](#creating-new-icons)
5. [Automation](#automation)
6. [Best Practices](#best-practices)
7. [Examples](#examples)

## 🚀 Quick Start

### Install Dependencies

```bash
npm install react-native-svg react-native-svg-transformer
```

### Basic Setup

1. **Configure Metro** (`metro.config.js`):

```javascript
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add SVG support
config.transformer.babelTransformerPath = require.resolve(
  'react-native-svg-transformer'
);
config.resolver.assetExts = config.resolver.assetExts.filter(
  ext => ext !== 'svg'
);
config.resolver.sourceExts = [...config.resolver.sourceExts, 'svg'];

module.exports = config;
```

2. **Create TypeScript declarations** (`types/svg.d.ts`):

```typescript
declare module '*.svg' {
  import React from 'react';
  import { SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}
```

### Simple Usage

```tsx
// Universal icon
<Icon name="chef-hat" size={24} color="#FF6B6B" />

// Preset icon
<ChefHatIcon size={24} color="#FF6B6B" />

// Icon button
<IconButton iconName="plus" text="Add Recipe" />
```

## 🎯 Available Icons

### SVG Icons (Cooking Theme)

| Icon          | Name         | Description           | Category |
| ------------- | ------------ | --------------------- | -------- |
| `chef-hat`    | Chef Hat     | Chef's hat            | Cooking  |
| `recipe-book` | Recipe Book  | Recipe book           | Cooking  |
| `cooking-pot` | Cooking Pot  | Cooking pot           | Cooking  |
| `fork-knife`  | Fork & Knife | Cutlery               | Cooking  |
| `timer`       | Timer        | Cooking timer         | Cooking  |
| `star`        | Star         | Rating and evaluation | UI       |
| `heart`       | Heart        | Favorites and likes   | UI       |
| `search`      | Search       | Recipe search         | UI       |
| `plus`        | Plus         | Addition              | UI       |
| `user`        | User         | User profile          | UI       |

### System Icons

| Icon              | Description | Category   |
| ----------------- | ----------- | ---------- |
| `house.fill`      | Home        | Navigation |
| `magnifyingglass` | Search      | Navigation |
| `person.fill`     | Profile     | Navigation |
| `gear`            | Settings    | UI         |
| `pencil`          | Edit        | UI         |
| `trash`           | Delete      | UI         |
| `share`           | Share       | UI         |
| `heart.fill`      | Favorite    | UI         |
| `star.fill`       | Rating      | UI         |
| `checkmark`       | Checkmark   | UI         |

## 💻 Usage

### Basic Components

#### Icon - Universal Icon

```tsx
import { Icon } from '@/components/atoms';

<Icon name='chef-hat' size={24} color='#FF6B6B' />;
```

#### Preset Icons

```tsx
import { ChefHatIcon, StarIcon, HeartIcon } from '@/components/atoms';

<ChefHatIcon size={24} color="#FF6B6B" />
<StarIcon size={20} color="#FFD700" />
<HeartIcon size={18} color="#F44336" />
```

#### IconButton - Button with Icon

```tsx
import { IconButton } from '@/components/atoms';

// Button with icon and text
<IconButton
  iconName="plus"
  text="Add Recipe"
  onPress={() => console.log('Add recipe')}
/>

// Icon only
<IconButton
  iconName="heart"
  iconOnly
  onPress={() => console.log('Like')}
/>

// Preset button
<ChefHatButton
  text="Chef"
  onPress={() => console.log('Chef')}
/>
```

### Icon Sizes

```tsx
// Small icons (16-20px)
<Icon name="star" size={16} />

// Medium icons (24-28px)
<Icon name="heart" size={24} />

// Large icons (32-40px)
<Icon name="chef-hat" size={32} />
```

### Icon Colors

```tsx
// Semantic colors
<Icon name="heart" color="error" />
<Icon name="star" color="warning" />
<Icon name="checkmark" color="success" />

// Custom colors
<Icon name="chef-hat" color="#FF6B6B" />
```

## 🎨 Creating New Icons

### 1. Create SVG File

Create a new SVG file in `assets/icons/svg/`:

```svg
<!-- new-icon.svg -->
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="..." fill="currentColor"/>
</svg>
```

### 2. Add to Mapping

Update `components/atoms/Icon.tsx`:

```typescript
import NewIconSvg from '@/assets/icons/svg/new-icon.svg';

const SVG_ICONS = {
  // ... existing icons
  'new-icon': NewIconSvg,
} as const;
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

## 🤖 Automation

### Component Generation

```bash
# Generate all icon components
npm run generate-icons

# Or directly
node scripts/generate-icons.js
```

### Icon Validation

```bash
# Check SVG files
npm run validate-icons
```

### Icon Statistics

```bash
# Get statistics
npm run icon-stats
```

### Automatic Generation

```typescript
import { generateIconExport, validateSvgIcon } from '@/lib/icon-utils';

// Generate export
const exportCode = generateIconExport();

// Validate SVG
const validation = validateSvgIcon(svgContent);
if (validation.errors.length > 0) {
  console.error('SVG errors:', validation.errors);
}
```

## 📱 Usage Examples

### In RecipeCard

```tsx
<RecipeCard
  recipe={{
    id: '1',
    title: 'Carbonara Pasta',
    cookingTime: 20,
    difficulty: 'medium',
    category: 'dinner',
    rating: 4.5,
    isFavorite: false,
  }}
  onPress={recipe => console.log('Open recipe:', recipe.title)}
  onToggleFavorite={recipe => console.log('Toggle favorite:', recipe.id)}
/>
```

### In Header

```tsx
<Header
  title='Crazy Cooker'
  subtitle='Find the perfect recipe'
  showBackButton={true}
  onBackPress={() => router.back()}
  actions={[
    { icon: 'heart.fill', onPress: () => console.log('Favorites') },
    { icon: 'gear', onPress: () => console.log('Settings') },
  ]}
/>
```

### In TabBar

```tsx
<TabBar
  tabs={[
    { key: 'home', icon: 'house.fill', label: 'Home' },
    { key: 'search', icon: 'search', label: 'Search' },
    { key: 'profile', icon: 'user', label: 'Profile' },
  ]}
  activeTab='home'
  onTabChange={tabKey => console.log('Tab changed:', tabKey)}
  showCenterButton={true}
  centerButtonIcon='plus'
  onCenterButtonPress={() => console.log('Add recipe')}
/>
```

### In SearchBar

```tsx
<SearchBar
  placeholder='Search recipes...'
  showSearchButton={true}
  onSearch={query => console.log('Search:', query)}
  onClear={() => console.log('Clear search')}
/>
```

## 🔍 Best Practices

### 1. Use Appropriate Sizes

```tsx
// ✅ Good - consistent sizes
<Icon name="star" size={16} />  // Small
<Icon name="heart" size={24} /> // Medium
<Icon name="chef-hat" size={32} /> // Large

// ❌ Bad - random sizes
<Icon name="star" size={17} />
<Icon name="heart" size={23} />
```

### 2. Use Semantic Colors

```tsx
// ✅ Good - semantic colors
<Icon name="heart" color="error" />
<Icon name="star" color="warning" />

// ❌ Bad - hardcoded colors
<Icon name="heart" color="#F44336" />
```

### 3. Group Related Icons

```tsx
// ✅ Good - logical grouping
<View style={styles.iconGroup}>
  <Icon name="timer" size={16} />
  <Text>20 min</Text>
</View>

<View style={styles.iconGroup}>
  <Icon name="star" size={16} />
  <Text>4.5</Text>
</View>
```

### 4. Use Preset Components

```tsx
// ✅ Good - preset components
<ChefHatIcon size={24} />
<StarIcon size={20} />

// ❌ Bad - code repetition
<Icon name="chef-hat" size={24} />
<Icon name="star" size={20} />
```

### 5. Optimize SVG Files

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

## 🛠 Utilities and Helpers

### Icon Search

```typescript
import { searchIcons, getIconsByCategory } from '@/lib/icon-utils';

// Search by keywords
const cookingIcons = searchIcons('cooking');

// Get by category
const uiIcons = getIconsByCategory('UI');
```

### Icon Recommendations

```typescript
import { getRecommendedIcons } from '@/lib/icon-utils';

const recommendedIcons = getRecommendedIcons('recipe');
// Returns: ['chef-hat', 'recipe-book', 'cooking-pot']
```

### Icon Statistics

```typescript
import { getIconStatistics } from '@/lib/icon-utils';

const stats = getIconStatistics();
console.log(`Total icons: ${stats.totalIcons}`);
console.log(`Categories: ${stats.totalCategories}`);
```

## 🚀 System Extension

### Adding New Categories

```typescript
// In lib/icon-utils.ts
export const ICON_CATEGORIES = {
  cooking: 'Cooking',
  ui: 'UI',
  navigation: 'Navigation',
  // Add new category
  social: 'Social',
} as const;
```

### Creating Thematic Sets

```typescript
// Create themed icon sets
export const COOKING_ICONS = {
  chef: 'chef-hat',
  recipe: 'recipe-book',
  pot: 'cooking-pot',
  utensils: 'fork-knife',
  timer: 'timer',
} as const;
```

### Custom Sizes

```typescript
// Define custom sizes
export const CUSTOM_ICON_SIZES = {
  tiny: 12,
  small: 16,
  medium: 24,
  large: 32,
  huge: 48,
} as const;
```

## 📊 Monitoring and Analytics

### Icon Usage Tracking

```typescript
// Track icon usage
const trackIconUsage = (iconName: string, context: string) => {
  // Send analytics
  analytics.track('icon_used', {
    icon: iconName,
    context: context,
    timestamp: Date.now(),
  });
};
```

### Performance Optimization

```typescript
// Preload frequently used icons
const preloadIcons = async () => {
  const frequentIcons = ['chef-hat', 'star', 'heart', 'search'];

  for (const iconName of frequentIcons) {
    // Preload SVG
    await import(`@/assets/icons/svg/${iconName}.svg`);
  }
};
```

This icon system provides complete flexibility, performance and ease of use in the Crazy Cooker application. Follow these recommendations to create a consistent and scalable interface.
