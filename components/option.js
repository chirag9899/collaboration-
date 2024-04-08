import styled from "styled-components";
import { css } from "styled-components";
import { p_14_medium } from "@osn/common-ui/es/styles/textStyles";
import {
  primary_purple_500,
  text_dark_accessory,
} from "@osn/common-ui/es/styles/colors";
import Button from "./Button";
import Flex from "./styled/Flex";

const ButtonWrapper = styled(Button)`
  padding: 12px 24px;
  color: ${(p) => p.active && 'var(--peach)'} !important;
`;

const Content = styled(Flex)`
  flex-grow: 1;
  ${p_14_medium};
  position: relative;
  justify-content: center;
  padding: 0 48px;
  ${(p) => css`
    ::before {
      position: absolute;
      left: 0;
      content: "#${p.index}";
      color: ${p.active ? primary_purple_500 : text_dark_accessory};
    }
  `}
`;

function Option({ children, index, active, ...props }) {
  return (
    <ButtonWrapper block active={active} {...props}>
      <Content active={active} index={index}>
        {children}
      </Content>
    </ButtonWrapper>
  );
}

export default Option;
