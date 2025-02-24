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
        limit: limit,
        subscribe: false,
        order: 'desc' // Always fetch in descending order for consistency
      }
    };

    // Add from parameter only if we have a fromAccountId
    if (fromAccountId) {
      query.options.from = `${fromAccountId}/profile/**`;
      query.options.from_exclusive = true; // Always exclude the current fromAccountId
    }

    const response = await nearSocialApi.get(query);

    if (response && typeof response === 'object') {
      // Filter and map profiles
      let profiles = Object.entries(response)
        .filter(([_, data]) => {
          // Only include profiles with valid data
          return data?.profile && 
                 (data.profile.name || data.profile.image?.url || 
                  data.profile.description || Object.keys(data.profile.linktree || {}).length > 0);
        })
        .map(([accountId, data]) => ({
          accountId,
          name: data.profile.name || accountId,
          image: data.profile.image?.url || 'https://via.placeholder.com/150',
          description: data.profile.description,
          linktree: data.profile.linktree || {}
        }));

      // Sort profiles by accountId for consistent ordering
      profiles.sort((a, b) => direction === 'forward' ? 
        a.accountId.localeCompare(b.accountId) : 
        b.accountId.localeCompare(a.accountId)
      );

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
          Object.entries(profile.linktree).forEach(([platform, value]) => {
            console.log(`  - ${platform}: ${value}`);
          });
        }
        console.log('---\n');
      });

      // Navigation instructions
      if (profiles.length > 0) {
        console.log('Navigation:');
        const lastProfile = profiles[profiles.length - 1];
        console.log('To view older profiles:');
        console.log(`node src/utils/near-social-test.js ${limit} backward ${lastProfile.accountId}\n`);
      } else {
        console.log('No more profiles available.\n');
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