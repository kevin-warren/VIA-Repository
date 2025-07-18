import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  context: { params: { userId: string } } | Promise<{ params: { userId: string } }>
) {
  try {
    const { params } = await context; // await here
    const userId = params.userId;

    const result = await sql`
      SELECT id, title, company, logo, location, date, "jobType", presence FROM "Post" WHERE "userId" = ${userId} ORDER BY date DESC;
    `;

    const posts = result.rows;

    return NextResponse.json({ posts }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user posts:", error);
    return NextResponse.json({ error: "Failed to fetch user posts" }, { status: 500 });
  }
}
