import { styled } from "styled-components";
import Panel from "../styled/panel";

export const Wrapper = styled.div`
  max-width: 100%;
  display: flex;
  justify-content: center;
`;

export const PanelWrapper = styled(Panel)`
  min-height: 400px;
  width: 700px;
  @media screen and (max-width: 800px) {
    margin: auto;
  }
`;

export const BtnsGroup = styled.div`
  margin-top: 20px;
  text-align: center;
  >button{
    margin-left: 10px;
  }
`;
