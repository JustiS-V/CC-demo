# 🏗 Component Architecture

This document describes the component architecture of the Crazy Cooker application, built following **Atomic Design** principles.

## 🎯 Atomic Design Principles

Atomic Design divides components into 5 complexity levels:

1. **Atoms** - Basic UI elements
2. **Molecules** - Simple groups of atoms
3. **Organisms** - Complex components
4. **Templates** - Page layouts
5. **Pages** - Specific screens

## 📁 Component Structure

```
components/
├── atoms/              # Basic components
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Text.tsx
│   ├── Card.tsx
│   └── index.ts
├── molecules/          # Composite components
│   ├── SearchBar.tsx
│   ├── RecipeCard.tsx
│   ├── TabButton.tsx
│   └── index.ts
├── organisms/          # Complex components
│   ├── Header.tsx
│   ├── TabBar.tsx
│   └── index.ts
├── templates/          # Page templates
└── index.ts           # Main export
```

## ⚛️ Atoms

Basic building blocks of the interface. Cannot be divided further.

### Button

```typescript
import { Button } from '@/components';

<Button
  variant="primary"
  size="md"
  onPress={handlePress}
>
  Click me
</Button>
```

**Variants:** `primary`, `secondary`, `outline`, `ghost`, `danger`
**Sizes:** `sm`, `md`, `lg`

### Input

```typescript
import { Input } from '@/components';

<Input
  placeholder="Enter text"
  leftIcon="magnifyingglass"
  state="error"
  hint="This field is required"
/>
```

**Variants:** `default`, `outline`, `filled`
**States:** `default`, `error`, `success`, `warning`

### Text

```typescript
import { Text, Heading1, Body } from '@/components';

<Heading1>Heading</Heading1>
<Body color="muted">Main text</Body>
<Text size="lg" weight="bold">Bold text</Text>
```

**Variants:** `h1`, `h2`, `h3`, `h4`, `body`, `caption`, `label`
**Colors:** `primary`, `secondary`, `success`, `warning`, `error`, `muted`

### Card

```typescript
import { Card } from '@/components';

<Card variant="elevated" pressable onPress={handlePress}>
  <Text>Card content</Text>
</Card>
```

## 🧬 Molecules

Simple groups of atoms that perform a specific function.

### SearchBar

```typescript
import { SearchBar } from '@/components';

<SearchBar
  placeholder="Search recipes..."
  onSearch={handleSearch}
  showSearchButton
  debounceMs={300}
/>
```

### RecipeCard

```typescript
import { RecipeCard } from '@/components';

<RecipeCard
  recipe={{
    id: '1',
    title: 'Carbonara Pasta',
    cookingTime: 20,
    difficulty: 'medium',
    category: 'dinner'
  }}
  onPress={handleRecipePress}
  onToggleFavorite={handleFavorite}
/>
```

### TabButton

```typescript
import { TabButton } from '@/components';

<TabButton
  icon="house.fill"
  label="Home"
  active={true}
  badge="5"
  onPress={handleTabPress}
/>
```

## 🦠 Organisms

Complex components consisting of molecules and atoms.

### Header

```typescript
import { Header } from '@/components';

<Header
  title="Crazy Cooker"
  subtitle="Find the perfect recipe"
  showBackButton
  onBackPress={handleBack}
  actions={[
    { icon: 'bell', onPress: handleNotifications },
    { icon: 'person', onPress: handleProfile }
  ]}
/>
```

### TabBar

```typescript
import { TabBar } from '@/components';

<TabBar
  tabs={[
    { key: 'home', icon: 'house', label: 'Home' },
    { key: 'search', icon: 'magnifyingglass', label: 'Search' },
    { key: 'profile', icon: 'person', label: 'Profile' }
  ]}
  activeTab="home"
  onTabChange={handleTabChange}
  showCenterButton
  centerButtonIcon="plus"
  onCenterButtonPress={handleAddRecipe}
/>
```

## 🎨 Design System

### Colors

```typescript
import { Colors } from '@/constants';

// Main colors
Colors.light.primary; // #FF6B6B
Colors.light.secondary; // #4ECDC4
Colors.light.success; // #4CAF50
Colors.light.warning; // #FF9800
Colors.light.error; // #F44336

// Recipe category colors
RecipeCategoryColors.breakfast; // #FFD700
RecipeCategoryColors.lunch; // #FF6B6B
RecipeCategoryColors.dinner; // #4ECDC4
```

### Sizes

```typescript
import { Sizes, ComponentHeights } from '@/constants';

Sizes.xs; // 4px
Sizes.sm; // 8px
Sizes.md; // 16px
Sizes.lg; // 24px
Sizes.xl; // 32px

ComponentHeights.button.sm; // 32px
ComponentHeights.button.md; // 44px
ComponentHeights.button.lg; // 56px
```

### Typography

```typescript
import { FontSizes, FontWeights, TextStyles } from '@/constants';

FontSizes.xs; // 12px
FontSizes.sm; // 14px
FontSizes.base; // 16px
FontSizes.lg; // 18px
FontSizes.xl; // 20px

FontWeights.normal; // '400'
FontWeights.medium; // '500'
FontWeights.semibold; // '600'
FontWeights.bold; // '700'
```

## 🔧 Usage

### Importing Components

```typescript
// Import specific component
import { Button, Input, Text } from '@/components';

// Import all atoms
import { Button, Input, Text, Card } from '@/components/atoms';

// Import all molecules
import { SearchBar, RecipeCard } from '@/components/molecules';
```

### Creating Custom Components

```typescript
import React from 'react';
import { Button, Text } from '@/components';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
}

export const CustomButton: React.FC<CustomButtonProps> = ({ title, onPress }) => {
  return (
    <Button variant="primary" onPress={onPress}>
      <Text>{title}</Text>
    </Button>
  );
};
```

## 📋 Best Practices

### 1. Composition over Inheritance

```typescript
// ✅ Good - use existing components
<Card>
  <Text variant="h3">Title</Text>
  <Text>Description</Text>
  <Button variant="primary">Action</Button>
</Card>

// ❌ Bad - create new component for simple composition
<CustomCardWithButton />
```

### 2. Reuse Atoms

```typescript
// ✅ Good - use base Button
<Button variant="outline" size="sm">Cancel</Button>
<Button variant="primary" size="md">Save</Button>

// ❌ Bad - create separate components
<CancelButton />
<SaveButton />
```

### 3. Type Safety

```typescript
// ✅ Good - use component types
import { ButtonProps } from '@/components';

interface MyButtonProps extends ButtonProps {
  customProp: string;
}
```

### 4. Consistency

```typescript
// ✅ Good - use constants
import { Sizes, Colors } from '@/constants';

const styles = StyleSheet.create({
  container: {
    padding: Sizes.md,
    backgroundColor: Colors.light.background,
  },
});
```

## 🚀 Extending the System

### Adding New Atom

1. Create file in `components/atoms/`
2. Add export to `components/atoms/index.ts`
3. Update main export in `components/index.ts`

### Adding New Molecule

1. Create file in `components/molecules/`
2. Use existing atoms
3. Add export to corresponding `index.ts`

### Adding New Organism

1. Create file in `components/organisms/`
2. Use molecules and atoms
3. Add export to corresponding `index.ts`

---

This architecture ensures scalability, reusability and consistency of components in the Crazy Cooker application.
