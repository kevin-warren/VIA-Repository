// import { sql } from '@vercel/postgres';
// import { NextResponse } from 'next/server';

// // GET: fetch all profiles
// export async function GET() {
//   try {
//     const profiles = await sql`SELECT * FROM profiles ORDER BY name ASC;`;
//     return NextResponse.json({ profiles }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ error }, { status: 500 });
//   }
// }

// // POST: insert new profile
// export async function POST(request: Request) {
//   const { searchParams } = new URL(request.url);
//   const id = searchParams.get('id');
//   const name = searchParams.get('name');
//   const bio = searchParams.get('bio');
//   const date = searchParams.get('date');


//   try {
//     await sql`INSERT INTO profiles (id, name, bio, date) VALUES (${id}, ${name}, ${bio}, ${date});`;
//     return NextResponse.json({ message: 'Profile created' }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ error }, { status: 500 });
//   }
// }

import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const profiles = await sql`SELECT * FROM "Profile" ORDER BY name ASC;`;
    return NextResponse.json({ profiles }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, name, bio, date, author, userId } = body;

    await sql`
      INSERT INTO "Profile" (id, name, bio, date, author, "userId")
      VALUES (${id}, ${name}, ${bio}, ${date}, ${author}, ${userId});
    `;

    return NextResponse.json({ message: 'Profile successfully inserted' }, { status: 200 });
  } catch (error) {
    console.error("❌ Error inserting profile:", error);
    return NextResponse.json({ error: 'Failed to insert profile' }, { status: 500 });
  }
}
