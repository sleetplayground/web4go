# NEAR Social Integration


You can test NEAR Social data fetching using the near-social-js library directly from Node.js:

```bash
node -e "const { Social } = require('@builddao/near-social-js'); const api = new Social({ network: 'mainnet' }); api.get({ keys: ['petarvujovic.near/profile/**', 'petarvujovic.near/profile/linktree/**'] }).then(data => console.log(JSON.stringify(data, null, 2))).catch(console.error)"
```

This command will fetch both the profile and linktree data for a NEAR account. You can modify the account ID and data paths as needed.
 