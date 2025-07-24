// app/api/posts/user/[userId]/route.ts
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(
  _req: Request,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;

  try {
    const result = await sql`
      SELECT 
        p.id, 
        p.title, 
        p.company, 
        p.logo, 
        p.location, 
        p.date, 
        p."jobType", 
        p.presence,
        COUNT(a.id)::int AS "applicationCount"
      FROM "Post" p
      LEFT JOIN "Application" a ON a."postId"::text = p.id::text
      WHERE p."userId" = ${userId}
      GROUP BY p.id
      ORDER BY p.date DESC;
`;

    const posts = result.rows;

    console.log('Posts with application counts:', posts);


    return NextResponse.json({ posts }, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching user posts:", error);
    return NextResponse.json({ error: "Failed to fetch user posts" }, { status: 500 });
  }
}
