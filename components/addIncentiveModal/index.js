import React, { useState } from "react";
import Modal from "@osn/common-ui/es/Modal";
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
  });

  const { tokenAddress, incentiveAmount, addincentive } = formdata;
  const options = ["For", "Against", "Abstain"].map((item, i) => ({
    key: i,
    value: i,
    content: <ChoiceWrapper>{item}</ChoiceWrapper>,
  }));

  const onChangeHandler = (event) => {
    const { value, name, type, checked } = event.target;
    setFormdata((prev) => {
      return {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  };

  const onSubmitHandler = () => {
    onSubmit(formdata);
  };
  return (
    <Modal open={open} footer={footer} closeBar={false}>
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
            onChange={onChangeHandler}
          />
        </InputWrapper>
        <InputWrapper>
          <LabelWrapper>
            <SectionTitle>incentive amount</SectionTitle>
            <div class="available_amount">
              <span>available :</span>
              <span>0</span>
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
              className="button button-modern"
              // onClick={closeModal}
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
          <BtnWrapper
            primary
            className="button button-modern"
            onClick={onSubmitHandler}
          >
            Add Incentive
          </BtnWrapper>
          <BtnWrapper
            primary
            className="button button-modern"
            onClick={closeModal}
          >
            Approve token
          </BtnWrapper>
        </ActionsWrapper>
      </ModalBodyWrapper>
    </Modal>
  );
};

export default AddIncentive;
