import styled from "styled-components";
import { p_14_normal, p_20_semibold } from "../../styles/textStyles";
import { makeSquare } from "styles/globalCss";
import Button from "../Button";
import { primary_color } from "../styles/colors";
import { p_16_semibold } from "../styles/textStyles";
import Panel from "../styled/panel";
import Flex from "../styled/Flex";

export const Wrapper = styled(Panel)`
  padding: 30px;
  min-height: 180px;
`;

export const Content = styled(Flex)`
  width: 100%;
  justify-content: space-between;
  @media screen and (max-width: 800px) {
    flex-direction: column;
  }
`;

export const HeadingWrapper = styled.div`
  min-width: 50%;
  align-self: self-start;
  @media screen and (max-width: 800px) {
    min-width: 100%;
    margin-bottom: 20px;
  }
`;

export const LogoName = styled.div`
  ${p_20_semibold};
  text-transform: capitalize;
  display: flex;
  align-items: center;
`;

export const LogoSymbol = styled.div`
  ${p_14_normal};
  color: var(--neutral-3);
  margin-top: 20px;
  margin-left: 35px;
`;

export const Icon = styled.div`
  ${makeSquare(32)};
  margin-right: 16px;
`;
export const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 10px;
  cursor: pointer;
`;

export const ButtonWrapper = styled(Button)`
  cursor: pointer;
  ${p_16_semibold};
  color: ${primary_color};
  margin-right: 10px;
  font-size: 12px;
  padding: 4px 30px !important;
  border-radius: 5px !important;
  > img {
    width: 24px;
    height: 24px;
    margin-right: 8px !important;
  }
`;

export const BalanceWrapper = styled(Flex)`
  min-width: 50%;
  flex-direction: column;
  @media screen and (max-width: 800px) {
    min-width: 100%;
  }
`;

export const BalanceSection = styled(Flex)`
  align-items: center;
  justify-content: space-around;
  width: 100%;
`;

export const Balance = styled(Flex)`
  flex-direction: column;
  > div {
    margin-bottom: 5px;
    > p {
      margin-bottom: 0px;
      font-weight: bold;
    }
    display: flex;
    gap: 5px;
    align-items: center;
    > div > div > div {
      width: 200px !important;
    }
  }
  > p {
    font-size: 1.2rem;
  }
`;

export const DelegateSection = styled(Flex)`
  border: 1px solid var(--neutral-10);
  padding: 10px;
  margin-top: 25px;
  border-radius: 10px;
  align-items: center;
  > p {
    text-transform: uppercase;
    font-size: 11px;
    margin-right: 10px;
    margin-bottom: 0px !important;
  }
`;
