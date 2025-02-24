import pkg from '@builddao/near-social-js';
const { Social } = pkg;

// Initialize the API with proper configuration
const nearSocialApi = new Social({
  network: 'mainnet',
  contractName: 'social.near',
  nodeUrl: 'https://rpc.mainnet.near.org',
  apiUrl: 'https://api.near.social/api/v1'
});

// Parse command line arguments
const args = process.argv.slice(2);
const limit = args[0] ? parseInt(args[0]) : 10;

// Format profile data for display
function formatProfile(accountId, data) {
  const profile = data.profile || {};
  return {
    accountId,
    name: profile.name || accountId,
    description: profile.description || '',
    image: profile.image?.url || 'https://via.placeholder.com/150',
    links: profile.linktree || {}
  };
}

// Test function to fetch multiple profiles
async function testFetchProfiles(limit) {
  try {
    const response = await nearSocialApi.get({
      keys: ['*/profile/**'],
      options: {
        limit,
        order: 'desc',
        subscribe: false
      }
    });

    if (!response || Object.keys(response).length === 0) {
      console.log('No profiles found.');
      return;
    }

    // Format and display profiles
    const profiles = Object.entries(response)
      .filter(([_, data]) => data?.profile)
      .map(([accountId, data]) => formatProfile(accountId, data));

    console.log('\n=== NEAR Social Profiles ===');
    console.log(`Fetched ${profiles.length} profiles\n`);

    profiles.forEach((profile, index) => {
      console.log(`Profile #${index + 1}:`);
      console.log(`Account: ${profile.accountId}`);
      console.log(`Name: ${profile.name}`);
      console.log(`Image URL: ${profile.image}`);
      if (profile.description) console.log(`Description: ${profile.description}`);
      if (Object.keys(profile.links).length > 0) {
        console.log('Links:');
        Object.entries(profile.links).forEach(([platform, link]) => {
          console.log(`  - ${platform}: ${link}`);
        });
      }
      console.log('---\n');
    });
  } catch (error) {
    console.error('Error fetching profiles:', error.message);
  }
}

// Run the test with command line arguments
testFetchProfiles(limit);

// Usage instructions
if (args.length === 0) {
  console.log('\nUsage: node near-social-test.js [limit]');
  console.log('  limit: number (optional, defaults to 10)');
  console.log('\nExamples:');
  console.log('  node near-social-test.js        # Fetch 10 profiles');
  console.log('  node near-social-test.js 24     # Fetch 24 profiles\n');
}