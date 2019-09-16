const Generator = require('yeoman-generator');
const chalk = require('chalk');
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

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      `Welcome to the first-rate ${chalk.cyan('@lenconda/generator-react-ssr')} generator!`
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
        name: 'version',
        message: 'Input your project version',
        default: '0.0.1'
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
        type: 'list',
        name: 'preprocessor',
        message: 'Which CSS pre-processor would you like to choose?',
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
      this.log(`\nYour generator must be inside a folder named ${this.props.name}\n
        The generator ${chalk.yellow('will automatically create the folder in this directory')}.\n`);

      mkdirp(this.props.name);
      this.destinationRoot(this.destinationPath(this.props.name));
    }
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('package.json.tpl'),
      this.destinationPath('package.json'),
      {
        name: this.props.name,
        version: this.props.version,
        license: this.props.license,
        description: this.props.description,
        repository: this.props.repository,
        author: this.props.author
      }
    );

    if (this.props.preprocessor !== 'css')
      this.fs.extendJSON(this.destinationPath('package.json'), styleDependencies[this.props.preprocessor]);

    // /
    this.fs.copy(this.templatePath('.gitignore.tpl'), this.destinationPath('.gitignore'));
    this.fs.copy(this.templatePath('config.json.tpl'), this.destinationPath('config.json'));
    this.fs.copy(this.templatePath('postcss.config.js.tpl'), this.destinationPath('postcss.config.js'));
    this.fs.copy(this.templatePath('tsconfig.json.tpl'), this.destinationPath('tsconfig.json'));
    this.fs.copy(this.templatePath('.babelrc.tpl'), this.destinationPath('.babelrc'));
    this.fs.copy(this.templatePath('.eslintrc.js.tpl'), this.destinationPath('.eslintrc.js'));

    // /src
    this.fs.copy(this.templatePath('src/index.tsx.tpl'), this.destinationPath('src/index.tsx'));
    this.fs.copy(
      this.templatePath('src/index.' + this.props.preprocessor + '.tpl'),
      this.destinationPath('src/index.' + this.props.preprocessor)
    );

    // /src/config
    this.fs.copy(this.templatePath('src/config/webpack.config.js.tpl'), this.destinationPath('src/config/webpack.config.js'));
    this.fs.copy(this.templatePath('src/config/env.js.tpl'), this.destinationPath('src/config/env.js'));
    this.fs.copy(
      this.templatePath('src/config/' + this.props.preprocessor + '_loaders.js.tpl'),
      this.destinationPath('src/config/css_loaders.js')
    );

    // /src/pages
    this.fs.copy(this.templatePath('src/pages/hello/index.tsx.tpl'), this.destinationPath('src/pages/hello/index.tsx'));

    // /src/assets
    this.fs.copy(this.templatePath('src/assets/css/reset.css.tpl'), this.destinationPath('src/assets/css/reset.css'));

    // /src/utils
    this.fs.copy(this.templatePath('src/utils/http.ts.tpl'), this.destinationPath('src/utils/http.ts'));

    // /templates
    this.fs.copy(this.templatePath('templates/index.html.tpl'), this.destinationPath('templates/index.html'));

    // /typings
    this.fs.copy(this.templatePath('typings/koa2-connect.d.ts.tpl'), this.destinationPath('typings/koa2-connect.d.ts'));

    // /server
    this.fs.copy(this.templatePath('server/index.ts.tpl'), this.destinationPath('server/index.ts'));
    this.fs.copy(this.templatePath('server/config.ts.tpl'), this.destinationPath('server/config.ts'));

    // /server/middlewares
    this.fs.copy(this.templatePath('server/middlewares/render.ts.tpl'), this.destinationPath('server/middlewares/render.ts'));

    // /server/routers
    this.fs.copy(this.templatePath('server/routers/index.ts.tpl'), this.destinationPath('server/routers/index.ts'));

    // /server/utils
    this.fs.copy(this.templatePath('server/utils/entries.ts.tpl'), this.destinationPath('server/utils/entries.ts'));
    this.fs.copy(this.templatePath('server/utils/http.ts.tpl'), this.destinationPath('server/utils/http.ts'));
    this.fs.copy(this.templatePath('server/utils/template.ts.tpl'), this.destinationPath('server/utils/template.ts'));
  }

  install() {
    this.log('\nInstall dependencies...\n');
    this.npmInstall();
  }
};
