import AssetTypeSelector from "./assetTypeSelector";
import { useCallback, useEffect, useState } from "react";
import { FieldWrapper, Title, Wrapper } from "../styled";
import { noop } from "@osn/common-ui";
import AssetDetail from "../assetDetail";
import AssetConfig from "../assetConfig";
import { useIsMounted } from "@osn/common";
import nextApi from "services/nextApi";
import LoadingInput from "@/components/loadingInput";

export default function Brc20TokenConfig({
  count,
  chain,
  nativeTokenInfo,
  asset,
  setPartialAsset = noop,
}) {
  const [assetType, setAssetType] = useState("ticker");
  const [contractAddress, setContractAddress] = useState("ticker");
  const [symbol, setSymbol] = useState("ticker");
  const [decimals, setDecimals] = useState(18);
  const isMounted = useIsMounted();
  const [isLoadingMetadata, setIsLoadingMetadata] = useState(false);

  useEffect(() => {
    setSymbol(contractAddress);
    setContractAddress(contractAddress);
    setDecimals(18)
  }, [false, assetType, contractAddress, nativeTokenInfo]);

  useEffect(() => {
    if (contractAddress) {
      if (asset?.type === "brc20" && asset?.ticker === contractAddress) {
        return;
      }

      setPartialAsset({
        type: "brc20",
        ticker: contractAddress,
      });
    } else {
      if (asset?.type === undefined && asset?.ticker === undefined) {
        return;
      }

      setPartialAsset({
        type: undefined,
        ticker: undefined,
      });
    }
  }, [contractAddress, asset?.type, asset?.ticker, setPartialAsset]);

  return (
    <Wrapper>
      <FieldWrapper>
        <Title>Asset Type</Title>
        <AssetTypeSelector onSelect={setAssetType} />
      </FieldWrapper>

      {assetType === "ticker" && (
        <FieldWrapper>
          <Title>Asset ticker</Title>
          <LoadingInput
            placeholder="Enter an ticker address"
            onBlur={(e) => setContractAddress(e.target.value)}
            isLoading={isLoadingMetadata}
          />
        </FieldWrapper>
      )}

      <AssetDetail
        symbol={symbol}
        decimals={decimals}
        asset={asset}
        setPartialAsset={setPartialAsset}
      />
      <AssetConfig
        count={count}
        symbol={asset?.symbol}
        votingThreshold={asset?.votingThreshold}
        setVotingThreshold={(votingThreshold) => {
          if (asset?.votingThreshold === votingThreshold) return;
          setPartialAsset({ votingThreshold });
        }}
        votingWeight={asset?.votingWeight}
        setVotingWeight={(votingWeight) => {
          if (asset?.votingWeight === votingWeight) return;
          setPartialAsset({ votingWeight });
        }}
        asset={asset}
      />
    </Wrapper>
  );
}
