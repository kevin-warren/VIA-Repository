// import { sql } from '@vercel/postgres';
// import { NextResponse } from 'next/server';

// export async function GET() {
//   try {
//     const posts = await sql`SELECT * FROM "Post" ORDER BY date DESC LIMIT 2;`;
//     return NextResponse.json({ posts }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ error }, { status: 500 });
//   }
// }

// export async function POST(request: Request) {
//   try {
//     const body = await request.json();
//     const { id, title, content, date, author } = body;

//     await sql`
//       INSERT INTO "Post" (id, title, content, date, author)
//       VALUES (${id}, ${title}, ${content}, ${date}, ${author});
//     `;

//     return NextResponse.json({ message: 'Post successfully inserted' }, { status: 200 });
//   } catch (error) {
//     console.error("❌ Error inserting post:", error);
//     return NextResponse.json({ error: 'Failed to insert post' }, { status: 500 });
//   }
// }

import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const posts = await sql`SELECT * FROM "Post" ORDER BY date ASC;`;
    return NextResponse.json({ posts }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { id, title, content, date, author, userId } = await request.json();

    await sql`INSERT INTO "Post" (id, title, content, date, author, "userId")
    VALUES (${id}, ${title}, ${content}, ${date}, ${author}, ${userId});`;

    return NextResponse.json({ message: 'Post successfully inserted' }, { status: 200 });
  } catch (error) {
    console.error("❌ Error inserting post:", error);
    return NextResponse.json({ error: 'Failed to insert post' }, { status: 500 });
  }
}


export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, title, content, date, author } = body;

    console.log("🔧 Updating post:", body); // Debug log

    await sql`
      UPDATE "Post"
      SET title = ${title},
          content = ${content},
          date = ${date},
          author = ${author}
      WHERE "id" = ${id};
    `;

    return NextResponse.json({ message: 'Post updated successfully' }, { status: 200 });
  } catch (error) {
    console.error("❌ Error updating post:", error);
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
  }
}


export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    console.log("🧹 Deleting post with ID:", id);

    const result = await sql`DELETE FROM "Post" WHERE "id" = ${id};`;

    if (result.rowCount === 0) {
      console.warn("⚠️ No post found with ID:", id);
      return NextResponse.json({ error: 'No post found to delete' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Post deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error("❌ Error deleting post:", error);
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
  }
}


