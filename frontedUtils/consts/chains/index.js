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
    console.log(`No chain configs for ${chain}`);
  }

  return configs;
}

export const chains = [
  { id: '0x1', chainName: 'ethereum', name: 'Ethereum LlamaNodes', chainType: 'evm', blockExplorerUrl: 'https://etherscan.io', rpc: 'https://eth.llamarpc.com', nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 } },
  { id: '0x4fc', chainName: 'moonbeam', name: 'Moonbeam', chainType: 'evm', blockExplorerUrl: 'https://moonbeam.moonscan.io', rpc: 'https://rpc.api.moonbeam.network', nativeCurrency: { name: 'GLMR', symbol: 'GLMR', decimals: 18 } },
  { id: '0x505', chainName: 'moonriver', name: 'Moonriver', chainType: 'evm', blockExplorerUrl: 'https://moonriver.moonscan.io', rpc: 'https://moonriver.api.onfinality.io/public', nativeCurrency: { name: 'MOVR', symbol: 'MOVR', decimals: 18 } },
  { id: '0x28c60', chainName: 'taiko', name: 'Taiko Katla L2', chainType: 'evm', blockExplorerUrl: 'https://explorer.katla.taiko.xyz', rpc: 'https://rpc.katla.taiko.xyz', nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 } },
  { id: '0xe708', chainName: 'linea', name: 'linea', chainType: 'evm', blockExplorerUrl: 'https://lineascan.build', rpc: 'https://linea.blockpi.network/v1/rpc/public', nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 } },
  { id: '0x13e31', chainName: 'blast', name: 'blast', chainType: 'evm', blockExplorerUrl: 'https://blastscan.io', rpc: 'https://rpc.blast.io', nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 } },
  { id: '0x138d5', chainName: 'berachain', name: 'Berachain Artio', chainType: 'evm', blockExplorerUrl: 'https://artio.beratrail.io', rpc: 'https://artio.rpc.berachain.com', nativeCurrency: { name: 'BERA', symbol: 'BERA', decimals: 18 } },
  { id: '0x138d4', chainName: 'berachain-b2', name: 'Berachain bArtio B2 Public Testnet', chainType: 'evm', blockExplorerUrl: 'https://bartio.beratrail.io', rpc: 'https://bitter-rough-owl.bera-bartio.quiknode.pro/4e2fcb78f8ac6cd2d04e471385cb875623f4c57a', nativeCurrency: { name: 'BERA', symbol: 'BERA', decimals: 18 } },
  { id: '0x1068', chainName: 'merlin', name: 'Merlin Mainnet', chainType: 'evm', blockExplorerUrl: 'https://scan.merlinchain.io', rpc: 'https://rpc.merlinchain.io', nativeCurrency: { name: 'BTC', symbol: 'BTC', decimals: 18 } },
  { id: 'livenet', chainName: 'brc20', chainType: 'btc' },
  { id: '2f7c', chainName: 'ordcollection', chainType: 'btc' },
  { id: '4f7d', chainName: 'runes', chainType: 'btc' },

];

export const chainMap = new Map(chains.map(chain => [chain.chainName, { chainName: chain.chainName, name: chain.name, id: chain.id, chainType: chain.chainType, rpc: chain.rpc, blockExplorerUrl: chain.blockExplorerUrl, nativeCurrency: chain.nativeCurrency }]));

const walletToChains = {
  'metamask': ['ethereum', 'moonbeam', 'taiko', 'linea', 'blast', 'merlin', 'berachain', 'moonriver', 'berachain-b2'],
  'unisat': ['brc20', 'ordcollection', 'runes'],
  'xverse': ['brc20', 'ordcollection', 'runes'],
  'walletConnect': ['ethereum', 'moonbeam', 'taiko', 'linea', 'blast', 'merlin', 'berachain', 'moonriver', 'berachain-b2'],
}

export function supportedChains(selectedWallet) {
  return walletToChains[selectedWallet];
}

export function getChainName(id) {
  const chain = chains.find(chain => chain.id === id);
  return chain ? chain.chainName : null;
}