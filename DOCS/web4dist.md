# Web4 Distribution


using https://github.com/vgrichina/web4-min-contract

first deploy web4-min-contract
```sh
near deploy web4go.testnet web4-min.wasm
near deploy web4go.near web4-min.wasm
```

near cli network
```sh
export NEAR_NETWORK=testnet
export NEAR_NETWORK=mainnet
echo $NEAR_NETWORK 
echo $NEAR_ENV
```

deploy
```sh
npx web4-deploy dist web4go.testnet --nearfs
npx web4-deploy dist web4go.near --nearfs
```
- can be run with or without --nearfs



also locally with ipfs
```sh
ipfs add -r dist
```


---


git remotes
- https://github.com/sleetplayground/sleet_key.git


