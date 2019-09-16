const packageJson = require('../../package.json');

module.exports = {
  name: packageJson.name,
  isDev: process.env.NODE_ENV.toLowerCase() === 'development',
  isProduction: process.env.NODE_ENV.toLowerCase() === 'production',
  isTest: process.env.NODE_ENV.toLowerCase() === 'test',
  analyze: process.env.WEBPACK_ANALYZE ? process.env.WEBPACK_ANALYZE.toLowerCase() === 'true' : false
};
