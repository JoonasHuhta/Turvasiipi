const fs = require('fs');

const files = [
    'src/translations/fi/lukutaito.json',
    'src/translations/en/lukutaito.json'
];

let hasError = false;

files.forEach(file => {
    try {
        const content = fs.readFileSync(file, 'utf8');
        const data = JSON.parse(content);

        // Check Self Assessment types
        const types = new Set();
        let qCount = 0;

        ['situation_data', 'culture_data'].forEach(section => {
            if (data.self_assessment?.[section]) {
                Object.values(data.self_assessment[section]).forEach(qs => {
                    qs.forEach(q => {
                        qCount++;
                        if (q.type) types.add(q.type);
                        else {
                            console.error(`❌ Missing type in ${file} question ${q.id}`);
                            hasError = true;
                        }
                    });
                });
            }
        });

        console.log(`✅ ${file}: Evaluated ${qCount} questions.`);
        console.log(`   Types found: ${Array.from(types).join(', ')}`);

        // Check Badge
        if (file.includes('en')) {
            const badge = data.header?.badge;
            console.log(`   EN Badge: "${badge}"`);
            if (badge !== 'WORK COMMUNITY STATUS') {
                console.warn(`⚠️ EN Badge mismatch: Expected "WORK COMMUNITY STATUS", found "${badge}"`);
            }
        }

    } catch (e) {
        console.error(`❌ Error parsing ${file}:`, e.message);
        hasError = true;
    }
});

if (!hasError) console.log('\n✨ All validations passed.');
else console.log('\n❌ Validation failed.');
