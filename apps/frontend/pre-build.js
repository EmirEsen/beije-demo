const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('Starting pre-build process...');

try {
    // First, build the shared package
    console.log('Building shared package...');
    execSync('cd ../../shared && npm run build', { stdio: 'inherit' });

    // Copy shared package to frontend node_modules
    const sharedPath = path.join(__dirname, '../../shared');
    const targetPath = path.join(__dirname, 'node_modules/@beije/shared');

    console.log('Copying shared package...');

    // Create target directory if it doesn't exist
    if (!fs.existsSync(path.dirname(targetPath))) {
        fs.mkdirSync(path.dirname(targetPath), { recursive: true });
    }

    // Copy shared package
    if (fs.existsSync(sharedPath)) {
        fs.cpSync(sharedPath, targetPath, { recursive: true });
        console.log('Shared package copied successfully');
    } else {
        console.error('Shared package not found at:', sharedPath);
        process.exit(1);
    }
} catch (error) {
    console.error('Pre-build failed:', error.message);
    process.exit(1);
}