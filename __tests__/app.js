'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-lenconda-webpack-ssr:app with TypeScript and original CSS', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        name: 'example',
        description: 'some description',
        typescript: true,
        preprocessor: 'original',
        license: 'MIT'
      })
  });

  it('creates files', () => {
    assert.file('package.json');
    assert.file('postcss.config.js');
    assert.file('scripts/clean.js');
    assert.file('server/config.ts');
    assert.file('server/index.ts');
    assert.file('server/routers/index.ts');
    assert.file('server/utils/http.ts');
    assert.file('src/assets/css/reset.css');
    assert.file('src/config/config.js');
    assert.file('src/config/css_loaders.js');
    assert.file('src/config/webpack.config.js');
    assert.file('src/pages/App.css');
    assert.file('src/pages/App.tsx');
    assert.file('src/pages/index.tsx');
    assert.file('src/templates/effects/loading.html');
    assert.file('src/templates/index.html');
    assert.file('src/templates/parts/head.html');
    assert.file('src/utils/http.ts');
    assert.file('tsconfig.json');
    assert.file('typings/koa2-connect.d.ts');
  });

  it('generates template with name of "example"', () => {
    assert.jsonFileContent('package.json', { name: 'example' });
  });

  it('generates template with description of "some description"', () => {
    assert.jsonFileContent('package.json', { description: 'some description' });
  });
});

describe('generator-lenconda-webpack-ssr:app with JavaScript and original CSS', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        name: 'example',
        description: 'some description',
        typescript: false,
        preprocessor: 'original',
        license: 'MIT'
      });
  });

  it('creates files', () => {
    assert.file('package.json');
    assert.file('postcss.config.js');
    assert.file('scripts/clean.js');
    assert.file('server/config.js');
    assert.file('server/index.js');
    assert.file('server/routers/index.js');
    assert.file('server/utils/http.js');
    assert.file('src/assets/css/reset.css');
    assert.file('src/config/config.js');
    assert.file('src/config/css_loaders.js');
    assert.file('src/config/webpack.config.js');
    assert.file('src/pages/App.css');
    assert.file('src/pages/App.jsx');
    assert.file('src/pages/index.jsx');
    assert.file('src/templates/effects/loading.html');
    assert.file('src/templates/index.html');
    assert.file('src/templates/parts/head.html');
    assert.file('src/utils/http.js');
  });

  it('generates template with name of "example"', () => {
    assert.jsonFileContent('package.json', { name: 'example' });
  });

  it('generates template with description of "some description"', () => {
    assert.jsonFileContent('package.json', { description: 'some description' });
  });
});
