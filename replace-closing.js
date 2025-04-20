const fs = require('fs');
const path = require('path');

function replaceClosingTags(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Define the old pattern to match
    const oldPattern = /<\/div>\s*<!-- end hero -->\s*<\/main>/g;
    
    // Define the new replacement code
    const newCode = `</div>\n               \n            <!-- FINAL ADS CODE HEE-->\n`;
    
    // Only replace if the pattern exists
    if(content.match(oldPattern)) {
      content = content.replace(oldPattern, newCode);
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated closing tags in: ${filePath}`);
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
    } else if (file.endsWith('.html')) {
      replaceClosingTags(filePath);
    }
  });
}

// Start processing from current directory
walkDir('.');
console.log('Closing tags replacement complete');