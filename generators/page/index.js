const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  prompting() {
    const prompts = [
      {
        type: 'input',
        name: 'route',
        message: 'Input your page route',
        default: 'example'
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
    });
  }

  default() {
    this.log('Copying files to /src/pages/' + this.props.route);

    if (this.props.typescript) {
      this.fs.copy(this.templatePath('typescript/Page.tsx'), this.destinationPath('src/pages/' + this.props.route + '/Page.tsx'));
      this.fs.copy(this.templatePath('typescript/index.tsx'), this.destinationPath('src/pages/' + this.props.route + '/index.tsx'));
    } else {
      this.fs.copy(this.templatePath('javascript/Page.jsx'), this.destinationPath('src/pages/' + this.props.route + '/Page.jsx'));
      this.fs.copy(this.templatePath('javascript/index.jsx'), this.destinationPath('src/pages/' + this.props.route + '/index.jsx'));
    }
  }
}
