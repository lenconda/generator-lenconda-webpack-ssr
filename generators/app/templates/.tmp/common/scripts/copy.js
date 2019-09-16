const fs = require('fs-extra');
const path = require('path');

fs.copySync(path.join(__dirname, '../server'), path.join(__dirname, '../dist/server'));
fs.copySync(path.join(__dirname, '../package.json'), path.join(__dirname, '../dist/package.json'));
