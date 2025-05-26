const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

// Array to store found URLs
const urls = [];

// Function to find data-url in HTML file
function findDataUrl(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const $ = cheerio.load(content);
        
        // Find elements with data-url attribute
        $('[data-url]').each((i, element) => {
            const url = $(element).attr('data-url');
            if (url) {
                urls.push(url);
                console.log(`Found URL in ${path.basename(filePath)}: ${url}`);
            }
        });
    } catch (err) {
        console.error(`Error processing ${filePath}:`, err);
    }
}

// Function to walk through directories
function walkDir(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            walkDir(filePath);
        } else if (stat.isFile() && file.endsWith('.html')) {
            findDataUrl(filePath);
        }
    });
}

// Remove the package installation line and start directly with crawling
console.log('Starting to crawl files...');
walkDir('f:\\best unblocked game');

// Save URLs to file
fs.writeFileSync('f:\\best unblocked game\\iframe.txt', urls.join('\n'));
console.log(`Found ${urls.length} URLs and saved to iframe.txt`);