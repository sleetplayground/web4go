# WEB4GO
web4 browser

This is a demo project to browse content on web4.

## How This App Works
The web4 browser provides a seamless way to access web4 content across both master accounts and subaccounts on the NEAR blockchain:

1. **Master Accounts**: For master accounts (e.g., example.near), the app automatically redirects to the standard .page domain (example.near.page).

2. **Subaccounts**: For subaccounts (e.g., sub.example.near), the app:
   - Queries the web4_get endpoint to retrieve the IPFS hash
   - Resolves the content through IPFS gateways
   - Displays the content directly in your browser

3. **Gateway Integration**: The app intelligently handles both mainnet and testnet content using appropriate IPFS gateways:
   - Mainnet: ipfs.web4.near.page
   - Testnet: ipfs.web4.testnet.page

What is the reason for this tool?
<br/>
if you know the near account you can just type it in to a broswer and add .page to the end. the issue is that this only works for master accounts. this tool is so you can browse content on web4 from subaccounts.

What is web4?
<br/>
Web4 is the future of the web using ipfs and near. leanr more at web4.near.page, you can submit apps at awesomeweb4.near.page


Will this tool become obsolete?
<br/>
My curent main goal is to allow users to get to web4 site that are deploye to subaccount. There may be an esier fix in the future. But I also want this be a site to discover apps and people on web4.


----

NEAR IPFS Public gateways :: [NEAR FS](https://github.com/vgrichina/nearfs) :: /ipfs/:cid or youraccount.near.page
- https://ipfs.web4.near.page/ipfs/cid_here. Access data stored on NEAR mainnet.
- https://ipfs.web4.testnet.page/ipfs/cid_here. Access data stored on NEAR testnet.
- https://near.page Web4 gateway which uses NEARFS to resolve ipfs:// links when possible.
- https://testnet.page



Public RPC endpoints
- Testnet: https://rpc.web4.testnet.page/account/testnet
- Mainnet: https://rpc.web4.near.page/account/near


web 4 min contract
<br/>
https://github.com/vgrichina/web4-min-contract


---

copyright 2025 by sleet.near