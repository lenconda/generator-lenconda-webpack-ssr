const Generator = require('yeoman-generator');
const mkdirp = require('mkdirp');

const PREPROCESS_SASS = 'scss';
const PREPROCESS_LESS = 'less';
const PREPROCESS_STYLUS = 'styl';
const PREPROCESS_ORIGINAL = 'css';

module.exports = class extends Generator {
  prompting() {
    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'Input your page name',
        default: 'example'
      },
      {
        type: 'input',
        name: 'entrypoint',
        message: 'Input your page\'s entry point name',
        default: 'root'
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
      }
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
      this.props.dir = props.name.toLowerCase();
      this.props.pageName = props.name.toLowerCase().replace(/^\S/, s => s.toUpperCase());
    });
  }

  default() {
    mkdirp(this.props.dir);
    this.destinationRoot(process.cwd() + '/' + this.props.dir);
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('index.tsx.tpl'),
      this.destinationPath('index.tsx'),
      {
        pageName: this.props.pageName,
        entryPoint: this.props.entrypoint,
        preprocessor: this.props.preprocessor
      }
    );

    this.fs.write(this.destinationPath('index.' + this.props.preprocessor), '');
  }
};
