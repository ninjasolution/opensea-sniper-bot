# opensea-sniper-bot

 # ❗❗❗❗ **WARNING** ❗❗❗❗

[THIS](https://github.com/clovisjohn/opensea-sniper-bot/) is the only official version of the bot

I can only ensure the integrity of this version. If you use any fork, it will be at your own risks

-clovisjohn



## Installation
```
git clone https://github.com/clovisjohn/opensea-sniper-bot.git
cd ./opensea-sniper-bot
npm install
```
## Usage
You can also run this script by using `node main.js --<args>`

### Arguments
- mnemonic : The mnemonic of the wallet to use. Classic derivation path (trustwallet, metamask,etc)
- network : network to use. Only two options ("rinkeby" for testnet, "mainnet" for etherreum mainnet)
- infura : your infura api key ( https://ethereumico.io/knowledge-base/infura-api-key-guide/)
- buyeraddy : the ethereum address linked to the mnemonic above
- url : The link of the opensea asset you want to buy
- extragas (**optional**) : amount in gwei that will be added to the current gas price for the txn ( txn_gas_price = current_gas_price + extra_gas_price). Default is 0
- startTimeUTC (**optional**): The UTC time at which the asset should be bought ( format hh:mm:ss). Default is immediate buy

### Example
```
node main.js
```

### Quick launch with colab
[![Open All Collab](https://colab.research.google.com/assets/colab-badge.svg)](https://githubtocolab.com/clovisjohn/opensea-sniper-bot/blob/main/notebook.ipynb)
