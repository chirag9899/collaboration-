import React from "react";
import { ReactComponent as Polkadot } from "../../public/imgs/icons/chain/polkadot.svg";
import { ReactComponent as Khala } from "../../public/imgs/icons/chain/khala.svg";
import { ReactComponent as Kusama } from "../../public/imgs/icons/chain/kusama.svg";
import { ReactComponent as Default } from "../../public/imgs/icons/chain/default.svg";
import { ReactComponent as Moonriver } from "../../public/imgs/icons/chain/moonriver.svg";
import { ReactComponent as Interlay } from "../../public/imgs/icons/chain/interlay.svg";
import { ReactComponent as Polkadex } from "../../public/imgs/icons/chain/polkadex.svg";
import { ReactComponent as Crust } from "../../public/imgs/icons/chain/crust.svg";
import { ReactComponent as Ethereum } from "../../public/imgs/icons/chain/ethereum.svg";
import { ReactComponent as Moonbeam } from "../../public/imgs/icons/chain/moonbeam.svg";
import { ReactComponent as Centrifuge } from "../../public/imgs/icons/chain/centrifuge.svg";
import { ReactComponent as Chrwna } from "../../public/imgs/icons/chain/chrwna.svg";
import { ReactComponent as Shiden } from "../../public/imgs/icons/chain/shiden.svg";
import { ReactComponent as Altair } from "../../public/imgs/icons/chain/altair.svg";
import { ReactComponent as Rococo } from "../../public/imgs/icons/chain/rococo.svg";
import { ReactComponent as Taiko } from "../../public/imgs/icons/chain/taiko.svg";
import { ReactComponent as Linea } from "../../public/imgs/icons/chain/linea.svg";
import { ReactComponent as Berachain } from "../../public/imgs/icons/chain/berachain.svg";
import { ReactComponent as Brc20 } from "../../public/imgs/icons/chain/bitcoin.svg";
import { ReactComponent as Merlin } from "../../public/imgs/icons/chain/merlin.svg";
import { ReactComponent as Runes } from "../../public/imgs/icons/chain/runes.svg";
import { ReactComponent as Ordcollection } from "../../public/imgs/icons/chain/ordcollection.svg";
import Westend from "../../public/imgs/icons/chain/westend.png";
import Bifrost from "../../public/imgs/icons/chain/bifrost.png";
import Kintsugi from "../../public/imgs/icons/chain/kintsugi.png";
import Acala from "../../public/imgs/icons/chain/acala.png";
import Turing from "../../public/imgs/icons/chain/turing.png";
import Crab from "../../public/imgs/icons/chain/crab.png";
import Darwinia from "../../public/imgs/icons/chain/darwinia.png";
import Westmint from "../../public/imgs/icons/chain/wesmint.png";
import Statemine from "../../public/imgs/icons/chain/statemine.png";
import Statemint from "../../public/imgs/icons/chain/statemint.png";
import Karura from "../../public/imgs/icons/chain/karura.png";
import Phala from "../../public/imgs/icons/chain/phala.png";
import Litmus from "../../public/imgs/icons/chain/litmus.png";
import Zeitgeist from "../../public/imgs/icons/chain/zeitgeist.png";
import Parallel from "../../public/imgs/icons/chain/parallel.png";
import Basilisk from "../../public/imgs/icons/chain/basilisk.png";
import Hydradx from "../../public/imgs/icons/chain/hydradx.png";
import Stafi from "../../public/imgs/icons/chain/stafi.png";
import Creditcoin from "../../public/imgs/icons/chain/creditcoin.png";
import styled from "styled-components";
import Tooltip from "../Tooltip";
import Image from "next/image";

const Wrapper = styled.div`
  position: relative;
  display: flex;
`;

const svgs = {
  Polkadot,
  Khala,
  Kusama,
  Moonriver,
  Interlay,
  Polkadex,
  Crust,
  Ethereum,
  Moonbeam,
  Centrifuge,
  Chrwna,
  Shiden,
  Altair,
  Rococo,
  Taiko,
  Linea,
  Berachain,
  Brc20,
  Merlin,
  Runes,
  Ordcollection
};
const pngs = {
  Westend,
  Bifrost,
  Kintsugi,
  Acala,
  Westmint,
  Statemine,
  Statemint,
  Karura,
  Turing,
  Crab,
  Darwinia,
  Phala,
  Litmus,
  Zeitgeist,
  Basilisk,
  Parallel,
  Hydradx,
  Stafi,
  Creditcoin,
};

// since nextjs v11, import image assets will return an object { src, ... }
const resolvePngs = (png) => png.src ?? png;

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

function ResolveChainIcon({ chainName = "", size = 24 }) {
  chainName = capitalize(chainName);

  let Icon = <Default viewBox="0 0 24 24" width={size} height={size} />;

  if (svgs[chainName]) {
    const SvgIcon = svgs[chainName];
    Icon = <SvgIcon viewBox="0 0 24 24" width={size} height={size} />;
  } else if (pngs[chainName]) {
    Icon = (
      <Image
        src={resolvePngs(pngs[chainName])}
        width={size}
        height={size}
        alt={chainName}
      />
    );
  }

  return Icon;
}

function ChainIcon({
  chainName,
  position,
  offset,
  showTooltip = false,
  size = 24,
}) {
  const Icon = ResolveChainIcon({ chainName, size });
  return (
    <Wrapper>
      {Icon}
      {showTooltip && (
        <Tooltip
          content={capitalize(chainName)}
          position={position}
          offset={offset}
          size="full"
        >
          <></>
        </Tooltip>
      )}
    </Wrapper>
  );
}

export default ChainIcon;
