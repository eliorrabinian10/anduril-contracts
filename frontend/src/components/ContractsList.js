import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ContractsList.css';

const API_URL = process.env.REACT_APP_API_URL || '/api';

function ContractsList() {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('amount');
  const [sortOrder, setSortOrder] = useState('desc');

  useEffect(() => {
    fetchContracts();
  }, [page]);

  const fetchContracts = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(`${API_URL}/contracts`, {
        params: { page, limit: 50 }
      });

      setContracts(response.data.results || []);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching contracts:', err);
      setError('Error loading contracts');
      setLoading(false);
    }
  };

  const formatCurrency = (value) => {
    const numValue = parseFloat(value) || 0;
    if (numValue >= 1e9) return `$${(numValue / 1e9).toFixed(2)}B`;
    if (numValue >= 1e6) return `$${(numValue / 1e6).toFixed(2)}M`;
    if (numValue >= 1e3) return `$${(numValue / 1e3).toFixed(2)}K`;
    return `$${numValue.toFixed(2)}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US');
  };

  const sortContracts = (contractsToSort) => {
    return [...contractsToSort].sort((a, b) => {
      let aVal, bVal;

      switch (sortBy) {
        case 'amount':
          aVal = parseFloat(a['Award Amount']) || 0;
          bVal = parseFloat(b['Award Amount']) || 0;
          break;
        case 'date':
          aVal = new Date(a['Start Date'] || 0);
          bVal = new Date(b['Start Date'] || 0);
          break;
        case 'agency':
          aVal = a['Awarding Agency'] || '';
          bVal = b['Awarding Agency'] || '';
          break;
        default:
          return 0;
      }

      if (sortOrder === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const sortedContracts = sortContracts(contracts);

  if (loading) {
    return <div className="loading">Loading contracts</div>;
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error">{error}</div>
        <button className="btn btn-primary" onClick={fetchContracts}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="contracts-list">
      <div className="list-header">
        <h2>Contracts List</h2>
        <div className="sort-controls">
          <label>Sort by:</label>
          <button
            className={`btn ${sortBy === 'amount' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => handleSort('amount')}
          >
            Amount {sortBy === 'amount' && (sortOrder === 'asc' ? '↑' : '↓')}
          </button>
          <button
            className={`btn ${sortBy === 'date' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => handleSort('date')}
          >
            Date {sortBy === 'date' && (sortOrder === 'asc' ? '↑' : '↓')}
          </button>
          <button
            className={`btn ${sortBy === 'agency' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => handleSort('agency')}
          >
            Agency {sortBy === 'agency' && (sortOrder === 'asc' ? '↑' : '↓')}
          </button>
        </div>
      </div>

      <div className="contracts-grid">
        {sortedContracts.map((contract, index) => (
          <div key={index} className="contract-card">
            <div className="contract-header">
              <h3>{contract['Recipient Name'] || 'Anduril Industries'}</h3>
              <span className="contract-amount">{formatCurrency(contract['Award Amount'])}</span>
            </div>

            <div className="contract-details">
              <div className="detail-row">
                <strong>Contract ID:</strong>
                <span>{contract['Award ID'] || 'N/A'}</span>
              </div>

              <div className="detail-row">
                <strong>Agency:</strong>
                <span>{contract['Awarding Agency'] || 'N/A'}</span>
              </div>

              {contract['Awarding Sub Agency'] && (
                <div className="detail-row">
                  <strong>Sub-Agency:</strong>
                  <span>{contract['Awarding Sub Agency']}</span>
                </div>
              )}

              <div className="detail-row">
                <strong>Contract Type:</strong>
                <span>{contract['Award Type'] || 'N/A'}</span>
              </div>

              <div className="detail-row">
                <strong>Start Date:</strong>
                <span>{formatDate(contract['Start Date'])}</span>
              </div>

              <div className="detail-row">
                <strong>End Date:</strong>
                <span>{formatDate(contract['End Date'])}</span>
              </div>

              {contract['Description'] && (
                <div className="detail-row full-width">
                  <strong>Description:</strong>
                  <p className="contract-description">{contract['Description']}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {sortedContracts.length === 0 && (
        <div className="no-data">No contracts found</div>
      )}

      <div className="pagination">
        <button
          className="btn btn-secondary"
          onClick={() => setPage(Math.max(1, page - 1))}
          disabled={page === 1}
        >
          ← Previous
        </button>
        <span className="page-info">Page {page}</span>
        <button
          className="btn btn-secondary"
          onClick={() => setPage(page + 1)}
          disabled={contracts.length < 50}
        >
          Next →
        </button>
      </div>
    </div>
  );
}

export default ContractsList;
