import pkg from '@builddao/near-social-js';
const { Social } = pkg;

// Initialize the API with proper configuration
const nearSocialApi = new Social({
  network: 'mainnet',
  contractName: 'social.near',
  nodeUrl: 'https://rpc.mainnet.near.org',
  apiUrl: 'https://api.near.social/api/v1'
});

// Fetch profiles with pagination
async function fetchProfiles(limit = 2, direction = 'backward', fromAccountId = undefined) {
  try {
    // Construct the query based on direction and fromAccountId
    const query = {
      keys: ['*/profile/**'],
      options: {
        limit: limit * 2, // Fetch more than needed to ensure we have enough after filtering
        subscribe: false,
        order: 'desc' // Always fetch in descending order for consistency
      }
    };

    // Add from parameter only if we have a fromAccountId
    if (fromAccountId) {
      query.options.from = `${fromAccountId}/profile/**`;
      // When going backward, we need to exclude the current fromAccountId
      if (direction === 'backward') {
        query.options.from_exclusive = true;
      }
    }

    const response = await nearSocialApi.get(query);

    if (response && typeof response === 'object') {
      let profiles = Object.entries(response)
        .filter(([_, data]) => data?.profile)
        .map(([accountId, data]) => ({
          accountId,
          name: data.profile.name || accountId,
          image: data.profile.image?.url || 'https://via.placeholder.com/150',
          description: data.profile.description ? 
            data.profile.description.length > 500 ? 
              `${data.profile.description.substring(0, 500)}...` : 
              data.profile.description : undefined,
          linktree: data.profile.linktree || {}
        }));

      // Sort profiles by accountId to ensure consistent ordering
      profiles.sort((a, b) => b.accountId.localeCompare(a.accountId));

      // Take only the requested number of profiles
      profiles = profiles.slice(0, limit);

      console.log('=== Fetched Profiles ===\n');
      profiles.forEach((profile) => {
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
        console.log('---\n');
      });

      // Navigation instructions
      if (profiles.length === limit) {
        console.log('Navigation:');
        const lastProfile = profiles[profiles.length - 1];
        console.log('To view older profiles:');
        console.log(`node src/utils/near-social-test.js ${limit} backward ${lastProfile.accountId}\n`);
      }

      return profiles;
    }
  } catch (error) {
    console.error('Error fetching profiles:', error);
  }
}

// Parse command line arguments
const args = process.argv.slice(2);
const limit = parseInt(args[0]) || 2;
const direction = args[1] || 'backward';
const fromAccountId = args[2] || undefined;

// Execute the script
fetchProfiles(limit, direction, fromAccountId);