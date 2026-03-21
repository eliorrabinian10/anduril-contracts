import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import ContractsList from './components/ContractsList';
import Analytics from './components/Analytics';
import Search from './components/Search';
import './App.css';

function AppContent() {
  const location = useLocation();
  const isAndurilRoute = location.pathname.startsWith('/anduril');

  return (
    <div className="App">
      {isAndurilRoute && (
        <nav className="navbar">
          <div className="nav-container">
            <div className="nav-brand">
              <div className="nav-text">
                <h1>Elior Rabinian</h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <img src="/anduril-logo.png" alt="Anduril" style={{ height: '20px', width: 'auto' }} />
                  <p>Anduril Contracts - Contract Tracking & Analysis</p>
                </div>
              </div>
            </div>
            <div className="nav-links">
              <Link to="/anduril" className="nav-link">Dashboard</Link>
              <Link to="/anduril/contracts" className="nav-link">Contracts</Link>
              <Link to="/anduril/analytics" className="nav-link">Analytics</Link>
              <Link to="/anduril/search" className="nav-link">Search</Link>
              <Link to="/" className="nav-link nav-link-home">← Home</Link>
            </div>
          </div>
        </nav>
      )}

      <main className={isAndurilRoute ? "main-content" : "main-content-full"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/anduril" element={<Dashboard />} />
          <Route path="/anduril/contracts" element={<ContractsList />} />
          <Route path="/anduril/analytics" element={<Analytics />} />
          <Route path="/anduril/search" element={<Search />} />
        </Routes>
      </main>

      {isAndurilRoute && (
        <footer className="footer">
          <p>© 2026 Elior Rabinian - Independent Anduril Contract Analysis Platform</p>
        </footer>
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
