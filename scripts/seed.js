import { db } from "@vercel/postgres";
import { posts } from "../src/app/lib/placeholder-data.js";
import { profiles } from "../src/app/lib/placeholder-profiles.js";

async function seedPosts(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS posts (
        id UUID DEFAULT uuid_generate_v1mc() PRIMARY KEY,
        author VARCHAR(255) NOT NULL,
        title VARCHAR(255) NOT NULL UNIQUE,
        content TEXT NOT NULL,
        date TEXT NOT NULL
      );
    `;

    console.log(`Created "posts" table`);

    // Insert data into the "posts" table
    const insertedPosts = await Promise.all(
      posts.map(async (post) => {
        return client.sql`
        INSERT INTO posts (id, title, content, date, author)
        VALUES (${post.id}, ${post.title}, ${post.content}, ${post.date}, ${post.user})
        ON CONFLICT (id) DO NOTHING;
      `;
      })
    );
    console.log(`Seeded ${insertedPosts.length} posts articles`);

    return {
      createTable,
      posts: insertedPosts,
    };
  } catch (error) {
    console.error("Error seeding posts:", error);
    throw error;
  }
}

async function seedProfiles(client) {
  try {
    const createProfilesTable = await client.sql`
    DROP TABLE IF EXISTS profiles;  
    CREATE TABLE IF NOT EXISTS profiles (
        id UUID PRIMARY KEY,
        name TEXT NOT NULL,
        bio TEXT,
        date TEXT NOT NULL
      );
    `;
    console.log('Created "profiles" table');

    const insertedProfiles = await Promise.all(
      profiles.map(async (profile) => {
        return client.sql`
          INSERT INTO profiles (id, name, bio, date)
          VALUES (${profile.id}, ${profile.name}, ${profile.bio}, ${profile.date})
          ON CONFLICT (id) DO NOTHING;
        `;
      })
    );

    console.log(`Seeded ${insertedProfiles.length} profiles`);
    return { createProfilesTable, profiles: insertedProfiles };
  } catch (error) {
    console.error("Error seeding profiles:", error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();
  await seedPosts(client);
  await seedProfiles(client);
  await client.end();
}

main().catch((err) => {
  console.error(
    "An error occurred while attempting to seed the database:",
    err
  );
});
