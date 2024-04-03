import AssetTypeSelector from "./assetTypeSelector";
import { useCallback, useEffect, useState } from "react";
import { FieldWrapper, Title, Wrapper } from "../styled";
import { noop } from "@osn/common-ui";
import AssetDetail from "../assetDetail";
import AssetConfig from "../assetConfig";
import { useIsMounted } from "@osn/common";
import nextApi from "services/nextApi";
import LoadingInput from "@/components/loadingInput";
import { newErrorToast } from "store/reducers/toastSlice";
import { useDispatch } from "react-redux";
import AssetOrdAdditionalDetail from "./assetOrdAdditionalDetail";
const initAdditioanlDetail = {
  description: null,
  name: null,
  icon_url: null,
  supply: null,
  bis_url: null,
};

export default function OrdCollectionTokenConfig({
  count,
  chain,
  nativeTokenInfo,
  asset,
  setPartialAsset = noop,
}) {
  const [assetType, setAssetType] = useState("collection");
  const [contractAddress, setContractAddress] = useState("collection");
  const [symbol, setSymbol] = useState("collection");
  const [decimals, setDecimals] = useState(18);
  const isMounted = useIsMounted();
  const [isLoadingMetadata, setIsLoadingMetadata] = useState(false);
  const [additionalDetail, setAdditionalDetail] =
    useState(initAdditioanlDetail);
  const dispatch = useDispatch();

  useEffect(() => {
    setSymbol(contractAddress);
    setContractAddress(contractAddress);
    setDecimals(18);
  }, [false, assetType, contractAddress, nativeTokenInfo]);

  useEffect(() => {
    if (contractAddress) {
      if (
        asset?.type === "ordcollection" &&
        asset?.collection === contractAddress
      ) {
        return;
      }

      setPartialAsset({
        type: "ordcollection",
        collection: contractAddress,
      });
    } else {
      if (asset?.type === undefined && asset?.collection === undefined) {
        return;
      }

      setPartialAsset({
        type: undefined,
        collection: undefined,
      });
    }
  }, [contractAddress, asset?.type, asset?.collection, setPartialAsset]);

  const fetchOrdCollMetadata = useCallback(
    async (collection) => {
      setIsLoadingMetadata(true);
      try {
        const { result, error } = await nextApi.fetch(
          `chain/inscription-collection/collection/${collection}`,
        );
        if (result?.data === "no-data") {
          dispatch(newErrorToast("Please enter a valid collection"));
          setAdditionalDetail(initAdditioanlDetail);
          setSymbol(null);
          return;
        }

        if (error) {
          dispatch(newErrorToast("Please enter a valid collection"));
          setAdditionalDetail(initAdditioanlDetail);
          return;
        }
        if (isMounted.current) {
          setSymbol(result?.data?.name);
          // setDecimals(result?.decimal);
          setAdditionalDetail({
            description: result.data.description,
            name: result.data.name,
            icon_url: result.data.icon_url,
            supply: result.data.supply,
            bis_url: result.data.bis_url,
          });
        }
      } finally {
        setIsLoadingMetadata(false);
      }
    },
    [chain, isMounted],
  );

  const onBlurHandler = (e) => {
    const { value } = e.target;
    setContractAddress(value);
    fetchOrdCollMetadata(value);
  };
  return (
    <Wrapper>
      <FieldWrapper>
        <Title>Asset Type</Title>
        <AssetTypeSelector onSelect={setAssetType} />
      </FieldWrapper>

      {assetType === "collection" && (
        <FieldWrapper>
          <Title>Asset collection</Title>
          <LoadingInput
            placeholder="Enter an collection address"
            onBlur={onBlurHandler}
            isLoading={isLoadingMetadata}
          />
        </FieldWrapper>
      )}

      {/* <AssetDetail
        symbol={symbol}
        decimals={decimals}
        asset={asset}
        setPartialAsset={setPartialAsset}
      /> */}
      <AssetOrdAdditionalDetail
        symbol={symbol}
        decimals={decimals}
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
