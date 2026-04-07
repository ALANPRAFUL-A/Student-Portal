// Clubs.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Clubs.css" // Ensure this path is correct

function Clubs() {
  const [clubs, setClubs] = useState([]);
  const [error, setError] = useState(""); // State for displaying errors

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const res = await axios.get("http://localhost:5500/api/clubs");
        setClubs(Array.isArray(res.data) ? res.data : []); // Ensure data is an array
      } catch (err) {
        console.error("Failed to load clubs", err);
        setError("Could not load clubs. Please try again later.");
      }
    };

    fetchClubs();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5500/api/clubs/${id}`);
      setClubs(clubs.filter((club) => club._id !== id));
      alert("Club deleted successfully!"); // Optional: Add a success alert
    } catch (err) {
      console.error("Failed to delete club", err);
      setError("Failed to delete club. Please try again.");
    }
  };

  return (
    <div className="clubs-container"> {/* Main container class */}
      <h2 className="clubs-heading">Student Clubs 📚</h2> {/* Heading class */}

      {error && <p className="clubs-error-message">{error}</p>} {/* Error message display */}

      {clubs.length === 0 ? (
        <p className="no-clubs-message">No clubs found. Be the first to create one! 🎉</p>
      ) : (
        <div className="club-list"> {/* Container for club cards */}
          {clubs.map((club) => (
            <div key={club._id} className="club-card"> {/* Individual club card */}
              {club.image && (
                <img src={club.image} alt={club.name} className="club-image" />
              )}
              <div className="club-info">
                <h3 className="club-name">{club.name}</h3>
                <p className="club-description">{club.description}</p>
                <p className="club-meta">
                  <strong>President:</strong> <span>{club.president}</span>
                </p>
                <p className="club-meta">
                  <strong>Members:</strong> <span>{club.membersCount}</span>
                </p>
                <button
                  onClick={() => handleDelete(club._id)}
                  className="delete-button" // Reusing delete button style from Forum
                >
                  Delete Club
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Clubs;