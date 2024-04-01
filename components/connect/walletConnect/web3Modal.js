import { createWeb3Modal, defaultConfig } from '@web3modal/ethers5/react'
import { chainMap, chains, getChainName } from 'frontedUtils/consts/chains';


// 1. Get projectId at https://cloud.walletconnect.com
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID

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
  url: 'http://127.0.0.1:8001', // origin must match your domain & subdomain
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
})

// 5. Create a Web3Modal instance
export const web3Modal = createWeb3Modal({
  ethersConfig,
  chains: walletConnectChains,
  projectId,
  defaultChain: walletConnectChains[0],
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true, // Optional - false as default
  themeVariables: {
    '--wcm-font-family': 'Roboto, sans-serif',
    '--wcm-accent-color': '#F5841F',
    '--wcm-z-index' : '2147483647',
  },
  
 
})


export const switchNetworkWc = async (desiredChainId) => {
  const isConnected = await web3Modal.getIsConnected();
  console.log(desiredChainId)
  if (isConnected) {
    try {
      await web3Modal.switchNetwork(desiredChainId)
      console.log('Network switched successfully')
    } catch (error) {
      const chainName = getChainName(desiredChainId);
      // Handle errors, e.g., if the chain is not added to the wallet
      if (error.code === 4902) {
        // Chain not added, add it first
        const chainData = {
          chainId: `0x${desiredChainId}`,
          chainName: chainMap.get(chainName).name, // Replace with the desired chain name
          "blockExplorerUrls": [
            chainMap.get(chainName).blockExplorerUrl
          ],
          "rpcUrls": [
            chainMap.get(chainName).rpc
          ],
          "nativeCurrency": chainMap.get(chainName).nativeCurrency,
        }

        try {
          await web3Modal.addChain(chainData)
          console.log('Chain added successfully')
          await web3Modal.switchNetwork(desiredChainId)
          console.log('Network switched successfully')
        } catch (addError) {
          console.error('Failed to add chain', addError)
        }
      } else {
        console.error('Failed to switch network', error)
      }
    }
  } else {
    console.error('No wallet connected')
  }
}

export function Web3Modal({ children }) {
  return children
}

