import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './NoteBuddy.css';

function NoteBuddy() {
  useEffect(() => {
    // Disable smooth scrolling temporarily and scroll to top
    const html = document.documentElement;
    const originalBehavior = html.style.scrollBehavior;
    html.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0);
    // Restore original behavior after a short delay
    setTimeout(() => {
      html.style.scrollBehavior = originalBehavior;
    }, 100);
  }, []);

  return (
    <div className="notebuddy-container">
      {/* Navbar */}
      <nav className="notebuddy-navbar">
        <div className="notebuddy-nav-content">
          <div className="notebuddy-logo-section">
            <div className="notebuddy-logo-nav">NoteBuddy</div>
            <div className="notebuddy-subtitle">Your AI meeting companion</div>
          </div>
          <Link to="/#projects" className="notebuddy-back-btn">← Back to Portfolio</Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="notebuddy-main">
        {/* Left Side - Phone Mockup */}
        <div className="notebuddy-mockup-section">
          <div className="notebuddy-phone-frame">
            <div className="notebuddy-phone-header">
              <div className="phone-header-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="#e8d4a0" strokeWidth="2"/>
                  <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke="#e8d4a0" strokeWidth="2"/>
                </svg>
              </div>
              <div className="phone-header-title">NoteBuddy</div>
            </div>

            <div className="notebuddy-phone-content">
              <div className="phone-record-section">
                <div className="phone-record-label">Click to start recording</div>
                <div className="phone-record-button">
                  <div className="record-button-inner"></div>
                </div>
              </div>

              <div className="phone-transcription">
                <div className="phone-section-title">Transcription</div>
                <div className="phone-transcription-lines">
                  <div className="transcription-line"></div>
                  <div className="transcription-line"></div>
                  <div className="transcription-line short"></div>
                </div>
              </div>

              <div className="phone-ai-section">
                <div className="phone-section-header">
                  <span className="phone-section-title">AI Summary</span>
                  <div className="phone-section-badges">
                    <span className="phone-badge">Key Points</span>
                    <span className="phone-badge">Summary</span>
                    <span className="phone-badge">Tasks</span>
                  </div>
                </div>
                <div className="phone-ai-content">
                  <div className="ai-content-line"></div>
                  <div className="ai-content-line"></div>
                  <div className="ai-content-line"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Hero Content */}
        <div className="notebuddy-hero-section">
          <div className="notebuddy-ai-badge">
            ⚡ AI-Powered Transcription & Summarization
          </div>

          <h1 className="notebuddy-hero-title">
            Record.<br />
            Transcribe. Summarize.
          </h1>

          <p className="notebuddy-hero-description">
            Turn every meeting, lecture, or conversation into accurate transcription and smart summaries<br />
            — in any language, anywhere.
          </p>

          <button className="notebuddy-coming-soon-btn">
            Coming Soon
          </button>

          <p className="notebuddy-privacy-text">
            Join the waitlist • No login required • Privacy first
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="notebuddy-footer">
        <div className="notebuddy-footer-content">
          <div className="footer-left-text">NoteBuddy</div>
          <div className="footer-right-text">© 2026 Elior Rabinian</div>
        </div>
      </footer>
    </div>
  );
}

export default NoteBuddy;
