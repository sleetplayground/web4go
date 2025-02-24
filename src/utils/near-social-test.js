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

// Test function to fetch multiple profiles with pagination
async function testFetchProfiles(blockHeight, direction) {
  try {
    const response = await nearSocialApi.get({
      keys: ['*/profile/**'],
      options: {
        limit: 24,
        blockHeight: blockHeight,
        order: direction === 'backward' ? 'asc' : 'desc',
        subscribe: false,
        return_deleted: false,
        return_blocked: false
      }
    });

    // Get the account IDs and their block heights from the response
    const accountIds = Object.keys(response || {});
    const profileData = Object.entries(response || {}).map(([accountId, data]) => ({
      accountId,
      blockHeight: data._block_height
    }));
    
    // Find the next block height for pagination
    const nextBlockHeight = profileData.length > 0 ?
      (direction === 'backward' ?
        Math.min(...profileData.map(p => p.blockHeight)) :
        Math.max(...profileData.map(p => p.blockHeight))) :
      blockHeight;

    console.log('Current Block Height:', blockHeight || 'Latest');
    console.log('Direction:', direction);
    console.log('Next Block Height:', nextBlockHeight);
    console.log('Number of profiles fetched:', accountIds.length);
    console.log('Account IDs:', accountIds);
    console.log('\nProfile details:', JSON.stringify(response, null, 2));

    // Provide hint for next query
    if (accountIds.length > 0) {
      console.log('\nTo fetch next batch, run:');
      console.log(`node near-social-test.js ${nextBlockHeight} ${direction}`);
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