import React from "react";
import styled from "styled-components";
import { p_16_semibold } from "styles/textStyles";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0px;
`;
const CheckBoxField = styled.input`
  appearance: none;
  margin-right: 10px;
  width: 20px;
  height: 20px;
  border: 2px solid #333;
  border-radius: 4px;
  outline: none;
  cursor: pointer;
  position: relative; /* Ensure positioning context for pseudo-element */

  /* Checked state styles */
  &:checked {
    background-color: #333;
    border-color: #333;
  }

  /* Pseudo-element for checkmark */
  &:checked::before {
    content: "\\2713"; /* Unicode checkmark character */
    font-size: 15px;
    color: white;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  /* Hover styles */
  &:hover {
    border-color: #555;
  }
`;
const Label = styled.label`
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 10px;
  color: var(--neutral-1);
  margin: 0;
  color: var(--neutral-1);
  margin: 0;
`;

const CheckBox = ({ label, onChangeHandler, ...rest }) => {
  return (
    <Wrapper data-v-b47f0900="" class="option_checkbox">
      <CheckBoxField type="checkbox" onChange={onChangeHandler} {...rest} />
      {label && <Label>{label}</Label>}
    </Wrapper>
  );
};

export default CheckBox;
