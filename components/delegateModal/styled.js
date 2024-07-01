import styled from "styled-components";
import { p_16_semibold, p_20_semibold } from "styles/textStyles";
import Button from "../Button";
import { primary_color } from "../styles/colors";

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
  overflow-y: auto;
  max-height: 406px;
  overflow-x: hidden;
`;

export const BtnWrapper = styled(Button)`
  cursor: pointer;
  ${p_16_semibold};
  color: ${primary_color};
  margin-right: 10px;
  font-size: 12px;
  padding: 10px 50px !important;
  box-shadow: none;
  border: 1px solid ${primary_color} !important;
  &:hover {
    border: 1px solid var(--peach) !important;
  }
  &:disabled {
    cursor: not-allowed !important;
    color: var(--neutral-4) !important;
    border-color: var(--neutral-4) !important;
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
