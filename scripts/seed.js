import dotenv from 'dotenv';
dotenv.config();

import { db } from "@vercel/postgres";
import { posts } from "../src/app/lib/placeholder-data.js";
import { profiles } from "../src/app/lib/placeholder-profiles.js";
import bcrypt from "bcrypt";

async function seedPosts(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

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

    const insertedPosts = await Promise.all(
      posts.map(async (post) => {
        return client.sql`
        INSERT INTO posts (id, title, content, date, author)
        VALUES (${post.id}, ${post.title}, ${post.content}, ${post.date}, ${post.user})
        ON CONFLICT (id) DO NOTHING;
      `;
      })
    );

    console.log(`Seeded ${insertedPosts.length} posts`);
    return { createTable, posts: insertedPosts };
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

async function seedUsers(client) {
  try {
    const createUsersTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name TEXT,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `;

    console.log('Created "users" table');

    const users = [
      {
        name: "Alice Smith",
        email: "alice@example.com",
        password: "password123",
      },
      {
        name: "Bob Johnson",
        email: "bob@example.com",
        password: "supersecure456",
      },
    ];

    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
          INSERT INTO users (name, email, password)
          VALUES (${user.name}, ${user.email}, ${hashedPassword})
          ON CONFLICT (email) DO NOTHING;
        `;
      })
    );

    console.log(`Seeded ${insertedUsers.length} users`);
    return { createUsersTable, users: insertedUsers };
  } catch (error) {
    console.error("Error seeding users:", error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedPosts(client);
  await seedProfiles(client);
  await seedUsers(client); // <-- ADDED USERS SEEDING

  await client.end();
}

main().catch((err) => {
  console.error("An error occurred while attempting to seed the database:", err);
});
