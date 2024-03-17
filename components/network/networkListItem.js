import styled from "styled-components";
import { shadow_100, shadow_200, makeSquare } from "../../styles/globalCss";
import { p_18_semibold } from "../../styles/textStyles";
import { border_primary, netural_grey_100 } from "../styles/colors";
import NetworkLogo from "./networkLogo";

const IconWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const Icon = styled.div`
  ${makeSquare(28)};
  align-self: flex-start;
`;

const Name = styled.div`
  white-space: nowrap;
  ${p_18_semibold};
  color: ${netural_grey_100};
  text-transform: capitalize;
  font-size: 1rem;
`;

const Wrapper = styled.div`
  position: relative;
  backdrop-filter: blur(50px);
  -webkit-backdrop-filter: blur(50px);
  background-color: var(--shadow);
  border: 0;
  border-radius: 10px;
  ${shadow_100};
  padding: 24px;
  cursor: pointer;
  width: 200px;

  :hover {
    border-color: #e2e8f0;
    ${shadow_200}
  }
`;


export default function NetworkListItem({ network }) {
  return (
    <Wrapper>
      <IconWrapper>
        <Icon>
          <NetworkLogo space={network.network} />
        </Icon>
        <Name>{network.name}</Name>
      </IconWrapper>
    </Wrapper>
  );
}
