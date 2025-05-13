const fs = require('fs');
const path = require('path');

const oldText = "Looking for unrestricted gaming? Poki Unblocked+ provides instant access to popular browser games, all completely free and available on any device. Play now without limitations!";
const newText = "Discover Poki Unblocked at pokiunblockedonline.gitlab.io - Your #1 destination for free, unblocked online games that work anywhere. Play hundreds of exciting games with no downloads or restrictions. Perfect for kids and teens looking for gaming fun anytime!";

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