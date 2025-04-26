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
                // Process files with these extensions
                if (filePath.match(/\.(html|js|css|json)$/i)) {
                    replaceInFile(filePath);
                }
            }
        });
    } catch (err) {
        console.error(`Error processing directory ${directory}:`, err);
    }
}

function replaceInFile(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        const oldText = "nowggunblocked.gitlab.io";
        const newText = "nowggunblocked.gitlab.io";
        
        if (content.includes(oldText)) {
            // Replace all occurrences
            content = content.replace(new RegExp(oldText, 'g'), newText);
            
            // Write back to file
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated: ${filePath}`);
        }
    } catch (err) {
        console.error(`Error processing ${filePath}:`, err);
    }
}

// Start processing from root directory
const rootDirectory = 'f:\\best unblocked game';
searchDirectory(rootDirectory);

console.log('Text replacement completed in all files!');