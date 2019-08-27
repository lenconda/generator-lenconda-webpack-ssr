const Generator = require('yeoman-generator');

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
        message: 'Input your route prefix',
        default: '/example'
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
    this.log('Copying files to /server/routers');

    if (this.props.typescript) {
      this.fs.copyTpl(
        this.templatePath('typescript/route.ts.tpl'),
        this.destinationPath('server/routers/' + this.props.name.toLowerCase() + '/index.ts'),
        {
          name: this.props.name.toLowerCase(),
          prefix: this.props.prefix.toLowerCase()
        }
      );

      const serverConfig = this.fs.read('server/index.ts');
      const injectRouters = serverConfig.split('// <import-routers>');
      injectRouters.splice(1, 0, 'import ' + this.props.name.toLowerCase() + 'Router from \'./routers/' + this.props.name.toLowerCase() + '\';', '\n// <import-routers>');
      const injectedRoutersServerConfig = injectRouters.join('');
      const useRouters = injectedRoutersServerConfig.split('// <use-imported-routers>');
      useRouters.splice(1, 0, 'app.use(' + this.props.name.toLowerCase() + 'Router.routes()).use(' + this.props.name.toLowerCase() + 'Router.allowedMethods());', '\n// <use-imported-routers>');
      const injectedUseRoutersServerConfig = useRouters.join('');

      this.fs.write('server/index.ts', injectedUseRoutersServerConfig);
    } else {
      this.fs.copyTpl(
        this.templatePath('javascript/route.js.tpl'),
        this.destinationPath('server/routers/' + this.props.name.toLowerCase() + '/index.js'),
        {
          name: this.props.name.toLowerCase(),
          prefix: this.props.prefix.toLowerCase()
        }
      );

      const serverConfig = this.fs.read('server/index.js');
      const injectRouters = serverConfig.split('// <import-routers>');
      injectRouters.splice(1, 0, 'const ' + this.props.name.toLowerCase() + 'Router = require(\'./routers/' + this.props.name.toLowerCase() + '\');', '\n// <import-routers>');
      const injectedRoutersServerConfig = injectRouters.join('');
      const useRouters = injectedRoutersServerConfig.split('// <use-imported-routers>');
      useRouters.splice(1, 0, 'app.use(' + this.props.name.toLowerCase() + 'Router.routes()).use(' + this.props.name.toLowerCase() + 'Router.allowedMethods());', '\n// <use-imported-routers>');
      const injectedUseRoutersServerConfig = useRouters.join('');

      this.fs.write('server/index.js', injectedUseRoutersServerConfig);
    }
  }
}
