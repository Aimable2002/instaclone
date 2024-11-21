import { useState } from 'react';
import { usePostsStore } from '../../store/posts';
import { PostCard } from '../post/PostCard';
import { CreatePostModal } from '../post/CreatePostModal';

export function Home() {
  const [showCreatePost, setShowCreatePost] = useState(false);
  const posts = usePostsStore((state) => state.posts);

  return (
    <>
      <div className="max-w-2xl mx-auto space-y-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {showCreatePost && (
        <CreatePostModal onClose={() => setShowCreatePost(false)} />
      )}
    </>
  );
}