import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

// GET: fetch all profiles
export async function GET() {
  try {
    const profiles = await sql`SELECT * FROM profiles ORDER BY name ASC;`;
    return NextResponse.json({ profiles }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

// POST: insert new profile
export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const name = searchParams.get('name');
  const bio = searchParams.get('bio');
  const date = searchParams.get('date');


  try {
    await sql`INSERT INTO profiles (id, name, bio, date) VALUES (${id}, ${name}, ${bio}, ${date});`;
    return NextResponse.json({ message: 'Profile created' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
