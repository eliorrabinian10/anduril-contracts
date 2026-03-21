import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import ContractsList from './components/ContractsList';
import Analytics from './components/Analytics';
import Search from './components/Search';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
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
              <Link to="/" className="nav-link">Dashboard</Link>
              <Link to="/contracts" className="nav-link">Contracts</Link>
              <Link to="/analytics" className="nav-link">Analytics</Link>
              <Link to="/search" className="nav-link">Search</Link>
            </div>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/contracts" element={<ContractsList />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </main>

        <footer className="footer">
          <p>© 2024 Anduril Industries Contract Tracking System</p>
          <p className="footer-credit">Developed by Elior Rabanian</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
