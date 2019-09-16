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
        description: 'example',
        repository: 'example',
        author: 'example',
        typescript: true,
        preprocessor: 'css',
        license: 'MIT'
      })
  });

  it('creates files', () => {
    assert.file('package.json');
    assert.file('postcss.config.js');
    assert.file('.babelrc');
    assert.file('.eslintrc.js');
    assert.file('src/config/css_loaders.js');
    assert.file('src/config/config.js');
    assert.file('src/config/webpack.config.js');
    assert.file('src/templates/index.html');
    assert.file('src/templates/effects/loading.html');
    assert.file('src/templates/parts/head.html');
    assert.file('scripts/clean.js');
    assert.file('src/assets/css/reset.css');
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

  it('creates package.json with license of "MIT"', () => {
    assert.jsonFileContent('package.json', { license: 'MIT' });
  });
});

describe('generator-react-ssr:app with JavaScript', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        name: 'example',
        description: 'example',
        repository: 'example',
        author: 'example',
        typescript: false,
        preprocessor: 'css',
        license: 'MIT'
      })
  });

  it('creates files', () => {
    assert.file('src/pages/index.js');
    assert.file('src/utils/http.js');
    assert.file('server/config.js');
    assert.file('server/index.js');
    assert.file('server/routers/index.js');
    assert.file('server/utils/http.js');
  });

  it('does not generate tsconfig.json', () => {
    assert.noFile('tsconfig.json');
  });

  it('does not use @babel/typescript as preset', () => {
    assert.noFileContent('package.json', /@babel\/typescript/);
  });

  it('does not contains @type-prefixed packages', () => {
    assert.noFileContent('package.json', /@types/);
  });

  it('does not contains @typescript-eslint-prefixed dependencies in .eslintrc.js', () => {
    assert.noFileContent('.eslintrc.js', /@typescript-eslint/);
  });
});

describe('generator-react-ssr:app with TypeScript', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        name: 'example',
        description: 'example',
        repository: 'example',
        author: 'example',
        typescript: true,
        preprocessor: 'css',
        license: 'MIT'
      })
  });

  it('creates files', () => {
    assert.file('src/pages/index.tsx');
    assert.file('src/utils/http.ts');
    assert.file('tsconfig.json');
    assert.file('typings/koa2-connect.d.ts');
    assert.file('server/config.ts');
    assert.file('server/index.ts');
    assert.file('server/routers/index.ts');
    assert.file('server/utils/http.ts');
  });

  it('uses @babel/typescript as preset', () => {
    assert.fileContent('.babelrc', /@babel\/typescript/);
  });

  it('contains @types-prefixed packages', () => {
    assert.fileContent('package.json', /@types/);
  });

  it('contains @typescript-eslint-prefixed dependencies in .eslintrc.js', () => {
    assert.fileContent('.eslintrc.js', /@typescript-eslint/);
  });
});

describe('generator-react-ssr:app with CSS', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        name: 'example',
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
