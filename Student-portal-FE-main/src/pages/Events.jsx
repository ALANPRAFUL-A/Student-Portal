// Events.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Events.css" // Ensure this path is correct

function Events() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(""); // State for displaying errors

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("http://localhost:5500/api/events");
        setEvents(Array.isArray(res.data) ? res.data : []); // Ensure data is an array
      } catch (err) {
        console.error("Failed to fetch events", err);
        setError("Could not load events. Please try again later.");
      }
    };

    fetchEvents();
  }, []);

  const handleDelete = async (id) => {
    try {
      // Using axios.delete for consistency with other components
      await axios.delete(`http://localhost:5500/api/events/${id}`);
      setEvents(events.filter((event) => event._id !== id));
      alert("Event deleted successfully! ✅"); // Optional: Add a success alert
    } catch (err) {
      console.error("Failed to delete event", err);
      setError("Failed to delete event. Please try again.");
    }
  };

  return (
    <div className="events-container"> {/* Main container class */}
      <h2 className="events-heading">Upcoming Events 📅</h2> {/* Heading class */}

      {error && <p className="events-error-message">{error}</p>} {/* Error message display */}

      {events.length === 0 ? (
        <p className="no-events-message">No upcoming events found. Stay tuned or create one! 🎉</p>
      ) : (
        <div className="event-list"> {/* Container for event cards */}
          {events.map((event) => (
            <div key={event._id} className="event-card"> {/* Individual event card */}
              {event.image && (
                <img src={event.image} alt={event.title} className="event-image" />
              )}
              <div className="event-info">
                <h3 className="event-title">{event.title}</h3>
                <p className="event-description">{event.description}</p>
                <p className="event-meta">
                  <strong>Date:</strong> <span>{new Date(event.date).toLocaleDateString()}</span>
                </p>
                <p className="event-meta">
                  <strong>Location:</strong> <span>{event.location}</span>
                </p>
                <button
                  onClick={() => handleDelete(event._id)}
                  className="delete-button" // Reusing delete button style from Forum/Clubs
                >
                  Delete Event
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Events;