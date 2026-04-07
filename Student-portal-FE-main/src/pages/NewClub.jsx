// NewClub.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/NewClub.css"

function NewClub() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    membersCount: "",
    president: "",
    image: ""
  });
  const [error, setError] = useState(""); // State for displaying errors

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      // Check for bad words in club name and description
      await axios.post("http://localhost:5500/api/check-badwords", {
        text: `${formData.name} ${formData.description}`
      });

      // Create the club
      await axios.post("http://localhost:5500/api/clubs", formData);
      alert("Club created successfully!"); // Consider a custom modal
      navigate("/clubs");

    } catch (err) {
      if (err.response && err.response.status === 403) {
        setError("Club cannot be created due to inappropriate content (bad words detected).");
      } else {
        console.error("Error creating club", err);
        setError("Something went wrong while creating the club. Please try again.");
      }
    }
  };

  return (
    <div className="clubform">
      <h2 className="clubheading">Create a New Club</h2>
      {error && <p className="club-error-message">{error}</p>} {/* Display error message */}
      <form onSubmit={handleSubmit} className="club-form">

        {/* Club Name Input */}
        <div className="input-group">
          <input
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
            className="clubinput"
          />
          <label className={formData.name ? "active" : ""}>Club Name</label>
        </div>

        {/* Description Textarea */}
        <div className="input-group">
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="clubinput textarea-content" // Added textarea-content class
          />
          <label className={formData.description ? "active" : ""}>Description</label>
        </div>

        {/* Members Count Input */}
        <div className="input-group">
          <input
            name="membersCount"
            type="number"
            value={formData.membersCount}
            onChange={handleChange}
            className="clubinput"
          />
          <label className={formData.membersCount ? "active" : ""}>Members Count</label>
        </div>

        {/* President Name Input */}
        <div className="input-group">
          <input
            name="president"
            type="text"
            value={formData.president}
            onChange={handleChange}
            className="clubinput"
          />
          <label className={formData.president ? "active" : ""}>President Name</label>
        </div>

        {/* Image URL Input */}
        <div className="input-group">
          <input
            name="image"
            type="text"
            value={formData.image}
            onChange={handleChange}
            className="clubinput"
          />
          <label className={formData.image ? "active" : ""}>Image URL (optional)</label>
        </div>

        <button type="submit" className="submitbutton">Create Club</button>
      </form>
    </div>
  );
}

export default NewClub;