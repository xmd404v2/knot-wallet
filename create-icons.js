const fs = require('fs');
const path = require('path');

// Create the static directory if it doesn't exist
const staticDir = path.join(__dirname, 'src', 'static');
if (!fs.existsSync(staticDir)) {
  fs.mkdirSync(staticDir, { recursive: true });
}

// Simple Base64 encoded 1x1 pixel PNG (black)
const blackPixelBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAEtAJJXF3J5QAAAABJRU5ErkJggg==';

// Function to write a placeholder icon file
function createIcon(size) {
  const iconPath = path.join(staticDir, `icon${size}.png`);
  const buffer = Buffer.from(blackPixelBase64, 'base64');
  fs.writeFileSync(iconPath, buffer);
  console.log(`Created placeholder for ${iconPath}`);
}

// Create all required sizes
createIcon(16);
createIcon(48);
createIcon(128);

console.log('Icon placeholders created. Replace these with your actual logo.');
console.log('To add your custom logo:');
console.log('1. Create PNG images in sizes: 16x16, 48x48, and 128x128');
console.log('2. Name them icon16.png, icon48.png, and icon128.png');
console.log('3. Place them in the src/static directory'); 