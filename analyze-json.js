const fs = require('fs');
const content = fs.readFileSync('src/translations/fi.json', 'utf8');
const data = JSON.parse(content);

const sizes = [];
let totalSize = 0;

Object.keys(data).forEach(key => {
    const json = JSON.stringify(data[key]);
    const size = json.length;
    totalSize += size;
    sizes.push({ key, size });
});

sizes.sort((a, b) => b.size - a.size);

console.log(`Total Size: ${(totalSize / 1024).toFixed(2)} KB`);
console.log('--- Top Keys by Size ---');
sizes.forEach(item => {
    const kb = (item.size / 1024).toFixed(2);
    const pct = ((item.size / totalSize) * 100).toFixed(1);
    console.log(`${item.key}: ${kb} KB (${pct}%)`);
});
