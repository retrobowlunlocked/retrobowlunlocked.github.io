const fs = require('fs');
const path = require('path');

function searchDirectory(directory) {
    try {
        const files = fs.readdirSync(directory);
        
        files.forEach(file => {
            const filePath = path.join(directory, file);
            const stat = fs.statSync(filePath);
            
            if (stat.isDirectory()) {
                // Recursively search subdirectories
                searchDirectory(filePath);
            } else {
                // Process all file types
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
        
        // Define the specific text to replace
        const replacements = [
            ["Unblocked Games G+ Plus", "Unblocked Games G+ Plus"],
            ["Unblocked Games G+", "Unblocked Games G+"],
            ["unblocked-games-gplus", "unblocked-games-gplus"]
        ];
        
        let hasChanges = false;
        replacements.forEach(([oldText, newText]) => {
            if (content.includes(oldText)) {
                content = content.replace(new RegExp(oldText.replace(/[+]/g, '\\+'), 'gi'), newText);
                hasChanges = true;
            }
        });
        
        if (hasChanges) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated: ${filePath}`);
        }
    } catch (err) {
        // Skip files that can't be read as text
        if (err.code !== 'ENOENT' && !err.message.includes('Invalid or unsupported character encoding')) {
            console.error(`Error processing ${filePath}:`, err);
        }
    }
}

// Start processing from root directory
const rootDirectory = 'f:\\best unblocked game';
searchDirectory(rootDirectory);

console.log('Text replacement completed in all files!');