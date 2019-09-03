const Generator = require('yeoman-generator');
const mkdirp = require('mkdirp');

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
        type: 'confirm',
        name: 'typescript',
        message: 'Is the project written in TypeScript?',
        default: true
      },
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
      this.templatePath('index.' + (this.props.typescript ? 'tsx' : 'js') + '.tpl'),
      this.destinationPath('index.' + (this.props.typescript ? 'tsx' : 'js')),
      {
        pageName: this.props.pageName,
        entryPoint: this.props.entrypoint
      }
    );
  }
}
