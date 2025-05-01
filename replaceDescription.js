const fs = require('fs');
const path = require('path');

const oldText = '💥 Ready? Fight! Play Classroom 6x Unblocked NOW—No Signup, No Lag. Build, Shoot & Rule the Arena Anytime!';
const newText = 'Looking for unrestricted gaming? Unblocked Games G+ provides instant access to popular browser games, all completely free and available on any device. Play now without limitations!';

function replaceInFile(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        if (content.includes(oldText)) {
            content = content.replace(new RegExp(oldText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newText);
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