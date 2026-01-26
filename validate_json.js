const fs = require('fs');

function checkFile(path) {
    console.log(`Checking ${path}...`);
    try {
        const content = fs.readFileSync(path, 'utf8');
        // Parse JSON to check syntax
        JSON.parse(content);
        console.log("JSON Syntax: OLD");

        // Custom check for duplicates
        // Basic regex check for "tietovisa_page"
        const regex = /"tietovisa_page"/g;
        const matches = content.match(regex);
        console.log(`"tietovisa_page" occurrences: ${matches ? matches.length : 0}`);

        // Check for specific keys
        if (content.includes('"interrupt": "Keskeytä"')) console.log("Found 'Keskeytä' correctly.");
        else console.log("MISSING 'Keskeytä'!");

    } catch (e) {
        console.error("JSON Error:", e.message);
    }
}

checkFile('src/translations/fi.json');
checkFile('src/translations/en.json');
