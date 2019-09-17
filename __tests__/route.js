'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-react-ssr:route', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/route'))
      .withPrompts({
        name: 'example',
        prefix: '/example'
      });
  });

  it('creates files', () => {
    assert.file('index.ts');
  });

  it('inserts correct router prefix', () => {
    assert.fileContent('index.ts', /prefix: \'\/example\'/);
  });
});
