const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

// Store found URLs
const thumbUrls = new Set();

// Function to crawl directory recursively
function crawlDirectory(directory) {
    const files = fs.readdirSync(directory);
    
    files.forEach(file => {
        const fullPath = path.join(directory, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            // Recursively crawl subdirectories
            crawlDirectory(fullPath);
        } else if (path.extname(file) === '.html') {
            // Process HTML files
            const content = fs.readFileSync(fullPath, 'utf8');
            
            // Find thumb URLs using regex
            const thumbRegex = /--thumb:url\((.*?)\)/g;
            let match;
            
            while ((match = thumbRegex.exec(content)) !== null) {
                if (match[1]) {
                    // Clean the URL and add to Set
                    const cleanUrl = match[1].replace(/['"]/g, '').trim();
                    thumbUrls.add(cleanUrl);
                }
            }
        }
    });
}

// Start crawling from the project root
const projectRoot = path.resolve(__dirname);
crawlDirectory(projectRoot);

// Save URLs to file
const urlList = Array.from(thumbUrls).join('\n');
fs.writeFileSync('thumburl.txt', urlList);

console.log(`Found ${thumbUrls.size} thumbnail URLs and saved to thumburl.txt`);