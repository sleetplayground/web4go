# Sleet Browser

this is a demo project to Browse content on web4


**what is web4 and what is this browser?**
<br/>
web4 is an experiment by a few near hackers, it stores webapp data on ipfs and saves the ipfs address to your near account.
they currently have near.page domain and have somehow set it up so that every near account can have a subdomain of that.
so yourname.near can have yourname.near.page.
this works great and all but there are some limitains with web2 and web4.
while you can technically deploy a web4 website to any near account or sub account, it would be a procces to set up new subdomains for near.page so that you could depoy a website to example.whynot.yourname.near.page

that is where my sleet broswer demo project comes in as a way to browse and veiw web4 content that is depoyed to users subaccounts.
now anyone can have sleetbrowser.testnet.page/subaccount.yourname.near
using react router, this can be built into any react app to enable users to have pages on your domain

**what other uses?**
this is also a demo project to show how web4 pages can be connected and previewed in a single app or interface.

----

NEAR IPFS Public gateways :: [NEAR FS](https://github.com/vgrichina/nearfs) :: /ipfs/:cid or youraccount.near.page
- https://ipfs.web4.near.page/ipfs/cid_here. Access data stored on NEAR mainnet.
- https://ipfs.web4.testnet.page/ipfs/cid_here. Access data stored on NEAR testnet.
- https://near.page Web4 gateway which uses NEARFS to resolve ipfs:// links when possible.


web 4 min contract
<br/>
https://github.com/vgrichina/web4-min-contract