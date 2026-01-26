const fs = require('fs');

const rootFile = 'src/translations/fi.json';
const trainingFile = 'src/translations/fi/training.json';

// Find all matches for a key
function findAllKeys(obj, keyToFind, results = []) {
    if (obj && typeof obj === 'object') {
        if (obj.hasOwnProperty(keyToFind)) {
            results.push(obj[keyToFind]);
        }
        for (let k in obj) {
            findAllKeys(obj[k], keyToFind, results);
        }
    }
    return results;
}

try {
    console.log('Reading root fi.json...');
    const rootData = JSON.parse(fs.readFileSync(rootFile, 'utf8'));

    // Start with base training data
    let trainingData = rootData.training || {};
    console.log('Base training keys:', Object.keys(trainingData).length);

    // FIX COACHING (if missing or incomplete)
    if (!trainingData.coaching || !trainingData.coaching.hub) {
        console.log('Searching for coaching...');
        const candidates = findAllKeys(rootData, 'coaching');
        const best = candidates.find(c => c && c.hub);
        if (best) {
            console.log('✅ Found FULL coaching content');
            trainingData.coaching = best;
        }
    }

    // FIX ACTION PROTOCOLS
    if (!trainingData.action_protocols || !trainingData.action_protocols.tabs) {
        console.log('Searching for action_protocols...');
        const candidates = findAllKeys(rootData, 'action_protocols');
        const best = candidates.find(c => c && c.tabs);
        if (best) {
            console.log('✅ Found FULL action_protocols content');
            trainingData.action_protocols = best;
        }
    }

    // FIX DIFFICULT CONVERSATIONS
    if (!trainingData.difficult_conversations || !trainingData.difficult_conversations.opponents) {
        console.log('Searching for difficult_conversations...');
        const candidates = findAllKeys(rootData, 'difficult_conversations');
        const best = candidates.find(c => c && (c.opponents || c.ui));
        if (best) {
            console.log('✅ Found FULL difficult_conversations content');
            trainingData.difficult_conversations = best;
        }
    }

    // ADD INTERACTIVE MODULES
    const interactiveModules = [
        { key: 'moral_labyrinth', checkProp: 'steps' },
        { key: 'association_simulation', checkProp: 'ui' },
        { key: 'somatic_release', checkProp: 'title' },
        { key: 'trauma_brain', checkProp: 'intro' }
    ];

    for (const mod of interactiveModules) {
        if (!trainingData[mod.key] || !trainingData[mod.key][mod.checkProp]) {
            const candidates = findAllKeys(rootData, mod.key);
            const best = candidates.find(c => c && c[mod.checkProp]);
            if (best) {
                trainingData[mod.key] = best;
                console.log(`✅ Added ${mod.key}`);
            }
        }
    }

    // ADD OTHER MODULES that might be missing
    const moduleKeys = [
        'ostracism_toolkit', 'bystander_effect', 'pluralistic_ignorance',
        'gaslighting_mechanisms', 'ostrakismi_toolkit', 'recovery_main',
        'somatic', 'dmn', 'mindfulness', 'path_12_week',
        'boundaries', 'identity', 'empathy', 'bystander', 'labyrinth',
        'org_knowledge', 'culture_thermometer', 'empathy_audit',
        'org_cost_calculator', 'manager', 'hr', 'b2b', 'association_basics',
        'hobby_boundaries', 'cert_view', 'download'
    ];

    for (const key of moduleKeys) {
        if (!trainingData[key]) {
            const candidates = findAllKeys(rootData, key);
            if (candidates.length > 0) {
                // Take the most complete one (longest JSON string)
                const best = candidates.sort((a, b) =>
                    JSON.stringify(b).length - JSON.stringify(a).length
                )[0];
                if (best && typeof best === 'object') {
                    trainingData[key] = best;
                    console.log(`✅ Added ${key}`);
                }
            }
        }
    }

    // Create universal structure 
    const finalStructure = {
        ...trainingData,
        training: trainingData
    };

    // Final verification
    if (!finalStructure.coaching || !finalStructure.training.coaching) {
        throw new Error('coaching still missing after restoration!');
    }

    // Encoding check
    const jsonStr = JSON.stringify(finalStructure);
    if (jsonStr.includes('Ã')) {
        console.warn('⚠️ Warning: Some encoding issues detected in source data');
    }

    fs.writeFileSync(trainingFile, JSON.stringify(finalStructure, null, 2), 'utf8');
    console.log('✅ Saved complete Finnish training.json');
    console.log('Total keys:', Object.keys(trainingData).length);

} catch (e) {
    console.error('❌ Failed:', e.message);
    process.exit(1);
}
