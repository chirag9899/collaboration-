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

// export const evm = {
//   moonbeam: "moonbeam",
//   moonriver: "moonriver",
//   ethereum: "ethereum",
//   taiko: "taiko",
//   linea: "linea",
//   blast: "blast",
//   berachain: "berachain",
//   merlin: "merlin"
// };
// export const evmChains = [evm.moonbeam, evm.moonriver, evm.ethereum, evm.taiko, evm.linea, evm.blast, evm.berachain, evm.merlin];
// export const evmChainId = Object.freeze({
//   [evm.moonbeam]: 1284,
//   [evm.moonriver]: 1285,
//   [evm.ethereum]: 1,
//   [evm.taiko]: 167008,
//   [evm.linea]: 59144,
//   [evm.blast]: 81457,
//   [evm.berachain]: 80085,
//   [evm.merlin]: 4200
// });

// // Add BTC chain
// export const btc = {
//   brc20: "brc20"
// }
// export const btcChains = [btc.brc20];
// export const btcChainId = Object.freeze({
//   [btc.brc20]: 12123
// });

export const chains = [
  { id: '0x1', chainName: 'ethereum', chainType: 'evm' },
  { id: '0x4fc', chainName: 'moonbeam', chainType: 'evm'  },
  { id: '0x505', chainName: 'moonriver', chainType: 'evm'  },
  { id: '0x28c80', chainName: 'taiko', chainType: 'evm'  },
  { id: '0xe708', chainName: 'linea', chainType: 'evm'  },
  { id: '0x13E31', chainName: 'blast', chainType: 'evm'  },
  { id: '0x13955', chainName: 'berachain', chainType: 'evm'  },
  { id: '0x1068', chainName: 'merlin', chainType: 'evm'  },
  { id: '2f7b', chainName: 'brc20', chainType: 'btc'  },
];

export const chainMap = new Map(chains.map(chain => [chain.chainName, { chainName: chain.chainName, id: chain.id, chainType: chain.chainType }]));

const walletToChains = {
  'metamask' : ['ethereum', 'moonbeam', 'taiko', 'linea', 'blast','merlin','berachain', 'moonriver'],
  'unisat' : ['brc20'],
  'walletconnect' : ['ethereum', 'brc20'],
}

export function supportedChains(selectedWallet) { 
  return  walletToChains[selectedWallet];
}