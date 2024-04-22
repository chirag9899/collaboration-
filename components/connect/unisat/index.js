import NoUnisat from "@/components/connect/unisat/noUnisat";
import WrongNetwork from "@/components/connect/unisat/wrongNetwork";
import UnisatNoAccount from "@/components/connect/unisat/noAccount";
import { ActionBar } from "@/components/connect/styled";
import ConnectButton from "@/components/connect/connectButton";
import { btcChainId } from "../../../frontedUtils/consts/chains";
import { request, AddressPurpose } from "@sats-connect/core";


export async function getUnisatElement(network) {
  if (!window.unisat || !window.XverseProviders) {
        return <NoUnisat />;
  }
  if (window.XverseProviders) {
    const res = await request('getAccounts', {
      purposes: [AddressPurpose.Payment, AddressPurpose.Ordinals, AddressPurpose.Stacks],
      message: 'We are requesting your bitcoin address',
    });
    if (res.status !== 'success') {
      return <UnisatNoAccount />;
    } else {
      const ordinalsAddressItem = res.result.find(
        (address) => address.purpose === AddressPurpose.Ordinals
      );
      return (
        <ActionBar>
          <ConnectButton
            address={ordinalsAddressItem.address}
            network={network}
            isUnisat={true}
          />
        </ActionBar>
      );
    }
  } else {
    if (window.unisat) {
      const accounts = await window.unisat.requestAccounts();
      if ((accounts || []).length <= 0) {
        return <UnisatNoAccount />;
      }

      return (
        <ActionBar>
          <ConnectButton
            address={accounts[0]}
            network={network}
            isUnisat={true}
          />
        </ActionBar>
      );
    }
    }
}

// network livenet or testnet
export async function switchNetwork (network) {
  try {
      await window.unisat.switchNetwork(network);
  } catch (error) {
      console.log(error)
  }
}