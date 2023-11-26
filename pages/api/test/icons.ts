// icons by id:
// localhost:3000/api/icons/${id}
// all icons:
// localhost:3000/api/icons

import { createReadStream, existsSync, readdirSync, readFile, readFileSync, statSync } from 'fs';
import { ObjectId } from 'mongodb';
import { join } from 'path';
import { promisify } from 'util';

export type QueryHelperFilter = {
  [key: string]: string | RegExp | ObjectId | { $in: ObjectId[] } | QueryHelperFilter[];
};

interface QueryHelperArgs {
  skip?: number;
  take?: number;
  search?: string;
  searchFields?: Array<string>;
}

interface Icon {
  id: string;
  name: string;
  icon: string;
  variant: string;
  category: string;
}

export const iconStoragePath = join(process.cwd(), 'data/icon');
export const IconCategories = readdirSync(iconStoragePath);
export const Icons: {
  [id: string]: Icon;
} = {};

export let IconMaxLength = 10;

const asyncReadFile = promisify(readFile);

const returnSvg = async (path: string) => {
  const data = await asyncReadFile(path);

  // since fs.readFile returns a buffer, we should probably convert it to a string.
  return data.toString();
};

console.log('ex.', returnSvg('mui-icons/data/icons/action/123/materialicons'));

IconCategories.forEach((category) => {
  readdirSync(join(iconStoragePath, category)).forEach((iconName) => {
    readdirSync(join(iconStoragePath, category, iconName)).forEach((v) => {
      const variant = v.replace('materialicons', '') || 'standard';
      const id = `${category}__${iconName}__${variant}`;

      if (IconMaxLength < id.length) {
        IconMaxLength = id.length + 1;
      }

      // const t = statSync(join(iconStoragePath, category, iconName, v)).isFile()
      //   ? JSON.parse(readFileSync(v, 'utf8'))
      //   : '';

      const a = existsSync(join(iconStoragePath, category, iconName, v));

      // const SVGFile = readFile(
      //   join(iconStoragePath, category, iconName, v),
      //   { encoding: 'utf-8' },
      //   (err, data) => {
      //     // if (err) {
      //     //   console.log(err);
      //     // }s
      //     // if (data?.length > 1) {
      //     //   return data[1];
      //     // }
      //     // return data;
      //     if (!err) {
      //       console.log('received data: ' + `${data}`);
      //       //response.writeHead(200, { 'Content-Type': 'text/html' });
      //       //response.write(data);
      //       //response.end();
      //     } else {
      //       console.log(err);
      //     }
      //   },
      // );

      //console.log('SVG', SVGFile);
      const fileName = join(iconStoragePath, category, iconName, v);
      const file = createReadStream(fileName, 'utf8');

      // file.on('error', (err) => {
      //   console.log('Error message: ', err);
      // });

      // file.on('data', (chunk) => {
      //   console.log('chunk', chunk);
      // });

      const iconData = returnSvg(fileName).toString();

      //saveAs(new Blob([file], { type: 'image/svg+xml' }), 'name.svg');

      //return new StreamableFile(file);

      Icons[id] = {
        id: id,
        name: iconName.replace(/_/g, ' '),
        icon: iconData, //file, //a ? 'true' : 'false', //JSON.parse(readFileSync(v, 'utf8')), //JSON.parse(readFileSync(join(iconStoragePath, category, iconName, v), 'utf8')),
        variant,
        category,
      };
    });
  });
});

import { NextApiRequest, NextApiResponse } from 'next';

export default (_: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ text: 'Hello' });
};

export async function findAll(
  { search, searchFields = ['name'], skip = 0, take = 25 }: QueryHelperArgs,
  variant = '',
): Promise<Icon[]> {
  return Object.entries(Icons).map(([_, x]) => x);

  // Object.entries(Icons)
  //   .map(([, icon]) => icon)

  // .filter((icon) => {
  //   if (search) {
  //     const filters = this.queryHelperService.searchFilter(search, searchFields);
  //     return (filters.$and as QueryHelperFilter[]).every((filter) =>
  //       (filter.$or as QueryHelperFilter[]).some((filterRegExp) => {
  //         const [field, regexp] = Object.entries(filterRegExp)[0];
  //         return (regexp as RegExp).test(icon[field] || '');
  //       }),
  //     );
  //   } else {
  //     return true;
  //   }
  // })

  //  .filter((icon) => !variant || variant === icon.variant)

  //.slice(skip, take)
  //.sort()
}

export function isIcon(value: string): boolean {
  return value.length > 2 && value.length < IconMaxLength && !!Icons[value];
}
