
const nextConnect = require('next-connect');
import multer from 'multer';
import cloudinary from '../lib/cloudinary';
import type { NextApiRequest, NextApiResponse } from 'next';

const upload = multer({ storage: multer.memoryStorage() });

const apiRoute = nextConnect({
  onError(error: Error, req: NextApiRequest, res: NextApiResponse) {
    res.status(501).json({ error: `Something went wrong: ${error.message}` });
  },
  onNoMatch(req: NextApiRequest, res: NextApiResponse) {
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  },
});

apiRoute.use(upload.single('file'));

apiRoute.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const fileBuffer = (req as any).file?.buffer;

  const result = await new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    }).end(fileBuffer);
  });

  res.status(200).json(result);
});

export default apiRoute;


/*

import nextConnect from 'next-connect'; // may show TS error, so disable below
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const nc = nextConnect as any;
import multer from 'multer';
import cloudinary from '../lib/cloudinary';
import type { NextApiRequest, NextApiResponse } from 'next';

interface NextApiRequestWithFile extends NextApiRequest {
  file?: { buffer: Buffer };
}

const upload = multer({ storage: multer.memoryStorage() });

const handler = nc<NextApiRequest, NextApiResponse>({
  onError(error, req, res) {
    res.status(501).json({ error: `Something went wrong: ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  },
});

handler.use(upload.single('file'));

handler.post(async (req: NextApiRequestWithFile, res: NextApiResponse) => {
  const fileBuffer = req.file?.buffer;

  if (!fileBuffer) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
      cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
        if (error || !result) return reject(error || new Error('Upload failed'));
        resolve(result as { secure_url: string });
      }).end(fileBuffer);
    });

    res.status(200).json(result);
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(500).json({ error: e.message });
    } else {
      res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
});

export const config = {
  api: { bodyParser: false },
};

export default handler;
*/