// app/api/applications/post/[postId]/route.ts
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(
  _req: Request,
  { params }: { params: { postId: string } }
) {
  const { postId } = params;

  if (!postId) {
    return NextResponse.json({ error: 'Missing postId' }, { status: 400 });
  }

  try {
    const result = await sql`
      SELECT * FROM "Application"
      WHERE "postId" = ${postId}
      ORDER BY date DESC;
    `;

    return NextResponse.json({ applications: result.rows }, { status: 200 });
  } catch (error) {
    console.error('❌ Error fetching applications:', error);
    return NextResponse.json({ error: 'Failed to fetch applications' }, { status: 500 });
  }
}
