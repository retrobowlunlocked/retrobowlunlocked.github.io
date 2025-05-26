const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const https = require('https');

const imageUrls = [];
const CONCURRENT_REQUESTS = 10; // Number of parallel requests
const TIMEOUT = 5000; // 5 seconds timeout

function findThumbnailUrl(url) {
    return new Promise((resolve) => {
        const req = https.get(url, { timeout: TIMEOUT }, (resp) => {
            let data = '';

            resp.on('data', (chunk) => {
                data += chunk;
            });

            resp.on('end', () => {
                try {
                    const $ = cheerio.load(data);
                    const selectors = [
                        'meta[property="og:image"]',
                        'meta[name="thumbnail"]',
                        '.game-thumbnail img',
                        '.thumbnail img',
                        '#game-image',
                        'img.preview',
                        '.game-preview img'
                    ];

                    let imageUrl = '';
                    for (const selector of selectors) {
                        const element = $(selector);
                        if (element.length) {
                            imageUrl = element.attr('content') || element.attr('src');
                            if (imageUrl) break;
                        }
                    }

                    if (imageUrl) {
                        console.log(`Found image for ${url}: ${imageUrl}`);
                        imageUrls.push(`${url}\t${imageUrl}`);
                    }
                } catch (err) {
                    console.error(`Error processing ${url}:`, err);
                }
                resolve();
            });
        });

        req.on('error', (err) => {
            console.error(`Error fetching ${url}:`, err);
            resolve();
        });

        req.on('timeout', () => {
            console.log(`Timeout for ${url}`);
            req.destroy();
            resolve();
        });
    });
}

async function processUrlsBatch(urlBatch) {
    await Promise.all(urlBatch.map(url => findThumbnailUrl(url.trim())));
}

async function processUrls() {
    const urls = fs.readFileSync('f:\\best unblocked game\\iframe.txt', 'utf8')
        .split('\n')
        .filter(url => url.trim());

    // Process URLs in batches
    for (let i = 0; i < urls.length; i += CONCURRENT_REQUESTS) {
        const batch = urls.slice(i, i + CONCURRENT_REQUESTS);
        await processUrlsBatch(batch);
        // Small delay between batches
        await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    fs.writeFileSync('f:\\best unblocked game\\imageurl.txt', imageUrls.join('\n'));
    console.log(`Processed ${urls.length} URLs and saved results to imageurl.txt`);
}

console.log('Starting to fetch thumbnail images...');
processUrls();