// localhost:3000/api/icons/${id}

import { readdirSync } from 'fs';
import { ObjectId } from 'mongodb';
import { join } from 'path';

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

export const iconStoragePath = join(process.cwd(), '../mui-icons/data/icon');
export const IconCategories = readdirSync(iconStoragePath);
export const Icons: {
  [id: string]: Icon;
} = {};

export let IconMaxLength = 10;

IconCategories.forEach((category) => {
  readdirSync(join(iconStoragePath, category)).forEach((icon, index) => {
    readdirSync(join(iconStoragePath, category, icon)).forEach((v) => {
      const variant = v.replace('materialicons', '') || 'standard';
      const id = `${index + 1}_${category}__${icon}__${variant}`;

      if (IconMaxLength < id.length) {
        IconMaxLength = id.length + 1;
      }

      Icons[id] = {
        id: id,
        name: icon.replace(/_/g, ' '),
        icon,
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
  return (
    Object.entries(Icons)
      .map(([, icon]) => icon)
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
      .filter((icon) => !variant || variant === icon.variant)
      .slice(skip, take)
      .sort()
  );
}

export function isIcon(value: string): boolean {
  return value.length > 2 && value.length < IconMaxLength && !!Icons[value];
}
