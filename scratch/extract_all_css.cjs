const fs = require('fs');
const path = require('path');

const srcDir = path.resolve('../landing-page-wagner 2/landing-page-wagner');
const targetCSS = path.resolve('./landing.css');

const files = [
  'riberfood-funcionalidades.html',
  'riberfood-calcule.html',
  'riberfood-planos.html'
];

let appendedCSS = '';

for (const file of files) {
  const content = fs.readFileSync(path.join(srcDir, file), 'utf8');
  const styleMatch = content.match(/<style>([\s\S]*?)<\/style>/);
  if (styleMatch && styleMatch[1]) {
    appendedCSS += `\n\n/* --- CSS from ${file} --- */\n` + styleMatch[1];
  }
}

fs.appendFileSync(targetCSS, appendedCSS);
console.log('Appended CSS successfully.');
