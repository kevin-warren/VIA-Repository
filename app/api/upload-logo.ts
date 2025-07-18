import nextConnect from 'next-connect';
import multer from 'multer';
import cloudinary from '@/lib/cloudinary';
import type { NextApiRequest, NextApiResponse } from 'next';
import { v2 as cloudinaryV2 } from 'cloudinary';

const upload = multer({ storage: multer.memoryStorage() });

const apiRoute = nextConnect<NextApiRequest, NextApiResponse>({
  onError(error, req, res) {
    res.status(501).json({ error: `Something went wrong: ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  },
});

apiRoute.use(upload.single('file'));

apiRoute.post(async (req: any, res) => {
  const fileBuffer = req.file.buffer;

  const result = await new Promise((resolve, reject) => {
    cloudinaryV2.uploader
      .upload_stream({ resource_type: 'image' }, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      })
      .end(fileBuffer);
  });

  res.status(200).json({ url: (result as any).secure_url });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};
