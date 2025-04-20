const fs = require('fs');
const path = require('path');

function replaceAdCode(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Define the old and new ad code
    const oldAdCode = '<!-- FINAL ADS CODE HEE-->';
    const newAdCode = `<div class="sc-tbf0fc-0 gKdPGs sc-al88rd-8 jLkOBn">
  <div width="728" height="90" class="sc-tbf0fc-1 joJxfp">
    <div style="height: 90px; width: 728px; overflow: hidden;" class="sc-tbf0fc-3 jzKgDP">
      <div style="height: 90px; width: 728px; overflow: hidden;">
        <!-- eggy_car_list -->
        <script type="text/javascript">
          atOptions = {
            'key' : '6688a69341c949d5c7e8a40d3e7c5327',
            'format' : 'iframe',
            'height' : 90,
            'width' : 728,
            'params' : {}
          };
        </script>
        <script type="text/javascript" src="//rodesquad.com/6688a69341c949d5c7e8a40d3e7c5327/invoke.js"></script>
      </div>
    </div>
    <div width="728" height="90" class="sc-tbf0fc-2 flYexE">Advertisement</div>
  </div>
</div>
<div class="sc-tbf0fc-0 gKdPGs sc-al88rd-9 kBFpxV">
  <div width="300" height="250" class="sc-tbf0fc-1 iZddyZ">
    <div style="height: 250px; width: 300px; overflow: hidden;" class="sc-tbf0fc-3 jzKgDP">
      <div style="height: 250px; width: 300px; overflow: hidden;">
        <!-- eggy_car -->
        <script type="text/javascript">
          atOptions = {
            'key' : '056d7dd960a7a1491ff216f3492253dd',
            'format' : 'iframe',
            'height' : 250,
            'width' : 300,
            'params' : {}
          };
        </script>
        <script type="text/javascript" src="//rodesquad.com/056d7dd960a7a1491ff216f3492253dd/invoke.js"></script>
      </div>
    </div>
    <div width="300" height="250" class="sc-tbf0fc-2 jtzqHS">Advertisement</div>
  </div>
</div>


<div class="sc-tbf0fc-0 gKdPGs sc-al88rd-10 jqewXp">
  <div width="160" height="600" class="sc-tbf0fc-1 iZddyZ">
    <div style="height: 600px; width: 160px; overflow: hidden;" class="sc-tbf0fc-3 jzKgDP">
      <div style="height: 600px; width: 160px; overflow: hidden;">
<!-- Eggy 160 600 -->
<script type="text/javascript">
  atOptions = {
    'key' : '60e12183ed439f82d0c202d0b1f46c62',
    'format' : 'iframe',
    'height' : 600,
    'width' : 160,
    'params' : {}
  };
</script>
<script type="text/javascript" src="//rodesquad.com/60e12183ed439f82d0c202d0b1f46c62/invoke.js"></script>
</div>
    </div>
    <div width="160" height="600" class="sc-tbf0fc-2 jtzqHS">Advertisement</div>
  </div>
</div>
</div>
<div style="display: contents;">
<article class="npmo3Vk8vdpOrUnRlo4K"><header style="">
  <!-- ARTICAL GOES HERE-->
                </article>
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
<!-- end hero -->
</main>`;

    // Only replace if the old code exists
    if(content.includes(oldAdCode)) {
      content = content.replace(oldAdCode, newAdCode);
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
    } else if (file.endsWith('.html')) {
      replaceAdCode(filePath);
    }
  });
}

// Start processing from the games directory
walkDir('c:\\Users\\pc\\Pictures\\Screenshots\\test code\\best unblocked game\\games');
console.log('Ad code replacement complete!');