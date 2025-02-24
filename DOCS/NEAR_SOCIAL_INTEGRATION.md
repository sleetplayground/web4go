# NEAR Social Integration Guide

## Overview
This document outlines the integration process for accessing NEAR Social data to implement the people discovery feature in our application. We'll focus on how to retrieve user profiles and implement filtering capabilities using NEAR Social's data structure.

## Data Structure
NEAR Social stores profile data in a social graph format. The key components we'll be working with are:

1. User Profiles
- Located at `social.near/profile/*`
- Contains basic user information and linktree data

2. Linktree Data
- Stored at `*/profile/linktree/*`
- Contains social links (Twitter, GitHub, Telegram, etc.)

## Implementation Steps

### 1. Fetching Profile Data
```typescript
// Fetch all profiles with linktree data
const data = Social.keys("*/profile/linktree", "final");

// Fetch specific social links
const telegram = Social.keys("*/profile/linktree/telegram", "final");
const github = Social.keys("*/profile/linktree/github", "final");
const twitter = Social.keys("*/profile/linktree/twitter", "final");
const website = Social.keys("*/profile/linktree/website", "final");
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