# NEAR Social Integration

## Data Fetching Implementation

### Using near-social-js in React Components

```typescript
import { Social } from '@builddao/near-social-js';

// Initialize the API (mainnet)
const nearSocialApi = new Social({
  network: 'mainnet'
});

// Fetch profile data
const fetchProfile = async (accountId: string) => {
  try {
    const profile = await nearSocialApi.get({
      keys: [`${accountId}/profile/*`]
    });
    
    return {
      accountId,
      name: profile?.profile?.name || accountId,
      image: profile?.profile?.image?.url || 'https://via.placeholder.com/150',
      linktree: profile?.profile?.linktree || {}
    };
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }
};
```

### CLI Testing

You can test NEAR Social data fetching using the near-social-js library directly from Node.js:

```bash
node -e "const { Social } = require('@builddao/near-social-js'); const api = new Social({ network: 'mainnet' }); api.get({ keys: ['petarvujovic.near/profile/**', 'petarvujovic.near/profile/linktree/**'] }).then(data => console.log(JSON.stringify(data, null, 2))).catch(console.error)"
```

This command will fetch both the profile and linktree data for a NEAR account. You can modify the account ID and data paths as needed.


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

This simplified documentation covers the essential aspects of our NEAR Social integration, focusing on how we fetch and handle profile data both in our React components and via CLI for testing purposes.