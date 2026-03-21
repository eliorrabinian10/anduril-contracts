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
              <img src="/anduril-logo.png" alt="Anduril" className="nav-logo" />
              <div className="nav-text">
                <h1>Anduril Contracts</h1>
                <p>Contract Tracking & Analysis</p>
              </div>
            </div>
            <div className="nav-links">
              <Link to="/" className="nav-link nav-link-home">← Home</Link>
              <Link to="/anduril" className="nav-link">Dashboard</Link>
              <Link to="/anduril/contracts" className="nav-link">Contracts</Link>
              <Link to="/anduril/analytics" className="nav-link">Analytics</Link>
              <Link to="/anduril/search" className="nav-link">Search</Link>
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
          <p>© 2024 Anduril Industries Contract Tracking System</p>
          <p className="footer-credit">Developed by Elior Rabanian</p>
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
