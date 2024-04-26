import styled from "styled-components";
import { p_16_semibold, p_20_semibold } from "styles/textStyles";
import Modal from "@osn/common-ui/es/Modal";
import { black } from "../styles/colors";
import Button from "../Button";

export const ModalWrapper = styled(Modal)`
  .modal {
    min-width: 600px !important;
    max-width: 600px !important;
  }
`;

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
  color: ${black} !important;
  border-radius: 0px !important;
  &:hover {
    color: ${black} !important;
  }
  @media screen and (max-width: 800px) {
    padding: 8px 22px;
    margin: auto;
    width: 100%;
    text-align: center;
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
`;
