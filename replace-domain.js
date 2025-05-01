const fs = require('fs');
const path = require('path');

function searchDirectory(directory) {
    try {
        const files = fs.readdirSync(directory);
        
        files.forEach(file => {
            const filePath = path.join(directory, file);
            const stat = fs.statSync(filePath);
            
            if (stat.isDirectory()) {
                searchDirectory(filePath);
            } else {
                replaceInFile(filePath);
            }
        });
    } catch (err) {
        console.error(`Error processing directory ${directory}:`, err);
    }
}

function replaceInFile(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // The specific text to replace
        const oldDomain = "classroom6x.gitlab.io";
        const newDomain = "classroom6x.gitlab.io";
        
        if (content.includes(oldDomain)) {
            content = content.replace(new RegExp(oldDomain, 'g'), newDomain);
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated: ${filePath}`);
        }
    } catch (err) {
        if (err.code !== 'ENOENT' && !err.message.includes('Invalid or unsupported character encoding')) {
            console.error(`Error processing ${filePath}:`, err);
        }
    }
}

// Start processing from root directory
const rootDirectory = 'f:\\best unblocked game';
searchDirectory(rootDirectory);

console.log('Domain replacement completed in all files!');