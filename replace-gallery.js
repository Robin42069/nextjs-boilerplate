const fs = require('fs');
const path = require('path');

const galleryDir = path.join(__dirname, 'public', 'gallery');
const optimizedDir = path.join(__dirname, 'public', 'gallery-optimized');
const backupDir = path.join(__dirname, 'public', 'gallery-backup');

// Create backup
if (!fs.existsSync(backupDir)) {
  console.log('Creating backup...');
  fs.mkdirSync(backupDir, { recursive: true });
  const files = fs.readdirSync(galleryDir);
  files.forEach(file => {
    fs.copyFileSync(
      path.join(galleryDir, file),
      path.join(backupDir, file)
    );
  });
  console.log('✓ Backup created in public/gallery-backup/');
}

// Delete old images
console.log('\nRemoving old images...');
const oldFiles = fs.readdirSync(galleryDir);
oldFiles.forEach(file => {
  fs.unlinkSync(path.join(galleryDir, file));
});

// Move optimized images
console.log('Moving optimized images...');
const optimizedFiles = fs.readdirSync(optimizedDir);
optimizedFiles.forEach(file => {
  fs.renameSync(
    path.join(optimizedDir, file),
    path.join(galleryDir, file)
  );
});

// Remove optimized directory
fs.rmdirSync(optimizedDir);

console.log('✓ Gallery images replaced with optimized versions!');
console.log('\nOriginal images backed up to: public/gallery-backup/');

// Calculate new size
const totalSize = fs.readdirSync(galleryDir)
  .reduce((sum, file) => sum + fs.statSync(path.join(galleryDir, file)).size, 0) / 1024 / 1024;

console.log(`New gallery size: ${totalSize.toFixed(2)} MB`);
