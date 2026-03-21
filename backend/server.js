const express = require('express');
const cors = require('cors');
const axios = require('axios');
const NodeCache = require('node-cache');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Cache for 1 hour (3600 seconds)
const cache = new NodeCache({ stdTTL: 3600 });

// Store for manually added contracts
let manualContracts = [];

// Middleware
app.use(cors());
app.use(express.json());

// USASpending.gov API base URL
const USA_SPENDING_API = 'https://api.usaspending.gov/api/v2';

// Anduril's official Recipient ID from USASpending.gov
const ANDURIL_RECIPIENT_ID = '7bd32b33-cfcf-89fd-1af4-56debbb1342f-P';

// Helper function to get ALL Anduril contracts (fetches multiple pages + manual contracts)
async function getAllAndurilContracts() {
  const cacheKey = 'anduril_all_contracts';
  const cached = cache.get(cacheKey);

  if (cached) {
    console.log('Returning cached data (including manual contracts)');
    // Merge cached API data with manual contracts
    return {
      ...cached,
      results: [...manualContracts, ...cached.results]
    };
  }

  try {
    console.log('Fetching ALL Anduril contracts from USASpending.gov...');
    let allContracts = [];
    let page = 1;
    let hasMore = true;
    const limit = 100;

    while (hasMore) {
      const response = await axios.post(`${USA_SPENDING_API}/search/spending_by_award/`, {
        filters: {
          keywords: ['ANDURIL INDUSTRIES'],  // Use exact company name
          recipient_search_text: ['ANDURIL'],  // Additional filter
          time_period: [
            {
              start_date: '2017-01-01',  // Anduril was founded in 2017
              end_date: new Date().toISOString().split('T')[0]
            }
          ],
          award_type_codes: ['A', 'B', 'C', 'D'] // Contract types
        },
        fields: [
          'Award ID',
          'Recipient Name',
          'Award Amount',
          'Start Date',
          'End Date',
          'Awarding Agency',
          'Awarding Sub Agency',
          'Award Type',
          'Description'
        ],
        page: page,
        limit: limit,
        sort: 'Award Amount',
        order: 'desc'
      });

      const results = response.data.results || [];

      // Filter to only include Anduril Industries
      const andurilResults = results.filter(contract => {
        const recipientName = (contract['Recipient Name'] || '').toUpperCase();
        return recipientName.includes('ANDURIL');
      });

      allContracts = allContracts.concat(andurilResults);

      console.log(`Fetched page ${page}: ${andurilResults.length} Anduril contracts (Total so far: ${allContracts.length})`);

      // Check if there are more pages
      hasMore = results.length === limit;
      page++;

      // Safety limit to prevent infinite loops (increased for more contracts)
      if (page > 15) {
        console.log('Reached page limit, stopping...');
        break;
      }
    }

    const finalData = {
      results: allContracts,
      page_metadata: {
        total: allContracts.length,
        page: 1,
        hasNext: false
      }
    };

    console.log(`✅ Total Anduril contracts fetched: ${allContracts.length}`);
    cache.set(cacheKey, finalData);

    // Merge with manual contracts
    return {
      ...finalData,
      results: [...manualContracts, ...allContracts]
    };
  } catch (error) {
    console.error('Error fetching from USASpending API:', error.message);
    throw error;
  }
}

