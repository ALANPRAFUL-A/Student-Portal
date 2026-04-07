// About.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import "../styles/about.css";

function About() {
  return (
    <div className='about-container'>
      <h2 className='about-main-heading'>📘 About Us</h2>
      <p>Welcome to the Student Portal — your all-in-one platform built with passion to enhance student life on campus and beyond.</p>

      <h3 className='about-section-title'>👥 Who We Are</h3>
      <p>We're a team of student-focused developers who believe in creating meaningful digital experiences. This portal was crafted to bring students closer to opportunities, peers, and personal growth.</p>

      <h3 className='about-section-title'>🎯 Our Mission</h3>
      <p>To simplify how students connect, collaborate, and succeed — through forums, clubs, events, and job opportunities, all in one seamless interface.</p>

      <h3 className='about-section-title'>🌱 Why It Matters</h3>
      <p>We understand that student life is more than just academics. Our platform supports your journey by offering:</p>
      <ul className='about-feature-list'>
        <li><span className='about-icon'>🗣️</span> <p>A voice through the </p><Link to="/forum" className='about-link'>Forum</Link></li>
        <li><span className='about-icon'>🫂</span><p>Belonging through </p> <Link to="/clubs" className='about-link'>Clubs</Link></li>
        <li><span className='about-icon'>📅</span> <p>Excitement through </p><Link to="/events" className='about-link'>Events</Link></li>
        <li><span className='about-icon'>🧑‍💼</span> <p>Career prep through the </p><Link to="/jobs" className='about-link'>Job Board</Link></li>
        <li><span className='about-icon'>📄</span><p>Confidence with our </p> <Link to="/resume-checker" className='about-link'>Resume Checker</Link></li>
      </ul>
    </div>
  );
}
export default About;