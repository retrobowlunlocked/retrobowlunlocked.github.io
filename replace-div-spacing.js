const fs = require('fs');
const path = require('path');

function replaceDivSpacing(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Define the old pattern with multiple empty lines
    const oldPattern = /\s+<\/div>\s+\s+\s+\s+\s+\s+<\/div>\s+\s+\s+\s+\s+\s+\s+\s+<div class="sc-tbf0fc-0 gKdPGs sc-al88rd-8 jLkOBn">/g;
    
    // Define the new pattern with cleaned up spacing
    const newPattern = `\n               \n       \n      </div>\n               \n            <div class="sc-tbf0fc-0 gKdPGs sc-al88rd-8 jLkOBn">`;
    
    // Only replace if the pattern exists
    if(content.match(oldPattern)) {
      content = content.replace(oldPattern, newPattern);
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated div spacing in: ${filePath}`);
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
      replaceDivSpacing(filePath);
    }
  });
}

// Start processing from the games directory
walkDir('c:\\Users\\pc\\Pictures\\Screenshots\\test code\\best unblocked game\\games');
console.log('Div spacing replacement complete!');