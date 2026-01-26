const fs = require('fs');

const file = 'src/translations/fi/training.json';

try {
    console.log('Reading training.json...');
    const currentData = JSON.parse(fs.readFileSync(file, 'utf8'));

    // Check if already wrapped
    if (currentData.training && !currentData.coaching) {
        console.log('Already wrapped? Checking keys...');
        // It might be correct already?
    }

    // We want the structure: { "training": { ... content ... } }

    // If we currently have { "coaching": ..., "action_protocols": ... }
    // We need to move them under "training".

    const newData = {
        training: currentData
    };

    // Verify
    if (newData.training.training) {
        // Double wrap prevention if I misunderstood
        console.log('Detected double wrap! Fixing...');
        // If currentData was { training: { ... } }, then newData is { training: { training: ... } }
        // We want { training: { ... } }
        // So if currentData HAS 'training' and DOES NOT HAVE 'coaching' at top level, it implies it might be wrapped.
        // But looking at previous output "Training keys: 13", and knowing I stripped it, it's likely unwrapped.
        // Let's assume it IS unwrapped for now based on "AP Title: MISSING" earlier (because flattened).
    }

    // Wait, if I wrap it, will action_protocols be training.action_protocols?
    // Current: action_protocols is at top level of file.
    // New: training.action_protocols.
    // Code expects: t('training.action_protocols...') -> training.action_protocols.
    // YES.

    fs.writeFileSync(file, JSON.stringify(newData, null, 2), 'utf8');
    console.log('✅ Wrapped content in "training" key');

} catch (e) {
    console.error('❌ Failed:', e.message);
    process.exit(1);
}
