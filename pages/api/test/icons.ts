// icons by id:
// localhost:3000/api/icons/${id}

// all icons:
// localhost:3000/api/icons

import { readdirSync, readFile, writeFile } from 'fs';
import { ObjectId } from 'mongodb';
import { join } from 'path';
import { promisify } from 'util';
import kamils from '/home/fatih/dev/mui-icons/pages/api/kamil.json';
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

  return data.toString();
};

const mapDirectoryDataAndReadFile = (getAll: any) => {
  IconCategories.forEach((category) => {
    readdirSync(join(iconStoragePath, category)).forEach((iconName) => {
      readdirSync(join(iconStoragePath, category, iconName)).forEach((v) => {
        const variant = v.replace('materialicons', '') || 'standard';
        const id = `${category}__${iconName}__${variant}`;

        if (IconMaxLength < id.length) {
          IconMaxLength = id.length + 1;
        }

        const fileName = join(iconStoragePath, category, iconName, v, '/24px.svg');

        readFile(fileName, 'utf-8', (err, data) => {
          if (err) {
            console.log(err);
          }

          Icons[id] = {
            id: id,
            name: iconName.replace(/_/g, ' '),
            icon: data,
            variant,
            category,
          };

          getAll(Icons);
        });
      });
    });
  });
};

import { NextApiRequest, NextApiResponse } from 'next';

export default (_: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ text: 'Hello' });
};

export async function findAll(
  { search, searchFields = ['name'], skip = 0, take = 25 }: QueryHelperArgs,
  variant = '',
) {
  mapDirectoryDataAndReadFile((data: any) => {
    if (Object.keys(data).length === 10747) {
      writeFile(
        '/home/fatih/dev/mui-icons/pages/api/icons.json',
        JSON.stringify(jsonData),
        //Object.entries(JSON.stringify(data)).map(([_, x]) => x),
        console.log,
      );
    }
  });

  const jsonData = Object.entries(kamils).map(([_, x]) => x);

  //return Object.entries(Icons).map(([_, x]) => x);
  //console.log('icon:', Icons);

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
