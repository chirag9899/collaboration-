import AssetTypeSelector from "./assetTypeSelector";
import BigNumber from "bignumber.js";
import { useCallback, useEffect, useState } from "react";
import { FieldWrapper, Title, Wrapper } from "../styled";
import { noop } from "@osn/common-ui";
import AssetDetail from "../assetDetail";
import AssetConfig from "../assetConfig";
import { useIsMounted } from "@osn/common";
import nextApi from "services/nextApi";
import LoadingInput from "@/components/loadingInput";
import ContractButton from "@/components/styled/ContractButton";
import { useDispatch } from "react-redux";
import { newErrorToast } from "store/reducers/toastSlice";

export default function Erc20TokenConfig({
  count,
  chain,
  nativeTokenInfo,
  asset,
  setPartialAsset = noop,
  prevContract,
}) {
  if (asset?.votingThreshold !== "1") {
    const votingThreshold = new BigNumber(asset.votingThreshold)
      .div(Math.pow(10, asset.decimals)).toFixed()
    asset.votingThreshold = votingThreshold.toString()
  }
  const [assetType, setAssetType] = useState("contract");
  const [contractAddress, setContractAddress] = useState("");
  const [symbol, setSymbol] = useState("");
  const [decimals, setDecimals] = useState(0);
  const isMounted = useIsMounted();
  const [isLoadingMetadata, setIsLoadingMetadata] = useState(false);
  const [assetTicker, setAssetTicker] = useState("");

  const dispatch = useDispatch()

  const fetchErc20TokenMetadata = useCallback(
    async (contractAddress) => {
      setIsLoadingMetadata(true);
      try {
        const { result, error } = await nextApi.fetch(
          `evm/chain/${chain}/erc20/contract/${contractAddress}`,
        );
        if (error) {
          dispatch(newErrorToast("Please enter a valid contract address"))
          return;
        }
        if (isMounted.current) {
          setSymbol(result?.symbol);
          setDecimals(result?.decimals);
        }
      } finally {
        setIsLoadingMetadata(false);
      }
    },
    [chain, isMounted],
  );

  useEffect(() => {
    if (assetType === "native") {
      setSymbol(nativeTokenInfo?.symbol);
      setDecimals(nativeTokenInfo?.decimals);
      setContractAddress("");
    } else if (!contractAddress) {
      setSymbol("");
      setDecimals(0);
    } else {
      setSymbol("");
      setDecimals(0);
      fetchErc20TokenMetadata(contractAddress);
    }
  }, [fetchErc20TokenMetadata, assetType, contractAddress, nativeTokenInfo]);

  useEffect(() => {
    if (contractAddress) {
      if (asset?.type === "erc20" && asset?.contract === contractAddress) {
        return;
      }

      setPartialAsset({
        type: "erc20",
        contract: contractAddress,
      });
    } else {
      if (asset?.type === undefined && asset?.contract === undefined) {
        return;
      }

      setPartialAsset({
        type: undefined,
        contract: undefined,
      });
    }
  }, [contractAddress, asset?.type, asset?.contract, setPartialAsset]);

  const onBlurHandler = (e) => {
    setContractAddress(e.target.value);
  };

  const onChangeHandler = (e) => {
    const { value } = e.target;
    setAssetTicker(value);
  };
  const onClickPrevContract = () => {
    setAssetTicker(prevContract);
    setContractAddress(prevContract);
  };

  return (
    <Wrapper>
      <FieldWrapper>
        <Title>Token Type</Title>
        <AssetTypeSelector onSelect={setAssetType} />
      </FieldWrapper>

      {assetType === "contract" && (
        <FieldWrapper>
          <Title>
            Asset Contract{" "}
            {assetTicker === "" && prevContract && (
              <ContractButton onClick={onClickPrevContract}>
                {prevContract}
              </ContractButton>
            )}
          </Title>
          <LoadingInput
            value={assetTicker}
            onChange={onChangeHandler}
            placeholder="Enter an contract address"
            onBlur={onBlurHandler}
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
          // if (asset?.votingThreshold === votingThreshold) return;
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
