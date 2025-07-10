import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(_: Request, context: { params: { userId: string } }) {
  try {
    const { userId } = context.params;

    const result = await sql`
      SELECT * FROM "Profile"
      WHERE "userId" = ${userId}
      LIMIT 1;
    `;

    const profile = result.rows[0];

    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    return NextResponse.json({ profile }, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching profile:", error);
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
  }
}
