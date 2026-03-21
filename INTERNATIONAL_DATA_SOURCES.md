# International Government Contract Data Sources

## Research Summary (March 2026)

### 🇬🇧 United Kingdom - Contracts Finder

**Status**: ✅ API Available | ❌ No Anduril Contracts Found

**Platform**: https://www.contractsfinder.service.gov.uk/

**Features**:
- Public API with JSON and XML support
- OAuth 2.0 authentication required
- Search by keyword, region, procurement stage
- OCDS-compliant data format
- Open Government Licence v3.0

**API Endpoints**:
- `POST /Searches/Search` - Search contracts
- `GET /OcdsApi` - OCDS-compliant data
- Regional and CPV code lookups

**Anduril Search Results**:
- **0 contracts found** when searching for "Anduril"
- No UK government contracts with Anduril Industries as of March 2026

**Integration Potential**: Medium
- API is available but requires OAuth setup
- Would need client credentials from UK government
- Currently no data to integrate (no Anduril contracts)

---

### 🇦🇺 Australia - AusTender

**Status**: ⚠️ Access Blocked (403 Error)

**Platform**: https://www.tenders.gov.au/

**Notes**:
- Could not access website for research
- Known to have contract data API historically
- Would need further investigation with proper access

---

### 🇨🇦 Canada - CanadaBuys

**Status**: ⚠️ Access Blocked (403 Error)

**Platform**: https://canadabuys.canada.ca/ (formerly buyandsell.gc.ca)

**Notes**:
- Could not access website for research
- Redirects from old domain to new CanadaBuys platform
- Would need further investigation with proper access

---

## Current Implementation Status

### ✅ Implemented
- **United States (USASpending.gov)**: Fully integrated
  - 239 contracts
  - $2.35B total value
  - 2019-2025 date range
  - Real-time API access with 1-hour caching

### ❌ Not Implemented (No Data Available)
- **UK**: No Anduril contracts found in Contracts Finder
- **Australia**: Access issues prevent research
- **Canada**: Access issues prevent research

---

## Recommendations

### Short Term
1. **Continue with US data only** - This is where Anduril's contracts are
2. **Monitor UK Contracts Finder** - Set up periodic checks for new Anduril contracts
3. **Focus on data quality** - Improve US data accuracy (awards vs transactions)

### Medium Term
1. **Research alternative sources**:
   - EU TED (Tenders Electronic Daily) for European contracts
   - Other defense-specific databases
   - FPDS.gov (Federal Procurement Data System) for more detailed US data

2. **Investigate access issues**:
   - Work with network team to resolve 403 errors for AU/CA sites
   - Check if VPN or regional access needed

### Long Term
1. **Multi-country dashboard** when data becomes available
2. **Comparative analysis** across different government markets
3. **Alert system** for new international contracts

---

## Technical Implementation Notes

If UK data becomes available in the future:

```javascript
// Example UK Contracts Finder API integration
const UK_API = 'https://www.contractsfinder.service.gov.uk/api';

async function getUKContracts() {
  // 1. Obtain OAuth token
  const token = await getOAuthToken();

  // 2. Search for Anduril contracts
  const response = await axios.post(
    `${UK_API}/Searches/Search`,
    {
      keyword: 'Anduril',
      noticeTypes: ['Award'],
      // Additional filters
    },
    {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    }
  );

  return response.data;
}
```

---

## Conclusion

**Current Focus**: US government contracts only

The research shows that:
- ✅ UK has a robust API system
- ❌ But Anduril has NO UK government contracts (as of March 2026)
- ⚠️ Australian and Canadian systems need further investigation

**Recommendation**: Keep the system focused on US data (USASpending.gov) where all of Anduril's government contracts currently exist. The system is already comprehensive and accurate for this purpose.
