// Setting up the environment
const helpers = require("./helpers.js");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const BigNumber = require('bignumber.js');
const opensea = require("opensea-js");
const OpenSeaPort = opensea.OpenSeaPort;
const Network = opensea.Network;
const OrderSide = require("opensea-js/lib/types").OrderSide;

var extragas = 0
const accountAddress = "0x02fc14d01F4E073829276cc2f4f94Fb4EDe1e0c4"
// const opensea_link = "https://opensea.io/assets/0xec9c519d49856fd2f8133a0741b4dbe002ce211b/2197"
const opensea_link = "https://testnets.opensea.io/assets/rinkeby/0x3286c95b43e4beffb15d60c51b6b1c7f026e40bd/449"
const MNEMONIC = "december hedgehog income today portion acquire betray spring cry wheel practice coyote rebel gas climb"
const privateKeys = ["a58aa0760cc92d52959fefca1982712e6408d98b7a7fad7796d16f90915145ff"];
const NODE_API_KEY = "5c34343809f04bcb96e9a4aeaf19aeca"
const NETWORK = "live"
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

const network = NETWORK === "mainnet" || NETWORK === "live" ? "mainnet" : "rinkeby";

const providerEngine = new HDWalletProvider({
  // mnemonic: {
  //   phrase: MNEMONIC
  // },
  privateKeys: privateKeys,
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
  });

// Environment setup done

seaport.gasPriceAddition = new BigNumber(extragas);  // add extra gas to current gas price
const [asset_contract_address, token_id] = helpers.parse_url(opensea_link) // extract asset contract address and token id from the opensea likn

console.log(asset_contract_address, token_id)
console.log(seaport.web3ReadOnly);

async function main() {
  console.log("Launched");

  const asset = await seaport.api.getAsset({
    asset_contract_address, // string
    token_id, // string | number | null
  })

  console.log(asset)

  // let order;
  // try {
  //   order = await seaport.api.getOrder({   // Extracting order to fulfill
  //       asset_contract_address,
  //       token_id,
  //       side: OrderSide.Sell,
  //   });
  //   console.log(order)
  // }catch (error) {
  //   console.log(error)
  // }

  // try {
  //   const transactionHash = await seaport.fulfillOrder({ //Fulfilling order
  //         order,
  //         accountAddress,
  //   });
  //   console.log(transactionHash);
  // }catch (error) {
  //   console.log(error)
  // }
	
  return;

};

//Setting up a timeout
const now = new Date()
const t = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute, second, 10).getTime() 
currentTime = new Date().getTime()
timeo = t - Date.now();


setTimeout(main, Math.max(timeo,0))

