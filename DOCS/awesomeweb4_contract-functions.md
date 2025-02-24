# AwesomeWeb4 Contract Functions Documentation

## Overview
This document provides information about the essential functions in the AwesomeWeb4 contract, focusing on app query methods.

## Core Functions

### App Queries

- `get_app(app_id)`: Retrieves app information by ID

```bash
near view $CONTRACT_ID get_app '{"app_id": 123}'

near view awesomeweb4.near get_app '{"app_id": 123}'

near view awesomeweb4.testnet get_app '{"app_id": 123}'
```

- `get_apps(from_index, limit)`: Lists apps with pagination

```bash
near view $CONTRACT_ID get_apps '{"from_index": 0, "limit": 10}'

near view awesomeweb4.near get_apps '{"from_index": 0, "limit": 10}'

near view awesomeweb4.testnet get_apps '{"from_index": 0, "limit": 10}'
```

- `get_app_by_slug(slug)`: Retrieves app information by slug

```bash
near view $CONTRACT_ID get_app_by_slug '{"slug": "my-awesome-app"}'

near view awesomeweb4.near get_app_by_slug '{"slug": "my-awesome-app"}'

near view awesomeweb4.testnet get_app_by_slug '{"slug": "my-awesome-app"}'
```

### Category Queries

- `get_categories(from_index, limit)`: Lists categories with pagination

```bash
near view $CONTRACT_ID get_categories '{"from_index": 0, "limit": 20}'

near view awesomeweb4.near get_categories '{"from_index": 0, "limit": 20}'

near view awesomeweb4.testnet get_categories '{"from_index": 0, "limit": 20}'
```

### App Submission

- `add_app(app)`: Submits a new app
  - Required deposit: 0.1 NEAR
  - Parameters:
    - `title`: Max 50 characters
    - `dapp_account_id`: Web4-compatible contract address
    - `categories`: Array of category IDs
    - `slug`: Unique URL identifier (max 50 characters)
    - `oneliner`: Brief description (max 200 characters)
    - `description`: Detailed description (max 5,000 characters)
    - Optional fields: logo_url, twitter, facebook, medium, telegram, github, discord

```bash
near call $CONTRACT_ID add_app '{"app": {"title": "My dApp", "dapp_account_id": "app.near", "categories": [1, 2], "slug": "my-dapp", "oneliner": "Awesome dApp description", "description": "Detailed description"}}' --accountId user.near --deposit 0.1
```

## Notes
- All monetary values are in yoctoNEAR (1 NEAR = 10^24 yoctoNEAR)
- Web4 protocol implementation is required for dapp contracts

