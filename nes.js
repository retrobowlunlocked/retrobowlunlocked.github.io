
const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    if(content.includes('1v1.LOL Unblocked')) {
      content = content.replace(/1v1.LOL Unblocked/g, '1v1.LOL Unblocked');
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated: ${filePath}`);
    }
  } catch (err) {
    console.error(`Error processing ${filePath}:`, err);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory() && !file.startsWith('.')) {
      walkDir(filePath);
    } else if (stat.isFile()) {
      replaceInFile(filePath);
    }
  });
}

// Start processing from current directory
walkDir('.');
console.log('Replacement complete');
