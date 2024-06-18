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

  const [errors, setErrors] = useState({
    tokenErr: null,
    amountErr: null,
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
  const { tokenErr, amountErr } = errors;

  const { getBalance, approveToken, getAllowance, getBerachainSubgraphPrice } =
    useEthApis();

  const options = choices.map((item, i) => ({
    key: i,
    value: i + 1,
    content: <ChoiceWrapper>{item}</ChoiceWrapper>,
  }));

  const getTokenBalanceAndAllowance = async () => {
    const { result, error } = await getBalance(address, tokenAddress);
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
      const allowanceResult = await getAllowance(
        address,
        tokenAddress,
        beravoteAddress
      );
      //const price = await getBerachainSubgraphPrice(tokenAddress);
      const price = 1;
      const newAvailableBal = parseFloat(result);
      const newAllowance = parseFloat(allowanceResult.result);
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

    // Revalidate incentive amount after getting new balance and allowance
    validateIncentiveAmount(incentiveAmount, newAvailableBal, newAllowance);
    }
  };

  useEffect(() => {
    if (open) {
      getTokenBalanceAndAllowance();
    }
  }, [open, address, tokenAddress]);

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
    console.log(value ,availableBal, allowance)
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
    const amountToApprove = ethers.utils.parseUnits(incentiveAmount.toString(), 18); 
    await approveToken(address, tokenAddress, beravoteAddress, amountToApprove);
    await getTokenBalanceAndAllowance(); // Refresh balance and allowance after approval
    setIsLoading(false); // Stop loading
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
        <StyledTitle>{title}</StyledTitle>
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
          <Input
            type="text"
            placeholder="Address"
            value={tokenAddress}
            name="tokenAddress"
            onBlur={getTokenBalanceAndAllowance}
            onChange={onChangeHandler}
          />
          {tokenErr && <ErrorMessage>{tokenErr}</ErrorMessage>}
        </InputWrapper>
        <InputWrapper>
          <LabelWrapper>
            <SectionTitle>Incentive Amount</SectionTitle>
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
        {amountErr && <ErrorMessage>{amountErr}</ErrorMessage>}
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