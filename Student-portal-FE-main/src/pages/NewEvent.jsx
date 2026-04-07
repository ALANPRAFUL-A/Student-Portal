// NewEvent.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/NewEvent.css"

function NewEvent() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    image: "",
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
      // Check for bad words in event title and description
      const checkRes = await axios.post("http://localhost:5500/api/check-badwords", {
        text: `${formData.title} ${formData.description}`
      });

      // Note: The backend usually sends a 403 status directly if bad words are found.
      // The `checkRes.status === 403` check here might be redundant if the catch block handles it.
      // I'll keep the `alert` in the catch for consistency.

      // Create the event
      await axios.post("http://localhost:5500/api/events", formData);
      alert("Event created successfully! 🎉"); // Add an emoji for confirmation
      navigate("/events");

    } catch (error) {
      if (error.response && error.response.status === 403) {
        setError("Event contains inappropriate content (bad words detected). 🚫");
      } else {
        console.error("Error creating event", error);
        setError("Failed to create event. Please try again. 😟");
      }
    }
  };

  return (
    <div className="eventform">
      <h2 className="eventheading">Create a New Event</h2>
      {error && <p className="event-error-message">{error}</p>} {/* Display error message */}
      <form onSubmit={handleSubmit} className="event-form">

        {/* Event Title Input */}
        <div className="input-group">
          <input
            className="eventinput"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            required
            // Placeholder removed
          />
          <label className={formData.title ? "active" : ""}>Event Title</label>
        </div>

        {/* Event Description Textarea */}
        <div className="input-group">
          <textarea
            className="eventinput textarea-content" // Added textarea-content for specific styling
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            // Placeholder removed
          />
          <label className={formData.description ? "active" : ""}>Event Description</label>
        </div>

        {/* Date Input */}
        <div className="input-group">
          <input
            className="eventinput"
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
          {/* Label for date input will also float */}
          <label className={formData.date ? "active" : ""}>Date</label>
        </div>

        {/* Location Input */}
        <div className="input-group">
          <input
            className="eventinput"
            name="location"
            type="text"
            value={formData.location}
            onChange={handleChange}
            required
            // Placeholder removed
          />
          <label className={formData.location ? "active" : ""}>Location</label>
        </div>

        {/* Image URL Input */}
        <div className="input-group">
          <input
            className="eventinput"
            name="image"
            type="text"
            value={formData.image}
            onChange={handleChange}
            // Placeholder removed
          />
          <label className={formData.image ? "active" : ""}>Image URL (optional)</label>
        </div>

        <button type="submit" className="submitbutton">Create Event</button>
      </form>
    </div>
  );
}

export default NewEvent;