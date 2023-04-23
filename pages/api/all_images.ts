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
    res.status(200).json(JSON.parse(fileContents));
}
