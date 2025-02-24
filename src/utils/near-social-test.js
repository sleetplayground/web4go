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
const fromIndex = parseInt(args[0]) || 0;
const direction = args[1] || 'forward';

// Test function to fetch multiple profiles with pagination
async function testFetchProfiles(fromIndex, direction) {
  try {
    const response = await nearSocialApi.get({
      keys: ['*/profile/**'],
      options: {
        limit: 24,
        from: fromIndex,
        order: direction === 'backward' ? 'asc' : 'desc',
        subscribe: false
      }
    });

    console.log('Current Index:', fromIndex);
    console.log('Direction:', direction);
    console.log('Next Index:', direction === 'backward' ? Math.max(0, fromIndex - 24) : fromIndex + 24);
    console.log('Fetched profiles:', JSON.stringify(response, null, 2));
  } catch (error) {
    console.error('Error fetching profiles:', error);
  }
}

// Run the test with command line arguments
testFetchProfiles(fromIndex, direction);

// Usage instructions
if (args.length === 0) {
  console.log('\nUsage: node near-social-test.js [fromIndex] [direction]');
  console.log('  fromIndex: number (starting position, default: 0)');
  console.log('  direction: "forward" or "backward" (default: "forward")');
  console.log('\nExample: node near-social-test.js 24 backward');
}