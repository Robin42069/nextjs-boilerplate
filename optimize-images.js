const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const galleryDir = path.join(__dirname, 'public', 'gallery');
const optimizedDir = path.join(__dirname, 'public', 'gallery-optimized');

// Create optimized directory if it doesn't exist
if (!fs.existsSync(optimizedDir)) {
  fs.mkdirSync(optimizedDir, { recursive: true });
}

async function optimizeImages() {
  const files = fs.readdirSync(galleryDir);
  const imageFiles = files.filter(file => /\.(png|jpg|jpeg)$/i.test(file));

  console.log(`Found ${imageFiles.length} images to optimize...`);

  for (const file of imageFiles) {
    const inputPath = path.join(galleryDir, file);
    const outputPath = path.join(optimizedDir, file.replace('.png', '.jpg'));

    try {
      await sharp(inputPath)
        .resize(2000, 2000, { // Max dimensions
          fit: 'inside',
          withoutEnlargement: true
        })
        .jpeg({ quality: 85 }) // Convert to JPEG with 85% quality
        .toFile(outputPath);

      const originalSize = fs.statSync(inputPath).size / 1024 / 1024;
      const optimizedSize = fs.statSync(outputPath).size / 1024 / 1024;
      
      console.log(`✓ ${file}: ${originalSize.toFixed(2)}MB → ${optimizedSize.toFixed(2)}MB (${((1 - optimizedSize/originalSize) * 100).toFixed(1)}% reduction)`);
    } catch (error) {
      console.error(`✗ Error processing ${file}:`, error.message);
    }
  }

  console.log('\nOptimization complete! Review the optimized images in public/gallery-optimized/');
  console.log('If satisfied, run: node replace-gallery.js');
}

optimizeImages();
