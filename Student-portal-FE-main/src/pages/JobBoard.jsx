import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/JobBoard.css"; // Import the CSS file

function JobBoard() {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(""); // State for displaying errors

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("http://localhost:5500/api/jobs");
        setJobs(Array.isArray(res.data) ? res.data : []); // Ensure data is an array
      } catch (err) {
        console.error("Failed to fetch Jobs", err);
        setError("Could not load job postings. Please try again later.");
      }
    };

    fetchJobs();
  }, []);

  const handleDelete = async (id) => {
    try {
      // Using axios.delete for consistency with other components
      await axios.delete(`http://localhost:5500/api/jobs/${id}`);
      setJobs(jobs.filter((job) => job._id !== id));
      alert("Job posting deleted successfully! ✅"); // Optional: Add a success alert
    } catch (err) {
      console.error("Failed to delete Job", err);
      setError("Failed to delete job posting. Please try again.");
    }
  };

  return (
    <div className="jobboard-container"> {/* Main container class */}
      <h2 className="jobboard-heading">Career Opportunities 💼</h2> {/* Heading class */}

      {error && <p className="jobboard-error-message">{error}</p>} {/* Error message display */}

      {jobs.length === 0 ? (
        <p className="no-jobs-message">No job postings found. Check back soon for new opportunities! ✨</p>
      ) : (
        <div className="job-list"> {/* Container for job cards */}
          {jobs.map((job) => (
            <div key={job._id} className="job-card"> {/* Individual job card */}
              <div className="job-info">
                <h3 className="job-role">{job.role}</h3> {/* Job role class */}
                <p className="job-company">{job.company}</p> {/* Company class */}
                <p className="job-meta">
                  <strong>Location:</strong> <span>{job.location}</span>
                </p>
                <p className="job-meta">
                  <strong>Contact:</strong> <span>{job.contact}</span>
                </p>
                <button
                  onClick={() => handleDelete(job._id)}
                  className="delete-button" // Reusing delete button style from other pages
                >
                  Delete Job
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default JobBoard;