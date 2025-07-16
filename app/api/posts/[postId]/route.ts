import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { postId: string } }
) {
  try {
    const postId = params.postId;
    const result = await sql`
      SELECT * FROM "Post" WHERE id = ${postId};
    `;

    const post = result.rows[0];
    if (!post) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ post }, { status: 200 });
  } catch (error) {
    console.error("Error fetching post by ID:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
