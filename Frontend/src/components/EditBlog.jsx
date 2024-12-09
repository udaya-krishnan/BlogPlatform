import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleBlog, updateBlog } from '../redux/userThunk';
import { Toaster, toast } from 'sonner';

function EditBlog() {
  const { id } = useParams(); // Get blog ID from route params
  const [blog, setBlog] = useState({
    title: '',
    description: '',
    image: '',
  });
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await dispatch(fetchSingleBlog(id)); // Fetch blog details
        if (res.payload.fetch) {
          setBlog({
            title: res.payload.fetch.title,
            description: res.payload.fetch.description,
            image: res.payload.fetch.image,
          });
        }
        setLoading(false);
      } catch (error) {
        toast.error('Failed to fetch blog details.');
        setLoading(false);
      }
    };

    fetchBlog();
  }, [dispatch, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog({ ...blog, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file); // Store raw file for upload
    }
  };

  const handleUpdateBlog = async (e) => {
    e.preventDefault();

    // Create FormData to send updated blog details and image
    const formData = new FormData();
    formData.append('title', blog.title);
    formData.append('description', blog.description);
    formData.append('id',id)
    if (file) {
      formData.append('image', file); // Append new image if provided
    }

    try {
      const res = await dispatch(updateBlog(formData));
      if (res.payload?.message=="Blog updated successfully") {
        toast.success('Blog updated successfully!');
        navigate('/'); // Redirect to home page
      } else {
        throw res.payload || 'Failed to update blog.';
      }
    } catch (error) {
      toast.error(error || 'An error occurred while updating the blog.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <p className="text-dark text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary p-6">
      <Toaster position="top-right" />
      <form
        onSubmit={handleUpdateBlog}
        className="bg-secondary p-6 mt-6 rounded shadow-md max-w-md mx-auto"
      >
        <h2 className="text-2xl font-bold text-center text-dark mb-4">
          Edit Blog
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
            value={blog.title}
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
            value={blog.description}
            onChange={handleChange}
            className="w-full p-2 border border-accent rounded bg-primary text-dark"
            placeholder="Enter blog description"
            rows="4"
            required
          ></textarea>
        </div>

        {/* Blog Image Upload */}
        <div className="mb-4">
          <label className="block mb-1 text-dark font-medium" htmlFor="image">
            Upload New Image (optional)
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-2 border border-accent rounded bg-primary text-dark"
          />
        </div>

        {/* Current Blog Image */}
        {blog.image && (
          <div className="mb-4">
            <p className="text-dark font-medium">Current Image:</p>
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-40 object-cover rounded"
            />
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-accent text-primary font-bold rounded hover:bg-dark hover:text-secondary"
        >
          Update Blog
        </button>
      </form>
    </div>
  );
}

export default EditBlog;
