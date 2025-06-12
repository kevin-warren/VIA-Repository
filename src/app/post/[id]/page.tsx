import { notFound } from 'next/navigation';
import { posts } from '@/app/lib/placeholder-data';
import Post from '@/app/ui/components/posts/Post';

type Props = {
  params: { id: string } | Promise<{ id: string }>;
};

export default async function Page({ params }: Props) {
  // Await params in case it's a Promise
  const resolvedParams = params instanceof Promise ? await params : params;

  const post = posts.find((post) => post.id === resolvedParams.id);

  if (!post) notFound();

  return (
    <>
      <h1>Post</h1>
      <Post {...post} />
    </>
  );
}
