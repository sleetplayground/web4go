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
    const response = await nearSocialApi.get({
      keys: ['*/profile/**'],
      options: {
        limit,
        from: fromAccountId,
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
          description: data.profile.description ? 
            data.profile.description.length > 500 ? 
              `${data.profile.description.substring(0, 500)}...` : 
              data.profile.description : undefined,
          linktree: data.profile.linktree || {}
        }));

      // Take profiles based on the direction and limit
      const selectedProfiles = direction === 'forward' ? 
        profiles.slice(0, limit) : 
        profiles.slice(-limit);

      console.log('=== Fetched Profiles ===');
      selectedProfiles.forEach((profile) => {
        console.log(`\nAccount: ${profile.accountId}`);
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

      // Navigation using cursor-based pagination
      console.log('\nNavigation:');
      if (selectedProfiles.length === limit) {
        const lastProfile = selectedProfiles[selectedProfiles.length - 1];
        const firstProfile = selectedProfiles[0];
        
        if (direction === 'backward') {
          console.log('To view older profiles:');
          console.log(`node src/utils/near-social-test.js ${limit} backward ${lastProfile.accountId}`);
        } else {
          console.log('To view newer profiles:');
          console.log(`node src/utils/near-social-test.js ${limit} forward ${firstProfile.accountId}`);
        }
      }

      return selectedProfiles;
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