import { ReactComponent as BeraChainImg } from "/public/imgs/icons/bearchain.svg";
import { useRouter } from "next/router";
import DelegeteSpaceModal from "../delegateModal";
import useEthApis from "hooks/useEthApis";
import useModal from "hooks/useModal";
import {
  Balance,
  BalanceSection,
  BalanceWrapper,
  ButtonWrapper,
  Content,
  DelegateSection,
  HeadingWrapper,
  IconWrapper,
  LogoName,
  LogoSymbol,
  Wrapper,
} from "./styled";
import Tooltip from "../tooltip";

export default function ListInfo({ balance }) {
  const { open, openModal, closeModal } = useModal();
  const { delegateVotes } = useEthApis();

  const router = useRouter();

  const handleGoBack = () => {
    router.push("/");
  };

  return (
    <Wrapper>
      <Content>
        <HeadingWrapper>
          <LogoName>
            <IconWrapper onClick={handleGoBack}>
              <BeraChainImg />
            </IconWrapper>
            BeraChain VoteMarket
          </LogoName>
          {/* <LogoSymbol>
            A marketplace for berachain vote incentives and delegation
          </LogoSymbol> */}
        </HeadingWrapper>
        <BalanceWrapper>
          <BalanceSection>
            <Balance>
              <div>
                <p>BGT Balance</p>
                <Tooltip
                  content="Current BGT Balance"
                  icon="/imgs/icons/tooltip-info.svg"
                  iconSize={16}
                />
              </div>
              <p>{balance} BGT</p>
            </Balance>
            <Balance>
              <div>
                <p>My Rewards</p>
                <Tooltip
                  content="Total Rewards available to claim"
                  icon="/imgs/icons/tooltip-info.svg"
                  iconSize={16}
                />
              </div>
              <p>US$0.00</p>
            </Balance>
          </BalanceSection>
          <DelegateSection>
            <p>Delegate to BeraVote to optimize voting rewards</p>
            <ButtonWrapper onClick={delegateVotes}>Delegate</ButtonWrapper>
          </DelegateSection>
        </BalanceWrapper>
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
