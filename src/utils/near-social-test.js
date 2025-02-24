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
const blockHeight = parseInt(args[0]) || null;
const direction = args[1] || 'forward';

// Format profile data for display
function formatProfile(accountId, data) {
  const profile = data.profile || {};
  return {
    accountId,
    name: profile.name || accountId,
    description: profile.description ? profile.description.slice(0, 50) + '...' : '',
    links: profile.linktree || {},
    blockHeight: data._block_height
  };
}

// Test function to fetch multiple profiles with pagination
async function testFetchProfiles(blockHeight, direction) {
  try {
    const response = await nearSocialApi.get({
      keys: ['*/profile/**'],
      options: {
        limit: 2,
        blockHeight: blockHeight,
        order: direction === 'backward' ? 'asc' : 'desc',
        subscribe: false,
        return_deleted: false,
        return_blocked: false
      }
    });

    // Format and display profiles
    const profiles = Object.entries(response || {})
      .slice(0, 2) // Ensure we only process 2 profiles
      .map(([accountId, data]) => formatProfile(accountId, data));

    // Find the next block height for pagination
    const nextBlockHeight = profiles.length > 0 ?
      (direction === 'backward' ?
        Math.min(...profiles.map(p => p.blockHeight)) :
        Math.max(...profiles.map(p => p.blockHeight))) :
      blockHeight;

    console.log('\n=== NEAR Social Profiles ===');
    console.log(`Direction: ${direction} | Block Height: ${blockHeight || 'Latest'}\n`);
    console.log(`Total Profiles: ${profiles.length}\n`);

    profiles.forEach((profile, index) => {
      console.log(`Profile #${index + 1}:`);
      console.log(`Account: ${profile.accountId}`);
      console.log(`Name: ${profile.name}`);
      if (profile.description) console.log(`Description: ${profile.description}`);
      if (Object.keys(profile.links).length > 0) {
        console.log('Links:');
        Object.entries(profile.links).forEach(([platform, link]) => {
          console.log(`  - ${platform}: ${link}`);
        });
      }
      console.log('---\n');
    });

    // Provide hint for next query
    if (profiles.length > 0) {
      console.log('To fetch next profiles, run:');
      console.log(`node near-social-test.js ${nextBlockHeight} ${direction}\n`);
    } else {
      console.log('No more profiles to fetch.\n');
    }
  } catch (error) {
    console.error('Error fetching profiles:', error);
  }
}

// Run the test with command line arguments
testFetchProfiles(blockHeight, direction);

// Usage instructions
if (args.length === 0) {
  console.log('\nUsage: node near-social-test.js [blockHeight] [direction]');
  console.log('  blockHeight: number (optional, defaults to latest)');
  console.log('  direction: "forward" or "backward" (default: "forward")');
  console.log('\nExamples:');
  console.log('  node near-social-test.js              # Latest profiles');
  console.log('  node near-social-test.js 123456789    # Profiles from specific block');
  console.log('  node near-social-test.js 123456789 backward');
}