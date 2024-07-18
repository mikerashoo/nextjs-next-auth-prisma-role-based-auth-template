// File: scripts/generate-icons.js

const fs = require('fs');
const path = require('path');

// Path to the lucide-react.d.ts file
const lucideTypesPath = path.resolve(__dirname, './node_modules/lucide-react/dist/lucide-react.d.ts');

// Read the content of the file
const content = fs.readFileSync(lucideTypesPath, 'utf8');

// Regular expression to match icon declarations
const iconRegex = /declare const (\w+): react\.ForwardRefExoticComponent/g;

// Extract icon names
const iconNames = [];
let match;
while ((match = iconRegex.exec(content)) !== null) {
  iconNames.push(match[1]);
}

// Generate the content for icons.ts
const generatedContent = ` 

// Export individual icons
export enum IconName {
  ${iconNames.map(iconName => `${iconName} = "${iconName}"`).join(',\n  ')}
}
`;
 

// Write the content to icons.ts
const outputPath = path.resolve(__dirname, './components/ui-components/AppIcon/icon-list.ts');
fs.writeFileSync(outputPath, generatedContent);

console.log('icons.ts has been generated successfully!');