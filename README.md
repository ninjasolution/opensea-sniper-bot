# opensea-sniper-bot

 # ❗❗❗❗ **WARNING** ❗❗❗❗

[THIS](https://github.com/blockchainexpertbc/opensea-sniper-bot/) is the only official version of the bot

I can only ensure the integrity of this version. If you use any fork, it will be at your own risks

-blockchainexpertbc



## Installation
```
git clone https://github.com/blockchainexpertbc/opensea-sniper-bot.git
cd ./opensea-sniper-bot
npm install
```
## Usage
You can also run this script by using `npm start`

### .env
- MNEMONIC : The mnemonic of the wallet to use. Classic derivation path (trustwallet, metamask,etc)
- NETWORK : network to use. Only two options ("rinkeby" for testnet, "mainnet" for etherreum mainnet)
- NODE_API_KEY : your infura api key ( https://ethereumico.io/knowledge-base/infura-api-key-guide/)
- ACCOUNT_ADDRESS : the ethereum address linked to the mnemonic above
- COLLECTION_ADDR : the opensea asset address
- TOKEN_IDS : the array of assets id
- PRIVATE_KEYS : The private key array for gas fee to buy asset you want

### Example
```
npm start
```

