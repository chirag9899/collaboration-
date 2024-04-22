import styled from "styled-components";
import { h3_36_bold } from "styles/textStyles";
import { text_light_major } from "../styles/colors";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  text-transform: capitalize;
`;
export const Title = styled.div`
  ${h3_36_bold};
  color: ${text_light_major};
`;

export const IconWrapper = styled.div`
  cursor: pointer;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    width: 30px !important;
    height: 30px !important;
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  @media screen and (max-width: 800px) {
    flex-direction: column;
  }
`;
