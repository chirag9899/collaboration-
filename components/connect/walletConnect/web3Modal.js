'use client'

import { createWeb3Modal, defaultConfig } from '@web3modal/ethers5/react'
import { chains } from 'frontedUtils/consts/chains';


// 1. Get projectId at https://cloud.walletconnect.com
const projectId = '5c8acd7cc7204a13dcae35e6456e0590'

// 2. Set chains
const mainnet = {
  chainId: 1,
  name: 'Ethereum',
  currency: 'ETH',
  explorerUrl: 'https://etherscan.io',
  rpcUrl: 'https://cloudflare-eth.com'
}
const evmChains = chains.filter(chain => chain.chainType === 'evm');


const walletConnectChains = evmChains.map(chain => ({
  chainId: parseInt(chain.id, 16), // Convert the chain ID from hex to decimal
  name: chain.name,
  currency: chain?.nativeCurrency?.symbol,
  explorerUrl: chain.blockExplorerUrl,
  rpcUrl: chain.rpc
}));

// 3. Create a metadata object
const metadata = {
  name: 'voteApp',
  description: 'voteApp description',
  url: 'http://127.0.0.1:8001/', // origin must match your domain & subdomain
  icons: ['https://avatars.mywebsite.com/']
}

// 4. Create Ethers config
const ethersConfig = defaultConfig({
  /*Required*/
  metadata,

  /*Optional*/
  enableEIP6963: true, // true by default
  enableInjected: true, // true by default
  enableCoinbase: true, // true by default
  rpcUrl: '...', // used for the Coinbase SDK
  defaultChainId: 1, // used for the Coinbase SDK
})

// 5. Create a Web3Modal instance
createWeb3Modal({
  ethersConfig,
  chains: [mainnet],
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true, // Optional - false as default
  themeVariables: {
    '--wcm-font-family': 'Roboto, sans-serif',
    '--wcm-accent-color': '#F5841F',
    '--wcm-z-index' : '2147483647',
  },
 
})

export function Web3Modal({ children }) {
  return children
}

