import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Process a single file to fix @/ imports
function fixImportsInFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(`Error reading file ${filePath}:`, err);
        reject(err);
        return;
      }
      
      // Replace @/ imports with relative imports
      const fileDir = path.dirname(filePath);
      const srcDir = path.join(__dirname, 'src');
      const relativePathToSrc = path.relative(fileDir, srcDir) || '.';
      
      let updatedContent = data;
      
      // Replace imports like @/lib/utils, @/components/ui/button, etc.
      updatedContent = updatedContent.replace(
        /from\s+["']@\/(.*?)["']/g,
        (match, importPath) => {
          // Calculate the relative path from current file to imported module
          return `from "${relativePathToSrc}/${importPath}"`;
        }
      );
      
      // Don't update if content hasn't changed
      if (data === updatedContent) {
        resolve(false);
        return;
      }
      
      fs.writeFile(filePath, updatedContent, 'utf8', err => {
        if (err) {
          console.error(`Error writing file ${filePath}:`, err);
          reject(err);
          return;
        }
        
        console.log(`Fixed imports in ${path.relative(__dirname, filePath)}`);
        resolve(true);
      });
    });
  });
}

// Walk through directories recursively to find all TypeScript files
function walkDir(dir) {
  return new Promise((resolve, reject) => {
    let results = [];
    fs.readdir(dir, (err, list) => {
      if (err) {
        reject(err);
        return;
      }
      
      let pending = list.length;
      if (!pending) resolve(results);
      
      list.forEach(file => {
        const filePath = path.join(dir, file);
        fs.stat(filePath, (err, stat) => {
          if (err) {
            reject(err);
            return;
          }
          
          if (stat.isDirectory()) {
            // Skip node_modules and other unwanted directories
            if (file === 'node_modules' || file === '.git' || file === 'dist') {
              if (!--pending) resolve(results);
              return;
            }
            
            walkDir(filePath).then(res => {
              results = results.concat(res);
              if (!--pending) resolve(results);
            }).catch(reject);
          } else {
            // Only process TypeScript files
            if (file.endsWith('.ts') || file.endsWith('.tsx')) {
              results.push(filePath);
            }
            if (!--pending) resolve(results);
          }
        });
      });
    });
  });
}

// Main function
async function main() {
  try {
    // Find all TypeScript files in src directory
    const srcDir = path.join(__dirname, 'src');
    const files = await walkDir(srcDir);
    
    console.log(`Found ${files.length} TypeScript files to process...`);
    
    // Process all files in parallel
    const results = await Promise.all(files.map(file => fixImportsInFile(file)));
    const fixedCount = results.filter(Boolean).length;
    
    console.log(`Finished processing ${files.length} files, fixed ${fixedCount} files`);
  } catch (error) {
    console.error('Error:', error);
  }
}

main();