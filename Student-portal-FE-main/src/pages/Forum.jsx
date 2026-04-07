// Forum.jsx
import { useState, useEffect } from "react";
import "../styles/Forum.css";   

const Forum = ({ student }) => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  const fetchPosts = async () => {
    try {
      const res = await fetch("http://localhost:5500/api/forum");
      if (!res.ok) {
        throw new Error("Failed to fetch posts");
      }

      const data = await res.json();
      // Ensure data is an array before setting state
      setPosts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setError("Could not load posts. Please try again later.");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5500/api/forum/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message || "Delete failed");
      }

      setPosts((prev) => prev.filter((post) => post._id !== id));
    } catch (error) {
      console.error("Failed to delete post", error);
      setError(error.message || "Failed to delete post.");
    }
  };

  return (
    <div className="forum-container">
      <h1 className="forum-heading">Forum Posts</h1>

      {error && <p className="forum-error-message">{error}</p>}

      {Array.isArray(posts) && posts.length > 0 ? (
        posts.map((post) => (
          <div key={post._id} className="post-card">
            <h3 className="post-title">{post.title}</h3>
            <p className="post-content">{post.content}</p>
            <div className="post-meta">
              <p><strong>Posted by:</strong> <span>{post.authorName}</span></p>
              {/* Add a check for student ID if you want only the author to delete */}
              {/* For now, it will always show based on your original request */}
              <button className="delete-button" onClick={() => handleDelete(post._id)}>Delete</button>
            </div>
          </div>
        ))
      ) : (
        <p className="no-posts-message">No posts available. Be the first to create one!</p>
      )}
    </div>
  );
};

export default Forum;