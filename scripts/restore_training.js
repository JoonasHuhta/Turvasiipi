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
    console.log('Reading root file...');
    const rootData = JSON.parse(fs.readFileSync(rootFile, 'utf8'));

    // Start with whatever was in root.training OR empty
    let trainingData = rootData.training || {};

    // 1. FIX COACHING (HUB)
    if (!trainingData.coaching) {
        console.log('Searching for coaching...');
        const candidates = findAllKeys(rootData, 'coaching');
        // Look for one with 'hub'
        const best = candidates.find(c => c && c.hub);
        if (best) {
            console.log('✅ Found FULL coaching content');
            trainingData.coaching = best;
        } else {
            console.warn('❌ Could not find coaching with "hub"');
        }
    }

    // 2. FIX ACTION PROTOCOLS
    if (!trainingData.action_protocols || !trainingData.action_protocols.tabs) {
        console.log('Searching for action_protocols...');
        const candidates = findAllKeys(rootData, 'action_protocols');
        const best = candidates.find(c => c && c.tabs);
        if (best) {
            console.log('✅ Found FULL action_protocols content');
            trainingData.action_protocols = best;
        }
    }

    // 3. FIX DIFFICULT CONVERSATIONS
    if (!trainingData.difficult_conversations || !trainingData.difficult_conversations.opponents) {
        console.log('Searching for difficult_conversations...');
        const candidates = findAllKeys(rootData, 'difficult_conversations');
        const best = candidates.find(c => c && (c.opponents || c.ui));
        if (best) {
            console.log('✅ Found FULL difficult_conversations content');
            trainingData.difficult_conversations = best;
        }
    }

    // 4. WRAP IN 'training' KEY
    // Essential for proper namespace loading
    const finalStructure = {
        training: trainingData
    };

    // Verify
    if (JSON.stringify(finalStructure).includes('Ã')) {
        throw new Error('Extracted data contains corruption!');
    }

    fs.writeFileSync(trainingFile, JSON.stringify(finalStructure, null, 2), 'utf8');
    console.log('✅ Saved final training.json (Wrapped & Complete)');
    console.log('Keys:', Object.keys(trainingData).length);

} catch (e) {
    console.error('❌ Failed:', e.message);
    process.exit(1);
}
