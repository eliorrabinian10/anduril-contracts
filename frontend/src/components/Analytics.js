import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import './Analytics.css';

const API_URL = process.env.REACT_APP_API_URL || '/api';

function Analytics() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [yearlyData, setYearlyData] = useState([]);
  const [agencyData, setAgencyData] = useState([]);
  const [statistics, setStatistics] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [statsRes, yearlyRes, agencyRes] = await Promise.all([
        axios.get(`${API_URL}/statistics`),
        axios.get(`${API_URL}/contracts/by-year`),
        axios.get(`${API_URL}/contracts/by-agency`)
      ]);

      setStatistics(statsRes.data);
      setYearlyData(yearlyRes.data);
      setAgencyData(agencyRes.data);

      setLoading(false);
    } catch (err) {
      console.error('Error fetching analytics data:', err);
      setError('Error loading analytics data');
      setLoading(false);
    }
  };

  const formatCurrency = (value) => {
    if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
    if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
    if (value >= 1e3) return `$${(value / 1e3).toFixed(2)}K`;
    return `$${value.toFixed(2)}`;
  };

  const calculateGrowthRate = () => {
    if (yearlyData.length < 2) return 0;

    const sortedData = [...yearlyData].sort((a, b) => a.year - b.year);
    const currentYear = new Date().getFullYear();

    // Only calculate growth from historical data (not future projections)
    const historicalData = sortedData.filter(y => y.year <= currentYear);

    if (historicalData.length < 2) return 0;

    const firstYear = historicalData[0].totalValue;
    const lastYear = historicalData[historicalData.length - 1].totalValue;

    if (firstYear === 0) return 0;
    return ((lastYear - firstYear) / firstYear * 100).toFixed(2);
  };

  const calculateYearOverYearGrowth = () => {
    if (yearlyData.length < 2) return [];

    const sortedData = [...yearlyData].sort((a, b) => a.year - b.year);
    const currentYear = new Date().getFullYear();

    // Only calculate growth for historical years (not future)
    const historicalData = sortedData.filter(y => y.year <= currentYear);
    const growth = [];

    for (let i = 1; i < historicalData.length; i++) {
      const prevValue = historicalData[i - 1].totalValue;
      const currValue = historicalData[i].totalValue;
      const growthRate = prevValue > 0 ? ((currValue - prevValue) / prevValue * 100) : 0;

      growth.push({
        year: historicalData[i].year,
        growthRate: parseFloat(growthRate.toFixed(2)),
        value: currValue
      });
    }

    return growth;
  };

  const calculateTrend = () => {
    if (yearlyData.length < 3) return 'Insufficient data';

    const sortedData = [...yearlyData].sort((a, b) => a.year - b.year);
    const currentYear = new Date().getFullYear();

    // Use last 3 years of historical data
    const historicalData = sortedData.filter(y => y.year <= currentYear);
    const recentYears = historicalData.slice(-3);

    if (recentYears.length < 2) return 'Insufficient data';

    const values = recentYears.map(y => y.totalValue);
    const avgChange = (values[values.length - 1] - values[0]) / values[0];

    if (avgChange > 0.5) return 'Very Strong Growth 🚀';
    if (avgChange > 0.2) return 'Strong Growth 📈';
    if (avgChange > 0) return 'Growing 📊';
    if (avgChange > -0.2) return 'Stable ➡️';
    return 'Declining 📉';
  };

  const predictNextYear = () => {
    if (yearlyData.length < 4) return 0;

    const sortedData = [...yearlyData].sort((a, b) => a.year - b.year);
    const currentYear = new Date().getFullYear();

    // Get last 4 years of historical data (excluding future years)
    const historicalData = sortedData.filter(y => y.year <= currentYear && y.year >= currentYear - 4);

    if (historicalData.length < 2) return 0;

    // Calculate average growth rate from last 4 years
    let totalGrowth = 0;
    let growthCount = 0;

    for (let i = 1; i < historicalData.length; i++) {
      const prevValue = historicalData[i - 1].totalValue;
      const currValue = historicalData[i].totalValue;
      if (prevValue > 0) {
        totalGrowth += ((currValue - prevValue) / prevValue);
        growthCount++;
      }
    }

    const avgGrowthRate = growthCount > 0 ? totalGrowth / growthCount : 0;

    // Cap growth rate at reasonable levels (max 100% growth per year)
    const cappedGrowthRate = Math.min(avgGrowthRate, 1.0);

    // Find next year's data (if exists from long-term contracts)
    const nextYear = currentYear + 1;
    const nextYearData = sortedData.find(y => y.year === nextYear);

    // Use next year's secured value as baseline, or use current year
    const baselineValue = nextYearData ? nextYearData.totalValue :
                         (historicalData[historicalData.length - 1]?.totalValue || 0);

    // If we have secured future contracts and growth is positive, add expected growth
    if (cappedGrowthRate > 0 && nextYearData) {
      return baselineValue * (1 + cappedGrowthRate * 0.5); // More conservative with secured contracts
    }

    return baselineValue * (1 + cappedGrowthRate);
  };

  const growthData = calculateYearOverYearGrowth();

  const getSecuredFutureValue = () => {
    const currentYear = new Date().getFullYear();
    const futureYears = yearlyData.filter(y => y.year > currentYear);

    if (futureYears.length === 0) return 0;

    // Average value of secured future contracts
    const avgFuture = futureYears.reduce((sum, y) => sum + y.totalValue, 0) / futureYears.length;
    return avgFuture;
  };

  const securedBaseline = getSecuredFutureValue();

  if (loading) {
    return <div className="loading">Loading analytics data</div>;
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error">{error}</div>
        <button className="btn btn-primary" onClick={fetchData}>Try Again</button>
      </div>
    );
  }

  const growthRate = calculateGrowthRate();
  const trend = calculateTrend();
  const nextYearPrediction = predictNextYear();

  return (
    <div className="analytics">
      <div className="analytics-header">
        <h2>Advanced Financial Analytics</h2>
        <button className="btn btn-secondary" onClick={fetchData}>Refresh Data</button>
      </div>

      {/* Key Insights */}
      <div className="insights-grid">
        <div className="insight-card">
          <div className="insight-icon">📈</div>
          <div className="insight-content">
            <h3>Historical Growth Rate</h3>
            <p className="insight-value">{growthRate}%</p>
            <span className="insight-label">Since beginning of period</span>
          </div>
        </div>

        <div className="insight-card">
          <div className="insight-icon">🎯</div>
          <div className="insight-content">
            <h3>Current Trend</h3>
            <p className="insight-value">{trend}</p>
            <span className="insight-label">Last three years</span>
          </div>
        </div>

        <div className="insight-card">
          <div className="insight-icon">🔒</div>
          <div className="insight-content">
            <h3>Secured Baseline</h3>
            <p className="insight-value">{formatCurrency(securedBaseline)}/year</p>
            <span className="insight-label">Long-term contracts secured</span>
          </div>
        </div>

        <div className="insight-card">
          <div className="insight-icon">🔮</div>
          <div className="insight-content">
            <h3>Next Year Forecast</h3>
            <p className="insight-value">{formatCurrency(nextYearPrediction)}</p>
            <span className="insight-label">Baseline + expected growth</span>
          </div>
        </div>
      </div>

      {/* Advanced Charts */}
      <div className="analytics-charts">
        {/* Year over Year Growth */}
        <div className="chart-card">
          <h3>Year-over-Year Growth Rate (Historical)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={growthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis label={{ value: '%', angle: -90, position: 'insideLeft' }} />
              <Tooltip formatter={(value) => `${value}%`} />
              <Legend />
              <Bar dataKey="growthRate" fill="#1e90ff" name="Growth Rate (%)" />
            </BarChart>
          </ResponsiveContainer>
          <p style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.5rem', textAlign: 'center' }}>
            * Showing only historical year-over-year growth (excludes future projections)
          </p>
        </div>

        {/* Cumulative Value with Future Projection */}
        <div className="chart-card">
          <h3>Contract Value Over Time (Historical + Secured Future)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={yearlyData.map(y => ({
              ...y,
              isHistorical: y.year <= new Date().getFullYear(),
              isFuture: y.year > new Date().getFullYear()
            }))}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis tickFormatter={formatCurrency} />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Legend />
              <Area
                type="monotone"
                dataKey="totalValue"
                stroke="#1e90ff"
                fill="#1e90ff"
                fillOpacity={0.6}
                name="Contract Value"
              />
            </AreaChart>
          </ResponsiveContainer>
          <p style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.5rem', textAlign: 'center' }}>
            * Years {new Date().getFullYear() + 1}+ show secured long-term contract baseline
          </p>
        </div>

        {/* Average Contract Value */}
        <div className="chart-card">
          <h3>Average Contract Value by Year</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={yearlyData.map(year => ({
                ...year,
                avgValue: year.count > 0 ? year.totalValue / year.count : 0
              }))}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis tickFormatter={formatCurrency} />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Legend />
              <Line
                type="monotone"
                dataKey="avgValue"
                stroke="#4169e1"
                strokeWidth={3}
                name="Average per Contract"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Contracts Count Trend */}
        <div className="chart-card">
          <h3>Contracts Count Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={yearlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="count"
                stroke="#00bfff"
                fill="#00bfff"
                fillOpacity={0.6}
                name="Number of Contracts"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Statistics Table */}
      <div className="chart-card">
        <h3>Detailed Statistics by Government Agency</h3>
        <div className="table-container">
          <table className="analytics-table">
            <thead>
              <tr>
                <th>Government Agency</th>
                <th>Number of Contracts</th>
                <th>Total Value</th>
                <th>Average per Contract</th>
                <th>% of Total</th>
              </tr>
            </thead>
            <tbody>
              {agencyData.slice(0, 10).map((agency, index) => (
                <tr key={index}>
                  <td>{agency.agency}</td>
                  <td>{agency.count}</td>
                  <td>{formatCurrency(agency.totalValue)}</td>
                  <td>{formatCurrency(agency.totalValue / agency.count)}</td>
                  <td>
                    {((agency.totalValue / (statistics?.totalValue || 1)) * 100).toFixed(2)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
