
// import { sql } from '@vercel/postgres';
// import { NextResponse } from 'next/server';

// export async function GET() {
//   try {
//     const posts = await sql`SELECT * FROM posts ORDER BY date DESC LIMIT 2;`;
//     return NextResponse.json({ posts }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ error }, { status: 500 });
//   }
// }

// export async function POST(request: Request) {
//   const { searchParams } = new URL(request.url);
//   const id = searchParams.get('id');
//   const title = searchParams.get('title');
//   const content = searchParams.get('content');
//   const date = searchParams.get('date');

//   try {
//     // SQL query to insert a new post
//     await sql`INSERT INTO posts (id, author, title, content, date) VALUES (${id}, 'Kevin Warren', ${title}, ${content}, ${date});`;
//     return NextResponse.json({ message: 'Post successfully inserted' }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ error }, { status: 500 });
//   }
// }

import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const posts = await sql`SELECT * FROM "Post" ORDER BY date DESC LIMIT 2;`;
    return NextResponse.json({ posts }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, title, content, date, author } = body;

    await sql`
      INSERT INTO "Post" (id, title, content, date, author)
      VALUES (${id}, ${title}, ${content}, ${date}, ${author});
    `;

    return NextResponse.json({ message: 'Post successfully inserted' }, { status: 200 });
  } catch (error) {
    console.error("❌ Error inserting post:", error);
    return NextResponse.json({ error: 'Failed to insert post' }, { status: 500 });
  }
}
