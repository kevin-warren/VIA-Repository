import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = params.userId;
    const result = await sql`
      SELECT * FROM "Post" WHERE "userId" = ${userId} ORDER BY date DESC;
    `;

    const posts = result.rows;

    return NextResponse.json({ posts }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user posts:", error);
    return NextResponse.json({ error: "Failed to fetch user posts" }, { status: 500 });
  }
}
