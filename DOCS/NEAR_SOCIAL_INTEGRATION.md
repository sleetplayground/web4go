# NEAR Social Integration Guide

## Overview
This document outlines the integration process for accessing NEAR Social data to implement the people discovery feature in our application. We'll focus on how to retrieve user profiles and social connections using NEAR Social's data structure.

## Data Structure
NEAR Social stores data in a social graph format, with the following key components:

1. User Profiles
- Located at `social.near/thing/profile/*`
- Contains basic user information like name, bio, and avatar

2. Social Connections
- Follows data stored in `social.near/graph/follow/*`
- Represents user connections and relationships

## Required Dependencies
```bash
npm install near-social-vm near-social-bridge
```

## Implementation Steps

### 1. Setting up NEAR Social Connection
```typescript
import { NearSocialConnection } from 'near-social-bridge';

const socialConnection = new NearSocialConnection({
  nodeUrl: 'https://rpc.mainnet.near.org',
  contractName: 'social.near'
});
```

### 2. Fetching User Profiles
```typescript
const fetchProfiles = async () => {
  const profiles = await socialConnection.viewCall({
    contract: 'social.near',
    method: 'get',
    args: {
      keys: ['*/profile/**']
    }
  });
  return profiles;
};
```

### 3. Getting Social Connections
```typescript
const getFollowData = async (accountId: string) => {
  const follows = await socialConnection.viewCall({
    contract: 'social.near',
    method: 'get',
    args: {
      keys: [`${accountId}/graph/follow/**`]
    }
  });
  return follows;
};
```

## Data Processing

### Profile Data Structure
```typescript
interface NearSocialProfile {
  name?: string;
  description?: string;
  image?: {
    url?: string;
  };
  tags?: string[];
  linktree?: {
    twitter?: string;
    github?: string;
  };
}
```

### Example Usage
```typescript
const DiscoverPeople: React.FC = () => {
  const [profiles, setProfiles] = useState<NearSocialProfile[]>([]);

  useEffect(() => {
    const loadProfiles = async () => {
      const profileData = await fetchProfiles();
      // Process and filter profiles as needed
      setProfiles(profileData);
    };

    loadProfiles();
  }, []);

  // Render profiles...
};
```

## Best Practices

1. **Caching**
- Implement local caching for profile data
- Use IndexedDB or localStorage for persistent storage
- Set appropriate cache expiration times

2. **Rate Limiting**
- Implement request throttling
- Batch profile requests when possible
- Use pagination for large datasets

3. **Error Handling**
- Implement proper error boundaries
- Handle network failures gracefully
- Provide meaningful error messages to users

## Security Considerations

1. Always validate data received from NEAR Social
2. Implement proper sanitization for user-generated content
3. Use secure connections (HTTPS) for all API calls

## Future Improvements

1. Implement real-time updates using WebSocket connections
2. Add advanced filtering and search capabilities
3. Integrate with NEAR Social's notification system

## Resources

- [NEAR Social Documentation](https://docs.near.social)
- [NEAR Social VM Repository](https://github.com/near/near-social-vm)
- [NEAR Social Bridge Documentation](https://github.com/near/near-social-bridge)

This documentation will be updated as we implement and refine the people discovery feature.