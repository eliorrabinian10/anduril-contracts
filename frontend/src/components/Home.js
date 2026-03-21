import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      {/* Home Navbar */}
      <nav className="home-navbar">
        <div className="home-nav-container">
          <div className="home-nav-brand">ELIOR RABINIAN</div>
          <div className="home-nav-links">
            <a href="#about" className="home-nav-link">About</a>
            <a href="#projects" className="home-nav-link">Projects</a>
            <a href="#contact" className="home-nav-link">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">● FINANCE · TECHNOLOGY · INNOVATION</div>
          <h1 className="hero-title">
            BRIDGING<br />
            FINANCE & TECH<br />
            <span className="hero-title-highlight">WITH VISION.</span>
          </h1>
          <div className="hero-buttons">
            <a href="#projects" className="btn-primary">VIEW PROJECTS</a>
            <a href="#contact" className="btn-secondary">CONTACT ELIOR</a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="about-content-wrapper">
          <div className="about-text-section">
            <div className="about-badge">● ABOUT ME</div>
            <h2 className="section-title">
              MERGING FINANCIAL<br />
              EXPERTISE WITH<br />
              ENTREPRENEURIAL VISION.
            </h2>
            <p className="about-text">
              I am Elior Rabinian, an Investment Banking Analyst at KPMG Israel<br />
              specializing in financial modeling, deal execution, and strategic analysis.<br />
              Graduated Summa Cum Laude (GPA 4.0) from Bar Ilan University<br />
              with degrees in Accounting, Economics, and Business Administration.<br />
              <br />
              As Founder & CEO of Israel's next-generation real estate community,<br />
              I've built a thriving network of 1,000+ professionals, produced a podcast<br />
              with 5,000+ listeners, and hosted a 300-attendee conference.<br />
              <br />
              My focus: Venture Capital, emerging technologies, and the future of innovation—<br />
              where analytical rigor meets entrepreneurial execution.
            </p>
          </div>
          <div className="about-images">
            <img src="/elior-photo-1.jpg" alt="Elior Rabinian speaking" className="about-image" />
            <img src="/elior-photo-2.jpg" alt="Elior Rabinian presenting" className="about-image" />
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects-section">
        <div className="projects-header">
          <div className="section-number">02 — PERSONAL PORTFOLIO</div>
          <h2 className="projects-title">SELECTED WORKS</h2>
        </div>

        <div className="project-card">
          <div className="project-label">DEFENSE TECHNOLOGY — ANALYTICS PLATFORM</div>
          <h3 className="project-title">ANDURIL CONTRACTS TRACKER</h3>
          <p className="project-description">
            Built a comprehensive full-stack contract tracking and analysis system
            for Anduril Industries defense contracts. Features real-time data integration
            from USASpending.gov API, advanced financial analytics, interactive data
            visualizations, and intelligent search capabilities. Combines technical
            execution with financial analysis expertise to deliver actionable insights
            on defense industry contract trends and opportunities.
          </p>
          <div className="project-stats">
            <div className="stat-item">
              <div className="stat-label">TECH STACK</div>
              <div className="stat-value">Full Stack</div>
            </div>
            <div className="stat-item">
              <div className="stat-label">STATUS</div>
              <div className="stat-value">Live</div>
            </div>
            <div className="stat-item">
              <div className="stat-label">YEAR</div>
              <div className="stat-value">2026</div>
            </div>
          </div>
          <div className="project-tech-tags">
            <span className="tech-tag">REACT</span>
            <span className="tech-tag">NODE.JS</span>
            <span className="tech-tag">EXPRESS</span>
            <span className="tech-tag">API INTEGRATION</span>
            <span className="tech-tag">FINANCIAL ANALYTICS</span>
          </div>
          <Link to="/anduril" className="project-explore-btn">
            EXPLORE PROJECT →
          </Link>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <h2 className="contact-title">LET'S CONNECT</h2>
        <p className="contact-subtitle">
          Interested in discussing opportunities in Venture Capital,<br />
          Finance, Technology, or collaboration on innovative projects?<br />
          Let's build the future together.
        </p>
        <div className="contact-buttons">
          <a href="mailto:eliorrabinian@gmail.com" className="btn-primary">SEND MESSAGE</a>
          <a href="https://www.linkedin.com/in/eliorrabanian/" target="_blank" rel="noopener noreferrer" className="btn-secondary">
            LINKEDIN
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <div className="footer-content">
          <div className="footer-left">ELIOR RABINIAN</div>
          <div className="footer-right">&copy; 2026 All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
