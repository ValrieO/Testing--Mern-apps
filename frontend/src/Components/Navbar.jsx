import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary">
          MERN Blog
        </Link>
        <div className="flex space-x-6">
          <Link to="/" className="text-dark hover:text-primary transition">
            Home
          </Link>
          <Link to="/posts/new" className="text-dark hover:text-primary transition">
            New Post
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;