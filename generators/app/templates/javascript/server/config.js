const env = process.env.NODE_ENV || 'development';
const isProduction = env.toLowerCase() === 'production';
const isDev = env.toLowerCase() === 'development';
const isTest = env.toLowerCase() === 'test';
const packageJson = require('../package.json');

const config = {
  env: env,
  isProduction,
  isDev,
  isTest,
  productName: packageJson.name,
};

module.exports = config;
