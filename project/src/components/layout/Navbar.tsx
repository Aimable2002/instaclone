import { Link, useNavigate } from 'react-router-dom';
import { Home, PlusSquare, User, LogOut } from 'lucide-react';
import { useAuthStore } from '../../store/auth';
import { Button } from '../ui/Button';
import { useState } from 'react';
import { CreatePostModal } from '../post/CreatePostModal';

export function Navbar() {
  const [showCreatePost, setShowCreatePost] = useState(false);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  return (
    <>
      <nav className="bg-white border-b">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="text-xl font-bold text-primary">
              Instagram
            </Link>

            <div className="flex items-center space-x-4">
              <Link to="/" className="p-1 hover:text-primary">
                <Home className="h-6 w-6" />
              </Link>
              <button
                onClick={() => setShowCreatePost(true)}
                className="p-1 hover:text-primary"
              >
                <PlusSquare className="h-6 w-6" />
              </button>
              <Link
                to={`/profile/${user?.username}`}
                className="p-1 hover:text-primary"
              >
                <User className="h-6 w-6" />
              </Link>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleLogout}
                className="ml-2"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {showCreatePost && (
        <CreatePostModal onClose={() => setShowCreatePost(false)} />
      )}
    </>
  );
}