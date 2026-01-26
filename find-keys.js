const fs = require('fs');

const content = fs.readFileSync('src/translations/fi.json', 'utf8');
const data = JSON.parse(content);

console.log('=== ROOT LEVEL KEYS ===');
const rootKeys = Object.keys(data);
console.log(`Total: ${rootKeys.length}`);
rootKeys.forEach(k => console.log(`  - ${k}`));

console.log('\n=== SEARCHING FOR MISSING KEYS ===');
const searchKeys = ['neuro_page', 'profile_page', 'tietovisa_page'];

function findKeyPath(obj, targetKey, path = []) {
    if (typeof obj !== 'object' || obj === null) return null;

    for (const [key, value] of Object.entries(obj)) {
        if (key === targetKey) {
            return [...path, key];
        }
        if (typeof value === 'object' && value !== null) {
            const found = findKeyPath(value, targetKey, [...path, key]);
            if (found) return found;
        }
    }
    return null;
}

searchKeys.forEach(searchKey => {
    const path = findKeyPath(data, searchKey);
    if (path) {
        console.log(`✓ Found "${searchKey}" at: ${path.join(' → ')}`);
    } else {
        console.log(`✗ NOT FOUND: "${searchKey}"`);
    }
});

console.log('\n=== CHECKING FOR DUPLICATE ROOT OBJECTS ===');
// Check if any root key contains these as children
searchKeys.forEach(searchKey => {
    rootKeys.forEach(rootKey => {
        if (data[rootKey] && typeof data[rootKey] === 'object') {
            if (data[rootKey][searchKey]) {
                console.log(`  "${searchKey}" found inside "${rootKey}"`);
            }
        }
    });
});
