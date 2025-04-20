const fs = require('fs');
const path = require('path');

// Function to recursively get all files in directory
function getAllFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);
    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function(file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
        } else {
            arrayOfFiles.push(path.join(dirPath, file));
        }
    });

    return arrayOfFiles;
}

// Function to replace text in a file
function replaceInFile(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        const originalContent = content;
        
        // Replace the domain
        content = content.replace(
            /unblockedgamesg-plus\.gitlab\.io/g, 
            '1v1-lol-online.gitlab.io'
        );
        
        // Only write if content has changed
        if (content !== originalContent) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated: ${filePath}`);
        }
    } catch (err) {
        console.error(`Error processing ${filePath}:`, err);
    }
}

// Get the current directory
const currentDir = process.cwd();

// Get all files
const allFiles = getAllFiles(currentDir);

// Process each file
allFiles.forEach(file => {
    // Process HTML, JS, and configuration files
    if (/\.(html|js|json|config|xml)$/i.test(file)) {
        replaceInFile(file);
    }
});

console.log('Domain replacement completed!');