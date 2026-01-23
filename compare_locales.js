const fs = require('fs');
const path = require('path');

const fiPath = path.join(process.cwd(), 'src', 'translations', 'fi.json');
const enPath = path.join(process.cwd(), 'src', 'translations', 'en.json');

try {
    const fi = JSON.parse(fs.readFileSync(fiPath, 'utf8'));
    const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));

    function getKeys(obj, prefix = '') {
        let keys = [];
        for (const key in obj) {
            if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
                keys = keys.concat(getKeys(obj[key], prefix + key + '.'));
            } else {
                keys.push(prefix + key);
            }
        }
        return keys;
    }

    const fiKeys = new Set(getKeys(fi));
    const enKeys = new Set(getKeys(en));

    const missingInEn = [...fiKeys].filter(k => !enKeys.has(k));
    const missingInFi = [...enKeys].filter(k => !fiKeys.has(k));

    console.log('--- Missing in English (en.json) ---');
    console.log(missingInEn.length > 0 ? missingInEn.join('\n') : 'None');
    console.log('\n--- Missing in Finnish (fi.json) ---');
    console.log(missingInFi.length > 0 ? missingInFi.join('\n') : 'None');

} catch (error) {
    console.error('Error reading or parsing files:', error);
}
