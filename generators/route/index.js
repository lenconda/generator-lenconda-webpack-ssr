const Generator = require('yeoman-generator');
const mkdirp = require('mkdirp');

module.exports = class extends Generator {
  prompting() {
    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'Input your route name',
        default: 'example'
      },
      {
        type: 'input',
        name: 'prefix',
        message: 'Input your route prefix name',
        default: '/example'
      }
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
      this.props.dir = props.name.toLowerCase();
    });
  }

  default() {
    mkdirp(this.props.dir);
    this.destinationRoot(process.cwd() + '/' + this.props.dir);
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('index.ts.tpl'),
      this.destinationPath('index.ts'),
      {
        prefix: this.props.prefix
      }
    );
  }
};
