const fs = require('fs');

const content = fs.readFileSync('src/translations/fi.json', 'utf8');
const lines = content.split('\n');

// Find all top-level keys (no leading spaces before quote)
const topLevelKeys = [];
lines.forEach((line, index) => {
    const match = line.match(/^"([^"]+)":\s*\{/);
    if (match) {
        topLevelKeys.push({ key: match[1], line: index + 1 });
    }
});

console.log('Top-level keys found:', topLevelKeys.length);
console.log('\nAll top-level keys:');
topLevelKeys.forEach(k => console.log(`  Line ${k.line}: "${k.key}"`));

// Find duplicates
const seen = {};
const duplicates = [];
topLevelKeys.forEach(k => {
    if (seen[k.key]) {
        duplicates.push({ key: k.key, first: seen[k.key], second: k.line });
    } else {
        seen[k.key] = k.line;
    }
});

if (duplicates.length > 0) {
    console.log('\n❌ DUPLICATES FOUND:');
    duplicates.forEach(d => {
        console.log(`  "${d.key}" appears at lines ${d.first} and ${d.second}`);
    });
} else {
    console.log('\n✓ No duplicates at top level');
}

// Try to parse and see what's accessible
try {
    const data = JSON.parse(content);
    const keys = Object.keys(data);
    console.log('\n✓ JSON parses successfully');
    console.log(`Accessible keys (${keys.length}):`, keys.slice(0, 10).join(', '), '...');

    // Check specific keys
    console.log('\nKey checks:');
    console.log('  neuro_page exists:', !!data.neuro_page);
    console.log('  quiz exists:', !!data.quiz);
    console.log('  profile_page exists:', !!data.profile_page);
    console.log('  tietovisa_page exists:', !!data.tietovisa_page);
} catch (e) {
    console.error('\n✗ JSON parse error:', e.message);
}
