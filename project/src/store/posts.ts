import { create } from 'zustand';
import type { Post } from '../types';
import { generateMockId } from '../lib/utils';

interface PostsState {
  posts: Post[];
  addPost: (post: Omit<Post, 'id' | 'likes' | 'comments' | 'isLiked' | 'createdAt'>) => void;
  toggleLike: (postId: string) => void;
  addComment: (postId: string, userId: string, content: string) => void;
}

const MOCK_POSTS: Post[] = [
  {
    id: '1',
    user: {
      id: '2',
      username: 'emily_travels',
      fullName: 'Emily Wilson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      followers: 2345,
      following: 789,
      posts: 123,
    },
    image: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=1200&h=900&fit=crop',
    caption: '✨ Living my best life in paradise! 🌴 #wanderlust #travel',
    likes: 1234,
    comments: [
      {
        id: '1',
        user: {
          id: '3',
          username: 'alex.adventures',
          fullName: 'Alex Thompson',
          avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop',
          followers: 890,
          following: 234,
          posts: 67,
        },
        content: 'This looks amazing! Where is this?',
        createdAt: '2024-02-28T12:00:00Z',
      },
    ],
    createdAt: '2024-02-28T10:00:00Z',
    isLiked: false,
  },
  {
    id: '2',
    user: {
      id: '4',
      username: 'foodie_adventures',
      fullName: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      followers: 5678,
      following: 432,
      posts: 89,
    },
    image: 'https://images.unsplash.com/photo-1682686580391-615b1f28e5ee?w=1200&h=900&fit=crop',
    caption: '🍜 The best ramen in town! #foodie #ramen #yummy',
    likes: 2345,
    comments: [],
    createdAt: '2024-02-28T09:00:00Z',
    isLiked: true,
  },
];

export const usePostsStore = create<PostsState>((set) => ({
  posts: MOCK_POSTS,
  addPost: (post) =>
    set((state) => ({
      posts: [
        {
          ...post,
          id: generateMockId(),
          likes: 0,
          comments: [],
          isLiked: false,
          createdAt: new Date().toISOString(),
        },
        ...state.posts,
      ],
    })),
  toggleLike: (postId) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
              isLiked: !post.isLiked,
            }
          : post
      ),
    })),
  addComment: (postId, userId, content) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [
                ...post.comments,
                {
                  id: generateMockId(),
                  user: state.posts.find((p) => p.user.id === userId)?.user!,
                  content,
                  createdAt: new Date().toISOString(),
                },
              ],
            }
          : post
      ),
    })),
}));