import React, { useState, useEffect } from "react";
import {
  CloseBar,
  StyledTitle,
  HeadWrapper,
  ModalBodyWrapper,
  ActionsWrapper,
  Text,
  BtnWrapper,
  InputWrapper,
  LabelWrapper,
  InputGroup,
  ChoiceWrapper,
  TitleWrapper,
  DetailWrapper,
} from "./styled";
import Image from "next/image";
import { SectionTitle } from "../styled/sectionTitle";
import Input from "../input";
import CheckBox from "../styled/checkBox";
import DropdownSelector from "../DropdownSelector";
import useEthApis from "hooks/useEthApis";
import Modal from "../Modal";
import { ErrorMessage } from "../styled/errorMessage";
import { useSelector } from "react-redux";
import { addressSelector } from "store/reducers/accountSlice";
import Loader from "../Button/Loader";
import { ethers } from "ethers";
import Tooltip from "../tooltip";
import AssetDetail from "../newSpace/step2/asset/assetDetail";
import { noop } from "utils";
import { chainMap } from "frontedUtils/consts/chains";
import TokenSelectorDrop from "../tokenSelectorDrop";
import { whitelist } from "helpers/constants";

const AddIncentive = ({
  choices,
  open,
  closeModal,
  footer = false,
  title = "Add Incentive",
  onSubmit,
}) => {
  const [selectedOptions, setSelectedOptions] = useState(1);
  const beravoteAddress = process.env.NEXT_PUBLIC_BERAVOTE_ADDRESS;
  const [formdata, setFormdata] = useState({
    tokenAddress: "",
    tokenPrice: 0,
    incentiveAmount: 0,
    addIncentive: false,
    availableBal: 0,
    allowance: 0,
  });
  const [assetType, setAssetType] = useState("contract");
  const [symbol, setSymbol] = useState("");
  const [decimals, setDecimals] = useState(0);

  const [errors, setErrors] = useState({
    tokenErr: null,
    amountErr: null,
    networkErr: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  const address = useSelector(addressSelector);

  const {
    tokenAddress,
    incentiveAmount,
    addIncentive,
    availableBal,
    allowance,
    tokenPrice,
  } = formdata;
  const { tokenErr, amountErr, networkErr } = errors;

  const { getBalance, approveToken, getAllowance, getBerachainSubgraphPrice } =
    useEthApis();

  const options = choices.map((item, i) => ({
    key: i,
    value: i + 1,
    content: <ChoiceWrapper>{item}</ChoiceWrapper>,
  }));

  const getTokenBalanceAndAllowance = async () => {
    validateChain();
    const { result, error } = await getBalance(tokenAddress);
    console.log("result", result);
    if (error) {
      setErrors((prev) => ({
        ...prev,
        tokenErr: error,
      }));
      setFormdata((prev) => ({
        ...prev,
        availableBal: 0,
        allowance: 0,
        tokenPrice: 0,
      }));
    } else {
      const allowanceResult = await getAllowance(tokenAddress, beravoteAddress);
      //const price = await getBerachainSubgraphPrice(tokenAddress);
      const price = 1;
      const newAvailableBal = parseFloat(result);
      const newAllowance = parseFloat(allowanceResult.result);
      console.log(newAvailableBal);
      setFormdata((prev) => ({
        ...prev,
        availableBal: parseFloat(result),
        allowance: parseFloat(allowanceResult.result),
        tokenPrice: parseFloat(price),
      }));
      setErrors((prev) => ({
        ...prev,
        tokenErr: null,
      }));

      setSymbol(allowanceResult.symbol);
      setDecimals(allowanceResult.decimals); // Revalidate incentive amount after getting new balance and allowance
      validateIncentiveAmount(incentiveAmount, newAvailableBal, newAllowance);
    }
  };

  useEffect(() => {
    if (open) {
      getTokenBalanceAndAllowance();
      validateChain();
    }

    // Setup an event listener for chain changes
    const handleChainChanged = (_chainId) => {
      validateChain();
    };

    window.ethereum.on("chainChanged", handleChainChanged);

    // Cleanup the event listener when the component unmounts or dependencies change
    return () => {
      window.ethereum.removeListener("chainChanged", handleChainChanged);
    };
  }, [open, address, tokenAddress]);

  const validateChain = async () => {
    const bartioNetwork = { network: "berachain-b2" };

    const currentChainId = await window.ethereum.request({
      method: "eth_chainId",
    });
    const bartioNetworkId = chainMap.get(bartioNetwork.network).id;

    if (currentChainId !== bartioNetworkId) {
      setErrors((prev) => ({
        ...prev,
        networkErr: "Please switch to the Bartio network to proceed.",
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        networkErr: null,
      }));
    }
  };

  const validateIncentiveAmount = (amount, availableBal, allowance) => {
    let amountError = null;
    if (amount <= 0) {
      amountError = "Incentive amount should be bigger than 0.";
    } else if (amount > availableBal) {
      amountError = "Incentive amount is greater than balance.";
    } else if (amount > allowance) {
      amountError = "Incentive amount is greater than allowance.";
    }

    setErrors((prev) => ({
      ...prev,
      amountErr: amountError,
    }));
  };

  const onChangeHandler = (event) => {
    const { value, name, type, checked } = event.target;
    console.log(value, availableBal, allowance);
    setFormdata((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (name === "incentiveAmount") {
      validateIncentiveAmount(value, availableBal, allowance);
      let amountError;
      if (value <= 0) {
        amountError = "Incentive amount should be bigger than 0.";
      } else if (value > availableBal) {
        amountError = "Incentive amount is greater than balance.";
      } else if (value > allowance) {
        amountError = "Incentive amount is greater than allowance.";
      }

      // @todo- correct this later
      // check token reward amount value
      // if (tokenPrice * value < 1) {
      //   amountError = "Incentives must be more than $1 in value";
      // }
      setErrors((prev) => ({
        ...prev,
        amountErr: amountError,
      }));
    }
  };

  const maxIncentiveHandler = () => {
    setFormdata((prev) => ({
      ...prev,
      incentiveAmount: availableBal,
    }));
  };

  // const onSubmitHandler = async () => {
  //   await onSubmit({ ...formdata, selectedOptions });
  //   closeModal();
  // };
  // const onApproveTokenHandler = async () => {
  //   await approveToken(address, tokenAddress, beravoteAddress);
  //   await getTokenBalanceAndAllowance(); // Refresh balance and allowance after approval
  // };
  const onSubmitHandler = async () => {
    setIsLoading(true); // Start loading
    await onSubmit({ ...formdata, selectedOptions });
    setIsLoading(false); // Stop loading
    closeModal();
  };

  const onApproveTokenHandler = async () => {
    setIsLoading(true); // Start loading
    const amountToApprove = ethers.utils.parseUnits(
      incentiveAmount.toString(),
      18,
    );
    await approveToken(tokenAddress, beravoteAddress, amountToApprove);
    await getTokenBalanceAndAllowance(); // Refresh balance and allowance after approval
    setIsLoading(false); // Stop loading
  };

  const onSelectToken = (value) => {
    setFormdata((prev) => ({
      ...prev,
      tokenAddress: value,
    }));

    setErrors((prev) => {
      return {
        ...prev,
        tokenErr: null,
      };
    });
  };

  return (
    <Modal
      size="large"
      width={480}
      height={500}
      open={open}
      footer={footer}
      closeBar={false}
    >
      <HeadWrapper>
        <StyledTitle
          style={{ display: "flex", alignItems: "center", gap: "4px" }}
        >
          {title} {networkErr && <Tooltip content={networkErr} iconSize={20} />}
        </StyledTitle>

        <CloseBar onClick={closeModal}>
          <Image
            src="/imgs/icons/close.svg"
            alt="close"
            width={24}
            height={24}
          />
        </CloseBar>
      </HeadWrapper>
      <ModalBodyWrapper>
        <InputWrapper>
          <SectionTitle>Token Address</SectionTitle>
          {/* <Input
            type="text"
            placeholder="Address"
            value={tokenAddress}
            name="tokenAddress"
            onBlur={getTokenBalanceAndAllowance}
            onChange={onChangeHandler}
          /> */}
          <TokenSelectorDrop tokenList={whitelist} onSelect={onSelectToken} />
          {tokenErr && <ErrorMessage>{tokenErr}</ErrorMessage>}
        </InputWrapper>

        {symbol && decimals && (
          <DetailWrapper>
            <AssetDetail
              symbol={symbol}
              decimals={decimals}
              asset={[]}
              setPartialAsset={noop}
            />
          </DetailWrapper>
        )}
        <InputWrapper>
          <LabelWrapper>
            <TitleWrapper>
              <SectionTitle>Incentive Amount</SectionTitle>
              {amountErr && <Tooltip content={amountErr} iconSize={20} />}
            </TitleWrapper>
            <div className="available_amount">
              <span>Available :</span>
              <span>{parseFloat(availableBal).toFixed(5)}</span>
            </div>
          </LabelWrapper>
          <InputGroup>
            <Input
              className="number_field"
              type="number"
              min="0"
              placeholder="Amount"
              value={incentiveAmount}
              name="incentiveAmount"
              onChange={onChangeHandler}
            />
            <BtnWrapper
              primary
              block
              className="max_btn"
              onClick={maxIncentiveHandler}
              disabled={tokenAddress === "" || !address}
            >
              Max
            </BtnWrapper>
          </InputGroup>
        </InputWrapper>
        {/* {amountErr && <ErrorMessage>{amountErr}</ErrorMessage>} */}
        <CheckBox
          onChangeHandler={onChangeHandler}
          label="Add incentives for Voting on any option"
          name="addIncentive"
        />
        <InputWrapper>
          <SectionTitle>Preferred Option</SectionTitle>
          <DropdownSelector
            disabled={addIncentive}
            options={options}
            value={selectedOptions}
            onSelect={(value) => setSelectedOptions(value)}
          />
        </InputWrapper>
        <ActionsWrapper>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <BtnWrapper
                className="action_btn"
                disabled={!!amountErr || !address}
                primary
                onClick={onSubmitHandler}
              >
                Add Incentive
              </BtnWrapper>
              <BtnWrapper
                primary
                className="action_btn"
                disabled={!address}
                onClick={onApproveTokenHandler}
              >
                Approve Token
              </BtnWrapper>
            </>
          )}
        </ActionsWrapper>
      </ModalBodyWrapper>
    </Modal>
  );
};

export default AddIncentive;
