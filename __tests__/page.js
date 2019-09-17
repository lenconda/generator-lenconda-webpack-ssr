'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-react-ssr:page using CSS', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/page'))
      .withPrompts({
        name: 'example',
        preprocessor: 'css',
        entrypoint: 'root'
      });
  });

  it('creates files', () => {
    assert.file('index.tsx');
    assert.file('index.css');
  });
});

describe('generator-react-ssr:page using Less', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/page'))
      .withPrompts({
        name: 'example',
        preprocessor: 'less',
        entrypoint: 'root'
      });
  });

  it('creates files', () => {
    assert.file('index.tsx');
    assert.file('index.less');
  });
});

describe('generator-react-ssr:page using Sass / Scss', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/page'))
      .withPrompts({
        name: 'example',
        preprocessor: 'scss',
        entrypoint: 'root'
      });
  });

  it('creates files', () => {
    assert.file('index.tsx');
    assert.file('index.scss');
  });
});

describe('generator-react-ssr:page using Stylus', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/page'))
      .withPrompts({
        name: 'example',
        preprocessor: 'styl',
        entrypoint: 'root'
      });
  });

  it('creates files', () => {
    assert.file('index.tsx');
    assert.file('index.styl');
  });
});
