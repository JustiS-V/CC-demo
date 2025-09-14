#!/usr/bin/env node

/**
 * Script for automatic generation of icon components
 * Usage: node scripts/generate-icons.js
 */

const fs = require('fs');
const path = require('path');

// File paths
const SVG_DIR = path.join(__dirname, '../assets/icons/svg');
const OUTPUT_DIR = path.join(__dirname, '../components/atoms/icons');
const INDEX_FILE = path.join(OUTPUT_DIR, 'index.ts');

// Create icons directory if it doesn't exist
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Function to convert filename to PascalCase
function toPascalCase(str) {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

// Function to convert filename to camelCase
function toCamelCase(str) {
  const pascalCase = toPascalCase(str);
  return pascalCase.charAt(0).toLowerCase() + pascalCase.slice(1);
}

// Get all SVG files
const svgFiles = fs.readdirSync(SVG_DIR)
  .filter(file => file.endsWith('.svg'))
  .map(file => file.replace('.svg', ''));

console.log(`Found ${svgFiles.length} SVG files:`);
svgFiles.forEach(file => console.log(`  - ${file}`));

// Generate components for each icon
const generatedFiles = [];
const imports = [];
const exports = [];

svgFiles.forEach(iconName => {
  const componentName = toPascalCase(iconName);
  const fileName = `${iconName}.tsx`;
  const filePath = path.join(OUTPUT_DIR, fileName);
  
  const componentContent = `/**
 * ${componentName} Icon Component
 * Automatically generated component for icon ${iconName}
 */

import React from 'react';
import { SvgProps } from 'react-native-svg';
import ${componentName}Svg from '@/assets/icons/svg/${iconName}.svg';

export interface ${componentName}Props extends Omit<SvgProps, 'width' | 'height'> {
  /** Icon size */
  size?: number;
  /** Icon color */
  color?: string;
}

export const ${componentName}Icon: React.FC<${componentName}Props> = ({ 
  size = 24, 
  color = 'currentColor',
  ...props 
}) => (
  <${componentName}Svg
    width={size}
    height={size}
    color={color}
    {...props}
  />
);

export default ${componentName}Icon;
`;

  // Write component file
  fs.writeFileSync(filePath, componentContent);
  generatedFiles.push(fileName);
  
  // Add import and export
  imports.push(`import { ${componentName}Icon } from './${iconName}';`);
  exports.push(`export { ${componentName}Icon } from './${iconName}';`);
  
  console.log(`✅ Generated component: ${fileName}`);
});

// Generate index file
const indexContent = `/**
 * Automatically generated index file for icons
 * Created: ${new Date().toISOString()}
 * Number of icons: ${svgFiles.length}
 */

${imports.join('\n')}

// Export all icons
${exports.join('\n')}

// Export types
${svgFiles.map(iconName => 
  `export type { ${toPascalCase(iconName)}Props } from './${iconName}';`
).join('\n')}

// List of all available icons
export const AVAILABLE_ICONS = [
${svgFiles.map(iconName => `  '${iconName}'`).join(',\n')}
] as const;

export type AvailableIconName = typeof AVAILABLE_ICONS[number];
`;

fs.writeFileSync(INDEX_FILE, indexContent);
console.log(`✅ Generated index file: ${INDEX_FILE}`);

// Generate statistics
const stats = {
  totalIcons: svgFiles.length,
  generatedFiles: generatedFiles.length,
  categories: [...new Set(svgFiles.map(name => {
    if (name.includes('chef') || name.includes('cooking') || name.includes('recipe')) return 'cooking';
    if (name.includes('star') || name.includes('heart') || name.includes('search')) return 'ui';
    return 'other';
  }))],
  files: generatedFiles,
};

console.log('\n📊 Generation statistics:');
console.log(`  Total icons: ${stats.totalIcons}`);
console.log(`  Generated files: ${stats.generatedFiles}`);
console.log(`  Categories: ${stats.categories.join(', ')}`);

// Save statistics to file
const statsFile = path.join(OUTPUT_DIR, 'stats.json');
fs.writeFileSync(statsFile, JSON.stringify(stats, null, 2));
console.log(`✅ Statistics saved: ${statsFile}`);

console.log('\n🎉 Icon generation completed!');
console.log('\n📝 Next steps:');
console.log('  1. Check generated components');
console.log('  2. Update imports in main components');
console.log('  3. Test icons in the application');
console.log('  4. Add new SVG files if needed and restart the script');
