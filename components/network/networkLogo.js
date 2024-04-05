import ChainIcon from "../chain/ChainIcon";

export default function NetworkLogo({ network,size=24 }) {
  return <ChainIcon chainName={network} size={size}/>;
}
