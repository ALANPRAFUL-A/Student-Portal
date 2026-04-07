// NewJobBoard.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../styles/NewJobBoard.css' // Ensure this path is correct

function NewJobBoard() {
  const [formData, setFormData] = useState({
    role: "",
    company: "",
    location: "",
    contact: "",
  });
  const [error, setError] = useState(""); // State for displaying errors

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      // Check for bad words in role and company
      const checkRes = await axios.post("http://localhost:5500/api/check-badwords", {
        text: `${formData.role} ${formData.company}`
      });

      // Note: The backend usually sends a 403 status directly if bad words are found.
      // The `checkRes.status === 403` check here might be redundant if the catch block handles it.
      // I'll keep the `alert` in the catch for consistency.

      // Create the job posting
      await axios.post("http://localhost:5500/api/jobs", formData);
      alert("Job created successfully! 🚀"); // Add an emoji for confirmation
      navigate("/jobs");

    } catch (error) {
      if (error.response && error.response.status === 403) {
        setError("Job posting contains inappropriate content (bad words detected). 🚫");
      } else {
        console.error("Error creating job", error);
        setError("Failed to create job. Please try again. 😟");
      }
    }
  };

  return (
    <div className="jobboardform">
      <h2 className="jobboardheading">Create a New Job</h2>
      {error && <p className="jobboard-error-message">{error}</p>} {/* Display error message */}
      <form onSubmit={handleSubmit} className="jobboard-form">

        {/* Job Role Input */}
        <div className="input-group">
          <input
            className="jobboardinput"
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            // Placeholder removed
          />
          <label className={formData.role ? "active" : ""}>Enter Job Role</label>
        </div>

        {/* Company Input */}
        <div className="input-group">
          <input
            className="jobboardinput"
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
            // Placeholder removed
          />
          <label className={formData.company ? "active" : ""}>Enter Company</label>
        </div>

        {/* Location Input */}
        <div className="input-group">
          <input
            className="jobboardinput"
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            // Placeholder removed
          />
          <label className={formData.location ? "active" : ""}>Enter Location</label>
        </div>

        {/* Contact Input */}
        <div className="input-group">
          <input
            className="jobboardinput"
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            required
            // Placeholder removed
          />
          <label className={formData.contact ? "active" : ""}>Enter Contact</label>
        </div>

        <button type="submit" className="submitbutton">Create Job</button>
      </form>
    </div>
  );
}

export default NewJobBoard;