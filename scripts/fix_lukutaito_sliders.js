const fs = require('fs');

const files = [
    'src/translations/fi/lukutaito.json',
    'src/translations/en/lukutaito.json'
];

files.forEach(file => {
    try {
        const data = JSON.parse(fs.readFileSync(file, 'utf8'));
        let modified = false;

        // Fix self_assessment.situation_data
        if (data.self_assessment?.situation_data) {
            Object.keys(data.self_assessment.situation_data).forEach(category => {
                data.self_assessment.situation_data[category] = data.self_assessment.situation_data[category].map(q => {
                    if (!q.type) {
                        modified = true;
                        return { ...q, type: 'slider' };
                    }
                    return q;
                });
            });
        }

        // Fix self_assessment.culture_data
        if (data.self_assessment?.culture_data) {
            Object.keys(data.self_assessment.culture_data).forEach(category => {
                data.self_assessment.culture_data[category] = data.self_assessment.culture_data[category].map(q => {
                    if (!q.type) {
                        modified = true;
                        return { ...q, type: 'slider' };
                    }
                    return q;
                });
            });
        }

        if (modified) {
            fs.writeFileSync(file, JSON.stringify(data, null, 4), 'utf8');
            console.log(`✅ Fixed missing types in ${file}`);
        } else {
            console.log(`👌 No changes needed for ${file}`);
        }

    } catch (e) {
        console.error(`❌ Error processing ${file}:`, e.message);
    }
});
