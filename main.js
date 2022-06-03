// Setting up the environment
const helpers = require("./helpers.js");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const BigNumber = require('bignumber.js');
const opensea = require("opensea-js");
const OrderSide = require("opensea-js/lib/types").OrderSide;
const OpenSeaPort = opensea.OpenSeaPort;
const Network = opensea.Network;


var extragas = 0
const accountAddress = "0x02fc14d01F4E073829276cc2f4f94Fb4EDe1e0c4"
const opensea_link = "https://opensea.io/assets/ethereum/0x75335297cb5029c2a9acb2b47507f18ffd48e96c/2417"
// const opensea_link = "https://testnets.opensea.io/assets/rinkeby/0x3286c95b43e4beffb15d60c51b6b1c7f026e40bd/430"
const MNEMONIC = "december hedgehog income today portion acquire betray spring cry wheel practice coyote rebel gas climb"
const privateKeys = ["a58aa0760cc92d52959fefca1982712e6408d98b7a7fad7796d16f90915145ff"];
const NODE_API_KEY = "a3a311a7d66644ffa18110e797cf65d4"
const NETWORK = "mainnet"
// const NETWORK = "live"
const API_KEY = "f69c0112d1c348d799aee906d7435263" //process.env.API_KEY || ""; // API key is optional but useful if you're doing a high volume of requests.

if (!MNEMONIC || !NODE_API_KEY || !NETWORK || !opensea_link || !accountAddress) {

  console.error(
    "Missing arguments"
  );

}



const network = NETWORK === "mainnet"/*  || NETWORK === "live" */ ? "mainnet" : "rinkeby";
console.log(network)

const providerEngine = new HDWalletProvider(privateKeys, "https://" + network + ".infura.io/v3/" + NODE_API_KEY);

const seaport = new OpenSeaPort(
  providerEngine,
  {
    networkName:
      NETWORK === "mainnet" /* || NETWORK === "live" */
        ? Network.Main
        : Network.Rinkeby,
    apiKey: API_KEY,
  });

// Environment setup done



const [ asset_contract_address, token_id ] = helpers.parse_url(opensea_link) // extract asset contract address and token id from the opensea likn

console.log(asset_contract_address, token_id)

async function main() {
  console.log("Launched");

  extragas = (await seaport._computeGasPrice()).toString();
  console.log(extragas);

  //set the gas fee as two time
  seaport.gasPriceAddition = new BigNumber(extragas);  // add extra gas to current gas price

  let order;
  try {
    order = await seaport.api.getOrder({   // Extracting order to fulfill
        asset_contract_address,
        token_id,
        side: OrderSide.Sell,
    });
    console.log(order.basePrice)
  }catch (error) {
    console.log(error, "------------------------------")
  }

  try {
    const transactionHash = await seaport.fulfillOrder({ //Fulfilling order
          order,
          accountAddress,
    });
    console.log(transactionHash);
  }catch (error) {
    console.log(error)
  }
	
  return;

};

setTimeout(main, 0)

