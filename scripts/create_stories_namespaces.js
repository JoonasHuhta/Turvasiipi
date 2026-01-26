const fs = require('fs');

try {
    const fiRoot = JSON.parse(fs.readFileSync('src/translations/fi.json', 'utf8'));
    const enRoot = JSON.parse(fs.readFileSync('src/translations/en.json', 'utf8'));

    if (!fiRoot.stories_page || !enRoot.stories_page) {
        throw new Error('stories_page not found in one of the root files');
    }

    // FI Universal
    const fiData = fiRoot.stories_page;
    const fiUniversal = {
        ...fiData,
        stories_page: fiData
    };

    // EN Universal  
    const enData = enRoot.stories_page;
    const enUniversal = {
        ...enData,
        stories_page: enData
    };

    // Ensure directories
    ['src/translations/fi', 'src/translations/en'].forEach(dir => {
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    });

    // Save
    fs.writeFileSync('src/translations/fi/stories.json', JSON.stringify(fiUniversal, null, 2), 'utf8');
    fs.writeFileSync('src/translations/en/stories.json', JSON.stringify(enUniversal, null, 2), 'utf8');

    console.log('✅ Created fi/stories.json');
    console.log('✅ Created en/stories.json');

} catch (e) {
    console.error('❌ Failed:', e.message);
    process.exit(1);
}
