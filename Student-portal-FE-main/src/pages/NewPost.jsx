// NewPost.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import "../styles/NewPost.css"

const NewPost = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });
  const [error, setError] = useState(""); // State for displaying errors

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in to create a post."); // Use error state
      return;
    }

    try {
      // Check for bad words
      await axios.post("http://localhost:5500/api/check-badwords", {
        text: `${formData.title} ${formData.content}`,
      });

      // Create the post
      await axios.post(
        "http://localhost:5500/api/forum",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Post created successfully!"); // Consider a custom modal instead of alert
      navigate("/forum");

    } catch (error) {
      if (error.response && error.response.status === 403) {
        setError("You can't upload this post due to bad words.");
      } else {
        console.error("Error creating post", error);
        setError("Something went wrong while creating the post.");
      }
    }
  };

  return (
    <div className='postform'>
      <h2 className='postheading'>Create a New Post</h2>
      {error && <p className="post-error-message">{error}</p>} {/* Display error message */}
      <form onSubmit={handleSubmit} className="post-form">

        {/* Input field for Title */}
        <div className="input-group">
          <input
            className='postinput'
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            // Placeholder removed
          />
          <label className={formData.title ? "active" : ""}>Title</label>
        </div>

        {/* Textarea for Content */}
        <div className="input-group">
          <textarea
            className='postinput textarea-content' // Added a specific class for textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            // Placeholder removed
          />
          <label className={formData.content ? "active" : ""}>Content...</label>
        </div>

        <button type="submit" className='submitbutton'>Create Post</button>
      </form>
    </div>
  );
};

export default NewPost;