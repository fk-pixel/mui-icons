import { NextApiRequest, NextApiResponse } from 'next';
import { icons } from '../../../data/icons';
import { findAll } from '../test/icons';

// const setIcons = icons.map((x) => {
//   if (x.icon !== undefined) {
//     const strHtml = x.icon.toString();
//     strHtml.map();
//   }
// });

const Icons = async (req: NextApiRequest, res: NextApiResponse) => {
  const test = await findAll({});

  try {
    // https://nextjs.org/docs/api-routes/response-helpers
    res.status(200).json(test);
  } catch (e) {
    console.error(e);
    res.status(404).end();
  }
};

export default Icons;
