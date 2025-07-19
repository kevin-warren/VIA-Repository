import * as nextConnectModule from 'next-connect';
import multer from 'multer';
import cloudinary from '../lib/cloudinary';
import type { NextApiRequest, NextApiResponse } from 'next';

interface NextApiRequestWithFile extends NextApiRequest {
  file?: {
    buffer: Buffer;
  };
}

const nextConnect = (nextConnectModule as any).default || nextConnectModule;
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

apiRoute.post(async (req: NextApiRequestWithFile, res: NextApiResponse) => {
  const fileBuffer = req.file?.buffer;

  if (!fileBuffer) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Define the type of Cloudinary upload result according to its typings
  type CloudinaryUploadResult = {
    public_id: string;
    version: number;
    signature: string;
    width: number;
    height: number;
    format: string;
    resource_type: string;
    created_at: string;
    tags: string[];
    bytes: number;
    type: string;
    etag: string;
    placeholder: boolean;
    url: string;
    secure_url: string;
    [key: string]: any; // in case there are extra props
  };

  try {
    const result = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { resource_type: 'image' },
        (error, result) => {
          if (error) return reject(error);
          if (!result) return reject(new Error('No result from Cloudinary'));
          resolve(result as CloudinaryUploadResult);
        }
      ).end(fileBuffer);
    });

    res.status(200).json(result);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
});

export const config = {
  api: {
    bodyParser: false, // Important for multer to work
  },
};

export default apiRoute;
