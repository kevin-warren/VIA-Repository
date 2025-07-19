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
