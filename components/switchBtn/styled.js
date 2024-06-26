import styled from "styled-components";
import { Text } from "../styled/text";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  p {
    margin-left: 10px;
  }
`;

export const SwitchContainer = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
`;

export const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 34px;

  &:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }
`;

export const CheckboxInput = styled.input.attrs({ type: "checkbox" })`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + ${Slider} {
    background-color: var(--green);
  }

  &:checked + ${Slider}:before {
    transform: translateX(26px);
  }
`;

export const TextWrapper = styled(Text)`
  min-width: 180px;
`;
