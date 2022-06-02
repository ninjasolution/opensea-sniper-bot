// Setting up the environment
const args = require('yargs').argv;
const helpers = require("./helpers.js");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const BigNumber = require('bignumber.js');
const opensea = require("opensea-js");
const OpenSeaPort = opensea.OpenSeaPort;
const Network = opensea.Network;
const MnemonicWalletSubprovider = require("@0x/subproviders")
  .MnemonicWalletSubprovider;
const RPCSubprovider = require("web3-provider-engine/subproviders/rpc");
const Web3ProviderEngine = require("web3-provider-engine");


var extragas = 1200 //args.extragas
const accountAddress = "0x02fc14d01F4E073829276cc2f4f94Fb4EDe1e0c4" //args.buyeraddy
const opensea_link = "https://opensea.io/assets/0xec9c519d49856fd2f8133a0741b4dbe002ce211b/2197" //args.url
const MNEMONIC = "december hedgehog income today portion acquire betray spring cry wheel practice coyote rebel gas climb" //args.mnemonic;
const NODE_API_KEY = "5c34343809f04bcb96e9a4aeaf19aeca" //args.infura;
const isInfura = true // !!args.infura;
const NETWORK = "mainnet" //args.network;
const API_KEY = "b410249ba9b14309afd104ee97497485" //process.env.API_KEY || ""; // API key is optional but useful if you're doing a high volume of requests.
const startTimeUTC = "9:21:30";
if (!MNEMONIC || !NODE_API_KEY || !NETWORK || !opensea_link || !accountAddress) {
  console.error(
    "Missing arguments"
  );
}

if (!startTimeUTC) {
  [hour,minute,second]=[0,0,0]
} else {
  hour = parseInt(startTimeUTC.replace(/:.*/, ""))
  re = /:(\d+):/
  minute = parseInt((re.exec(startTimeUTC))[1]);
  second = parseInt(startTimeUTC.replace(/.*:/, ""));
}

if (!args.extragas)
{
  extragas=0                                                                                                                                                                                                                                                                                                                                                 
}

const network =
  NETWORK === "mainnet" || NETWORK === "live" ? "mainnet" : "rinkeby";
const infuraRpcSubprovider = new RPCSubprovider({
  rpcUrl: isInfura
    ? "https://" + network + ".infura.io/v3/" + NODE_API_KEY
    : "https://eth-" + network + ".alchemyapi.io/v2/" + NODE_API_KEY,
});

const providerEngine = new HDWalletProvider({
  mnemonic: {
    phrase: MNEMONIC
  },
  providerOrUrl: "https://" + network + ".infura.io/v3/" + NODE_API_KEY
});

const seaport = new OpenSeaPort(
  providerEngine,
  {
    networkName:
      NETWORK === "mainnet" || NETWORK === "live"
        ? Network.Main
        : Network.Rinkeby,
    apiKey: API_KEY,
  },
  (arg) => console.log(arg)
);

// Environment setup done

seaport.gasPriceAddition = new BigNumber(extragas);  // add extra gas to current gas price
var [asset_contract_address, token_id] = helpers.parse_url(opensea_link) // extract asset contract address and token id from the opensea likn

async function main() {
  console.log("Launched");
	const order = await seaport.api.getOrder({   // Extracting order to fulfill
			asset_contract_address,
			token_id,
			side: 1 
  });

	const transactionHash = await seaport.fulfillOrder({ //Fulfilling order
        order,
        accountAddress,
	});
  console.log(transactionHash);
  return;

};

//Setting up a timeout
var now = new Date()
var t = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute, second, 10).getTime() 
currentTime = new Date().getTime()
timeo = t - Date.now();
// setTimeout(main,Math.max(timeo,0))

