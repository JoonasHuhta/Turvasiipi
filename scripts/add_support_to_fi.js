const fs = require('fs');

const enFile = 'src/translations/en.json';
const fiFile = 'src/translations/fi.json';

try {
    console.log('Reading translation files...');
    const enData = JSON.parse(fs.readFileSync(enFile, 'utf8'));
    const fiData = JSON.parse(fs.readFileSync(fiFile, 'utf8'));

    // Check if support exists in EN
    if (!enData.support) {
        throw new Error('support key missing from en.json!');
    }

    console.log('Found support in EN');

    // Add support to FI (keeping EN version for now, will translate manually or later)
    fiData.support = enData.support;

    // Save updated FI file
    fs.writeFileSync(fiFile, JSON.stringify(fiData, null, 4), 'utf8');
    console.log('✅ Added support translations to fi.json');
    console.log('Note: Translations are currently in English. Please translate to Finnish.');

} catch (e) {
    console.error('❌ Failed:', e.message);
    process.exit(1);
}
