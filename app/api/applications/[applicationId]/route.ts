// app/api/applications/[applicationId]/route.ts
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(
  _req: Request,
  context: Promise<{ params: { applicationId: string } }>
) {
  const { params } = await context;
  const { applicationId } = params;

  if (!applicationId) {
    return NextResponse.json({ error: 'Missing applicationId' }, { status: 400 });
  }

  try {
    const result = await sql`
      SELECT * FROM "Application" WHERE id = ${applicationId};
    `;

    const application = result.rows[0];

    if (!application) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    }

    return NextResponse.json({ application }, { status: 200 });
  } catch (error) {
    console.error('❌ Error fetching application:', error);
    return NextResponse.json({ error: 'Failed to fetch application' }, { status: 500 });
  }
}
