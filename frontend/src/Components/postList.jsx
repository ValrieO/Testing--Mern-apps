import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useApi } from '../hooks/useApi';

const PostList = () => {
  const { loading, error, getPosts } = useApi();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await getPosts();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-red-500 text-center py-8">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-dark">Blog Posts</h1>
        <Link 
          to="/posts/new" 
          className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg transition"
        >
          Create Post
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div key={post._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
            {post.featuredImage && (
              <img 
                src={post.featuredImage} 
                alt={post.title} 
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-6">
              <span className="inline-block bg-secondary text-white text-xs px-2 py-1 rounded-full mb-2">
                {post.category?.name}
              </span>
              <h2 className="text-xl font-semibold mb-2 text-dark">{post.title}</h2>
              <p className="text-gray-600 mb-4 line-clamp-3">{post.content}</p>
              <div className="flex justify-between items-center">
                <Link 
                  to={`/posts/${post._id}`} 
                  className="text-primary hover:text-primary-dark font-medium"
                >
                  Read More
                </Link>
                <span className="text-sm text-gray-500">
                  {new Date(post.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;