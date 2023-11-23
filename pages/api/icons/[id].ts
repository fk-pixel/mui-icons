import { NextApiRequest, NextApiResponse } from 'next';
import { icons } from '../../../data/icons';

const IconDetail = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const iconId = req.query.id as string;

    // const icon = await db.getById(iconId);
    const icon = icons.find((x) => String(x.id) === iconId);

    // https://nextjs.org/docs/api-routes/response-helpers
    res.status(200).json(icon);
  } catch (e) {
    console.error(e);
    res.status(404).end();
  }
};

export default IconDetail;
