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
        const oldText = "Discover Unblocked Games G+: Play free games anywhere, even at school! Enjoy endless fun with zero restrictions—action, racing, brain teasers, and more. No ads, no registration, just pure gaming joy. Perfect for breaks, rewards, or quick playtime!";
        const newText = "Discover Unblocked Games G+: Play free games anywhere, even at school! Enjoy endless fun with zero restrictions—action, racing, brain teasers, and more. No ads, no registration, just pure gaming joy. Perfect for breaks, rewards, or quick playtime!";
        
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

console.log('Text replacement completed in all files!');