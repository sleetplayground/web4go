# NEAR Social Integration Guide

## Overview
This document outlines the integration process for accessing NEAR Social data to implement the people discovery feature in our application using near-api-js. We'll focus on how to retrieve user profiles and implement filtering capabilities by interacting with the NEAR blockchain.

## Prerequisites
1. Install near-api-js (already included in our dependencies)
```bash
pnpm install near-api-js
```

2. Install near-social-js
```bash
pnpm install @builddao/near-social-js
```

## Using near-social-js

### Basic Setup
```typescript
import { NearSocialApi } from '@builddao/near-social-js';

// Initialize NearSocialApi
const nearSocialApi = new NearSocialApi({
  networkId: 'mainnet',
  nodeUrl: 'https://rpc.mainnet.near.org',
  contractName: 'social.near'
});
```

### Fetching Profile Data
```typescript
// Get a single profile
const getProfile = async (accountId: string) => {
  try {
    const profile = await nearSocialApi.getProfile(accountId);
    return profile;
  } catch (error) {
    console.error(`Error fetching profile for ${accountId}:`, error);
    throw error;
  }
};

// Get multiple profiles
const getProfiles = async (accountIds: string[]) => {
  try {
    const profiles = await nearSocialApi.getProfiles(accountIds);
    return profiles;
  } catch (error) {
    console.error('Error fetching multiple profiles:', error);
    throw error;
  }
};
```

### Working with Social Graph
```typescript
const getSocialConnections = async (accountId: string) => {
  try {
    // Get followers
    const followers = await nearSocialApi.getFollowers(accountId);
    
    // Get following
    const following = await nearSocialApi.getFollowing(accountId);
    
    return { followers, following };
  } catch (error) {
    console.error('Error fetching social connections:', error);
    throw error;
  }
};
```

### Error Handling
```typescript
const handleNearSocialError = (error: any) => {
  if (error.type === 'AccountNotFound') {
    return 'Account not found on NEAR Social';
  } else if (error.type === 'NetworkError') {
    return 'Network error. Please check your connection';
  } else {
    return 'An unexpected error occurred';
  }
};
```

## Data Structure
NEAR Social data is stored on the NEAR blockchain. The key components we'll be working with are:

1. User Profiles
- Contract: `social.near`
- Data path: `{accountId}/profile/*`
- Contains basic user information and linktree data

2. Linktree Data
- Data path: `{accountId}/profile/linktree/*`
- Contains social links (Twitter, GitHub, Telegram, etc.)

## Implementation Steps

### 1. Setting up NEAR Connection
```typescript
import { connect, keyStores, Near } from 'near-api-js';

// Initialize NEAR connection
const near = await connect({
  networkId: 'mainnet',
  nodeUrl: 'https://rpc.mainnet.near.org',
  keyStore: new keyStores.BrowserLocalStorageKeyStore(),
  headers: {}
});

// Get the social contract
const socialContract = await near.loadContract('social.near', {
  viewMethods: ['get'],
  changeMethods: []
});
```

### 2. Fetching Profile Data
```typescript
// Function to fetch profile data
async function fetchProfiles() {
  try {
    // Fetch profiles with linktree data
    const data = await socialContract.get({
      keys: ['*/profile/linktree']
    });

    // Fetch specific social links
    const socialLinks = await socialContract.get({
      keys: [
        '*/profile/linktree/telegram',
        '*/profile/linktree/github',
        '*/profile/linktree/twitter',
        '*/profile/linktree/website'
      ]
    });

    return { data, socialLinks };
  } catch (error) {
    console.error('Error fetching profiles:', error);
    throw error;
  }
}
```

### 2. Managing Profile Sets
```typescript
// Create sets of profiles with different social links
const withData = new Set([...Object.keys(data)]);
const withTelegram = new Set([...Object.keys(telegram)]);
const withGitHub = new Set([...Object.keys(github)]);
const withTwitter = new Set([...Object.keys(twitter)]);
const withWebsite = new Set([...Object.keys(website)]);
```

### 3. Implementing Pagination
```typescript
const DiscoverPeople: React.FC = () => {
  const [filterBy, setFilterBy] = useState(withData);
  const [currentPage, setCurrentPage] = useState(1);
  const profilesPerPage = 10;

  // Calculate pagination indices
  const startIndex = (currentPage - 1) * profilesPerPage;
  const endIndex = startIndex + profilesPerPage;
  const displayedProfiles = [...filterBy].slice(startIndex, endIndex);

  // Calculate total pages
  const totalPages = Math.ceil(
    Object.keys(data).filter((accountId) => filterBy.has(accountId)).length /
    profilesPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Render profiles...
};
```

### 4. Implementing Filters
```typescript
const FilterButtons: React.FC = () => (
  <div className="flex-row m-2">
    <h5>Filter By Available Linktree Data:</h5>
    <button
      onClick={() => setFilterBy(withTwitter)}
      disabled={filterBy === withTwitter}
    >
      Twitter
    </button>
    <button
      onClick={() => setFilterBy(withGitHub)}
      disabled={filterBy === withGitHub}
    >
      GitHub
    </button>
    <button
      onClick={() => setFilterBy(withTelegram)}
      disabled={filterBy === withTelegram}
    >
      Telegram
    </button>
    <button
      onClick={() => setFilterBy(withWebsite)}
      disabled={filterBy === withWebsite}
    >
      Website
    </button>
    <button
      onClick={() => setFilterBy(withData)}
      disabled={filterBy === withData}
    >
      Reset
    </button>
  </div>
);
```

## Best Practices

1. **Loading States**
- Always check if data is available before rendering
- Provide loading indicators while fetching data
- Handle undefined or null states gracefully

2. **Performance**
- Use Set for efficient filtering operations
- Implement pagination for large datasets
- Cache filtered results when possible

3. **Error Handling**
- Implement proper error boundaries
- Handle network failures gracefully
- Provide meaningful error messages to users

## Security Considerations

1. Always validate data received from NEAR Social
2. Implement proper sanitization for user-generated content
3. Use secure connections (HTTPS) for all API calls

## Resources

- [NEAR Social Documentation](https://docs.near.social)
- [NEAR Social VM Repository](https://github.com/near/near-social-vm)
- [NEAR Social Components](https://near.social/components)

This documentation will be updated as we implement and refine the people discovery feature.


```sh
node -e "const { Social } = require('@builddao/near-social-js'); const api = new Social({ network: 'mainnet' }); api.get({ keys: ['petarvujovic.near/profile/**', 'petarvujovic.near/profile/linktree/**'] }).then(data => console.log(JSON.stringify(data, null, 2))).catch(console.error);"
```