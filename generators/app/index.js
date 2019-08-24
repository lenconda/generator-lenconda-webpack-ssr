'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const mkdirp = require('mkdirp');
const path = require('path');

const PREPROCESS_SASS = 'sass_scss';
const PREPROCESS_LESS = 'less';
const PREPROCESS_STYLUS = 'stylus';
const PREPROCESS_ORIGINAL = 'original';

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
  'sass_scss': DEPENDENCIES_SASS,
  less: DEPENDENCIES_LESS,
  stylus: DEPENDENCIES_STYLUS
} 

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the first-rate ${chalk.red(
          'generator-lenconda-webpack-ssr'
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
      this.templatePath((this.props.typescript ? 'typescript' : 'javascript') + '/_package.json'),
      this.destinationPath('package.json'),
      {
        name: this.props.name,
        license: this.props.license,
        description: this.props.description
      }
    );


    if (this.props.preprocessor !== 'original')
      this.fs.extendJSON(this.destinationPath('package.json'), styleDependencies[this.props.preprocessor]);
  }

  install() {
    this.log('\nInstall dependencies...\n');
    this.npmInstall();
  }
};
