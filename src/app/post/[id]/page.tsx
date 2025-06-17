import { notFound } from 'next/navigation';
//import { posts } from '@/app/lib/placeholder-data';
import Post from '@/app/ui/components/posts/Post';
import { getPosts } from '@/app/lib/data'; // import real data


type Props = {
  params: { id: string } | Promise<{ id: string }>;
};

export default async function Page({ params }: Props) {
  // Await params in case it's a Promise
  const resolvedParams = params instanceof Promise ? await params : params;
  const posts = await getPosts(); // fetch from database
  const post = posts.find((post) => post.id === resolvedParams.id);

  if (!post) notFound();

  return (
    <>
      <h1>Post</h1>
      <Post {...post} />
    </>
  );
}

export async function generateStaticParams() {
  const posts = await getPosts(); // fetch real post IDs
  return posts.map((post) => ({
    id: post.id,
  }));
}