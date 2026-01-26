const fs = require('fs');
const path = require('path');

const langs = ['fi', 'en'];
const modules = ['quiz', 'tactics', 'training'];

langs.forEach(lang => {
    const filePath = `src/translations/${lang}.json`;
    if (!fs.existsSync(filePath)) return;

    console.log(`Processing ${lang}...`);
    const content = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(content);
    const common = { ...data };

    modules.forEach(mod => {
        if (data[mod]) {
            console.log(`  Extracting ${mod}...`);
            const modData = data[mod];
            fs.writeFileSync(`src/translations/${lang}/${mod}.json`, JSON.stringify(modData, null, 4), 'utf8');
            delete common[mod];
        } else {
            // Create empty file if module missing in language (e.g. en)
            fs.writeFileSync(`src/translations/${lang}/${mod}.json`, JSON.stringify({}, null, 4), 'utf8');
        }
    });

    console.log(`  Writing updated common file...`);
    fs.writeFileSync(`src/translations/${lang}/common.json`, JSON.stringify(common, null, 4), 'utf8');
});

console.log('Done!');
