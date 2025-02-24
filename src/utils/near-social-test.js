import pkg from '@builddao/near-social-js';
const { Social } = pkg;

// Initialize the API with proper configuration
const nearSocialApi = new Social({
  network: 'mainnet',
  contractName: 'social.near',
  nodeUrl: 'https://rpc.mainnet.near.org',
  apiUrl: 'https://api.near.social/api/v1'
});

// Total number of profiles (approximately)
const TOTAL_PROFILES = 21224;

// Fetch profiles with pagination
async function fetchProfiles(limit = 2, direction = 'backward', startingNumber = TOTAL_PROFILES) {
  try {
    const response = await nearSocialApi.get({
      keys: ['*/profile/**'],
      options: {
        limit: 100, // Fetch more to ensure we get valid profiles
        order: direction === 'forward' ? 'asc' : 'desc',
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

      // Take only two profiles based on the direction
      const selectedProfiles = profiles.slice(0, limit);
      const currentNumber = direction === 'backward' ? startingNumber : startingNumber - limit + 1;

      console.log('=== Fetched Profiles ===');
      selectedProfiles.forEach((profile, index) => {
        const profileNumber = direction === 'backward' ? currentNumber - index : currentNumber + index;
        console.log(`\nProfile #${profileNumber}:`);
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

      // Calculate next profile numbers for navigation
      const nextBackward = currentNumber - limit;
      const nextForward = currentNumber + limit;

      console.log('\nNavigation:');
      if (nextBackward >= 1) {
        console.log(`To view older profiles (#${nextBackward}-${nextBackward + 1}):`);
        console.log(`node src/utils/near-social-test.js 2 backward ${nextBackward}`);
      }
      if (nextForward <= TOTAL_PROFILES) {
        console.log(`To view newer profiles (#${nextForward}-${nextForward + 1}):`);
        console.log(`node src/utils/near-social-test.js 2 forward ${nextForward}`);
      }

      return selectedProfiles;
    }
  } catch (error) {
    console.error('Error fetching profiles:', error);
  }
}

// Parse command line arguments
const args = process.argv.slice(2);
const limit = 2; // Fixed limit to 2
const direction = args[1] || 'backward';
const startingNumber = parseInt(args[2]) || TOTAL_PROFILES;

// Execute the script
fetchProfiles(limit, direction, startingNumber);