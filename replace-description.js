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
        const oldText = "Unblocked Games G+ — Play 100+ Free Games Anywhere! Safe, school-friendly, and no downloads. Enjoy action, puzzles, sports, and classics instantly!";
        const newText = "Unblocked Games G+ — Play 100+ Free Games Anywhere! Safe, school-friendly, and no downloads. Enjoy action, puzzles, sports, and classics instantly!";
        
        if (content.includes(oldText)) {
            content = content.replace(new RegExp(oldText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newText);
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

console.log('Description replacement completed in all files!');