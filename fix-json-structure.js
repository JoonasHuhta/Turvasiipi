const fs = require('fs');

console.log('Loading fi.json...');
const data = JSON.parse(fs.readFileSync('src/translations/fi.json', 'utf8'));

console.log('Checking quiz structure...');
const quizKeys = Object.keys(data.quiz || {});
console.log(`Keys inside quiz (${quizKeys.length}):`, quizKeys.join(', '));

// Keys that should be at root level, not inside quiz
const keysToMove = [
    'tactics_page',
    'tactic_categories',
    'tactics',
    'neuro_page',
    'profile_page',
    'tietovisa_page',
    'impact_profile',
    'badges',
    'stories_page',
    'log_tool',
    'guide',
    'timeline',
    'report',
    'organization_resources',
    'gaslighting_mechanisms',
    'bystander_theory',
    'difficult_conversations',
    'ostracism_toolkit'
];

console.log('\nMoving keys from quiz to root...');
let moved = 0;
keysToMove.forEach(key => {
    if (data.quiz && data.quiz[key]) {
        console.log(`  Moving: ${key}`);
        data[key] = data.quiz[key];
        delete data.quiz[key];
        moved++;
    }
});

console.log(`\nMoved ${moved} keys to root level`);

const newQuizKeys = Object.keys(data.quiz);
console.log(`Remaining in quiz (${newQuizKeys.length}):`, newQuizKeys.join(', '));

console.log('\nWriting fixed fi.json...');
fs.writeFileSync('src/translations/fi.json', JSON.stringify(data, null, 4), 'utf8');

console.log('✓ Done! Verifying...');
const verify = JSON.parse(fs.readFileSync('src/translations/fi.json', 'utf8'));
console.log('  neuro_page at root:', !!verify.neuro_page);
console.log('  profile_page at root:', !!verify.profile_page);
console.log('  tietovisa_page at root:', !!verify.tietovisa_page);
console.log('  quiz.page still exists:', !!verify.quiz?.page);
