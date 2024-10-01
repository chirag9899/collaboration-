import { noop } from "@osn/common-ui";
import { useCallback, useEffect } from "react";
import StatemineAssetConfig from "./statemineAssetConfig";
import { FieldWrapper, Title, Wrapper } from "./styled";
import CommonAssetConfig from "./commonAssetConfig";
import OrmlTokenConfig from "./ormlTokenConfig";
import Erc20TokenConfig from "./erc20TokenConfig";
import Brc20TokenConfig from "./brc20TokenConfig";
import OrdCollectionTokenConfig from "./ordCollectionTokenConfig";
import RunesTokenConfig from "./runesTokenConfig";
import styled from "styled-components";
import useStateChanged from "hooks/useStateChanged";
import { AssetTypes } from "./constants";
// import ChainSelectorDrop from "@/components/ChainSelecDrop";
import ChainSelector from "@/components/chainSelector";
import ChainSelectorDrop from "@/components/ChainSelecDrop";

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DeleteWrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  color: #ee4444;
`;

const MyFieldWrapper = styled(FieldWrapper)`
  z-index: 20;
`;

export default function Asset({
  chainsDef,
  tokensDef,
  count,
  index,
  asset,
  setAsset = noop,
  removeAsset = noop,
  prevContract,
}) {
  const assetsCountChanged = useStateChanged(count);

  const chainInfo = chainsDef.find((item) => item.network === asset?.chain);
  const filteredCains = chainsDef.filter(
    (item) => item.network !== "linea" && item.network !== "blast",
  );

  const setPartialAsset = useCallback(
    (partialData) => {
      setAsset({
        ...asset,
        ...partialData,
      });
    },
    [asset, setAsset],
  );

  useEffect(() => {
    if (filteredCains.length === 1) {
      onSelectChain(filteredCains[0]);
    }
  }, [filteredCains]);

  const onSelectChain = useCallback(
    (chain) => {
      if (!chain) {
        return;
      }

      if (chain?.network === asset?.chain) {
        // this is required to prevent infinite loop
        return;
      }

      setPartialAsset({
        chain: chain?.network,
        name: chain?.name || chain?.network,
        type: undefined,
        assetId: undefined,
        contract: undefined,
      });
    },
    [asset?.chain, setPartialAsset],
  );

  useEffect(() => {
    if (assetsCountChanged && count === 1 && asset.votingWeight !== "1") {
      setPartialAsset({ votingWeight: "1" });
    }
  }, [assetsCountChanged, count, asset, setPartialAsset]);

  useEffect(() => {
    if (chainInfo?.ss58Format === asset?.ss58Format) {
      return;
    }
    setPartialAsset({ ss58Format: chainInfo?.ss58Format });
  }, [chainInfo?.ss58Format, asset?.ss58Format, setPartialAsset]);

  let assetConfig = (
    <CommonAssetConfig
      count={count}
      chain={asset.chain}
      name={asset.name}
      nativeTokenInfo={chainInfo}
      asset={asset}
      setPartialAsset={setPartialAsset}
    />
  );

  if (chainInfo?.supportAssetTypes?.includes(AssetTypes.ASSETS)) {
    assetConfig = (
      <StatemineAssetConfig
        count={count}
        chain={asset.chain}
        name={asset.name}
        asset={asset}
        nativeTokenInfo={chainInfo}
        setPartialAsset={setPartialAsset}
      />
    );
  } else if (chainInfo?.supportAssetTypes?.includes(AssetTypes.ORML)) {
    assetConfig = (
      <OrmlTokenConfig
        tokensDef={tokensDef}
        count={count}
        chain={asset.chain}
        asset={asset}
        nativeTokenInfo={chainInfo}
        setPartialAsset={setPartialAsset}
      />
    );
  } else if (chainInfo?.supportAssetTypes?.includes(AssetTypes.EVM_ERC20)) {
    assetConfig = (
      <Erc20TokenConfig
        prevContract={prevContract}
        count={count}
        chain={asset.chain}
        name={asset.name}
        nativeTokenInfo={chainInfo}
        asset={asset}
        setPartialAsset={setPartialAsset}
      />
    );
  } else if (chainInfo?.supportAssetTypes?.includes(AssetTypes.ORD_BRC20)) {
    assetConfig = (
      <Brc20TokenConfig
        prevContract={prevContract}
        count={count}
        chain={asset.chain}
        name={asset.name}
        nativeTokenInfo={chainInfo}
        asset={asset}
        setPartialAsset={setPartialAsset}
      />
    );
  } else if (
    chainInfo?.supportAssetTypes?.includes(AssetTypes.COLLECTION_ORD)
  ) {
    assetConfig = (
      <OrdCollectionTokenConfig
        prevContract={prevContract}
        count={count}
        chain={asset.chain}
        name={asset.name}
        nativeTokenInfo={chainInfo}
        asset={asset}
        setPartialAsset={setPartialAsset}
      />
    );
  } else if (
    chainInfo?.supportAssetTypes?.includes(AssetTypes.COLLECTION_RUNES)
  ) {
    assetConfig = (
      <RunesTokenConfig
        prevContract={prevContract}
        count={count}
        chain={asset.chain}
        name={asset.name}
        nativeTokenInfo={chainInfo}
        asset={asset}
        setPartialAsset={setPartialAsset}
      />
    );
  }

  return (
    <Wrapper>
      <Header>
        <Title>Vote Tokens#{index + 1}</Title>
        {count > 1 && (
          <DeleteWrapper onClick={removeAsset}>Delete</DeleteWrapper>
        )}
      </Header>
      <MyFieldWrapper>
        {filteredCains.length > 1 && (
          <>
            <Title>Chain</Title>
            {/* <ChainSelector chains={filteredCains} onSelect={onSelectChain} /> */}
            <ChainSelectorDrop
              chains={filteredCains}
              onSelect={onSelectChain}
            />
          </>
        )}
        <Title>Network: {chainInfo?.name || asset?.name}</Title>
        <Title>
          ChainID: {chainInfo?.ss58Format || asset?.ss58Format || 1}
        </Title>
      </MyFieldWrapper>
      {assetConfig}
    </Wrapper>
  );
}
