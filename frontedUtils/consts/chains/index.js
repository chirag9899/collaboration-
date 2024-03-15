import litmus from "./litmus";
import parallel from "./parallel";
import phala from "./phala";
import polkadex from "./polkadex";
import shiden from "./shiden";
import statemine from "./statemine";
import turing from "./turing";
import zeitgeist from "./zeitgeist";
import polkadot from "./polkadot";
import kusama from "./kusama";
import acala from "./acala";
import altair from "./altair";
import bifrost from "./bifrost";
import centrifuge from "./centrifuge";
import crust from "./crust";
import interlay from "./interlay";
import karura from "./karura";
import khala from "./khala";
import kintsugi from "./kintsugi";
import basilisk from "./basilisk";
import hydradx from "./hydradx";
import rococo from "./rococo";
import stafi from "./stafi";
import creditcoin from "./creditcoin";

export const chainConfigsMap = {
  polkadot,
  kusama,
  acala,
  altair,
  bifrost,
  centrifuge,
  crust,
  interlay,
  karura,
  khala,
  kintsugi,
  litmus,
  parallel,
  phala,
  polkadex,
  shiden,
  stafi,
  statemine,
  turing,
  zeitgeist,
  basilisk,
  hydradx,
  rococo,
  creditcoin,
};

export function getChainConfigs(chain) {
  const configs = chainConfigsMap[chain];
  if (!configs) {
    throw new Error(`No chain configs for ${chain}`);
  }

  return configs;
}

export const evm = {
  moonbeam: "moonbeam",
  moonriver: "moonriver",
  ethereum: "ethereum",
  taiko: "taiko",
  linea: "linea",
  blast: "blast",
  berachain: "berachain",
  merlin: "merlin"
};
export const evmChains = [evm.moonbeam, evm.moonriver, evm.ethereum, evm.taiko, evm.linea, evm.blast, evm.berachain, evm.merlin];
export const evmChainId = Object.freeze({
  [evm.moonbeam]: 1284,
  [evm.moonriver]: 1285,
  [evm.ethereum]: 1,
  [evm.taiko]: 167008,
  [evm.linea]: 59144,
  [evm.blast]: 81457,
  [evm.berachain]: 80085,
  [evm.merlin]: 4200
});

// Add BTC chain
export const btc = {
  brc20: "brc20"
}
export const btcChains = [btc.brc20];
export const btcChainId = Object.freeze({
  [btc.brc20]: 12123
});