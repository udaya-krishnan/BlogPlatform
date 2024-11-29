import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-primary p-6">
      <h1 className="text-3xl font-bold text-center text-dark mb-6">Blogs</h1>

      {/* Display Blogs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.length > 0 ? (
          blogs.map((blog, index) => (
            <div
              key={index}
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
              <p className="text-sm">{blog.description}</p>
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
