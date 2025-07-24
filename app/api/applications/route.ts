// // app/api/applications/route.ts
// import { sql } from '@vercel/postgres';
// import { NextResponse } from 'next/server';
// import { v4 as uuidv4 } from 'uuid';

// export async function POST(request: Request) {
//   try {
//     const {
//       name,
//       email,
//       phone,
//       linkedin,
//       website,
//       resume,
//       bio,
//       date,
//       postId,
//       userId,
//     } = await request.json();

//     const id = uuidv4();

//     await sql`
//       INSERT INTO "Application" (
//         id, name, email, phone, linkedin, website, resume, bio, date, "postId", "userId"
//       )
//       VALUES (
//         ${id}, ${name}, ${email}, ${phone}, ${linkedin}, ${website},
//         ${resume}, ${bio}, ${date}, ${postId}, ${userId}
//       )
//     `;

//     return new Response(JSON.stringify({ success: true }), { status: 201 });
//   } catch (error) {
//     console.error('Failed to submit application:', error);
//     return new Response(JSON.stringify({ error: 'Failed to submit application' }), { status: 500 });
//   }
// }


// export async function GET(request: Request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const postId = searchParams.get('postId');

//     if (!postId) {
//       return NextResponse.json({ error: 'Missing postId in query' }, { status: 400 });
//     }

//     const { rows: applications } = await sql`
//       SELECT * FROM "Application" WHERE "postId" = ${postId} ORDER BY date DESC;
//     `;

//     return NextResponse.json({ applications }, { status: 200 });
//   } catch (error) {
//     console.error('❌ Failed to fetch applications:', error);
//     return NextResponse.json({ error: 'Failed to fetch applications' }, { status: 500 });
//   }
// }
// app/api/applications/route.ts
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { Resend } from 'resend';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const {
      name,
      email,
      phone,
      linkedin,
      website,
      resume,
      bio,
      date,
      postId,
      userId,
    } = await request.json();

    const id = uuidv4();

    await sql`
      INSERT INTO "Application" (
        id, name, email, phone, linkedin, website, resume, bio, date, "postId", "userId"
      )
      VALUES (
        ${id}, ${name}, ${email}, ${phone}, ${linkedin}, ${website},
        ${resume}, ${bio}, ${date}, ${postId}, ${userId}
      )
    `;

    // Get the post to find the job title and post owner's user ID
    const postResult = await sql`
      SELECT title, "userId" FROM "Post" WHERE id = ${postId};
    `;

    const post = postResult.rows[0];
    if (!post) throw new Error('Post not found');

    // Get the post creator's email
    const userResult = await sql`
      SELECT email FROM "User" WHERE id = ${post.userId};
    `;

    const user = userResult.rows[0];
    if (!user) throw new Error('Post creator not found');

    // Send email via Resend
    await resend.emails.send({
      from: 'Resend <no-reply@resend.dev>',
      to: user.email,
      subject: `New Application for ${post.title}`,
      html: `
        <p>You received a new application for <strong>${post.title}</strong>.</p>
        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          ${phone ? `<li><strong>Phone:</strong> ${phone}</li>` : ''}
          ${linkedin ? `<li><strong>LinkedIn:</strong> <a href="${linkedin}">${linkedin}</a></li>` : ''}
          ${website ? `<li><strong>Website:</strong> <a href="${website}">${website}</a></li>` : ''}
          ${resume ? `<li><strong>Resume:</strong> <a href="${resume}">View Resume</a></li>` : ''}
        </ul>
        <p><a href="${baseUrl}/application/${id}">View full application</a></p>

      `,
    });

    return new Response(JSON.stringify({ success: true }), { status: 201 });
  } catch (error) {
    console.error('Failed to submit application:', error);
    return new Response(JSON.stringify({ error: 'Failed to submit application' }), { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get('postId');

    if (!postId) {
      return NextResponse.json({ error: 'Missing postId in query' }, { status: 400 });
    }

    const { rows: applications } = await sql`
      SELECT * FROM "Application" WHERE "postId" = ${postId} ORDER BY date DESC;
    `;

    return NextResponse.json({ applications }, { status: 200 });
  } catch (error) {
    console.error('❌ Failed to fetch applications:', error);
    return NextResponse.json({ error: 'Failed to fetch applications' }, { status: 500 });
  }
}
