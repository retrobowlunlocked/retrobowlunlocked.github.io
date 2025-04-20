const fs = require('fs');
const path = require('path');

const oldAdsCode = `<div class="sc-tbf0fc-0 gKdPGs sc-al88rd-8 jLkOBn">
                  <div width="728" height="90" class="sc-tbf0fc-1 joJxfp">
                    <div style="height: 90px; width: 728px; overflow: hidden;" class="sc-tbf0fc-3 jzKgDP">
                      <div style="height: 90px; width: 728px; overflow: hidden;">
                        <!-- eggy_car_list --><ins class="adsbygoogle"
                         style="display:inline-block;width:728px;height:90px"
                         data-ad-client="ca-pub-7889675448259925"
                         data-ad-slot="2426240798"></ins>
                      </div>
                    </div>
                    <div width="728" height="90" class="sc-tbf0fc-2 flYexE"></div>
                  </div>
                </div>
                <div class="sc-tbf0fc-0 gKdPGs sc-al88rd-9 kBFpxV">
                  <div width="300" height="250" class="sc-tbf0fc-1 iZddyZ">
                    <div style="height: 250px; width: 300px; overflow: hidden;" class="sc-tbf0fc-3 jzKgDP">
                      <div style="height: 250px; width: 300px; overflow: hidden;">
                        <!-- eggy_car -->
                        <ins class="adsbygoogle"
                             style="display:inline-block;width:300px;height:250px"
                             data-ad-client="ca-pub-7889675448259925"
                             data-ad-slot="8608505768"></ins>
                      </div>
                    </div>
                   
            <div style="display: contents;">
              <div class="sc-1ri0y0w-6 jfAzpO">
                <div style="background-color: var(--green-7);" class="sc-1ri0y0w-7 lgEayX">
                  <div decoding="async" class="sc-1ri0y0w-2 mvtOn"></div>
                </div>
              </div>
            </div>
          </div>
        
      </div>
      <!-- end hero -->`;

const newAdsCode = `<!-- FINAL ADS CODE HEE-->`;

function replaceInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    if(content.includes(oldAdsCode)) {
      content = content.replace(oldAdsCode, newAdsCode);
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated ads in: ${filePath}`);
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
    if (stat.isDirectory() && !file.startsWith('.')) {
      walkDir(filePath);
    } else if (stat.isFile() && file.endsWith('.html')) {
      replaceInFile(filePath);
    }
  });
}

// Start processing from current directory
walkDir('.');
console.log('Ad code replacement complete');