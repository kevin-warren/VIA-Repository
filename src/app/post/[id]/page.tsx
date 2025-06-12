//import { Metadata } from 'next';
import { posts } from '@/app/lib/placeholder-data';
import Post from '@/app/ui/components/posts/Post';

type PageProps = {
  params: {
    id: string;
  };
};

export default function Page({ params }: PageProps) {
  const post = posts.find((post) => post.id === params.id);

  // Optional: handle post not found
  if (!post) return <p>Post not found.</p>;

  return (
    <>
      <h1>Post</h1>
      <Post {...post} />
    </>
  );
}
