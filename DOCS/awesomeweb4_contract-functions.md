# AwesomeWeb4 Contract Functions Documentation

## Overview
This document provides detailed information about all available functions in the AwesomeWeb4 contract.

## Guardian Functions

### Guardian Management

- `get_guardians()`: Returns a list of all guardian account IDs

```bash
near view $CONTRACT_ID get_guardians

near view awesomeweb4.near get_guardians

near view awesomeweb4.testnet get_guardians
```

- `add_guardian(account_id)`: Adds a new guardian (requires guardian permission)

```bash
near call $CONTRACT_ID add_guardian '{"account_id": "new-guardian.near"}' --accountId guardian.near

near call awesomeweb4.near add_guardian '{"account_id": "new-guardian.near"}' --accountId guardian.near

near call awesomeweb4.testnet add_guardian '{"account_id": "new-guardian.near"}' --accountId guardian.near
```

- `remove_guardian(account_id)`: Removes a guardian (requires guardian permission, cannot remove last guardian)

```bash
near call $CONTRACT_ID remove_guardian '{"account_id": "old-guardian.near"}' --accountId guardian.near

near call awesomeweb4.near remove_guardian '{"account_id": "old-guardian.near"}' --accountId guardian.near

near call awesomeweb4.testnet remove_guardian '{"account_id": "old-guardian.near"}' --accountId guardian.near
```

### Category Management

- `add_category(title, slug)`: Creates a new category (requires guardian permission)
  - Parameters:
    - `title`: Category title
    - `slug`: Unique identifier for the category
  
```sh
near call $CONTRACT_ID add_category '{"title": "Games", "slug": "games"}' --accountId guardian.near

near call awesomeweb4.near add_category '{"title": "Games", "slug": "games"}' --accountId guardian.near

near call awesomeweb4.testnet add_category '{"title": "Games", "slug": "games"}' --accountId guardian.near
```

### App Management (Guardian)

- `disable_app(app_id)`: Disables an app (requires guardian permission)

```bash
near call $CONTRACT_ID disable_app '{"app_id": 123}' --accountId guardian.near

near call awesomeweb4.near disable_app '{"app_id": 123}' --accountId guardian.near

near call awesomeweb4.testnet disable_app '{"app_id": 123}' --accountId guardian.near
```

- `set_disabled_apps_number(disabled_apps)`: Sets the number of disabled apps (requires guardian permission)

```bash
near call $CONTRACT_ID set_disabled_apps_number '{"disabled_apps": 5}' --accountId guardian.near

near call awesomeweb4.near set_disabled_apps_number '{"disabled_apps": 5}' --accountId guardian.near

near call awesomeweb4.testnet set_disabled_apps_number '{"disabled_apps": 5}' --accountId guardian.near
```

- `update_app(app_id, app)`: Updates app information (guardians can bypass listing fee and modify active status)

```bash
near call $CONTRACT_ID update_app '{"app_id": 123, "app": {"active": false}}' --accountId guardian.near

near call awesomeweb4.near update_app '{"app_id": 123, "app": {"active": false}}' --accountId guardian.near

near call awesomeweb4.testnet update_app '{"app_id": 123, "app": {"active": false}}' --accountId guardian.near
```

## Public Functions

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

- `get_category_apps_count(category_id)`: Returns number of apps in a category

```bash
near view $CONTRACT_ID get_category_apps_count '{"category_id": 1}'

near view awesomeweb4.near get_category_apps_count '{"category_id": 1}'

near view awesomeweb4.testnet get_category_apps_count '{"category_id": 1}'
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

near call awesomeweb4.near add_app '{"app": {"title": "My dApp", "dapp_account_id": "app.near", "categories": [1, 2], "slug": "my-dapp", "oneliner": "Awesome dApp description", "description": "Detailed description"}}' --accountId user.near --deposit 0.1

near call awesomeweb4.testnet add_app '{"app": {"title": "My dApp", "dapp_account_id": "app.near", "categories": [1, 2], "slug": "my-dapp", "oneliner": "Awesome dApp description", "description": "Detailed description"}}' --accountId user.near --deposit 0.1
```

### App Updates

- `update_app(app_id, app)`: Updates existing app
  - Requires:
    - Original app owner or guardian permission
    - 0.1 NEAR deposit (for non-guardian updates)
  - Cannot modify:
    - dapp_account_id
    - active status (guardian only)

```bash
near call $CONTRACT_ID update_app '{"app_id": 123, "app": {"title": "Updated Title", "oneliner": "New description"}}' --accountId owner.near --deposit 0.1

near call awesomeweb4.near update_app '{"app_id": 123, "app": {"title": "Updated Title", "oneliner": "New description"}}' --accountId owner.near --deposit 0.1

near call awesomeweb4.testnet update_app '{"app_id": 123, "app": {"title": "Updated Title", "oneliner": "New description"}}' --accountId owner.near --deposit 0.1
```

## Web4 Integration

### Web4 Endpoints

- `web4_get(request)`: Handles Web4 protocol requests
  - Parameters:
    - `account_id`: Optional account ID
    - `path`: Request path
    - `params`: Optional URL parameters
    - `query`: Optional query parameters
    - `preloads`: Optional preloaded responses

```bash
near view $CONTRACT_ID web4_get '{"request": {"path": "/apps", "params": {}, "query": {"limit": "10"}}'

near view awesomeweb4.near web4_get '{"request": {"path": "/apps", "params": {}, "query": {"limit": "10"}}'

near view awesomeweb4.testnet web4_get '{"request": {"path": "/apps", "params": {}, "query": {"limit": "10"}}'
```

## Notes
- All monetary values are in yoctoNEAR (1 NEAR = 10^24 yoctoNEAR)
- Guardian permissions are required for administrative functions
- Web4 protocol implementation is required for dapp contracts
- App updates require either guardian permission or original owner authentication

