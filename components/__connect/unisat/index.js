import NoUnisat from "@/components/connect/unisat/noUnisat";
import WrongNetwork from "@/components/connect/unisat/wrongNetwork";
import UnisatNoAccount from "@/components/connect/unisat/noAccount";
import { ActionBar } from "@/components/connect/styled";
import ConnectButton from "@/components/connect/connectButton";
import { btcChainId } from "../../../frontedUtils/consts/chains";


export async function getUnisatElement(network) {
    if (!window.unisat) {
        return <NoUnisat />;
    }

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

