import React, { useState } from 'react';
import axios from 'axios';
import './Search.css';

const API_URL = 'http://localhost:5001/api';

function Search() {
  const [searchParams, setSearchParams] = useState({
    keywords: ['Anduril'],
    startDate: '2015-01-01',
    endDate: new Date().toISOString().split('T')[0],
    minAmount: '',
    maxAmount: ''
  });

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleKeywordChange = (e) => {
    const keywords = e.target.value.split(',').map(k => k.trim()).filter(k => k);
    setSearchParams(prev => ({
      ...prev,
      keywords
    }));
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);
      setSearched(true);

      const response = await axios.post(`${API_URL}/contracts/search`, {
        keywords: searchParams.keywords,
        startDate: searchParams.startDate,
        endDate: searchParams.endDate,
        minAmount: searchParams.minAmount ? parseFloat(searchParams.minAmount) : undefined,
        maxAmount: searchParams.maxAmount ? parseFloat(searchParams.maxAmount) : undefined
      });

      setResults(response.data.results || []);
      setLoading(false);
    } catch (err) {
      console.error('Error searching contracts:', err);
      setError('Error searching contracts');
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSearchParams({
      keywords: ['Anduril'],
      startDate: '2015-01-01',
      endDate: new Date().toISOString().split('T')[0],
      minAmount: '',
      maxAmount: ''
    });
    setResults([]);
    setSearched(false);
    setError(null);
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

  const exportToCSV = () => {
    if (results.length === 0) return;

    const headers = ['Award ID', 'Recipient', 'Amount', 'Start Date', 'End Date', 'Agency', 'Type'];
    const csvContent = [
      headers.join(','),
      ...results.map(contract => [
        contract['Award ID'] || '',
        contract['Recipient Name'] || '',
        contract['Award Amount'] || '',
        contract['Start Date'] || '',
        contract['End Date'] || '',
        contract['Awarding Agency'] || '',
        contract['Award Type'] || ''
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `anduril-contracts-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const totalValue = results.reduce((sum, contract) =>
    sum + (parseFloat(contract['Award Amount']) || 0), 0
  );

  return (
    <div className="search-page">
      <h2>Advanced Search</h2>

      <div className="search-container">
        <form onSubmit={handleSearch} className="search-form">
          <div className="form-group">
            <label>Search Keywords (comma-separated)</label>
            <input
              type="text"
              value={searchParams.keywords.join(', ')}
              onChange={handleKeywordChange}
              placeholder="Anduril, Defense, Technology"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Start Date</label>
              <input
                type="date"
                name="startDate"
                value={searchParams.startDate}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>End Date</label>
              <input
                type="date"
                name="endDate"
                value={searchParams.endDate}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Minimum Amount ($)</label>
              <input
                type="number"
                name="minAmount"
                value={searchParams.minAmount}
                onChange={handleInputChange}
                placeholder="0"
              />
            </div>

            <div className="form-group">
              <label>Maximum Amount ($)</label>
              <input
                type="number"
                name="maxAmount"
                value={searchParams.maxAmount}
                onChange={handleInputChange}
                placeholder="No limit"
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Searching...' : '🔍 Search'}
            </button>
            <button type="button" className="btn btn-secondary" onClick={handleReset}>
              🔄 Reset
            </button>
          </div>
        </form>

        {error && <div className="error">{error}</div>}

        {searched && !loading && (
          <div className="search-results">
            <div className="results-header">
              <div className="results-summary">
                <h3>Found {results.length} contracts</h3>
                <p>Total Value: {formatCurrency(totalValue)}</p>
              </div>
              {results.length > 0 && (
                <button className="btn btn-secondary" onClick={exportToCSV}>
                  📥 Export to CSV
                </button>
              )}
            </div>

            {results.length === 0 ? (
              <div className="no-results">
                <p>No contracts found matching search criteria</p>
                <p>Try adjusting your search parameters</p>
              </div>
            ) : (
              <div className="results-grid">
                {results.map((contract, index) => (
                  <div key={index} className="result-card">
                    <div className="result-header">
                      <h4>{contract['Recipient Name'] || 'Anduril Industries'}</h4>
                      <span className="result-amount">{formatCurrency(contract['Award Amount'])}</span>
                    </div>

                    <div className="result-details">
                      <div className="result-row">
                        <strong>ID:</strong>
                        <span>{contract['Award ID'] || 'N/A'}</span>
                      </div>

                      <div className="result-row">
                        <strong>Agency:</strong>
                        <span>{contract['Awarding Agency'] || 'N/A'}</span>
                      </div>

                      <div className="result-row">
                        <strong>Period:</strong>
                        <span>
                          {formatDate(contract['Start Date'])} - {formatDate(contract['End Date'])}
                        </span>
                      </div>

                      {contract['Description'] && (
                        <div className="result-description">
                          <strong>Description:</strong>
                          <p>{contract['Description'].substring(0, 150)}...</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
