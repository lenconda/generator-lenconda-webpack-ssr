const fs = require('fs-extra');

function cleanDevProduction() {
  fs.removeSync('dev');
}

function cleanDistProduction() {
  fs.removeSync('dist');
}

switch (process.argv[2]) {
case 'dev':
  cleanDevProduction();
  process.exit(0);
  break;
case 'prod':
  cleanDistProduction();
  process.exit(0);
  break;
default:
  console.log('Invalid argument: ' + process.argv[2]);
  process.exit(1);
  break;
}
