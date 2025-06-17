import { createClient } from '@vercel/postgres';
import { sql } from '@vercel/postgres';

// Define the expected shape of a post
export type Post = {
  id: string;
  title: string;
  content: string;
  date: string;
  user: string;
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
    const data = await sql<Post>`SELECT id, title, content, date, user FROM posts ORDER BY date ASC`;
    return data.rows;
  } catch (error) {
    console.error('Error getting posts', error);
    return []; // fallback to prevent undefined
  }
}
