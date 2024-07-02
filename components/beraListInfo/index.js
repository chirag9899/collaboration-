import styled from "styled-components";
import { p_14_normal, p_20_semibold } from "../../styles/textStyles";
import { makeSquare } from "styles/globalCss";
import Button from "../Button";
import { primary_color } from "../styles/colors";
import { p_16_semibold } from "../styles/textStyles";
import Panel from "../styled/panel";
import { ReactComponent as BeraChainImg } from "/public/imgs/icons/bearchain.svg";
import { useRouter } from "next/router";
import DelegeteSpaceModal from "../delegateModal";
import useModal from "hooks/useModal";
import Flex from "../styled/Flex";

const Wrapper = styled(Panel)`
  padding: 20px;
  height: 180px;
`;

const Content = styled(Flex)`
  width: 100%;
  justify-content: space-between;
`;

const LogoName = styled.div`
  ${p_20_semibold};
  text-transform: capitalize;
  display: flex;
  align-items: center;
`;

const LogoSymbol = styled.div`
  ${p_14_normal};
  color: var(--neutral-3);
  margin-top: 20px;
  margin-left: 35px;
`;

const Icon = styled.div`
  ${makeSquare(32)};
  margin-right: 16px;
`;
const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 10px;
  cursor: pointer;
`;

const ButtonWrapper = styled(Button)`
  cursor: pointer;
  ${p_16_semibold};
  color: ${primary_color};
  margin-right: 10px;
  font-size: 12px;
  padding: 4px 30px !important;
  border-radius: 0px !important;
  > img {
    width: 24px;
    height: 24px;
    margin-right: 8px !important;
  }
`;

export default function ListInfo({ space }) {
  const { open, openModal, closeModal } = useModal();

  const router = useRouter();

  const handleGoBack = () => {
    router.push("/");
  };

  return (
    <Wrapper>
      <Content>
        <div>
          <LogoName>
            <IconWrapper onClick={handleGoBack}>
              <BeraChainImg />
            </IconWrapper>{" "}
            BeraChain VoteMarket
          </LogoName>
          <LogoSymbol>
            A Marketplace to for BeraChain Governance Vote Incentives and
            Delegation Platform
          </LogoSymbol>
        </div>
        <ButtonWrapper onClick={openModal}>Delegate</ButtonWrapper>
      </Content>
      {open && (
        <DelegeteSpaceModal
          open={open}
          closeModal={closeModal}
          message="The proposal deletion is permanent. Are you sure you want to delete?"
        />
      )}
    </Wrapper>
  );
}
