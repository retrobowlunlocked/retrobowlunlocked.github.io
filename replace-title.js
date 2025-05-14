const fs = require('fs');
const path = require('path');

const oldText = "Unblocked Games 76 77";
const newText = "Unblocked Games 76 77";

function replaceInFile(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        if (content.includes(oldText)) {
            content = content.replace(new RegExp(oldText, 'g'), newText);
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated: ${filePath}`);
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
        if (stat.isDirectory()) {
            walkDir(filePath);
        } else if (stat.isFile() && (file.endsWith('.html') || file.endsWith('.js'))) {
            replaceInFile(filePath);
        }
    });
}

// Start the replacement process
walkDir('f:\\best unblocked game');