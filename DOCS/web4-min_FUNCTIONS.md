# Web4 Min Contract Functions Documentation

This document provides detailed information about the functions available in the web4-min contract and how to interact with them using NEAR CLI.

## Exported Functions

### 1. web4_get

This function retrieves the static URL (IPFS hash) associated with the web4 contract.

**Parameters:** None

**Returns:**
- The IPFS URL where the static content is hosted

**CLI Usage:**
```bash
near view <your-account>.near web4_get
```

### 2. web4_setStaticUrl

This function sets the IPFS URL for the static content of your website. Only the contract owner can call this function.

**Parameters:**
- `url`: String - The IPFS URL where your static content is hosted

**CLI Usage:**
```bash
near call <your-account>.near web4_setStaticUrl '{"url": "ipfs://your-ipfs-hash"}' --accountId <your-account>.near
```

**Note:** This function is typically called automatically by the web4-deploy tool when you deploy your website.

### 3. web4_setOwner

This function sets the owner of the web4 contract. Only the current owner can call this function.

**Parameters:**
- `owner`: String - The NEAR account ID that will become the new owner

**CLI Usage:**
```bash
near call <your-account>.near web4_setOwner '{"owner": "new-owner.near"}' --accountId <your-account>.near
```

## Helper Functions

### log
Internal function used for logging messages during contract execution.

### panic
Internal function used for handling errors and stopping execution with a message.

### valueReturn
Internal function used to return values from contract calls.

## Storage Keys

The contract uses two main storage keys:
- `web4:staticUrl`: Stores the IPFS URL of the static content
- `web4:owner`: Stores the account ID of the contract owner

## Common Operations

### Check Current Static URL
```bash
near view <your-account>.near web4_get
```

### Deploy Website Content
```bash
npx web4-deploy path/to/your/website <your-account>.near
```

### Transfer Ownership
```bash
near call <your-account>.near web4_setOwner '{"owner": "new-owner.near"}' --accountId <your-account>.near
```

## Error Cases

1. Calling `web4_setStaticUrl` or `web4_setOwner` from a non-owner account will result in a panic.
2. Invalid IPFS URLs or malformed parameters will cause the contract to panic.

## Best Practices

1. Always verify you're the contract owner before attempting to modify the static URL or owner.
2. Use the web4-deploy tool instead of manually calling `web4_setStaticUrl`.
3. Keep track of the contract owner as only they can modify the contract settings.
4. Test view calls before making changes to ensure you have the correct permissions.