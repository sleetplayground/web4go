# NEAR Social Integration

You can test NEAR Social data fetching using the near-social-js library. Here's how to properly initialize and use the API:

```javascript
const { Social } = require('@builddao/near-social-js');

// Initialize the API with proper configuration
const nearSocialApi = new Social({
  network: 'mainnet',
  contractName: 'social.near',
  nodeUrl: 'https://rpc.mainnet.near.org',
  apiUrl: 'https://api.near.social/api/v1'
});

// Fetch a single profile
async function fetchProfile(accountId) {
  try {
    const response = await nearSocialApi.get({
      keys: [`${accountId}/profile/**`],
      options: {
        subscribe: false
      }
    });
    console.log(JSON.stringify(response, null, 2));
  } catch (error) {
    console.error('Error fetching profile:', error);
  }
}

// Fetch multiple profiles
async function fetchProfiles() {
  try {
    const response = await nearSocialApi.get({
      keys: ['*/profile/**'],
      options: {
        limit: 24,
        order: 'desc',
        subscribe: false
      }
    });
    console.log(JSON.stringify(response, null, 2));
  } catch (error) {
    console.error('Error fetching profiles:', error);
  }
}
```

To run these examples, save them in a file (e.g., `near-social-test.js`) and execute with Node.js:

```bash
node src/utils/near-social-test.js
```

This implementation matches the successful pattern used in the Sleet Browser application's DiscoverPeople component.



---

one person profile
```sh
node -e "const { Social } = require('@builddao/near-social-js'); const api = new Social({ network: 'mainnet' }); api.get({ keys: ['petarvujovic.near/profile/**', 'petarvujovic.near/profile/linktree/**'] }).then(data => console.log(JSON.stringify(data, null, 2))).catch(console.error)"
```