// Search contracts with filters (for search page)
async function searchAndurilContracts(params = {}) {
  const cacheKey = `anduril_search_${JSON.stringify(params)}`;
  const cached = cache.get(cacheKey);

  if (cached) {
    console.log('Returning cached search data');
    return cached;
  }

  try {
    const response = await axios.post(`${USA_SPENDING_API}/search/spending_by_award/`, {
      filters: {
        recipient_id: ANDURIL_RECIPIENT_ID,
        time_period: params.time_period || [
          {
            start_date: '2015-01-01',
            end_date: new Date().toISOString().split('T')[0]
          }
        ],
        award_type_codes: ['A', 'B', 'C', 'D']
      },
      fields: [
        'Award ID',
        'Recipient Name',
        'Award Amount',
        'Start Date',
        'End Date',
        'Awarding Agency',
        'Awarding Sub Agency',
        'Award Type',
        'Description'
      ],
      page: params.page || 1,
      limit: params.limit || 100,
      sort: 'Award Amount',
      order: 'desc'
    });

    cache.set(cacheKey, response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching from USASpending API:', error.message);
    throw error;
  }
}

// Routes

// Get all Anduril contracts (now fetches ALL contracts)
app.get('/api/contracts', async (req, res) => {
  try {
    const { page = 1, limit = 50 } = req.query;

    // Get ALL contracts
    const allData = await getAllAndurilContracts();

    // Paginate on server side
    const startIndex = (parseInt(page) - 1) * parseInt(limit);
    const endIndex = startIndex + parseInt(limit);
    const paginatedResults = allData.results.slice(startIndex, endIndex);

    res.json({
      results: paginatedResults,
      page_metadata: {
        total: allData.results.length,
        page: parseInt(page),
        limit: parseInt(limit),
        hasNext: endIndex < allData.results.length,
        hasPrevious: parseInt(page) > 1
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch contracts', message: error.message });
  }
});

// Get contract statistics (now uses ALL contracts)
app.get('/api/statistics', async (req, res) => {
  try {
    const data = await getAllAndurilContracts();

    if (!data.results) {
      return res.json({
        totalContracts: 0,
        totalValue: 0,
        averageValue: 0,
        byYear: {},
        byAgency: {}
      });
    }

    const stats = {
      totalContracts: data.results.length,
      totalValue: data.results.reduce((sum, contract) => sum + (parseFloat(contract['Award Amount']) || 0), 0),
      averageValue: 0,
      byYear: {},
      byAgency: {}
    };

    stats.averageValue = stats.totalContracts > 0 ? stats.totalValue / stats.totalContracts : 0;

    // Group by year
    data.results.forEach(contract => {
      const year = contract['Start Date'] ? new Date(contract['Start Date']).getFullYear() : 'Unknown';
      stats.byYear[year] = (stats.byYear[year] || 0) + (parseFloat(contract['Award Amount']) || 0);
    });

    // Group by agency
    data.results.forEach(contract => {
      const agency = contract['Awarding Agency'] || 'Unknown';
      stats.byAgency[agency] = (stats.byAgency[agency] || 0) + (parseFloat(contract['Award Amount']) || 0);
    });

    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch statistics', message: error.message });
  }
});

// Get contracts by year (now uses ALL contracts with multi-year distribution)
app.get('/api/contracts/by-year', async (req, res) => {
  try {
    const data = await getAllAndurilContracts();

    const byYear = {};

    if (data.results) {
      data.results.forEach(contract => {
        const startDate = contract['Start Date'] ? new Date(contract['Start Date']) : null;
        const endDate = contract['End Date'] ? new Date(contract['End Date']) : null;
        const amount = parseFloat(contract['Award Amount']) || 0;

        if (!startDate) {
          // If no start date, add to 'Unknown'
          if (!byYear['Unknown']) {
            byYear['Unknown'] = { year: 'Unknown', count: 0, totalValue: 0, contracts: [] };
          }
          byYear['Unknown'].count++;
          byYear['Unknown'].totalValue += amount;
          byYear['Unknown'].contracts.push(contract);
          return;
        }

        const startYear = startDate.getFullYear();
        const endYear = endDate ? endDate.getFullYear() : startYear;

        // If multi-year contract, distribute the value across years
        if (endYear > startYear) {
          const yearSpan = endYear - startYear + 1;
          const amountPerYear = amount / yearSpan;

          for (let year = startYear; year <= endYear; year++) {
            if (!byYear[year]) {
              byYear[year] = { year, count: 0, totalValue: 0, contracts: [] };
            }
            // Only count the contract once in the first year
            if (year === startYear) {
              byYear[year].count++;
              byYear[year].contracts.push(contract);
            }
            byYear[year].totalValue += amountPerYear;
          }
        } else {
          // Single year contract
          if (!byYear[startYear]) {
            byYear[startYear] = { year: startYear, count: 0, totalValue: 0, contracts: [] };
          }
          byYear[startYear].count++;
          byYear[startYear].totalValue += amount;
          byYear[startYear].contracts.push(contract);
        }
      });
    }

    const sortedYears = Object.values(byYear).sort((a, b) => a.year - b.year);
    res.json(sortedYears);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch contracts by year', message: error.message });
  }
});

// Get contracts by agency (now uses ALL contracts)
app.get('/api/contracts/by-agency', async (req, res) => {
  try {
    const data = await getAllAndurilContracts();

    const byAgency = {};

    if (data.results) {
      data.results.forEach(contract => {
        const agency = contract['Awarding Agency'] || 'Unknown';
        if (!byAgency[agency]) {
          byAgency[agency] = {
            agency,
            count: 0,
            totalValue: 0
          };
        }
        byAgency[agency].count++;
        byAgency[agency].totalValue += parseFloat(contract['Award Amount']) || 0;
      });
    }

    const sortedAgencies = Object.values(byAgency).sort((a, b) => b.totalValue - a.totalValue);
    res.json(sortedAgencies);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch contracts by agency', message: error.message });
  }
});

// Search contracts with filters
app.post('/api/contracts/search', async (req, res) => {
  try {
    const { keywords, startDate, endDate, minAmount, maxAmount } = req.body;

    const params = {};

    if (keywords && keywords.length > 0) {
      params.keywords = keywords;
    }

    if (startDate && endDate) {
      params.time_period = [{
        start_date: startDate,
        end_date: endDate
      }];
    }

    const data = await searchAndurilContracts(params);

    // Filter by amount if specified
    let results = data.results || [];

    if (minAmount || maxAmount) {
      results = results.filter(contract => {
        const amount = parseFloat(contract['Award Amount']) || 0;
        if (minAmount && amount < minAmount) return false;
        if (maxAmount && amount > maxAmount) return false;
        return true;
      });
    }

    res.json({ ...data, results });
  } catch (error) {
    res.status(500).json({ error: 'Failed to search contracts', message: error.message });
  }
});

// Clear cache endpoint
app.post('/api/cache/clear', (req, res) => {
  cache.flushAll();
  res.json({ message: 'Cache cleared successfully' });
});

// Add manual contract
app.post('/api/contracts/manual', (req, res) => {
  try {
    const contract = req.body;

    // Validate required fields
    if (!contract['Award ID'] || !contract['Award Amount']) {
      return res.status(400).json({ error: 'Missing required fields: Award ID and Award Amount are required' });
    }

    // Add metadata
    contract._manual = true;
    contract._addedAt = new Date().toISOString();

    // Add to manual contracts array (at the beginning for visibility)
    manualContracts.unshift(contract);

    // Clear cache to force refresh
    cache.flushAll();

    console.log(`✅ Manual contract added: ${contract['Award ID']} - $${contract['Award Amount']}`);

    res.json({
      message: 'Contract added successfully',
      contract: contract,
      totalManualContracts: manualContracts.length
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add contract', message: error.message });
  }
});

// Get manual contracts
app.get('/api/contracts/manual', (req, res) => {
  res.json({
    count: manualContracts.length,
    contracts: manualContracts
  });
});

// Delete manual contract
app.delete('/api/contracts/manual/:awardId', (req, res) => {
  try {
    const awardId = req.params.awardId;
    const initialLength = manualContracts.length;

    manualContracts = manualContracts.filter(c => c['Award ID'] !== awardId);

    if (manualContracts.length < initialLength) {
      cache.flushAll();
      res.json({
        message: 'Contract deleted successfully',
        deleted: true,
        totalManualContracts: manualContracts.length
      });
    } else {
      res.status(404).json({ error: 'Contract not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete contract', message: error.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Serve static files from React build in production
if (process.env.NODE_ENV === 'production') {
  const buildPath = path.join(__dirname, '../frontend/build');
  app.use(express.static(buildPath));

  // Handle React routing - return index.html for all non-API routes
  app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`🚀 Anduril Contracts API Server running on port ${PORT}`);
  console.log(`📊 API endpoint: http://localhost:${PORT}/api`);
  if (process.env.NODE_ENV === 'production') {
    console.log(`🌐 Serving frontend from: ${path.join(__dirname, '../frontend/build')}`);
  }
});
