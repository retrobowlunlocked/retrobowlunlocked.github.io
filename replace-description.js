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
        const oldText = "Discover Classroom 6x, the ultimate unblocked games website for kids! Play hundreds of free online games instantly with no downloads required. Fun gaming for everyone at classroom6xx.gitlab.io! We offers exciting free games you can play anywhere - even at school! Racing, puzzles, adventures & more at classroom6xx.gitlab.io.";
        const newText = "Discover Classroom 6x, the ultimate unblocked games website for kids! Play hundreds of free online games instantly with no downloads required. Fun gaming for everyone at classroom6xx.gitlab.io! We offers exciting free games you can play anywhere - even at school! Racing, puzzles, adventures & more at classroom6xx.gitlab.io.";
        
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