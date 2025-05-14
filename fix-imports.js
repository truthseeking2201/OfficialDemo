const fs = require('fs');
const path = require('path');

// Directory containing all UI components
const uiDir = path.join(__dirname, 'src/components/ui');

// Process all TypeScript files in the UI directory
fs.readdir(uiDir, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  let fixedCount = 0;
  
  files.forEach(file => {
    if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      const filePath = path.join(uiDir, file);
      
      // Read the file content
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          console.error(`Error reading file ${file}:`, err);
          return;
        }
        
        // Replace @/lib/utils imports with relative imports
        const updatedContent = data.replace(
          /import\s+\{\s*cn\s*(?:,\s*[\w\s,]+)?\s*\}\s+from\s+["']@\/lib\/utils["']/g, 
          'import { cn } from "../../lib/utils"'
        );
        
        // Replace other common @/ imports if needed
        
        // Write the updated content back to the file
        if (data !== updatedContent) {
          fs.writeFile(filePath, updatedContent, 'utf8', err => {
            if (err) {
              console.error(`Error writing file ${file}:`, err);
              return;
            }
            fixedCount++;
            console.log(`Fixed imports in ${file}`);
          });
        }
      });
    }
  });
  
  console.log(`Processed ${files.length} files, fixed ${fixedCount} files`);
});