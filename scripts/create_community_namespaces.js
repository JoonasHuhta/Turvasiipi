const fs = require('fs');

// FI
try {
    const fiRoot = JSON.parse(fs.readFileSync('src/translations/fi.json', 'utf8'));
    const enRoot = JSON.parse(fs.readFileSync('src/translations/en.json', 'utf8'));

    if (!enRoot.community_page) {
        throw new Error('community_page not found in en.json');
    }

    // Copy EN to FI (since FI is missing it)
    const communityData = enRoot.community_page;

    // Universal structure for FI
    const fiUniversal = {
        ...communityData,
        community_page: communityData
    };

    // Universal structure for EN
    const enUniversal = {
        ...communityData,
        community_page: communityData
    };

    // Ensure directories exist
    ['src/translations/fi', 'src/translations/en'].forEach(dir => {
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    });

    // Save
    fs.writeFileSync('src/translations/fi/community.json', JSON.stringify(fiUniversal, null, 2), 'utf8');
    fs.writeFileSync('src/translations/en/community.json', JSON.stringify(enUniversal, null, 2), 'utf8');

    console.log('✅ Created fi/community.json (copied from EN)');
    console.log('✅ Created en/community.json');
    console.log('Note: FI translations are currently in English - needs manual translation');

} catch (e) {
    console.error('❌ Failed:', e.message);
    process.exit(1);
}
