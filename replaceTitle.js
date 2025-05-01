const fs = require('fs');
const path = require('path');

const oldText = '1v1.LOL Unblocked';
const newText = 'Classroom 6x Unblocked';

function replaceInFile(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        if (content.includes(oldText)) {
            content = content.replace(new RegExp(oldText, 'g'), newText);
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated ${filePath}`);
        }
    } catch (err) {
        console.error(`Error processing ${filePath}:`, err);
    }
}

function processDirectory(directory) {
    const files = fs.readdirSync(directory);
    
    files.forEach(file => {
        const fullPath = path.join(directory, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            processDirectory(fullPath);
        } else if (file.endsWith('.html')) {
            replaceInFile(fullPath);
        }
    });
}

// Start processing from the current directory
const projectDir = __dirname;
processDirectory(projectDir);