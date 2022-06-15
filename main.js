// Setting up the environment
const HDWalletProvider = require("@truffle/hdwallet-provider");
const BigNumber = require('bignumber.js');
const opensea = require("opensea-js");
const OrderSide = require("opensea-js/lib/types").OrderSide;
const OpenSeaPort = opensea.OpenSeaPort;
const Network = opensea.Network;

require('dotenv').config(); 

var extragas = 0
const accountAddress = process.env.ACCOUNT_ADDRESS
const asset_contract_addresses = "0x3286c95b43e4beffb15d60c51b6b1c7f026e40bd";
const token_ids = ["459", "462"];
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
})();

//set the gas fee as two times
seaport.gasPriceAddition = new BigNumber(extragas);  // add extra gas to current gas price

// Environment setup done


async function main() {
  console.log("Launched");

  let order;
  try {
    order = await seaport.api.getOrders({   // Extracting order to fulfill
      asset_contract_address: asset_contract_addresses,
      token_ids: token_ids,
      side: OrderSide.Sell
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
  
  return;
};

setTimeout(main, 0)

