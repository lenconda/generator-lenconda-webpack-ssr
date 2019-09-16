import path from 'path';
import { injectTemplate } from '../utils/template';
import handlebars from 'handlebars';
import fs from 'fs-extra';

export default (templateBasePath: string) => {

  return (ctx, next) => {
    if (ctx.render) return next();

    ctx.response.render = ctx.render = (file: string, entry: string, options: object = {}) => {
      ctx.type = 'text/html';
      const raw = fs.readFileSync(path.join(templateBasePath, file), { encoding: 'utf8' });
      const source = injectTemplate(raw, entry);
      const compiled = handlebars.compile(source);
      const html = compiled(options);
      ctx.body = html;
    };

    return next();
  };
};
