import React from "react";
import styled from "styled-components";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import NoData from "../NoData";
import Button from "../Button";
import { p_16_semibold } from "styles/textStyles";
import { primary_color } from "../styles/colors";

const Container = styled.div`
  margin-top: 1rem;
  padding: 1rem;
`;

const GridContainer = styled(TransitionGroup)`
  display: grid;
  gap: 1rem;
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;
const Block = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1.5rem;
  border-radius: 10px;
  border: 1px solid var(--netural-11);
  background-color: var(--background-0);
  color: #FFFFFF;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
  &:hover {
    transform: translateY(-5px);
  }
`;
const AvatarContainer = styled.div`
  margin-bottom: 1rem;
`;
const Avatar = styled.img`
  width: 60px;
  height: 60px;
`;
const InfoContainer = styled.div`
  margin-bottom: 1rem;
`;
const InfoText = styled.p`
  margin: 0;
  font-size: 1.2rem;
  font-weight: bold;
`;
const StatsContainer = styled.div`
  width: 100%;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;
const Stat = styled.div`
  text-align: left;
  display:flex;
  justify-content:space-between;
  margin-bottom:10px;
  font-weight:bold;
  color:var(--netural-11);
`;

const ButtonWrapper = styled(Button)`
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


function RewardCards({rewards}) {
  

  const shorten = (value, length) => value.toString().slice(0, length);
  const commify = (value, precision = 0) =>
    parseFloat(value)
      .toFixed(precision)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
    <Container>
      <GridContainer>
        {rewards.length ? (
          rewards.map((reward) => (
            <CSSTransition
              key={reward.rewardToken.address}
              classNames="fade"
              timeout={300}
            >
              <Block>
                <AvatarContainer>
                  <Avatar
                    src={reward.rewardTokenLogo}
                    alt={`${reward.rewardToken.symbol} Logo`}
                  />
                </AvatarContainer>
                <InfoContainer>
                  <InfoText>{reward.rewardToken.symbol}</InfoText>
                </InfoContainer>
                <StatsContainer>
                  <Stat>
                    <div>Reward</div>
                    <div>{shorten(commify(reward.claimable), 12)}</div>
                  </Stat>
                  <Stat>
                    <div>USD value</div>
                    <div>
                      {"$" +
                        commify(reward.claimable * reward.rewardToken.price, 2)}
                    </div>
                  </Stat>
                </StatsContainer>
                <ButtonWrapper>Claim</ButtonWrapper>
              </Block>
            </CSSTransition>
          ))
        ) : (
          <NoData message="No Record found" />
        )}
      </GridContainer>
    </Container>
  );
}

export default RewardCards;
