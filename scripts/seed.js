import dotenv from 'dotenv';
dotenv.config();

import { db } from "@vercel/postgres";
import { Post } from "../app/lib/placeholder-data.js";
import { Profile } from "../app/lib/placeholder-profiles.js";
import bcrypt from "bcrypt";

async function seedUsers(client) {
  const users = [
    {
      id: "11111111-1111-1111-1111-111111111111",
      name: "Sandra B",
      email: "sandra@example.com",
      password: "sandra123",
    },
    {
      id: "22222222-2222-2222-2222-222222222222",
      name: "Sandy L",
      email: "sandy@example.com",
      password: "sandy123",
    },
    {
      id: "33333333-3333-3333-3333-333333333333",
      name: "Jane S",
      email: "jane@example.com",
      password: "jane123",
    },
    {
      id: "44444444-4444-4444-4444-444444444444",
      name: "John D",
      email: "john@example.com",
      password: "john123",
    },
  ];

  await client.sql`
    CREATE TABLE IF NOT EXISTS "User" (
      id UUID PRIMARY KEY,
      name TEXT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `;

  for (const user of users) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    await client.sql`INSERT INTO "User" (id, name, email, password)
      VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
      ON CONFLICT (id) DO NOTHING;`;
  }

  console.log(`✅ Seeded ${users.length} users`);
  return users;
}

async function seedPosts(client, users) {
  await client.sql`
    CREATE TABLE IF NOT EXISTS "Post" (
      id UUID PRIMARY KEY,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      date TEXT NOT NULL,
      author TEXT,
      "userId" UUID REFERENCES "User"(id)
    );
  `;

  const userMap = Object.fromEntries(users.map(u => [u.name, u.id]));

  for (const post of Post) {
    const date = new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString().split('T')[0];
    await client.sql`INSERT INTO "Post" (id, title, content, date, author, "userId")
      VALUES (
        ${post.id},
        ${post.title},
        ${post.content},
        ${date},
        ${post.user},
        ${userMap[post.user]}
      )
      ON CONFLICT (id) DO NOTHING;
    `;
  }

  console.log(`✅ Seeded ${Post.length} posts`);
}

async function seedProfiles(client) {
  await client.sql`
  CREATE TABLE IF NOT EXISTS "Profile" (
    id UUID PRIMARY KEY,
    name TEXT NOT NULL,
    bio TEXT,
    date TEXT NOT NULL,
    "userId" UUID NOT NULL REFERENCES "User"(id)
  );
`;

for (const profile of Profile) {
  await client.sql`
    INSERT INTO "Profile" (id, name, bio, date, "userId")
    VALUES (${profile.id}, ${profile.name}, ${profile.bio}, ${profile.date}, ${profile.userId})
    ON CONFLICT (id) DO NOTHING;
  `;
}

console.log(`✅ Seeded ${Profile.length} profiles`);
}

async function main() {
  const client = await db.connect();
  const users = await seedUsers(client);
  await seedPosts(client, users);
  await seedProfiles(client);
  await client.end();
}

main().catch((err) => {
  console.error("❌ Error seeding database:", err);
});
