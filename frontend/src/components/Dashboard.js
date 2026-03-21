import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import './Dashboard.css';

const API_URL = process.env.REACT_APP_API_URL || '/api';

const COLORS = ['#1e90ff', '#00bfff', '#4169e1', '#5f9ea0', '#20b2aa', '#48d1cc', '#00ced1'];

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statistics, setStatistics] = useState(null);
  const [yearlyData, setYearlyData] = useState([]);
  const [agencyData, setAgencyData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch all data in parallel
      const [statsRes, yearlyRes, agencyRes] = await Promise.all([
        axios.get(`${API_URL}/statistics`),
        axios.get(`${API_URL}/contracts/by-year`),
        axios.get(`${API_URL}/contracts/by-agency`)
      ]);

      setStatistics(statsRes.data);
      setYearlyData(yearlyRes.data);
      setAgencyData(agencyRes.data.slice(0, 7)); // Top 7 agencies

      setLoading(false);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Error loading data. Please ensure the server is running.');
      setLoading(false);
    }
  };

  const formatCurrency = (value) => {
    if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
    if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
    if (value >= 1e3) return `$${(value / 1e3).toFixed(2)}K`;
    return `$${value.toFixed(2)}`;
  };

  const formatNumber = (value) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  if (loading) {
    return <div className="loading">Loading data</div>;
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error">{error}</div>
        <button className="btn btn-primary" onClick={fetchData}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Anduril Contracts Dashboard</h2>
        <button className="btn btn-secondary" onClick={fetchData}>Refresh Data</button>
      </div>

      {/* Summary Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <h3>Total Contracts</h3>
            <p className="stat-value">{statistics?.totalContracts || 0}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <h3>Total Value</h3>
            <p className="stat-value">{formatCurrency(statistics?.totalValue || 0)}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📈</div>
          <div className="stat-content">
            <h3>Average per Contract</h3>
            <p className="stat-value">{formatCurrency(statistics?.averageValue || 0)}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🏛️</div>
          <div className="stat-content">
            <h3>Government Agencies</h3>
            <p className="stat-value">{Object.keys(statistics?.byAgency || {}).length}</p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="charts-grid">
        {/* Yearly Trend */}
        <div className="chart-card">
          <h3>Contracts by Year</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={yearlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis tickFormatter={formatCurrency} />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Legend />
              <Line
                type="monotone"
                dataKey="totalValue"
                stroke="#1e90ff"
                strokeWidth={3}
                name="Total Value"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Contracts Count by Year */}
        <div className="chart-card">
          <h3>Number of Contracts by Year</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={yearlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#4169e1" name="Number of Contracts" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Agency Distribution */}
        <div className="chart-card full-width">
          <h3>Distribution by Government Agencies (Top 7)</h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={agencyData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" tickFormatter={formatCurrency} />
              <YAxis type="category" dataKey="agency" width={200} />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Legend />
              <Bar dataKey="totalValue" fill="#1e90ff" name="Total Value">
                {agencyData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Agency Pie Chart */}
        <div className="chart-card">
          <h3>Relative Distribution by Agencies</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={agencyData}
                dataKey="totalValue"
                nameKey="agency"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={(entry) => entry.agency.substring(0, 15) + '...'}
              >
                {agencyData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatCurrency(value)} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Contracts Summary */}
      <div className="chart-card">
        <h3>Data Summary by Year</h3>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Year</th>
                <th>Number of Contracts</th>
                <th>Total Value</th>
                <th>Average per Contract</th>
              </tr>
            </thead>
            <tbody>
              {yearlyData.map((year) => (
                <tr key={year.year}>
                  <td>{year.year}</td>
                  <td>{year.count}</td>
                  <td>{formatCurrency(year.totalValue)}</td>
                  <td>{formatCurrency(year.totalValue / year.count)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
