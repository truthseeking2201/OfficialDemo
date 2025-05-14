import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Directory containing stubs files
const stubsDir = path.join(__dirname, 'src/stubs');

// Process all TypeScript files in the stubs directory
fs.readdir(stubsDir, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  let fixedCount = 0;
  let processedCount = 0;
  
  files.forEach(file => {
    if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      const filePath = path.join(stubsDir, file);
      
      // Read the file content
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          console.error(`Error reading file ${file}:`, err);
          return;
        }
        
        // Replace @/ imports with relative imports
        let updatedContent = data;
        
        // Fix imports for components
        updatedContent = updatedContent.replace(
          /import\s+(?:[\w\s{},]*)\s+from\s+["']@\/components\/(.*?)["']/g, 
          'import $1 from "../components/$1"'
        );
        
        // Fix imports for lib
        updatedContent = updatedContent.replace(
          /import\s+(?:[\w\s{},]*)\s+from\s+["']@\/lib\/(.*?)["']/g, 
          'import $1 from "../lib/$1"'
        );
        
        // Fix imports for types
        updatedContent = updatedContent.replace(
          /import\s+(?:[\w\s{},]*)\s+from\s+["']@\/types(.*?)["']/g, 
          'import $1 from "../types$1"'
        );
        
        // Write the updated content back to the file
        if (data !== updatedContent) {
          fs.writeFile(filePath, updatedContent, 'utf8', err => {
            if (err) {
              console.error(`Error writing file ${file}:`, err);
              return;
            }
            fixedCount++;
            console.log(`Fixed imports in ${file}`);
            
            processedCount++;
            if (processedCount === files.length) {
              console.log(`Finished processing ${files.length} files, fixed ${fixedCount} files`);
            }
          });
        } else {
          processedCount++;
          if (processedCount === files.length) {
            console.log(`Finished processing ${files.length} files, fixed ${fixedCount} files`);
          }
        }
      });
    } else {
      processedCount++;
      if (processedCount === files.length) {
        console.log(`Finished processing ${files.length} files, fixed ${fixedCount} files`);
      }
    }
  });
});