'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-react-ssr:app general', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        name: 'example',
        version: '1.0.0',
        description: 'example',
        repository: 'example',
        author: 'example',
        typescript: true,
        preprocessor: 'css',
        license: 'MIT'
      })
  });

  it('creates files', () => {
    // /
    assert.file('package.json');
    assert.file('config.json');
    assert.file('postcss.config.js');
    assert.file('.babelrc');
    assert.file('tsconfig.json');
    assert.file('.eslintrc.js');
    assert.file('.gitignore');

    // /templates
    assert.file('templates/index.html');

    // /src
    assert.file('src/index.tsx');

    // /src/assets/css
    assert.file('src/assets/css/reset.css');

    // /src/config
    assert.file('src/config/css_loaders.js');
    assert.file('src/config/env.js');
    assert.file('src/config/webpack.config.js');

    // /src/pages
    assert.file('src/pages/hello/index.tsx');

    // /src/utils
    assert.file('src/utils/http.ts');
  });

  it('creates package.json with name of "example"', () => {
    assert.jsonFileContent('package.json', { name: 'example' });
  });

  it('creates package.json with description of "example"', () => {
    assert.jsonFileContent('package.json', { description: 'example' });
  });

  it('creates package.json with repository of "example"', () => {
    assert.jsonFileContent('package.json', { repository: { type: 'git', url: 'example' } });
  });

  it('creates package.json with author of "example"', () => {
    assert.jsonFileContent('package.json', { author: 'example' });
  });

  it('creates package.json with version of "1.0.0"', () => {
    assert.jsonFileContent('package.json', { version: '1.0.0' });
  });

  it('creates package.json with license of "MIT"', () => {
    assert.jsonFileContent('package.json', { license: 'MIT' });
  });
});

describe('generator-react-ssr:app using CSS', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        name: 'example',
        version: '1.0.0',
        description: 'example',
        repository: 'example',
        author: 'example',
        typescript: false,
        preprocessor: 'css',
        license: 'MIT'
      })
  });

  it('ONLY uses css-loader', () => {
    assert.fileContent('src/config/css_loaders.js', /css-loader/);
    assert.noFileContent('src/config/css_loaders.js', /sass-loader/);
    assert.noFileContent('src/config/css_loaders.js', /less-loader/);
    assert.noFileContent('src/config/css_loaders.js', /stylus-loader/);
  });
});

describe('generator-react-ssr:app with Sass / Scss', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        name: 'example',
        version: '1.0.0',
        description: 'example',
        repository: 'example',
        author: 'example',
        typescript: false,
        preprocessor: 'scss',
        license: 'MIT'
      })
  });

  it('uses sass-loader', () => {
    assert.fileContent('src/config/css_loaders.js', /sass-loader/);
    assert.noFileContent('src/config/css_loaders.js', /less-loader/);
    assert.noFileContent('src/config/css_loaders.js', /stylus-loader/);
  });
});

describe('generator-react-ssr:app with Less', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        name: 'example',
        version: '1.0.0',
        description: 'example',
        repository: 'example',
        author: 'example',
        typescript: false,
        preprocessor: 'less',
        license: 'MIT'
      })
  });

  it('uses less-loader', () => {
    assert.noFileContent('src/config/css_loaders.js', /sass-loader/);
    assert.fileContent('src/config/css_loaders.js', /less-loader/);
    assert.noFileContent('src/config/css_loaders.js', /stylus-loader/);
  });
});

describe('generator-react-ssr:app with Stylus', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        name: 'example',
        version: '1.0.0',
        description: 'example',
        repository: 'example',
        author: 'example',
        typescript: false,
        preprocessor: 'styl',
        license: 'MIT'
      })
  });

  it('uses stylus-loader', () => {
    assert.noFileContent('src/config/css_loaders.js', /sass-loader/);
    assert.noFileContent('src/config/css_loaders.js', /less-loader/);
    assert.fileContent('src/config/css_loaders.js', /stylus-loader/);
  });
});
