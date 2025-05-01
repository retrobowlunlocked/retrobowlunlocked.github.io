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
        const oldText = "Classroom 6x Unblocked";
        const newText = "Classroom 6x Unblocked";
        
        if (content.includes(oldText)) {
            content = content.replace(new RegExp(oldText.replace(/[+]/g, '\\+'), 'g'), newText);
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

console.log('Title replacement completed in all files!');