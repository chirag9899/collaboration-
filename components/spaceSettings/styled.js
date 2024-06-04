import { styled } from "styled-components";
import panel from "../accordionPanel/panel";

export const Wrapper = styled.div`
  max-width: 100%;
  justify-content: center;
  >div{
    margin-bottom: 50px !important;
    max-width: 800px;
    margin: auto;
  }
`;

export const PanelWrapper = styled(panel)`
  min-height: 400px;
  max-width: 700px !important; 
  @media screen and (max-width: 800px) {
    margin: auto;
  }
`;

export const BtnsGroup = styled.div`
  margin-top: 20px;
  text-align: center;
  > button {
    margin-left: 10px;
  }
`;

export const Heading = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 20px;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
`;

export const DropdownGroup = styled.div`
  display: flex;
`;
export const DropWrapper = styled.div``;
