import { Social } from '@builddao/near-social-js';

// Initialize the API with proper configuration
const nearSocialApi = new Social({
  network: 'mainnet',
  contractName: 'social.near',
  nodeUrl: 'https://rpc.mainnet.near.org',
  apiUrl: 'https://api.near.social/api/v1'
});

// Fetch profiles with pagination
async function fetchProfiles(limit = 2, direction = 'forward', fromIndex = null) {
  try {
    const response = await nearSocialApi.get({
      keys: ['*/profile/**'],
      options: {
        limit,
        order: direction === 'forward' ? 'asc' : 'desc',
        from: fromIndex,
        subscribe: false
      }
    });

    if (response && typeof response === 'object') {
      const profiles = Object.entries(response)
        .filter(([_, data]) => data?.profile)
        .map(([accountId, data]) => ({
          accountId,
          name: data.profile.name || accountId,
          image: data.profile.image?.url || 'https://via.placeholder.com/150',
          description: data.profile.description,
          linktree: data.profile.linktree || {}
        }));

      console.log('=== Fetched Profiles ===');
      profiles.forEach((profile, index) => {
        console.log(`\nProfile #${index + 1}:`);
        console.log(`Account: ${profile.accountId}`);
        console.log(`Name: ${profile.name}`);
        console.log(`Image URL: ${profile.image}`);
        if (profile.description) {
          console.log(`Description: ${profile.description}`);
        }
        if (Object.keys(profile.linktree).length > 0) {
          console.log('Links:');
          Object.entries(profile.linktree).forEach(([platform, url]) => {
            console.log(`  - ${platform}: ${url}`);
          });
        }
        console.log('---');
      });

      // Return the last profile's account ID for pagination
      if (profiles.length > 0) {
        console.log(`\nTo fetch ${direction === 'forward' ? 'next' : 'previous'} profiles, use:`);
        console.log(`node src/utils/near-social-test.js 2 ${direction} ${profiles[profiles.length - 1].accountId}`);
      }

      return profiles;
    }
  } catch (error) {
    console.error('Error fetching profiles:', error);
  }
}

// Parse command line arguments
const args = process.argv.slice(2);
const limit = 2; // Fixed limit to 2
const direction = args[1] || 'forward';
const fromIndex = args[2] || null;

// Execute the script
fetchProfiles(limit, direction, fromIndex);