import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PostList from './Components/postList';
import PostForm from './Components/postForm';
import PostDetail from './Components/postDetail';
import Navbar from './Components/Navbar';


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-light">
        <Navbar />
        <main className="pb-12">
          <Routes>
            <Route path="/" element={<PostList />} />
            <Route path="/posts/new" element={<PostForm />} />
            <Route path="/posts/:id/edit" element={<PostForm />} />
            <Route path="/posts/:id" element={<PostDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;