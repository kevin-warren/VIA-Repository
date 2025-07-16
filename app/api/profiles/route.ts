import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const profiles = await sql`SELECT * FROM "Profile" ORDER BY name DESC;`;
    return NextResponse.json({ profiles }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, name, bio, date, author, userId } = body;

    await sql`INSERT INTO "Profile" (id, name, bio, date, author, "userId")
      VALUES (${id}, ${name}, ${bio}, ${date}, ${author}, ${userId});`;

    return NextResponse.json({ message: 'Profile successfully inserted' }, { status: 200 });
  } catch (error) {
    console.error("❌ Error inserting profile:", error);
    return NextResponse.json({ error: 'Failed to insert profile' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { name, bio, date, author, userId } = body;

    await sql`
      UPDATE "Profile"
      SET name = ${name}, bio = ${bio}, date = ${date}, author = ${author}
      WHERE "userId" = ${userId};
    `;

    return NextResponse.json({ message: 'Profile updated successfully' }, { status: 200 });
  } catch (error) {
    console.error("❌ Error updating profile:", error);
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const { userId } = await request.json();

  try {
    await sql`DELETE FROM "Profile" WHERE "userId" = ${userId};`;
    return NextResponse.json({ message: 'Profile deleted' }, { status: 200 });
  } catch (error) {
    console.error("❌ Error deleting profile:", error);
    return NextResponse.json({ error: 'Failed to delete profile' }, { status: 500 });
  }
}
