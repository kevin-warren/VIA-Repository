import { createClient } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
import { sql } from '@vercel/postgres';

// Define the expected shape of a post
export type Post = {
  id: string;
  title: string;
  content: string;
  date: string;
  user: string;
};

export type Profile = {
  id: string;
  name: string;
  bio: string;
  date: string;
};

export async function connectToDB() {
  const client = createClient();
  await client.connect();

  try {
    if (client) {
      console.log('Connected to database');
      return client;
    }
  } catch (error) {
    console.error('Error connecting to database', error);
  }
}

// Return typed posts, or an empty array if query fails
export async function getPosts(): Promise<Post[]> {
  try {
    noStore();
    const data = await sql<Post>`SELECT * FROM posts ORDER BY date ASC`;
    return data.rows;
  } catch (error) {
    console.error('Error getting posts', error);
    return []; // fallback to prevent undefined
  }
}

export async function getProfiles(): Promise<Profile[]> {
  try {
    noStore();
    const data = await sql<Profile>`SELECT * FROM profiles ORDER BY date ASC`;
    return data.rows;
  } catch (error) {
    console.error('Error getting profiles', error);
    return [];
  }
}


