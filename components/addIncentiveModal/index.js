import React, { useState } from "react";
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
import Input from "../Input";
import CheckBox from "../styled/checkBox";
import DropdownSelector from "../DropdownSelector";
import useEthApis from "hooks/useEthApis";
import Modal from "../Modal";
import { ErrorMessage } from "../styled/errorMessage";
import { useSelector } from "react-redux";
import { addressSelector } from "store/reducers/accountSlice";

const AddIncentive = ({
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
    incentiveAmount: 0,
    addIncentive: false,
    availableBal: 0,
    allowance: 0,
  });

  const [errors, setErrors] = useState({
    tokenErr: null,
    amountErr: null,
  });

  const address = useSelector(addressSelector);

  const { tokenAddress, incentiveAmount, addIncentive, availableBal, allowance } =
    formdata;
  const { tokenErr, amountErr } = errors;

  const { getBalance, approveToken, getAllowance } = useEthApis();
  const options = ["For", "Against", "Abstain"].map((item, i) => ({
    key: i,
    value: i + 1,
    content: <ChoiceWrapper>{item}</ChoiceWrapper>,
  }));

  const getTokenBalance = async () => {
    const { result, error } = await getBalance(address, tokenAddress);
    if (error) {
      setErrors((prev) => {
        return {
          ...prev,
          tokenErr: error,
        };
      });
      setFormdata((prev) => {
        return {
          ...prev,
          availableBal: 0,
          allowance: 0,
        };
      });
    } else {
      const allowance = await getAllowance(address, tokenAddress, beravoteAddress);
      setFormdata((prev) => {
        return {
          ...prev,
          availableBal: parseFloat(result),
          allowance: parseFloat(allowance.result)
        };
      });
      setErrors((prev) => {
        return {
          ...prev,
          tokenErr: null,
        };
      });
    }
  };

  const onChangeHandler = (event) => {
    const { value, name, type, checked } = event.target;
    setFormdata((prev) => {
      return {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };
    });
    if(name === "incentiveAmount"){
      let amountError;
      if (value > availableBal) {
        amountError = "Incentive amount is greater than balance.";
       }
      if(value > allowance){
        amountError = "Incentive amount is greater than allowance.";
      }
      setErrors((prev) => {
        return {
          ...prev,
          amountErr: amountError
        }
      });
    }
  };

  const maxIncentiveHandler = () => {
    setFormdata((prev) => {
      return {
        ...prev,
        incentiveAmount: availableBal,
      };
    });
  };

  const onSubmitHandler = () => {
    onSubmit({ ...formdata, selectedOptions });
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
          <SectionTitle>token address</SectionTitle>
          <Input
            type="text"
            placeholder="Address"
            value={tokenAddress}
            name="tokenAddress"
            onBlur={getTokenBalance}
            onChange={onChangeHandler}
          />
          {tokenErr && <ErrorMessage>{tokenErr}</ErrorMessage>}
        </InputWrapper>
        <InputWrapper>
          <LabelWrapper>
            <SectionTitle>incentive amount</SectionTitle>
            <div class="available_amount">
              <span>available :</span>
              <span>{parseFloat(availableBal).toFixed(5)}</span>
            </div>
          </LabelWrapper>
          <InputGroup>
            <Input
              className="number_field"
              type="number"
              min="0"
              placeholder="amount"
              value={incentiveAmount}
              name="incentiveAmount"
              onChange={onChangeHandler}
            />
            <BtnWrapper
              primary
              block
              className="max_btn"
              onClick={maxIncentiveHandler}
              disabled={tokenAddress === ""}
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
          <SectionTitle>preferred option</SectionTitle>
          <DropdownSelector
            disabled={addIncentive}
            options={options}
            value={selectedOptions}
            onSelect={(value) => {
              setSelectedOptions(value);
            }}
          />
        </InputWrapper>

        <ActionsWrapper>
          <BtnWrapper className="action_btn" disabled={!!amountErr} primary onClick={onSubmitHandler}>
            Add Incentive
          </BtnWrapper>
          <BtnWrapper
            primary
            className="action_btn"
            onClick={() => {
              approveToken(address, tokenAddress, beravoteAddress);
            }}
          >
            Approve token
          </BtnWrapper>
        </ActionsWrapper>
      </ModalBodyWrapper>
    </Modal>
  );
};

export default AddIncentive;
