import Button from "@/components/Button";
import Panel from "@/components/styled/panel";
import styled from "styled-components";

export const Wrapper = styled.div`
  /* display: flex; */
  /* @media screen and (max-width: 800px) {
    flex-direction: column;
  } */
`;

export const PanelWrapper = styled(Panel)`
  width: 100% !important;
  margin-bottom: 20px;
  @media screen and (max-width: 800px) {
    margin: auto;
  }
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ConfirmButton = styled(Button)`
  margin-top: 20px;
  width: 20% !important;
`;
