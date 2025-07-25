// import { sql } from "@vercel/postgres";
// import { NextResponse } from "next/server";

// export async function GET(
//   request: Request,
//   { params }: { params: { userId: string } }   // ← destructure here
// ) {
//   try {
//     const userId = params.userId;               // ← now no warning
//     const result = await sql`
//       SELECT * FROM "Profile" WHERE "userId" = ${userId} LIMIT 1;
//     `;
//     const profile = result.rows[0];
//     if (!profile) {
//       return NextResponse.json({ error: "Not found" }, { status: 404 });
//     }
//     return NextResponse.json({ profile }, { status: 200 });
//   } catch {
//     return NextResponse.json({ error: "Failed" }, { status: 500 });
//   }
// }


import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = params.userId;
    const result = await sql`
      SELECT * FROM "Profile" WHERE "userId" = ${userId} LIMIT 1;
    `;
    const profile = result.rows[0];
    if (!profile) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ profile }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const data = await req.json();
    const {
      name,
      bio,
      date,
      email,
      phone,
      linkedin,
      website,
      headline,
      resume,
      author,
      searchingFor,
      timeCommitment,
      presence,
      location,
      typeOfPerson
    } = data;

    /*const result =*/ await sql`
      UPDATE "Profile"
      SET
        name = ${name},
        bio = ${bio},
        date = ${date},
        email = ${email},
        phone = ${phone},
        linkedin = ${linkedin},
        website = ${website},
        headline = ${headline},
        resume = ${resume},
        author = ${author},
        "searchingFor" = ${searchingFor},
        "timeCommitment" = ${timeCommitment},
        presence = ${presence},
        location = ${location},
        "typeOfPerson" = ${typeOfPerson}
      WHERE id = ${params.userId}
    `;

    return NextResponse.json({ message: "Profile updated" }, { status: 200 });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}
