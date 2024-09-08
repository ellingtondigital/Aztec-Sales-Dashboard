const fs = require('fs');
const path = require('path');

// Function to map the folder structure
function mapFolderStructure(dirPath, indent = '') {
  const stats = fs.statSync(dirPath);

  if (stats.isDirectory()) {
    const items = fs.readdirSync(dirPath)
      .filter(item => !['node_modules', '.git'].includes(item)) // Exclude certain folders
      .map(item => {
        const itemPath = path.join(dirPath, item);
        return mapFolderStructure(itemPath, `${indent}  ├─`);
      });
    return `${indent}  ${path.basename(dirPath)}\n${items.join('\n')}`;
  } else {
    return `${indent}  ├─ ${path.basename(dirPath)}`;
  }
}

// Path to the directory you want to map
const rootDir = './'; // Change this to the directory you want to map

// Map the folder structure
const folderStructure = mapFolderStructure(rootDir);

// Save the folder structure to a text file
fs.writeFileSync('folderStructure.txt', folderStructure, 'utf-8');

console.log('Folder structure saved to folderStructure.txt');
