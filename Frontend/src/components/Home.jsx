import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchBlog, deleteBlog } from '../redux/userThunk';
import { toast, Toaster } from 'sonner';
import { Logout } from '../redux/userSlice';

function Home() {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.data);

  useEffect(() => {
    const fetch = async () => {
      const res = await dispatch(fetchBlog(userData._id));
      if (res) {
        setBlogs(res.payload.fetch);
      }
    };

    fetch();
  }, [dispatch, userData._id]);

  const handleDelete = async (blogId) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this blog?'
    );
    if (confirmDelete) {
      const res = await dispatch(deleteBlog(blogId));
      if (res.payload?.message) {
        setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== blogId));
        toast.success('Blog deleted successfully!');
      } else {
        toast.error('Failed to delete the blog. Try again later.');
      }
    }
  };

  const handleEdit = (blogId) => {
    navigate(`/editblog/${blogId}`);
  };

  const handleLogout = () => {
    dispatch(Logout()); // Dispatch the logout action
    // Redirect to login page if needed
    navigate('/login')
  };
  return (
    <div className="min-h-screen bg-primary p-6">
      <Toaster position="top-right" />

      {/* Header with Logout */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-dark">Blogs</h1>
        <button
          onClick={handleLogout}
          className="py-2 px-4 bg-red-500 text-primary font-bold rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      {/* Display Blogs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-secondary p-4 rounded shadow-md text-dark"
            >
              {blog.image && (
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-40 object-cover rounded mb-4"
                />
              )}
              <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
              <p className="text-sm mb-4">{blog.description}</p>
              <div className="flex justify-between">
                <button
                  onClick={() => handleEdit(blog._id)}
                  className="py-1 px-3 bg-accent text-primary font-bold rounded hover:bg-dark hover:text-secondary"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="py-1 px-3 bg-red-500 text-primary font-bold rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-dark">
            No blogs available. Add a blog to get started!
          </p>
        )}
      </div>

      {/* Add Blog Button */}
      <div className="text-center mt-6">
        <button
          onClick={() => navigate('/addblog')}
          className="py-2 px-4 bg-accent text-primary font-bold rounded hover:bg-dark hover:text-secondary"
        >
          Add Blog
        </button>
      </div>
    </div>
  );
}

export default Home;
