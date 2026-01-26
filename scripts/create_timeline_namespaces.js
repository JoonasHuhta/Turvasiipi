const fs = require('fs');

try {
    const fiRoot = JSON.parse(fs.readFileSync('src/translations/fi.json', 'utf8'));
    const enRoot = JSON.parse(fs.readFileSync('src/translations/en.json', 'utf8'));

    if (!fiRoot.timeline || !enRoot.timeline) {
        throw new Error('timeline not found in root files');
    }

    // FI Universal
    const fiData = fiRoot.timeline;
    const fiUniversal = {
        ...fiData,
        timeline: fiData
    };

    // EN Universal  
    const enData = enRoot.timeline;
    const enUniversal = {
        ...enData,
        timeline: enData
    };

    // Ensure directories
    ['src/translations/fi', 'src/translations/en'].forEach(dir => {
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    });

    // Save
    fs.writeFileSync('src/translations/fi/timeline.json', JSON.stringify(fiUniversal, null, 2), 'utf8');
    fs.writeFileSync('src/translations/en/timeline.json', JSON.stringify(enUniversal, null, 2), 'utf8');

    console.log('✅ Created fi/timeline.json');
    console.log('✅ Created en/timeline.json');

} catch (e) {
    console.error('❌ Failed:', e.message);
    process.exit(1);
}
