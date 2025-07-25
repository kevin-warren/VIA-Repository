// // @ts-expect-error: next-connect has no default export in some setups, but this works at runtime
// import nextConnect from 'next-connect';
// import multer from 'multer';
// import cloudinary from '../lib/cloudinary';
// import type { NextApiRequest, NextApiResponse } from 'next';

// interface NextApiRequestWithFile extends NextApiRequest {
//   file?: { buffer: Buffer };
// }

// const upload = multer({ storage: multer.memoryStorage() });

// const handler = nextConnect({
//   onError(error: Error, req: NextApiRequest, res: NextApiResponse) {
//     res.status(501).json({ error: `Something went wrong: ${error.message}` });
//   },
//   onNoMatch(req: NextApiRequest, res: NextApiResponse) {
//     res.status(405).json({ error: `Method ${req.method} Not Allowed` });
//   },
// });

// handler.use(upload.single('file'));

// handler.post(async (req: NextApiRequestWithFile, res: NextApiResponse) => {
//   const fileBuffer = req.file?.buffer;

//   if (!fileBuffer) {
//     return res.status(400).json({ error: 'No file uploaded' });
//   }

//   try {
//     const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
//       cloudinary.uploader.upload_stream({ resource_type: 'raw' }, (error, result) => {
//         if (error || !result) return reject(error || new Error('Upload failed'));
//         resolve(result as { secure_url: string });
//       }).end(fileBuffer);
//     });

//     res.status(200).json(result);
//   } catch (e: unknown) {
//     if (e instanceof Error) {
//       res.status(500).json({ error: e.message });
//     } else {
//       res.status(500).json({ error: 'Unknown error occurred' });
//     }
//   }
// });

// export const config = {
//   api: { bodyParser: false },
// };

// export default handler;

//not in use


