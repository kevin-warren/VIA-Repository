import { NextRequest } from 'next/server';
import { put } from '@vercel/blob';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return new Response('No file uploaded', { status: 400 });
  }

  const blob = await put(file.name, file, {
    access: 'public', // or 'private' if you want
    addRandomSuffix: true,
  });

  return Response.json({ url: blob.url });
}
