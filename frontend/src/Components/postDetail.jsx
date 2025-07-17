import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useApi } from '../hooks/useApi';

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, error, getPost, deletePost } = useApi();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const data = await getPost(id);
      setPost(data);
    };
    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      await deletePost(id);
      navigate('/');
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-red-500 text-center py-8">Error: {error}</div>;
  if (!post) return null;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {post.featuredImage && (
          <img 
            src={post.featuredImage} 
            alt={post.title} 
            className="w-full h-64 md:h-96 object-cover"
          />
        )}
        
        <div className="p-6 md:p-8">
          <div className="flex justify-between items-start mb-4">
            <span className="inline-block bg-secondary text-white text-sm px-3 py-1 rounded-full">
              {post.category?.name}
            </span>
            <span className="text-sm text-gray-500">
              {new Date(post.createdAt).toLocaleDateString()}
            </span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-dark mb-4">{post.title}</h1>
          
          <div className="prose max-w-none text-gray-700 mb-8">
            {post.content.split('\n').map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
          
          <div className="flex space-x-4">
            <Link
              to={`/posts/${post._id}/edit`}
              className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg"
            >
              Edit
            </Link>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;