import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params;
    const result = await sql`
      SELECT * FROM "Profile"
      WHERE "userId" = ${userId}
      LIMIT 1;
    `;

    if (result.rows.length === 0) {
      return NextResponse.json({ profile: null }, { status: 404 });
    }

    return NextResponse.json({ profile: result.rows[0] }, { status: 200 });
  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
  }
}
