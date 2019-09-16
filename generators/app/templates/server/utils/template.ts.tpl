import cheerio from 'cheerio';
import fs from 'fs-extra';
import path from 'path';
import config from '../../config.json';

export const injectTemplate = (content: string, entry: string) => {
  const prefix = process.env.NODE_ENV === 'production' ? '' : `http://localhost:${config.port.bundle}`;

  const $ = cheerio.load(content);

  if (process.env.NODE_ENV === 'production') {
    const manifestPath = path.join(__dirname, '../../dist/manifest.json');
    const manifest = JSON.parse(fs.readFileSync(manifestPath, { encoding: 'utf8' }) || '{}');

    if (manifest[entry]) {
      if (manifest[entry]['css']) {
        $('head').append(`<link rel="stylesheet" href="${prefix}${manifest[entry]['css']}"></link>`);
      }

      if (manifest[entry]['js']) {
        $('body').append(`<script type="text/javascript" src="${prefix}${manifest[entry]['js']}"></script>`);
      }
    }

    if (manifest['app__common']) {
      if (manifest['app__common']['css']) {
        $('head').append(`<link rel="stylesheet" href="${prefix}${manifest['app__common']['css']}"></link>`);
      }

      if (manifest['app__common']['js']) {
        $('body').append(`<script type="text/javascript" src="${prefix}${manifest['app__common']['js']}"></script>`);
      }
    }
  } else {
    $('head').append(`<link rel="stylesheet" href="${prefix}/static/css/${entry}.css"></link>`);
    $('body').append(`<script type="text/javascript" src="${prefix}/static/js/${entry}-routes.js"></script>`);
    $('head').append(`<link rel="stylesheet" href="${prefix}/static/css/app__common.css"></link>`);
    $('body').append(`<script type="text/javascript" src="${prefix}/static/js/app__common.chunk.js"></script>`);
  }

  return $.html();
};
