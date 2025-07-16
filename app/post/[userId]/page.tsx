// import { sql } from '@vercel/postgres';
// import Post from '../../ui/components/posts/ViewPost';

// export const dynamic = "force-dynamic";

// export default async function PostPage({ params }: { params: { userId: string } }) {
//   const result = await sql`
//     SELECT id, title, content, date FROM "Post"
//     WHERE "userId" = ${params.userId}
//     LIMIT 1;
//   `;

//   const post = result.rows[0];

//   if (!post) {
//     return <div>No post found.</div>;
//   }

//   return (
//     <Post
//       id={post.id}
//       title={post.title}
//       content={post.content}
//       date={post.date}
//     />
//   );
// }

//not useful
