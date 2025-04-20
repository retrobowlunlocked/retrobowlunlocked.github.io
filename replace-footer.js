const fs = require('fs');
const path = require('path');

function replaceFooterCode(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Define the old footer pattern
    const oldFooterPattern = /<div style="display: contents;">\s*<div class="sc-1ri0y0w-6 jfAzpO">\s*<div style="background-color: var\(--green-7\);" class="sc-1ri0y0w-7 lgEayX">\s*<div decoding="async" class="sc-1ri0y0w-2 mvtOn"><\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*\s*<\/div>\s*<!-- end hero -->\s*<\/main>/g;
    
    // Only replace if the old pattern exists
    if(content.match(oldFooterPattern)) {
      content = content.replace(oldFooterPattern, '<!-- FINAL ADS CODE HEE-->');
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated footer in: ${filePath}`);
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
      replaceFooterCode(filePath);
    }
  });
}

// Start processing from current directory
walkDir('.');
console.log('Footer replacement complete');