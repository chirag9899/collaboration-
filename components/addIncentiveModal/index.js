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
import { loginAddressSelector } from "store/reducers/accountSlice";

const AddIncentive = ({
  open,
  closeModal,
  footer = false,
  title = "Add Incentive",
  onSubmit,
}) => {
  const [selectedOptions, setSelectedOptions] = useState(0);
  const [formdata, setFormdata] = useState({
    tokenAddress: "",
    incentiveAmount: 0,
    addIncentive: false,
    availableBal: 0,
  });

  const [errors, setErrors] = useState({
    tokenErr: null,
  });

  const address = useSelector(loginAddressSelector);

  const { tokenAddress, incentiveAmount, addincentive, availableBal } =
    formdata;
  const { tokenErr } = errors;

  const { getBalance, approveToken } = useEthApis();
  const options = ["For", "Against", "Abstain"].map((item, i) => ({
    key: i,
    value: i,
    content: <ChoiceWrapper>{item}</ChoiceWrapper>,
  }));

  const getTokenBalance = async () => {
    const { result, error } = await getBalance(tokenAddress);
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
        };
      });
    } else {
      setFormdata((prev) => {
        return {
          ...prev,
          availableBal: parseFloat(result).toFixed(2),
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
    onSubmit(formdata);
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
              <span>{availableBal}</span>
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
        <CheckBox
          onChangeHandler={onChangeHandler}
          label="Add incentives for Voting on any option"
          name="addIncentive"
        />
        <InputWrapper>
          <SectionTitle>preferred option</SectionTitle>
          <DropdownSelector
            options={options}
            value={selectedOptions}
            onSelect={(value) => {
              setSelectedOptions(value);
            }}
          />
        </InputWrapper>

        <ActionsWrapper>
          <BtnWrapper className="action_btn" primary onClick={onSubmitHandler}>
            Add Incentive
          </BtnWrapper>
          <BtnWrapper
            primary
            className="action_btn"
            onClick={() => {
              approveToken(
                address,
                tokenAddress,
                "0xa5544006EACd0D5665033eBd721cAdF761a2BFF8",
              );
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
