# 🏗 Project Structure

This document describes the organization of files and folders in the Crazy Cooker project.

## 📁 Root Structure

```
crazy-cooker/
├── 📁 app/                    # Main application screens
├── 📁 assets/                 # Static resources
├── 📁 components/             # Reusable components
├── 📁 constants/              # Constants and themes
├── 📁 contexts/               # React contexts
├── 📁 docs/                   # Project documentation
├── 📁 hooks/                  # Custom React hooks
├── 📁 lib/                    # Utilities and configuration
├── 📁 scripts/                # Build scripts
├── 📁 types/                  # TypeScript types
├── 📄 .env                    # Environment variables (secret)
├── 📄 .env.example            # Environment variables template
├── 📄 .gitignore              # Git ignore rules
├── 📄 app.json                # Expo configuration
├── 📄 babel.config.js         # Babel configuration
├── 📄 metro.config.js         # Metro bundler configuration
├── 📄 package.json            # Dependencies and scripts
├── 📄 tsconfig.json           # TypeScript configuration
└── 📄 README.md               # Project documentation
```

## 📱 App Directory (Expo Router)

```
app/
├── 📁 (tabs)/                 # Tab navigation group
│   ├── 📄 _layout.tsx         # Tab layout configuration
│   ├── 📄 index.tsx           # Home/Catalog screen
│   ├── 📄 chat.tsx            # AI Chat screen
│   └── 📄 profile.tsx         # Profile screen
├── 📄 _layout.tsx             # Root layout
├── 📄 auth.tsx                # Authentication screen
├── 📄 verify-code.tsx         # Code verification screen
└── 📄 icons.tsx               # Icons demonstration screen
```

### Screen Organization

- **`(tabs)/`** - Tab navigation screens
- **`_layout.tsx`** - Layout components and navigation setup
- **`auth.tsx`** - User authentication (login/register)
- **`verify-code.tsx`** - Phone/email code verification
- **`icons.tsx`** - Icon system demonstration

## 🧩 Components Directory (Atomic Design)

```
components/
├── 📁 atoms/                  # Basic building blocks
│   ├── 📄 Button.tsx          # Basic button component
│   ├── 📄 Card.tsx            # Card container component
│   ├── 📄 Icon.tsx            # Universal icon component
│   ├── 📄 IconButton.tsx      # Button with icon
│   ├── 📄 Input.tsx           # Input field component
│   ├── 📄 SvgIcon.tsx         # SVG-specific icon component
│   ├── 📄 Text.tsx            # Text component with variants
│   └── 📄 index.ts            # Atoms exports
├── 📁 molecules/              # Composite components
│   ├── 📄 IconGrid.tsx        # Icon demonstration grid
│   ├── 📄 RecipeCard.tsx      # Recipe card component
│   ├── 📄 SearchBar.tsx       # Search input component
│   ├── 📄 TabButton.tsx       # Tab navigation button
│   └── 📄 index.ts            # Molecules exports
├── 📁 organisms/               # Complex components
│   ├── 📄 Header.tsx          # App header component
│   ├── 📄 TabBar.tsx          # Bottom tab navigation
│   └── 📄 index.ts            # Organisms exports
├── 📄 external-link.tsx       # External link component
├── 📄 haptic-tab.tsx          # Haptic feedback tab
├── 📄 hello-wave.tsx          # Welcome animation
├── 📄 parallax-scroll-view.tsx # Parallax scroll component
├── 📄 themed-text.tsx         # Themed text component
├── 📄 themed-view.tsx         # Themed view component
├── 📁 ui/                     # UI components
│   ├── 📄 collapsible.tsx     # Collapsible component
│   └── 📄 icon-symbol.tsx     # Icon symbol component
└── 📄 index.ts                # Main components export
```

### Atomic Design Principles

- **Atoms** - Basic UI elements (buttons, inputs, icons)
- **Molecules** - Simple combinations of atoms (search bar, recipe card)
- **Organisms** - Complex components (header, navigation)
- **Templates** - Page layouts (handled by Expo Router)
- **Pages** - Specific screen implementations

## 🎨 Constants Directory

```
constants/
├── 📁 api/                    # API configuration
│   └── 📄 config.ts           # API endpoints and settings
├── 📁 styles/                 # Styling constants
│   └── 📄 spacing.ts           # Spacing, sizes, shadows
├── 📁 theme/                  # Theme configuration
│   ├── 📄 colors.ts           # Color palette and themes
│   └── 📄 typography.ts       # Font sizes, weights, styles
├── 📄 index.ts                # Main constants export
└── 📄 theme.ts                # Legacy theme compatibility
```

### Theme Organization

- **`colors.ts`** - Light/dark theme colors, semantic colors
- **`typography.ts`** - Font sizes, weights, line heights
- **`spacing.ts`** - Margins, paddings, component sizes
- **`api/config.ts`** - API endpoints, timeouts, error codes

## 🔧 Contexts Directory

```
contexts/
└── 📄 AuthContext.tsx         # Authentication context
```

### Context Usage

- **`AuthContext`** - Global authentication state management
- Provides user data, login/logout functions
- Used throughout the app for auth state

## 🎣 Hooks Directory

```
hooks/
└── 📄 use-color-scheme.ts     # Color scheme detection hook
```

### Custom Hooks

