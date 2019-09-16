const env = process.env.NODE_ENV || 'development';
const isProduction = env.toLowerCase() === 'production';
const isDev = env.toLowerCase() === 'development';
const isTest = env.toLowerCase() === 'test';
import packageJson from '../package.json';

const config = {
  env: env,
  isProduction,
  isDev,
  isTest,
  productName: packageJson.name,
};

export default config;
