const fs = require('fs');
const path = require('path');

function scanHeadSection(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Extract head section
    const headMatch = content.match(/<head[^>]*>[\s\S]*?<\/head>/i);
    
    if (headMatch) {
      const headContent = headMatch[0];
      
      // Look for specific patterns
      const patterns = {
        scripts: /<script[^>]*>([\s\S]*?)<\/script>/g,
        redirects: /window\.location|document\.location|top\.location/g,
        externalScripts: /<script[^>]*src=["']([^"']+)["']/g,
        metaRefresh: /<meta[^>]*http-equiv=["']refresh["'][^>]*>/g
      };

      // Extract and log findings
      console.log(`\nAnalyzing ${filePath}:`);
      
      // Check inline scripts
      const inlineScripts = [...headContent.matchAll(patterns.scripts)];
      if (inlineScripts.length > 0) {
        console.log('\nFound inline scripts:');
        inlineScripts.forEach((script, index) => {
          console.log(`\nScript ${index + 1}:`);
          console.log(script[1].trim());
        });
      }

      // Check external scripts
      const externalScripts = [...headContent.matchAll(patterns.externalScripts)];
      if (externalScripts.length > 0) {
        console.log('\nFound external scripts:');
        externalScripts.forEach(script => {
          console.log(script[1]);
        });
      }

      // Check meta refresh
      const metaRefresh = headContent.match(patterns.metaRefresh);
      if (metaRefresh) {
        console.log('\nFound meta refresh redirects:');
        console.log(metaRefresh[0]);
      }
    }
  } catch (err) {
    console.error(`Error processing ${filePath}:`, err);
  }
}

// Process the slope.html file
scanHeadSection('c:\\Users\\pc\\Pictures\\Screenshots\\test code\\best unblocked game\\games\\slope.html');