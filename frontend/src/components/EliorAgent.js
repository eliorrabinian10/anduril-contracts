import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './EliorAgent.css';

function EliorAgent() {
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
    <div className="elior-agent-container">
      {/* Navbar */}
      <nav className="elior-agent-navbar">
        <div className="elior-agent-nav-content">
          <div className="elior-agent-logo-section">
            <div className="elior-agent-logo-nav">WhatsApp AI Assistant</div>
            <div className="elior-agent-subtitle">Your Personal AI Helper</div>
          </div>
          <Link to="/#projects" className="elior-agent-back-btn">← Back to Portfolio</Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="elior-agent-main">
        {/* Left Side - iPhone Mockup */}
        <div className="elior-agent-mockup-section">
          <div className="iphone-frame">
            {/* iPhone Camera Module */}
            <div className="iphone-camera-bump">
              <div className="camera-lens camera-main"></div>
              <div className="camera-lens camera-ultra"></div>
              <div className="camera-lens camera-tele"></div>
              <div className="camera-flash"></div>
            </div>
            {/* iPhone Notch */}
            <div className="iphone-notch"></div>

            {/* Status Bar */}
            <div className="iphone-status-bar">
              <span className="status-time">9:41</span>
              <div className="status-icons">
                <span style={{letterSpacing: '-1px'}}>●●●●●</span>
                <span>📶</span>
                <span>🔋</span>
              </div>
            </div>

            {/* WhatsApp Header */}
            <div className="whatsapp-header">
              <div className="wa-back-arrow">‹</div>
              <div className="wa-contact-info">
                <div className="wa-avatar">🤖</div>
                <div className="wa-contact-details">
                  <div className="wa-contact-name">AI Assistant <span className="wa-verified">👑</span></div>
                  <div className="wa-contact-status">online</div>
                </div>
              </div>
              <div className="wa-header-icons">
                <span>📹</span>
                <span>📞</span>
                <span>⋮</span>
              </div>
            </div>

            {/* Chat Area */}
            <div className="whatsapp-chat">
              <div className="chat-date">Today</div>

              <div className="chat-message user-message">
                <div className="message-bubble">Schedule meeting with Danny tomorrow 3pm</div>
                <div className="message-time">10:23</div>
              </div>

              <div className="chat-message agent-message">
                <div className="message-bubble">
                  ✅ Meeting with Danny — Sun, Apr 12 at 3pm
                </div>
                <div className="message-time">10:23</div>
              </div>

              <div className="chat-message agent-message">
                <div className="message-audio-recording">
                  <div className="audio-play-btn">▶</div>
                  <div className="audio-progress-bar">
                    <div className="audio-progress-fill"></div>
                  </div>
                  <span className="audio-duration">0:05</span>
                  <span className="audio-mic-icon">🎤</span>
                </div>
                <div className="message-time">10:24</div>
              </div>

              <div className="chat-message agent-message">
                <div className="message-bubble message-quoted">
                  <div className="quoted-header">Recorded: ₪85 — Food</div>
                </div>
                <div className="message-time">10:24</div>
              </div>

              <div className="chat-message user-message">
                <div className="message-bubble">How much this week?</div>
                <div className="message-time">10:25</div>
              </div>

              <div className="chat-message agent-message">
                <div className="message-bubble">
                  💸 This week: ₪1,240<br/>
                  Food 45% | Transport 28%
                </div>
                <div className="message-time">10:25</div>
              </div>
            </div>

            {/* Input Bar */}
            <div className="whatsapp-input-bar">
              <span className="input-icon">😊</span>
              <div className="input-field">Message</div>
              <span className="input-icon">📎</span>
              <span className="input-icon">📷</span>
              <div className="mic-button">🎤</div>
            </div>
          </div>
        </div>

        {/* Right Side - Hero Content */}
        <div className="elior-agent-hero-section">
          <div className="elior-agent-ai-badge">
            <span>🤖</span> AI-Powered Personal Assistant
          </div>

          <h1 className="elior-agent-hero-title">
            Your Smart WhatsApp Assistant.
          </h1>

          <p className="elior-agent-hero-description">
            Your personal AI assistant living in WhatsApp. Manage your calendar, track expenses, search the web, and get daily briefs. All through natural conversation, 24/7.
          </p>

          <button className="elior-agent-coming-soon-btn">
            Coming Soon
          </button>

          <p className="elior-agent-privacy-text">
            Join the waitlist • Private & Secure • Works in Hebrew & English
          </p>
        </div>
      </div>


      {/* Footer */}
      <footer className="elior-agent-footer">
        <div className="elior-agent-footer-content">
          <div className="footer-left-text-agent">WhatsApp AI Assistant</div>
          <div className="footer-right-text-agent">© 2026 Elior Rabinian</div>
        </div>
      </footer>
    </div>
  );
}

export default EliorAgent;
