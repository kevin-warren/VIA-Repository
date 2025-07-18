import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const posts = await sql`SELECT * FROM "Post" ORDER BY date DESC;`;
    return NextResponse.json({ posts }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const {
      id,
      title,
      company,
      logo,
      category,
      date,
      location,
      pay,
      presence,
      jobType,
      jobDescription,
      startDate,
      endDate,
      summary,
      duties,
      qualifications,
      author,
      userId,
    } = await request.json();

    // Convert empty strings to null
    const safePay = pay === '' ? null : pay;
    const safePresence = presence === '' ? null : presence;
    const safeJobType = jobType === '' ? null : jobType;
    const safeJobDescription = jobDescription === '' ? null : jobDescription;
    const safeStartDate = startDate === '' ? null : startDate;
    const safeEndDate = endDate === '' ? null : endDate;
    const safeSummary = summary === '' ? null : summary;

    await sql`
      INSERT INTO "Post" (
        id, title, company, logo, category, date, location, pay, presence,
        "jobType", "jobDescription", "startDate", "endDate", summary, duties, qualifications,
        author, "userId"
      )
      VALUES (
        ${id}, ${title}, ${company}, ${logo}, ${category}, ${date}, ${location}, ${safePay}, ${safePresence},
        ${safeJobType}, ${safeJobDescription}, ${safeStartDate}, ${safeEndDate}, ${safeSummary}, ${duties}, ${qualifications},
        ${author}, ${userId}
      );
    `;

    return NextResponse.json({ message: 'Post successfully inserted' }, { status: 200 });
  } catch (error) {
    console.error("❌ Error inserting post:", error);
    return NextResponse.json({ error: 'Failed to insert post' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const {
      id,
      title,
      company,
      logo,
      category,
      date,
      location,
      pay,
      presence,
      jobType,
      jobDescription,
      startDate,
      endDate,
      summary,
      duties,
      qualifications,
      author
    } = await request.json();

    // Convert empty strings to null or proper values
    const safePay = pay === '' ? null : pay;
    const safePresence = presence === '' ? null : presence;
    const safeJobType = jobType === '' ? null : jobType;
    const safeJobDescription = jobDescription === '' ? null : jobDescription;
    const safeStartDate = startDate === '' ? null : startDate;
    const safeEndDate = endDate === '' ? null : endDate;
    const safeSummary = summary === '' ? null : summary;
    const safeDuties = duties === '' ? null : duties;
    const safeQualifications = qualifications === '' ? null : qualifications;
    const safeCategory = category === '' ? null : category;
    const safeDate = date === '' ? new Date().toISOString() : date;

    await sql`
      UPDATE "Post"
      SET
        title = ${title},
        company = ${company},
        logo = ${logo},
        category = ${safeCategory},
        date = ${safeDate},
        location = ${location},
        pay = ${safePay},
        presence = ${safePresence},
        "jobType" = ${safeJobType},
        "jobDescription" = ${safeJobDescription},
        "startDate" = ${safeStartDate},
        "endDate" = ${safeEndDate},
        summary = ${safeSummary},
        duties = ${safeDuties},
        qualifications = ${safeQualifications},
        author = ${author}
      WHERE id = ${id};
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
    const result = await sql`DELETE FROM "Post" WHERE "id" = ${id};`;

    if (result.rowCount === 0) {
      return NextResponse.json({ error: 'No post found to delete' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Post deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error("❌ Error deleting post:", error);
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
  }
}
