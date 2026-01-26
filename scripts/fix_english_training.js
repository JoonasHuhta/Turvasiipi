const fs = require('fs');

const file = 'src/translations/en/training.json';

try {
    console.log('Reading en/training.json...');
    let currentData = JSON.parse(fs.readFileSync(file, 'utf8'));

    // Ensure we have the base data
    let baseData = {};

    if (currentData.training) {
        baseData = currentData.training;
    } else {
        baseData = currentData;
    }

    // Universal structure
    const universalData = {
        ...baseData,
        training: baseData
    };

    // Verify
    if (!universalData.coaching || !universalData.training.coaching) {
        throw new Error('Structure check failed');
    }

    fs.writeFileSync(file, JSON.stringify(universalData, null, 2), 'utf8');
    console.log('✅ Fixed English training.json structure');

} catch (e) {
    console.error('❌ Failed:', e.message);
    process.exit(1);
}
