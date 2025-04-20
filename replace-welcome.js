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
        
        // Replace the welcome text
        content = content.replace(
            /Welcome to 1v1\.LOL Unblocked, the premier destination for browser-based gaming without any restrictions/g, 
            '💥 Ready? Fight! Play 1v1.LOL Unblocked NOW—No Signup, No Lag. Build, Shoot & Rule the Arena Anytime!'
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
    // Only process HTML files
    if (/\.(html|htm)$/.test(file)) {
        replaceInFile(file);
    }
});

console.log('Text replacement completed!');