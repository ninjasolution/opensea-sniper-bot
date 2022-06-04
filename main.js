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
const asset_contract_addresses = process.env.COLLECTION_ADDRS
const token_ids = process.env.TOKEN_IDS;
const MNEMONIC = process.env.MNEMONIC
const privateKeys = process.env.PRIVATE_KEYS
const NODE_API_KEY = process.env.NODE_API_KEY
const NETWORK = process.env.NETWORK
const API_KEY = process.env.API_KEY


if (!NODE_API_KEY || !NETWORK || !asset_contract_addresses || !accountAddress) {

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
(async() => {
  extragas = (await seaport._computeGasPrice()).toString();
})()

//set the gas fee as two times
seaport.gasPriceAddition = new BigNumber(extragas);  // add extra gas to current gas price

// Environment setup done

async function firstTransaction() {
  let order;
  try {
    order = await seaport.api.getOrders({   // Extracting order to fulfill
      asset_contract_address: asset_contract_addresses[0],
      token_ids: token_ids[0],
      side: OrderSide.Sell,
    });

  }catch (error) {
    console.log("ERROR(API-GET-ORDERS):", error)
  }

  try {
    const transactionHash = await seaport.fulfillOrder({ //Fulfilling order
          order,
          accountAddress,
    });

    console.log(transactionHash);
  }catch (error) {
    console.log("ERROR(TRANSACTION-FULL-FILL-ORDER)", error)
  }
  
}

async function secondTransaction() {
  let order;
  try {
    order = await seaport.api.getOrders({   // Extracting order to fulfill
      asset_contract_address: asset_contract_addresses[1],
      token_ids: token_ids[1],
      side: OrderSide.Sell,
    });

  }catch (error) {
    console.log("ERROR(API-GET-ORDERS):", error)
  }

  try {
    const transactionHash = await seaport.fulfillOrder({ //Fulfilling order
          order,
          accountAddress,
    });

    console.log(transactionHash);
  }catch (error) {
    console.log("ERROR(TRANSACTION-FULL-FILL-ORDER)", error)
  }
  
}

async function main() {
  console.log("Launched");

  await firstTransaction();
  await secondTransaction();
  
  return;
};

setTimeout(main, 0)

