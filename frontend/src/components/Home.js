import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <div className="home-content">
        <header className="home-header">
          <h1 className="home-title">Elior Rabanian</h1>
          <p className="home-subtitle">Full Stack Developer</p>
        </header>

        <section className="home-about">
          <p>
            Welcome to my portfolio. I build modern web applications
            with a focus on clean code and great user experience.
          </p>
        </section>

        <section className="home-projects">
          <h2>Projects</h2>
          <div className="project-card">
            <h3>Anduril Contracts Tracking System</h3>
            <p>
              A full-stack application for tracking and analyzing government contracts
              with real-time data integration, advanced analytics, and interactive visualizations.
            </p>
            <div className="project-tech">
              <span className="tech-tag">React</span>
              <span className="tech-tag">Node.js</span>
              <span className="tech-tag">Express</span>
              <span className="tech-tag">Recharts</span>
            </div>
            <Link to="/anduril" className="project-button">
              View Project
            </Link>
          </div>
        </section>

        <footer className="home-footer">
          <p>&copy; 2024 Elior Rabanian. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default Home;
