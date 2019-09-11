'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const mkdirp = require('mkdirp');
const path = require('path');

const PREPROCESS_SASS = 'scss';
const PREPROCESS_LESS = 'less';
const PREPROCESS_STYLUS = 'styl';
const PREPROCESS_ORIGINAL = 'css';

const DEPENDENCIES_SASS = {
  devDependencies: {
    'sass-loader': '^7.1.0',
    'node-sass': '^4.12.0'
  }
};
const DEPENDENCIES_LESS = {
  devDependencies: {
    less: '^3.10.3',
    'less-loader': '^5.0.0',
  }
};
const DEPENDENCIES_STYLUS = {
  devDependencies: {
    stylus: '^0.54.7',
    'stylus-loader': '^3.0.2',
  }
};
const styleDependencies = {
  scss: DEPENDENCIES_SASS,
  less: DEPENDENCIES_LESS,
  styl: DEPENDENCIES_STYLUS
};

const typescriptDevDependencies = {
  typescript: '3.2.4',
  'ts-node': '^8.3.0',
  '@typescript-eslint/eslint-plugin': '^1.13.0',
  '@typescript-eslint/parser': '^1.13.0',
  '@types/dotenv': '^6.1.1',
  '@types/fs-extra': '^8.0.0',
  '@types/http-proxy-middleware': '^0.19.2',
  '@types/kcors': '^2.2.3',
  '@types/koa': '^2.0.49',
  '@types/koa-bodyparser': '^4.3.0',
  '@types/koa-logger': '^3.1.1',
  '@types/koa-router': '^7.0.42',
  '@types/koa-static': '^4.0.1',
  '@types/koa-views': '^2.0.3',
  '@types/react': '16.7.22',
  '@types/glob': '^7.1.1',
  '@types/react-dom': '16.0.11',
  '@types/react-router': '^5.0.3',
  '@types/react-router-dom': '^4.3.4',
  '@babel/preset-typescript': '7.1.0',
};

const javascriptNpmScripts = {
  'dev:server': 'cross-env NODE_ENV=development nodemon server/index.js',
  'build': 'npm run clean && npm run build:bundle:prod && node scripts/copy.js',
};
const typescriptNpmScripts = {
  'dev:server': 'cross-env NODE_ENV=development nodemon server/index.ts',
  'build:bundle': 'webpack --config src/config/webpack.config.js',
  'build:server': 'cross-env NODE_ENV=production tsc --build tsconfig.json',
  'build': 'npm run clean && npm run build:bundle:prod && npm run build:server',
}

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the first-rate ${chalk.red(
          '@lenconda/generator-react-ssr'
        )} generator!`
      )
    );

    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'Input your project name',
        default: 'example'
      },
      {
        type: 'input',
        name: 'description',
        message: 'Input your project description',
        default: ''
      },
      {
        type: 'input',
        name: 'repository',
        message: 'Input your project git repository',
        default: ''
      },
      {
        type: 'input',
        name: 'author',
        message: 'Input author name',
        default: ''
      },
      {
        type: 'confirm',
        name: 'typescript',
        message: 'Would you like to use TypeScript?',
        default: true
      },
      {
        type: 'list',
        name: 'preprocessor',
        message: 'Which CSS preprocessor would you like to choose?',
        choices: [
          { value: PREPROCESS_ORIGINAL, name: 'Original CSS' },
          { value: PREPROCESS_SASS, name: 'Sass / Scss' },
          { value: PREPROCESS_LESS, name: 'Less' },
          { value: PREPROCESS_STYLUS, name: 'Stylus' }
        ],
        default: PREPROCESS_ORIGINAL
      },
      {
        type: 'input',
        name: 'license',
        message: 'Input a license for the project',
        default: 'MIT'
      },
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  default() {
    if (path.basename(this.destinationPath()) !== this.props.name) {
      this.log(`\nYour generator must be inside a folder named 
        ${this.props.name}\n
        The generator ${chalk.yellow('will automatically create the folder in this directory')}.\n`);

      mkdirp(this.props.name);
      this.destinationRoot(this.destinationPath(this.props.name));
    }
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('common/_package.json.tpl'),
      this.destinationPath('package.json'),
      {
        name: this.props.name,
        license: this.props.license,
        description: this.props.description,
        repository: this.props.repository,
        author: this.props.author
      }
    );

    if (this.props.preprocessor !== 'css')
      this.fs.extendJSON(this.destinationPath('package.json'), styleDependencies[this.props.preprocessor]);

    this.fs.copy(this.templatePath('common/scripts'), this.destinationPath('scripts'));
    this.fs.copy(this.templatePath('common/_.gitignore'), this.destinationPath('.gitignore'));
    this.fs.copy(this.templatePath('common/postcss.config.js'), this.destinationPath('postcss.config.js'));
    this.fs.copy(this.templatePath('common/src/config/_config.js'), this.destinationPath('src/config/config.js'));
    this.fs.copyTpl(
      this.templatePath('common/src/pages/index.' + (this.props.typescript ? 'tsx' : 'js')) + '.tpl',
      this.destinationPath('src/pages/index.' + (this.props.typescript ? 'tsx' : 'js')), 
      {
        extension: this.props.preprocessor
      }
    );
    this.fs.copy(
      this.templatePath('common/src/pages/index.' + this.props.preprocessor), 
      this.destinationPath('src/pages/index.' + this.props.preprocessor)
    );
    this.fs.copy(
      this.templatePath('common/src/config/_' + this.props.preprocessor + '_loader.js'), 
      this.destinationPath('src/config/css_loaders.js')
    );

    if (this.props.typescript) {
      this.fs.extendJSON(this.destinationPath('package.json'), {
        devDependencies: typescriptDevDependencies,
        scripts: typescriptNpmScripts
      });
      this.fs.copy(this.templatePath('typescript/_tsconfig.json'), this.destinationPath('tsconfig.json'));
      this.fs.copy(this.templatePath('typescript/_.babelrc'), this.destinationPath('.babelrc'));
      this.fs.copy(this.templatePath('typescript/_.eslintrc.js'), this.destinationPath('.eslintrc.js'));
      this.fs.copy(this.templatePath('typescript/src'), this.destinationPath('src'));
      this.fs.copy(this.templatePath('typescript/server'), this.destinationPath('server'));
      this.fs.copy(this.templatePath('typescript/typings'), this.destinationPath('typings'));
    } else {
      this.fs.extendJSON(this.destinationPath('package.json'), {
        scripts: javascriptNpmScripts
      });
      this.fs.copy(this.templatePath('javascript/src'), this.destinationPath('src'));
      this.fs.copy(this.templatePath('javascript/server'), this.destinationPath('server'));
      this.fs.copy(this.templatePath('javascript/_.babelrc'), this.destinationPath('.babelrc'));
      this.fs.copy(this.templatePath('javascript/_.eslintrc.js'), this.destinationPath('.eslintrc.js'));
    }
  }

  install() {
    this.log('\nInstall dependencies...\n');
    this.npmInstall();
  }
};
