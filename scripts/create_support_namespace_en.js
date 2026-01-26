const fs = require('fs');

const rootFile = 'src/translations/en.json';
const supportFile = 'src/translations/en/support.json';

try {
    console.log('Reading en.json...');
    const rootData = JSON.parse(fs.readFileSync(rootFile, 'utf8'));

    if (!rootData.support) {
        throw new Error('support key not found in en.json!');
    }

    console.log('Found support object in root');

    // Extract support data
    const supportData = rootData.support;

    // Create UNIVERSAL structure (same as training)
    const universalStructure = {
        ...supportData,
        support: supportData
    };

    // Ensure directory exists
    const dir = 'src/translations/en';
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    // Save
    fs.writeFileSync(supportFile, JSON.stringify(universalStructure, null, 2), 'utf8');

    console.log('✅ Created en/support.json with universal structure');
    console.log('Root keys:', Object.keys(supportData).length);

} catch (e) {
    console.error('❌ Failed:', e.message);
    process.exit(1);
}
