/**
 * Utilities for working with SVG icons
 * Component generation, validation and optimization
 */

// Interface for icon metadata
export interface IconMetadata {
  name: string;
  category: string;
  tags: string[];
  description: string;
  keywords: string[];
}

// Registry of all icons with metadata
export const ICON_REGISTRY: Record<string, IconMetadata> = {
  'chef-hat': {
    name: 'chef-hat',
    category: 'cooking',
    tags: ['chef', 'cook', 'kitchen', 'professional'],
    description: 'Chef hat',
    keywords: ['chef', 'cook', 'kitchen', 'professional'],
  },
  'recipe-book': {
    name: 'recipe-book',
    category: 'cooking',
    tags: ['recipe', 'book', 'cookbook', 'instructions'],
    description: 'Recipe book',
    keywords: ['recipe', 'book', 'cookbook', 'instructions'],
  },
  'cooking-pot': {
    name: 'cooking-pot',
    category: 'cooking',
    tags: ['pot', 'cooking', 'kitchen', 'utensil'],
    description: 'Cooking pot',
    keywords: ['pot', 'cooking', 'kitchen', 'utensils'],
  },
  'fork-knife': {
    name: 'fork-knife',
    category: 'cooking',
    tags: ['fork', 'knife', 'cutlery', 'eating'],
    description: 'Fork and knife',
    keywords: ['fork', 'knife', 'cutlery', 'food'],
  },
  timer: {
    name: 'timer',
    category: 'cooking',
    tags: ['timer', 'time', 'clock', 'duration'],
    description: 'Cooking timer',
    keywords: ['timer', 'time', 'clock', 'duration'],
  },
  star: {
    name: 'star',
    category: 'ui',
    tags: ['star', 'rating', 'favorite', 'quality'],
    description: 'Star for rating',
    keywords: ['star', 'rating', 'favorite', 'quality'],
  },
  heart: {
    name: 'heart',
    category: 'ui',
    tags: ['heart', 'love', 'favorite', 'like'],
    description: 'Heart for favorites',
    keywords: ['heart', 'love', 'favorite', 'like'],
  },
  search: {
    name: 'search',
    category: 'ui',
    tags: ['search', 'find', 'lookup', 'discover'],
    description: 'Search',
    keywords: ['search', 'find', 'look', 'discover'],
  },
  plus: {
    name: 'plus',
    category: 'ui',
    tags: ['plus', 'add', 'create', 'new'],
    description: 'Add',
    keywords: ['plus', 'add', 'create', 'new'],
  },
  user: {
    name: 'user',
    category: 'ui',
    tags: ['user', 'person', 'profile', 'account'],
    description: 'User',
    keywords: ['user', 'person', 'profile', 'account'],
  },
};

// Function to search icons by keywords
export const searchIcons = (query: string): string[] => {
  const lowercaseQuery = query.toLowerCase();

  return Object.entries(ICON_REGISTRY)
    .filter(([name, metadata]) => {
      return (
        name.toLowerCase().includes(lowercaseQuery) ||
        metadata.description.toLowerCase().includes(lowercaseQuery) ||
        metadata.keywords.some(keyword =>
          keyword.toLowerCase().includes(lowercaseQuery)
        ) ||
        metadata.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
      );
    })
    .map(([name]) => name);
};

// Function to get icons by category
export const getIconsByCategory = (category: string): string[] => {
  return Object.entries(ICON_REGISTRY)
    .filter(([name, metadata]) => metadata.category === category)
    .map(([name]) => name);
};

// Function to get all categories
export const getAllCategories = (): string[] => {
  const categories = new Set<string>();
  Object.values(ICON_REGISTRY).forEach(metadata => {
    categories.add(metadata.category);
  });
  return Array.from(categories);
};

// Function to get random icon
export const getRandomIcon = (): string => {
  const iconNames = Object.keys(ICON_REGISTRY);
  const randomIndex = Math.floor(Math.random() * iconNames.length);
  return iconNames[randomIndex];
};

// Function to get recommended icons for context
export const getRecommendedIcons = (context: string): string[] => {
  const contextLower = context.toLowerCase();

  // Context to recommended icons mapping
  const recommendations: Record<string, string[]> = {
    cooking: ['chef-hat', 'cooking-pot', 'fork-knife', 'timer'],
    recipe: ['recipe-book', 'chef-hat', 'star', 'heart'],
    search: ['search', 'magnifyingglass'],
    user: ['user', 'person.fill'],
    navigation: ['house.fill', 'chevron.left', 'chevron.right'],
    actions: ['plus', 'pencil', 'trash', 'share'],
    rating: ['star', 'star.fill', 'heart', 'heart.fill'],
  };

  return recommendations[contextLower] || [];
};

// Function to validate SVG icon
export const validateSvgIcon = (
  svgContent: string
): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  // Check basic SVG structure
  if (!svgContent.includes('<svg')) {
    errors.push('SVG must contain <svg> tag');
  }

  if (!svgContent.includes('viewBox')) {
    errors.push('SVG must contain viewBox attribute');
  }

  if (!svgContent.includes('xmlns="http://www.w3.org/2000/svg"')) {
    errors.push('SVG must contain xmlns attribute');
  }

  // Check for currentColor usage
  if (
    !svgContent.includes('currentColor') &&
    !svgContent.includes('fill="currentColor"')
  ) {
    errors.push('Recommended to use currentColor for color');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

// Function to generate TypeScript interface for icon
export const generateIconInterface = (iconName: string): string => {
  const metadata = ICON_REGISTRY[iconName];
  if (!metadata) {
    throw new Error(`Icon ${iconName} not found in registry`);
  }

  return `
export interface ${toPascalCase(iconName)}Props extends Omit<SvgProps, 'width' | 'height'> {
  /** Icon size */
  size?: number;
  /** Icon color */
  color?: string;
}

export const ${toPascalCase(iconName)}Icon: React.FC<${toPascalCase(iconName)}Props> = ({ 
  size = 24, 
  color = 'currentColor',
  ...props 
}) => (
  <${toPascalCase(iconName)}Svg
    width={size}
    height={size}
    color={color}
    {...props}
  />
);
`;
};

// Helper function to convert to PascalCase
const toPascalCase = (str: string): string => {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
};

// Function to export all icons to one file
export const generateIconsExport = (): string => {
  const iconNames = Object.keys(ICON_REGISTRY);

  const imports = iconNames
    .map(
      name =>
        `import ${toPascalCase(name)}Svg from '@/assets/icons/svg/${name}.svg';`
    )
    .join('\n');

  const exports = iconNames
    .map(name => `export { ${toPascalCase(name)}Icon } from './${name}';`)
    .join('\n');

  return `
// Automatically generated icon export file
${imports}

${exports}
`;
};

// Function to get icon statistics
export const getIconStats = () => {
  const categories = getAllCategories();
  const totalIcons = Object.keys(ICON_REGISTRY).length;

  const categoryStats = categories.map(category => ({
    category,
    count: getIconsByCategory(category).length,
    icons: getIconsByCategory(category),
  }));

  return {
    totalIcons,
    totalCategories: categories.length,
    categoryStats,
  };
};
