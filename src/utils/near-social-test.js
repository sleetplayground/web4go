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
const blockHeight = args[0] ? parseInt(args[0]) : null;
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
async function testFetchProfiles(fromBlockHeight, direction) {
  try {
    const response = await nearSocialApi.get({
      keys: ['*/profile/**'],
      options: {
        limit: 2,
        from: fromBlockHeight,
        order: direction === 'backward' ? 'asc' : 'desc',
        subscribe: false,
        return_deleted: false,
        return_blocked: false
      }
    });

    if (!response || Object.keys(response).length === 0) {
      console.log('No profiles found for the given criteria.');
      return;
    }

    // Format and display profiles
    const profiles = Object.entries(response)
      .map(([accountId, data]) => formatProfile(accountId, data))
      .filter(profile => profile.blockHeight !== undefined);

    if (profiles.length === 0) {
      console.log('No valid profiles found with block heights.');
      return;
    }

    // Find the next block height for pagination
    const blockHeights = profiles.map(p => p.blockHeight).filter(h => !isNaN(h));
    const nextBlockHeight = direction === 'backward' ?
      Math.min(...blockHeights) :
      Math.max(...blockHeights);

    console.log('\n=== NEAR Social Profiles ===');
    console.log(`Direction: ${direction} | From Block Height: ${fromBlockHeight || 'Latest'}\n`);
    console.log(`Total Profiles: ${profiles.length}\n`);

    profiles.forEach((profile, index) => {
      console.log(`Profile #${index + 1}:`);
      console.log(`Account: ${profile.accountId}`);
      console.log(`Name: ${profile.name}`);
      console.log(`Block Height: ${profile.blockHeight}`);
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
    if (profiles.length > 0 && nextBlockHeight) {
      const nextBlock = direction === 'backward' ? nextBlockHeight - 1 : nextBlockHeight + 1;
      console.log('To fetch next profiles, run:');
      console.log(`node near-social-test.js ${nextBlock} ${direction}\n`);
    }
  } catch (error) {
    console.error('Error fetching profiles:', error.message);
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
  console.log('  node near-social-test.js 123456789 backward\n');
}