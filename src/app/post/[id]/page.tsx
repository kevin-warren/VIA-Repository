import { notFound } from 'next/navigation';
import { posts } from '@/app/lib/placeholder-data';
import Post from '@/app/ui/components/posts/Post';

export default function Page({ params }: { params: { id: string } }) {

  const post = posts.find((post) => post.id === params.id);
  if (!post) notFound();
  return (
    <>
      <h1>Post</h1>
      <Post {...post} />
    </>)
}