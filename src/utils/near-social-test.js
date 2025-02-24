import pkg from '@builddao/near-social-js';
const { Social } = pkg;

// Initialize the API with proper configuration
const nearSocialApi = new Social({
  network: 'mainnet',
  contractName: 'social.near',
  nodeUrl: 'https://rpc.mainnet.near.org',
  apiUrl: 'https://api.near.social/api/v1'
});

// Test function to fetch multiple profiles
async function testFetchProfiles() {
  try {
    const response = await nearSocialApi.get({
      keys: ['*/profile/**'],
      options: {
        limit: 24,
        order: 'desc',
        subscribe: false
      }
    });
    console.log('Fetched profiles:', JSON.stringify(response, null, 2));
  } catch (error) {
    console.error('Error fetching profiles:', error);
  }
}

// Run the test
testFetchProfiles();