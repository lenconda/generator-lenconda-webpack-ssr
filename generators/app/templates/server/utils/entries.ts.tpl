import path from 'path';
import glob from 'glob';

export const getEntries = (searchPath: string, root: string) => {
  const files = glob.sync(searchPath);

  const entries = files.map((value, index) => {
    const relativePath = path.relative(root, value);
    return {
      name: value.split('/')[value.split('/').length - 2],
      path: path.resolve('./', value),
      route: relativePath.split('/').filter((value, index) => value !== 'index.tsx').join('/')
    };
  });

  return entries;
};
