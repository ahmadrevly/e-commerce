// pages/api/readFile.ts
import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const filePath = path.join(process.cwd(), 'data', 'example.txt');
  
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    res.status(200).json({ content: fileContent });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    res.status(500).json({ error: 'Failed to read file' });
  }
};

export default handler;
