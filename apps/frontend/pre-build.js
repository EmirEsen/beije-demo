const fs = require('fs');
const path = require('path');

// Copy shared package to frontend node_modules
const sharedPath = path.join(__dirname, '../../shared');
const targetPath = path.join(__dirname, 'node_modules/@beije/shared');

// Create target directory if it doesn't exist
if (!fs.existsSync(path.dirname(targetPath))) {
    fs.mkdirSync(path.dirname(targetPath), { recursive: true });
}

// Copy shared package
fs.cpSync(sharedPath, targetPath, { recursive: true });

console.log('Shared package copied successfully');