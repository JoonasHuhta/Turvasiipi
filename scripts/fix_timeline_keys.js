const fs = require('fs');

const fiFile = 'src/translations/fi/timeline.json';
const enFile = 'src/translations/en/timeline.json';

try {
    // Read existing
    const fiData = JSON.parse(fs.readFileSync(fiFile, 'utf8'));
    const enData = JSON.parse(fs.readFileSync(enFile, 'utf8'));

    // Add missing keys to FI
    if (!fiData.page.entry_count) {
        fiData.page.entry_count = "{{count}} merkintää";
        fiData.timeline.page.entry_count = "{{count}} merkintää";
    }

    if (!fiData.list) {
        fiData.list = {
            witnesses_prefix: "Todistajat:",
            no_witnesses: "Ei todistajia"
        };
        fiData.timeline.list = {
            witnesses_prefix: "Todistajat:",
            no_witnesses: "Ei todistajia"
        };
    }

    // Add missing keys to EN
    if (!enData.page.entry_count) {
        enData.page.entry_count = "{{count}} entries";
        enData.timeline.page.entry_count = "{{count}} entries";
    }

    if (!enData.list) {
        enData.list = {
            witnesses_prefix: "Witnesses:",
            no_witnesses: "No witnesses"
        };
        enData.timeline.list = {
            witnesses_prefix: "Witnesses:",
            no_witnesses: "No witnesses"
        };
    }

    // Save
    fs.writeFileSync(fiFile, JSON.stringify(fiData, null, 2), 'utf8');
    fs.writeFileSync(enFile, JSON.stringify(enData, null, 2), 'utf8');

    console.log('✅ Added missing timeline translation keys');
    console.log('   - page.entry_count');
    console.log('   - list.witnesses_prefix');
    console.log('   - list.no_witnesses');

} catch (e) {
    console.error('❌ Failed:', e.message);
    process.exit(1);
}
