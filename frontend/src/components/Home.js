import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Home.css';

function Home() {
  const location = useLocation();

  useEffect(() => {
    // Scroll to the section if there's a hash in the URL
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        // Slower smooth scroll
        const targetPosition = element.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    }
  }, [location]);

  const handleLogoClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="home-container">
      {/* Home Navbar */}
      <nav className="home-navbar">
        <div className="home-nav-container">
          <button onClick={handleLogoClick} className="home-nav-brand">ELIOR RABINIAN</button>
          <div className="home-nav-links">
            <a href="#about" className="home-nav-link">BIO</a>
            <a href="#projects" className="home-nav-link">PROJECTS</a>
            <a href="#contact" className="home-nav-link">CONTACT</a>
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
          <h2 className="projects-title">SELECTED WORKS</h2>
        </div>

        <div className="projects-grid">
          <Link to="/anduril" className="project-grid-card project-grid-card-clickable">
            <div className="project-card-image project-card-image-anduril">
              <img src="/anduril.png" alt="Anduril" className="project-logo-img" />
            </div>
            <div className="project-card-content">
              <h3 className="project-card-title">Anduril Contracts</h3>
              <p className="project-card-description">
                Defense analytics platform with contract tracking and financial insights
              </p>
            </div>
          </Link>

          <Link to="/notebuddy" className="project-grid-card project-grid-card-clickable">
            <div className="project-card-image project-card-image-notebuddy">
              <div className="notebuddy-logo">NoteBuddy</div>
            </div>
            <div className="project-card-content">
              <h3 className="project-card-title">NoteBuddy</h3>
              <p className="project-card-description">
                AI-powered transcription, summarization, and task management system for meetings
              </p>
            </div>
          </Link>

          <Link to="/elior-agent" className="project-grid-card project-grid-card-clickable">
            <div className="project-card-image project-card-image-elior">
              <div className="elior-agent-logo">
                <span className="agent-icon">🤖</span>
                <span className="agent-text">WhatsApp AI Assistant</span>
              </div>
            </div>
            <div className="project-card-content">
              <h3 className="project-card-title">WhatsApp AI Assistant</h3>
              <p className="project-card-description">
                Personal AI assistant for calendar management, expense tracking, and smart automation
              </p>
            </div>
          </Link>

          <div className="project-grid-card">
            <div className="project-card-image">
              <img src="/project-4.jpg" alt="Project 4" />
            </div>
            <div className="project-card-content">
              <h3 className="project-card-title">Project Four</h3>
              <p className="project-card-description">
                Coming soon - innovative tech project
              </p>
            </div>
            <button className="project-card-link" disabled>
              Coming Soon
            </button>
          </div>
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
          <a href="https://www.linkedin.com/in/eliorrabanian" target="_blank" rel="noopener noreferrer" className="btn-secondary">
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
