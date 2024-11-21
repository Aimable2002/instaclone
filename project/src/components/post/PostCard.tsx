import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import { useAuthStore } from '../../store/auth';
import { usePostsStore } from '../../store/posts';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import type { Post } from '../../types';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const [comment, setComment] = useState('');
  const user = useAuthStore((state) => state.user);
  const { toggleLike, addComment } = usePostsStore();

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim() && user) {
      addComment(post.id, user.id, comment.trim());
      setComment('');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
      <div className="p-4 flex items-center">
        <img
          src={post.user.avatar}
          alt={post.user.username}
          className="w-8 h-8 rounded-full object-cover"
        />
        <div className="ml-3">
          <p className="font-semibold">{post.user.fullName}</p>
          <p className="text-sm text-gray-500">@{post.user.username}</p>
        </div>
      </div>

      <img
        src={post.image}
        alt={post.caption}
        className="w-full aspect-square object-cover"
      />

      <div className="p-4">
        <div className="flex items-center space-x-4 mb-4">
          <button
            onClick={() => toggleLike(post.id)}
            className={`p-2 rounded-full hover:bg-gray-100 ${
              post.isLiked ? 'text-red-500' : ''
            }`}
          >
            <Heart className={`h-6 w-6 ${post.isLiked ? 'fill-current' : ''}`} />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <MessageCircle className="h-6 w-6" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Share2 className="h-6 w-6" />
          </button>
        </div>

        <p className="font-semibold mb-1">{post.likes} likes</p>
        <p className="mb-2">
          <span className="font-semibold">{post.user.username}</span>{' '}
          {post.caption}
        </p>

        {post.comments.length > 0 && (
          <div className="space-y-2 mb-4">
            {post.comments.map((comment) => (
              <div key={comment.id}>
                <p className="text-sm">
                  <span className="font-semibold">{comment.user.username}</span>{' '}
                  {comment.content}
                </p>
                <p className="text-xs text-gray-500">
                  {formatDistanceToNow(new Date(comment.createdAt), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            ))}
          </div>
        )}

        <p className="text-xs text-gray-500 mb-4">
          {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
        </p>

        <form onSubmit={handleAddComment} className="flex gap-2">
          <Input
            type="text"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" disabled={!comment.trim()}>
            Post
          </Button>
        </form>
      </div>
    </div>
  );
}