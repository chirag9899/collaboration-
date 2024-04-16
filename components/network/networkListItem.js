import styled from "styled-components";
import { shadow_100, shadow_200, makeSquare } from "../../styles/globalCss";
import { p_18_semibold } from "../../styles/textStyles";
import NetworkLogo from "./networkLogo";
import Link from "next/link";

const IconWrapper = styled.div`
  display: flex;
  gap: 5px;
  margin-bottom: 25px;
`;

const Icon = styled.div`
  ${makeSquare(28)};
  align-self: flex-start;
`;

const Name = styled.h3`
  white-space: nowrap;
  ${p_18_semibold};
  color: var(--neutral-1);
  text-transform: capitalize;
  font-size: 18px;
  line-height: 18px;
  margin-bottom: 0px;
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
  width: 100%;
  a {
    flex-direction: column;
    align-items: start;
  }
  :hover {
    border-color: var(--background);
    ${shadow_200}
  }
  @media screen and (min-width: 992px) {
    width: 22%;
  }
  @media screen and (max-width: 992px) {
    width: 45%;
  }

  @media screen and (max-width: 767px) {
    width: 100%;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const SubTitle = styled.span`
  font-size: 12px !important;
  color: var(--netural-11);
  font-weight: bold;
`;
const Footer = styled.div`
  color: var(--netural-11);
  font-weight: bold;
`;

export default function NetworkListItem({ network }) {
  return (
    <Wrapper>
      <Link href={`/space/networkSpaces?name=${network.network}`}>
        <IconWrapper>
          <Icon>
            <NetworkLogo network={network.network} />
          </Icon>
          <TitleWrapper>
            <Name>{network.name}</Name>
            {/* <SubTitle>Chain #1</SubTitle> */}
          </TitleWrapper>
        </IconWrapper>
        {/* <Footer>In 66K space(s)</Footer> */}
      </Link>
    </Wrapper>
  );
}
