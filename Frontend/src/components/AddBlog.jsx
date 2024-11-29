import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddBlog() {
  const [newBlog, setNewBlog] = useState({
    title: '',
    description: '',
    image: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBlog({ ...newBlog, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setNewBlog((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddBlog = (e) => {
    e.preventDefault();
    // Save the blog to your server or shared state management solution here
    console.log('Blog submitted:', newBlog);
    navigate('/'); // Redirect back to home page
  };

  return (
    <div className="min-h-screen bg-primary p-6">
      <form
        onSubmit={handleAddBlog}
        className="bg-secondary p-6 mt-6 rounded shadow-md max-w-md mx-auto"
      >
        <h2 className="text-2xl font-bold text-center text-dark mb-4">
          Add Blog
        </h2>

        {/* Blog Title */}
        <div className="mb-4">
          <label className="block mb-1 text-dark font-medium" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={newBlog.title}
            onChange={handleChange}
            className="w-full p-2 border border-accent rounded bg-primary text-dark"
            placeholder="Enter blog title"
            required
          />
        </div>

        {/* Blog Description */}
        <div className="mb-4">
          <label
            className="block mb-1 text-dark font-medium"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={newBlog.description}
            onChange={handleChange}
            className="w-full p-2 border border-accent rounded bg-primary text-dark"
            placeholder="Enter blog description"
            rows="4"
            required
          ></textarea>
        </div>

        {/* Blog Image Upload */}
        <div className="mb-4">
          <label
            className="block mb-1 text-dark font-medium"
            htmlFor="image"
          >
            Upload Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-2 border border-accent rounded bg-primary text-dark"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-accent text-primary font-bold rounded hover:bg-dark hover:text-secondary"
        >
          Add Blog
        </button>
      </form>
    </div>
  );
}

export default AddBlog;
