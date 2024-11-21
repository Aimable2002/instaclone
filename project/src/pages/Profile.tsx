import { useAuthStore } from '../store/auth';
import { usePostsStore } from '../store/posts';
import { Button } from '../components/ui/Button';

export function Profile() {
  const user = useAuthStore((state) => state.user);
  const posts = usePostsStore((state) => state.posts);
  const userPosts = posts.filter((post) => post.user.id === user?.id);

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center space-x-8 mb-8">
        <img
          src={user.avatar}
          alt={user.fullName}
          className="w-32 h-32 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center space-x-4 mb-4">
            <h1 className="text-2xl font-bold">{user.fullName}</h1>
            <Button variant="outline">Edit Profile</Button>
          </div>
          <div className="flex space-x-6 mb-4">
            <div>
              <span className="font-bold">{userPosts.length}</span>{' '}
              <span className="text-gray-600">posts</span>
            </div>
            <div>
              <span className="font-bold">{user.followers}</span>{' '}
              <span className="text-gray-600">followers</span>
            </div>
            <div>
              <span className="font-bold">{user.following}</span>{' '}
              <span className="text-gray-600">following</span>
            </div>
          </div>
          <p className="text-sm">@{user.username}</p>
          {user.bio && <p className="text-sm mt-2">{user.bio}</p>}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-1 mt-6">
        {userPosts.map((post) => (
          <div
            key={post.id}
            className="aspect-square relative group cursor-pointer"
          >
            <img
              src={post.image}
              alt={post.caption}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-6 text-white">
              <div className="flex items-center">
                <span className="font-semibold mr-1">{post.likes}</span> likes
              </div>
              <div className="flex items-center">
                <span className="font-semibold mr-1">{post.comments.length}</span>{' '}
                comments
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}