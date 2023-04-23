import type { NextApiRequest, NextApiResponse } from 'next'
import path from 'path';
import { promises as fs } from 'fs';

type Data = {
    name: string,
    path: string,
    description: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const imageDir = path.join(process.cwd(), 'public/images/nfts')
    const fileContents = await fs.readFile(imageDir + '/nfts.json', 'utf8');
    const all_images = JSON.parse(fileContents);
    const img_requested = all_images.filter((i: any) => i.name === req.query.name);
    if (img_requested && img_requested.length > 0)
        res.status(200).json(img_requested[0]);
    else
        res.status(404);
}
