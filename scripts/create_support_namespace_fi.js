const fs = require('fs');

const rootFile = 'src/translations/fi.json';
const supportFile = 'src/translations/fi/support.json';

try {
    console.log('Reading fi.json...');
    const rootData = JSON.parse(fs.readFileSync(rootFile, 'utf8'));

    if (!rootData.support) {
        throw new Error('support key not found in fi.json!');
    }

    console.log('Found support object in root');

    // Extract support data
    const supportData = rootData.support;

    // Create UNIVERSAL structure (same as training)
    // Keys available BOTH at root and under 'support' wrapper
    const universalStructure = {
        ...supportData,      // Root-level keys (for t('hero.title') if namespace is loaded)
        support: supportData // Nested keys (for t('support.hero.title'))
    };

    // Ensure directory exists
    const dir = 'src/translations/fi';
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    // Save
    fs.writeFileSync(supportFile, JSON.stringify(universalStructure, null, 2), 'utf8');

    console.log('✅ Created fi/support.json with universal structure');
    console.log('Root keys:', Object.keys(supportData).length);

} catch (e) {
    console.error('❌ Failed:', e.message);
    process.exit(1);
}