- **`use-color-scheme`** - Detects light/dark theme preference
- Returns current color scheme and toggle function

## 📚 Lib Directory

```
lib/
├── 📄 firebase.config.ts      # Firebase configuration
├── 📄 icon-utils.ts           # Icon utilities and helpers
└── 📄 icons.ts                # Icon mappings and constants
```

### Utility Functions

- **`firebase.config.ts`** - Firebase initialization and configuration
- **`icon-utils.ts`** - Icon generation, validation, statistics
- **`icons.ts`** - Icon mappings, categories, colors

## 🖼 Assets Directory

```
assets/
├── 📁 icons/                  # Icon assets
│   └── 📁 svg/                # SVG icon files
│       ├── 📄 chef-hat.svg     # Chef hat icon
│       ├── 📄 recipe-book.svg # Recipe book icon
│       ├── 📄 cooking-pot.svg # Cooking pot icon
│       ├── 📄 fork-knife.svg  # Fork and knife icon
│       ├── 📄 timer.svg       # Timer icon
│       ├── 📄 star.svg         # Star icon
│       ├── 📄 heart.svg        # Heart icon
│       ├── 📄 search.svg       # Search icon
│       ├── 📄 plus.svg         # Plus icon
│       ├── 📄 user.svg         # User icon
│       └── 📄 index.tsx        # SVG exports
└── 📁 images/                 # Image assets (if any)
```

### Asset Organization

- **`icons/svg/`** - SVG icon files for the icon system
- **`images/`** - Static images (logos, backgrounds, etc.)

## 📖 Docs Directory

```
docs/
├── 📄 README.md               # Main documentation
├── 📄 getting-started.md      # Setup and installation guide
├── 📄 component-architecture.md # Component system guide
├── 📄 svg-icons.md            # Icon system guide
├── 📄 svg-icons-complete.md   # Complete icon guide
├── 📄 FIREBASE_SETUP.md       # Firebase setup guide
├── 📄 ENV_SETUP.md            # Environment variables guide
├── 📄 project-structure.md    # This file
├── 📄 troubleshooting.md      # Problem solving guide
├── 📄 faq.md                  # Frequently asked questions
└── 📄 changelog.md            # Project changelog
```

### Documentation Structure

- **Setup guides** - Installation and configuration
- **Architecture guides** - Component system and structure
- **Feature guides** - Specific functionality documentation
- **Troubleshooting** - Problem solving and FAQ

## 🔧 Configuration Files

### Root Configuration

- **`.env`** - Environment variables (secret, not in git)
- **`.env.example`** - Environment variables template
- **`.gitignore`** - Git ignore rules
- **`app.json`** - Expo app configuration
- **`package.json`** - Dependencies and npm scripts

### Build Configuration

- **`babel.config.js`** - Babel transpilation settings
- **`metro.config.js`** - Metro bundler configuration
- **`tsconfig.json`** - TypeScript compiler settings

### TypeScript Configuration

```json
{
  "compilerOptions": {
    "target": "esnext",
    "lib": ["esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

## 🚀 Scripts Directory

```
scripts/
└── 📄 generate-icons.js       # Icon generation script
```

### Build Scripts

- **`generate-icons.js`** - Automatically generates icon components from SVG files
- Can be run with `npm run generate-icons`

## 📝 Types Directory

```
types/
└── 📄 svg.d.ts                # SVG module declarations
```

### TypeScript Declarations

- **`svg.d.ts`** - Declares SVG modules for TypeScript
- Enables importing SVG files as React components

## 🔄 File Naming Conventions

### Components

- **PascalCase** for component files: `Button.tsx`, `RecipeCard.tsx`
- **camelCase** for utility files: `iconUtils.ts`, `authContext.tsx`

### Assets

- **kebab-case** for SVG files: `chef-hat.svg`, `recipe-book.svg`
- **PascalCase** for component exports: `ChefHatIcon`, `RecipeBookIcon`

### Directories

- **lowercase** for most directories: `components/`, `constants/`
- **PascalCase** for React component directories: `atoms/`, `molecules/`

## 📦 Import/Export Patterns

### Component Exports

```typescript
// Individual component export
export { Button } from './Button';

// Type export
export type { ButtonProps } from './Button';

// Default export
export default Button;
```

### Index File Pattern

```typescript
// components/atoms/index.ts
export { Button } from './Button';
export { Card } from './Card';
export { Icon } from './Icon';
// ... other exports
```

### Path Aliases

```typescript
// Use @ alias for root imports
import { Button } from '@/components/atoms';
import { Colors } from '@/constants/theme/colors';
import { AuthContext } from '@/contexts/AuthContext';
```

## 🎯 Best Practices

### File Organization

1. **Group related files** in the same directory
2. **Use index files** for clean imports
3. **Follow naming conventions** consistently
4. **Keep components small** and focused
5. **Separate concerns** (UI, logic, data)

### Import Organization

1. **External libraries** first
2. **Internal components** second
3. **Types and interfaces** last
4. **Use absolute imports** with @ alias
5. **Group related imports** together

### Component Structure

1. **Props interface** at the top
2. **Component implementation** in the middle
3. **Styles** at the bottom
4. **Export** at the end

This structure provides a scalable, maintainable foundation for the Crazy Cooker application. Each directory has a specific purpose and follows established patterns for easy navigation and development.
