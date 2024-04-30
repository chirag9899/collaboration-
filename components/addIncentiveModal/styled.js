import styled from "styled-components";
import { p_16_semibold, p_20_semibold } from "styles/textStyles";
import Button from "../Button";
import { black, primary_color } from "../styles/colors";

export const StyledTitle = styled.header`
  ${p_20_semibold};
  color: var(--neutral-1);
`;

export const CloseBar = styled.div`
  display: flex;
  flex-direction: row-reverse;

  > svg path {
    fill: #9da9bb;
  }

  cursor: pointer;
`;

export const HeadWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const ModalBodyWrapper = styled.div`
  margin-top: 20px;
`;
export const Text = styled.p`
  ${p_16_semibold};
  color: var(--neutral-1);
  margin: 0;
  padding: 20px 0px;
  text-align: center;
`;

export const BtnWrapper = styled(Button)`
  cursor: pointer;
  ${p_16_semibold};
  color: ${primary_color};
  margin-right: 10px;
  font-size: 12px;
  padding: 10px 20px !important;
  box-shadow: none;
  border: 1px solid ${primary_color} !important;
  &:hover {
    border: 1px solid var(--peach) !important;
  }
  &:disabled{
    cursor: not-allowed !important;
  }
  > img {
    width: 24px;
    height: 24px;
    margin-right: 8px !important;
  }
`;

export const ActionsWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding-top: 15px;
  flex-direction: row-reverse;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 10px;
  > span {
    margin-bottom: 5px;
  }
`;

export const LabelWrapper = styled.div`
  display: flex;
  align-items: center;
  span {
    margin-bottom: 0px;
  }
  .available_amount {
    margin-left: 100px;
    text-transform: capitalize;
    font-weight: 600;
    opacity: 0.7;
  }
`;

export const InputGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  > div {
    justify-content: flex-start !important;
    width: 80% !important;
    margin-right: 10px !important;
    input {
      appearance: none;
    }
  }
  .max_btn {
    padding: 6px 25px !important;
    color: ${primary_color} !important;
    width: 20% !important;
    margin-right: 0px;
    &:hover {
      color: var(--peach) !important;
    }
  }
  > button {
    border-radius: 100px !important;
  }
`;

export const ChoiceWrapper = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  color: var(--neutral-1);
`;
