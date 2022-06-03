// Setting up the environment
const helpers = require("./helpers.js");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const BigNumber = require('bignumber.js');
const opensea = require("opensea-js");
const OrderSide = require("opensea-js/lib/types").OrderSide;
const OpenSeaPort = opensea.OpenSeaPort;
const Network = opensea.Network;

require('dotenv').config(); 

var extragas = 0
const accountAddress = process.env.ACCOUNT_ADDRESS
const opensea_link = process.env.OPENSEA_LINK
const MNEMONIC = process.env.MNEMONIC
const privateKeys = process.env.PRIVATE_KEYS
const NODE_API_KEY = process.env.NODE_API_KEY
const NETWORK = process.env.NETWORK
const API_KEY = process.env.API_KEY


if (!MNEMONIC || !NODE_API_KEY || !NETWORK || !opensea_link || !accountAddress) {

  console.error(
    "Missing arguments"
  );

}


const network = NETWORK === "mainnet" /* || NETWORK === "live" */ ? "mainnet" : "rinkeby";
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
  },
  (arg) => console.log(arg)
  );

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

