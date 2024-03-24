import NoMetamask from "@/components/connect/metamask/noMetamask";
import { ActionBar } from "@/components/connect/styled";
import ConnectButton from "@/components/connect/connectButton";
import { chainMap, evmChainId, getChainName } from "../../../frontedUtils/consts/chains";
import WrongNetwork from "@/components/connect/metamask/wrongNetwork";
import MetamaskNoAccount from "@/components/connect/metamask/noAccount";



export async function getMetamaskElement(network) {
  if (!window.ethereum || !window.ethereum.isMetaMask) {
    return <NoMetamask />;
  }

  const chainId = await window.ethereum.request({ method: "eth_chainId" });
  if (parseInt(chainId) !== evmChainId[network]) {
    return <WrongNetwork network={network} />;
  }

  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });
  if ((accounts || []).length <= 0) {
    return <MetamaskNoAccount />;
  }

  return (
    <ActionBar>
      <ConnectButton
        address={accounts[0]}
        network={network}
        isMetamask={true}
      />
    </ActionBar>
  );
}


// chainId in hex
export async function switchChain (chainID) {
  try {
    await window.ethereum.request({
      "method": "wallet_switchEthereumChain",
      "params": [
        {
          "chainId": chainID
        }
      ]
    });
  } catch (switchError) {
    const chainName = getChainName(chainID);
    if (switchError.code == '4902') {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [{
            "chainId": chainID,
            "chainName":  chainMap.get(chainName).name,
            "blockExplorerUrls": [
              chainMap.get(chainName).blockExplorerUrl
            ],
            "rpcUrls": [
              chainMap.get(chainName).rpc
            ],
            "nativeCurrency": chainMap.get(chainName).nativeCurrency,
            // chainMap[chainID]
          }],
        });

       return
      } catch (addError) {
        // handle "add" error
        throw addError;
      }
    }
    throw switchError;
  }
}