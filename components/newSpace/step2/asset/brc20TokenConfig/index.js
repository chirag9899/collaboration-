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
import { urlCreator } from "utils";
import { newErrorToast } from "store/reducers/toastSlice";
import { useDispatch } from "react-redux";
import AssetBrcAdditionalDetail from "./assetBrcAdditionalDetail";
import ContractButton from "@/components/styled/ContractButton";

const initAdditioanlDetail = {
  holdersCount: null,
  historyCount: null,
  inscriptionNumber: null,
  creator: null,
  txid: null,
};

export default function Brc20TokenConfig({
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
  const [assetType, setAssetType] = useState("ticker");
  const [contractAddress, setContractAddress] = useState("ticker");
  const [symbol, setSymbol] = useState("ticker");
  const [decimals, setDecimals] = useState(18);
  const isMounted = useIsMounted();
  const [isLoadingMetadata, setIsLoadingMetadata] = useState(false);
  const [additionalDetail, setAdditionalDetail] =
    useState(initAdditioanlDetail);
  const [assetTicker, setAssetTicker] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    setSymbol(contractAddress);
    setContractAddress(contractAddress);
    setDecimals(18);
  }, [false, assetType, contractAddress, nativeTokenInfo]);

  const fetchBrc20TokenMetadata = useCallback(
    async (ticker) => {
      setIsLoadingMetadata(true);
      try {
        const { result, error } = await nextApi.fetch(
          `chain/brc20/token/${ticker}`,
        );
        if (error) {
          dispatch(newErrorToast("Please enter a valid ticker"));
          setAdditionalDetail(initAdditioanlDetail);
          return;
        }
        if (isMounted.current) {
          setSymbol(result?.ticker);
          setDecimals(result?.decimal);
          setAdditionalDetail({
            holdersCount: result.holdersCount,
            historyCount: result.historyCount,
            inscriptionNumber: result.inscriptionNumber,
            creator: urlCreator("address", result.creator),
            txid: urlCreator("transaction", result.txid),
          });
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
      setAdditionalDetail(initAdditioanlDetail);
    } else {
      setSymbol("");
      setDecimals(0);
    }
  }, [fetchBrc20TokenMetadata, assetType, contractAddress, nativeTokenInfo]);

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

  const onBlurHandler = (e) => {
    const { value } = e.target;
    setContractAddress(value);
    fetchBrc20TokenMetadata(value);
  };

  const onChangeHandler = (e) => {
    const { value } = e.target;
    setAssetTicker(value);
  };

  const onClickPrevContract = () => {
    setAssetTicker(prevContract);
    setContractAddress(prevContract);
    fetchBrc20TokenMetadata(prevContract);
  };

  return (
    <Wrapper>
      <FieldWrapper>
        <Title>Asset Type</Title>
        <AssetTypeSelector onSelect={setAssetType} />
      </FieldWrapper>

      {assetType === "ticker" && (
        <FieldWrapper>
          <Title>
            Asset ticker{" "}
            {assetTicker === "" && (
              <ContractButton onClick={onClickPrevContract}>
                {prevContract}
              </ContractButton>
            )}
          </Title>
          <LoadingInput
            onChange={onChangeHandler}
            value={assetTicker}
            placeholder="Enter an ticker address"
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
      <AssetBrcAdditionalDetail
        additionalDetail={additionalDetail}
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
