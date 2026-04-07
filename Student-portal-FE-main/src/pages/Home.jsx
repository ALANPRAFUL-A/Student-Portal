// src/pages/Home.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import "../styles/Home.css"; // Ensure this path is correct

function Home({ student }) { // Receive student prop
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Function to handle clicks on feature cards
  const handleFeatureClick = (path) => {
    if (!student) {
      // If not logged in, redirect to login and pass the intended path
      // The 'state' object allows us to pass data to the target route
      navigate('/login', { state: { from: path } });
    } else {
      // If logged in, navigate directly to the feature page
      navigate(path);
    }
  };

  return (
    <div className="home-container">
      <div className="home-content">
        <h2 className="home-main-heading animate-fade-in-down">
          🎓 Welcome to the Student Portal
        </h2>
        <p className="home-intro-paragraph animate-fade-in delay-200">
          Empowering students to connect, grow, and thrive — all in one place. Explore our features below!
        </p>

        <h3 className="home-sub-heading animate-fade-in delay-400">
          Quick Access:
        </h3>
        <div className="feature-grid">
          {/* Forum Link Card - now a clickable div */}
          <div
            className="feature-card feature-card-blue animate-fade-in delay-500"
            onClick={() => handleFeatureClick('/forum')}
            role="button" // Semantic role for accessibility
            tabIndex="0" // Makes the div focusable and keyboard-navigable
          >
            <h4 className="feature-title">
              <span className="feature-icon feature-icon-blue">🌐</span> Forum
            </h4>
            <p className="feature-description">Share thoughts, ask questions, and connect with peers.</p>
          </div>

          {/* Clubs Link Card */}
          <div
            className="feature-card feature-card-purple animate-fade-in delay-600"
            onClick={() => handleFeatureClick('/clubs')}
            role="button"
            tabIndex="0"
          >
            <h4 className="feature-title">
              <span className="feature-icon feature-icon-purple">🏆</span> Clubs
            </h4>
            <p className="feature-description">Discover and join student organizations and groups.</p>
          </div>

          {/* Events Link Card */}
          <div
            className="feature-card feature-card-green animate-fade-in delay-700"
            onClick={() => handleFeatureClick('/events')}
            role="button"
            tabIndex="0"
          >
            <h4 className="feature-title">
              <span className="feature-icon feature-icon-green">🎉</span> Events
            </h4>
            <p className="feature-description">Stay updated on campus events, workshops, and activities.</p>
          </div>

          {/* Job Board Link Card */}
          <div
            className="feature-card feature-card-yellow animate-fade-in delay-800"
            onClick={() => handleFeatureClick('/jobs')}
            role="button"
            tabIndex="0"
          >
            <h4 className="feature-title">
              <span className="feature-icon feature-icon-yellow">💼</span> Job Board
            </h4>
            <p className="feature-description">Find internships and job opportunities tailored for students.</p>
          </div>

          {/* Resume Checker Link Card */}
          <div
            className="feature-card feature-card-red animate-fade-in delay-900"
            onClick={() => handleFeatureClick('/resume-checker')}
            role="button"
            tabIndex="0"
          >
            <h4 className="feature-title">
              <span className="feature-icon feature-icon-red">📄</span> Resume Checker
            </h4>
            <p className="feature-description">Get feedback and improve your resume for career success.</p>
          </div>

          {/* Conditional Create Links (only if student is logged in) */}
          {student && (
            <>
              <div
                className="feature-card feature-card-indigo animate-fade-in delay-1000"
                onClick={() => handleFeatureClick('/new')}
                role="button"
                tabIndex="0"
              >
                <h4 className="feature-title">
                  <span className="feature-icon feature-icon-indigo">➕</span> Create Forum Post
                </h4>
                <p className="feature-description">Start a new discussion in the forum.</p>
              </div>
              <div
                className="feature-card feature-card-teal animate-fade-in delay-1100"
                onClick={() => handleFeatureClick('/clubs/new')}
                role="button"
                tabIndex="0"
              >
                <h4 className="feature-title">
                  <span className="feature-icon feature-icon-teal">➕</span> Create New Club
                </h4>
                <p className="feature-description">Register a new club for the community.</p>
              </div>
              <div
                className="feature-card feature-card-orange animate-fade-in delay-1200"
                onClick={() => handleFeatureClick('/events/new')}
                role="button"
                tabIndex="0"
              >
                <h4 className="feature-title">
                  <span className="feature-icon feature-icon-orange">➕</span> Create New Event
                </h4>
                <p className="feature-description">Announce an upcoming event for students.</p>
              </div>
              <div
                className="feature-card feature-card-lime animate-fade-in delay-1300"
                onClick={() => handleFeatureClick('/jobs/new')}
                role="button"
                tabIndex="0"
              >
                <h4 className="feature-title">
                  <span className="feature-icon feature-icon-lime">➕</span> Post Job Opportunity
                </h4>
                <p className="feature-description">Add a new job or internship listing.</p>
              </div>
            </>
          )}
        </div>

        {/* Conditional Call to Action Button */}
        {student ? (
          <Link to="/dashboard" className="action-button dashboard-button animate-fade-in delay-1400">
            Go to Your Dashboard
          </Link>
        ) : (
          <div className="action-buttons-group animate-fade-in delay-1400">
            <Link to="/login" className="action-button login-button">
              Login Now
            </Link>
            <Link to="/register" className="action-button register-button">
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
