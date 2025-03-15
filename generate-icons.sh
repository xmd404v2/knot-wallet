#!/bin/bash

# This script generates placeholder icons for the Chrome extension
# You can replace these with your actual logo later

echo "Generating placeholder icons..."

# Function to create a simple SVG with a letter
create_svg() {
    local size=$1
    local letter="K"
    
    cat > temp.svg << EOF
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="black"/>
  <text x="50%" y="50%" font-family="Rajdhani, sans-serif" font-size="${size/2}" 
        fill="white" text-anchor="middle" dominant-baseline="middle">${letter}</text>
</svg>
EOF
}

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "ImageMagick is required to generate icons."
    echo "Please install it using your package manager."
    echo "For example: brew install imagemagick"
    exit 1
fi

# Create SVG and convert to PNG for each size
for size in 16 48 128; do
    create_svg $size
    convert temp.svg src/static/icon${size}.png
    echo "Created icon${size}.png"
done

# Clean up
rm temp.svg

echo "Icon generation complete!" 