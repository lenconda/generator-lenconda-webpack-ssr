'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-lenconda-webpack-ssr:page with TypeScript', () => {
  beforeEach(() => {
    return helpers
      .run(path.join(__dirname, '../generators/page'))
      .withPrompts({
        route: 'example',
        typescript: true
      });
  });
  
  
  it('creates page files', () => {
    assert.file('src/pages/example/Page.tsx');
    assert.file('src/pages/example/index.tsx');
  });
});
