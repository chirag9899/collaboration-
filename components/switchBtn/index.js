import React from "react";
import {
  CheckboxInput,
  Slider,
  SwitchContainer,
  Wrapper,
  TextWrapper,
} from "./styled";

const Switch = ({ onChange, checked, text, ...inputprops }) => {
  return (
    <Wrapper>
      <SwitchContainer>
        <CheckboxInput onChange={onChange} checked={checked} {...inputprops} />
        <Slider />
      </SwitchContainer>
      {text && <TextWrapper>{text}</TextWrapper>}
    </Wrapper>
  );
};

export default Switch;
