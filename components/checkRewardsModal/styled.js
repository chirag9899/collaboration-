import styled from "styled-components";
import { p_20_semibold } from "styles/textStyles";
import Modal from "../Modal";

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
