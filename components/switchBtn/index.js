import React from "react";
import { CheckboxInput, Slider, SwitchContainer, Wrapper } from "./styled";
import { Text } from "../styled/text";

const Switch = ({ onChange, checked, text, ...inputprops }) => {
  return (
    <Wrapper>
      <SwitchContainer>
        <CheckboxInput onChange={onChange} checked={checked} {...inputprops} />
        <Slider />
      </SwitchContainer>
      {text && <Text>{text}</Text>}
    </Wrapper>
  );
};

export default Switch;
