const fs = require('fs');

const file = 'src/translations/fi/training.json';

try {
    console.log('Reading training.json...');
    let currentData = JSON.parse(fs.readFileSync(file, 'utf8'));

    // Ensure we have the base data (the inner content)
    let baseData = {};

    if (currentData.training) {
        // It is wrapped currently
        baseData = currentData.training;
    } else {
        // It is unwrapped
        baseData = currentData;
    }

    // Create the universal structure
    // 1. Root level keys (for t('coaching...'))
    // 2. 'training' key (for t('training.coaching...'))

    const universalData = {
        ...baseData,          // Unwrapped keys
        training: baseData    // Wrapped keys
    };

    // Integrity check
    if (!universalData.coaching || !universalData.training.coaching) {
        throw new Error('Missing coaching data in one of the structures');
    }

    // Encoding check
    if (JSON.stringify(universalData).includes('Ã')) {
        throw new Error('Corruption detected in final data');
    }

    fs.writeFileSync(file, JSON.stringify(universalData, null, 2), 'utf8');
    console.log('✅ Created Universal training.json');
    console.log('Root keys:', Object.keys(universalData).length);
    console.log('Has root coaching:', !!universalData.coaching);
    console.log('Has training.coaching:', !!universalData.training.coaching);

} catch (e) {
    console.error('❌ Failed:', e.message);
    process.exit(1);
}
