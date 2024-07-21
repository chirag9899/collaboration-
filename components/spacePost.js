import styled from "styled-components";
// import HardLink from "components/hardLink";
import { p_14_normal, p_16_semibold, p_18_semibold } from "styles/textStyles";
import { shadow_100, shadow_200 } from "styles/globalCss";
import { p_24 } from "../styles/paddings";
import { Flex, FlexBetween } from "@osn/common-ui";
import { bg_white, primary_color, white_text_color } from "./styles/colors";
import Input from "./Input";
import ProgressBar from "./progressBar";
import Button from "./Button";
import { useRouter } from "next/router";
import useModal from "hooks/useModal";
import AddIncentive from "./addIncentiveModal";
import { ethers } from "ethers";
import useEthApis from "hooks/useEthApis";
import { useSelector } from "react-redux";
import { addressSelector } from "store/reducers/accountSlice";
import Accordion from "./accordionPanel/accordion";
import { MarkdownPreviewer } from "@osn/previewer";
import panel from "./accordionPanel/panel";

const Wrapper = styled.div`
  background: ${bg_white};
  border: 1px solid var(--border-color);
  border-radius: 10px;
  ${shadow_100}
  ${p_24};

  :hover {
    border-color: var(--background);

    ${shadow_200}
    .icon > svg {
      display: block;
    }
  }
`;

const Title = styled.h3`
  font-family: Montserrat, serif;
  font-style: normal;
  display: inline-block;
  ${p_18_semibold};
  font-weight: bold !important;
  flex-grow: 1;
  margin-bottom: 0px !important;
  width: 45%;
  @media screen and (max-width: 800px) {
    min-width: 100% !important;
  }
`;

const InfoWrapper = styled(FlexBetween)`
  flex-wrap: wrap;
  width: 100%;
  align-items: start;
  padding-top: 10px;
`;

const LeftWrapper = styled(Flex)`
  line-height: 24px;
  color: var(--neutral-3);
  flex-wrap: wrap;
  justify-content: center;
  width: 30%;
  height: 165px;

  > :not(:first-child)::before {
    margin: 0 8px;
  }

  @media screen and (max-width: 800px) {
    width: 100%;
  }
`;

const DateSection = styled.div`
  > p {
    font-size: 12px;
    margin-bottom: 5px;
    font-weight: 600;
  }
`;

const RightWrapper = styled(Flex)`
  line-height: 24px;
  color: var(--neutral-3);
  flex-wrap: wrap;
  justify-content: space-between;
  width: 70%;

  > :not(:first-child)::before {
    margin: 0 8px;
  }
  @media screen and (max-width: 800px) {
    width: 100%;
  }
`;

const TitleWrapper = styled(FlexBetween)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media screen and (max-width: 800px) {
    flex-direction: column;
  }
`;

const PostQuorom = styled.div`
  font-weight: bold;
  width: 15;
  @media screen and (max-width: 800px) {
    min-width: 100% !important;
  }
`;

const IncentivesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span {
    font-weight: bold;
    align-items: center;
  }
  input {
    padding: 6px 10px;
    text-align: center;
    width: 140px;
  }
`;

const ButtonsWrapper = styled.div`
  width: 35%;
  display: flex;
  justify-content: center;
  @media screen and (max-width: 800px) {
    min-width: 100% !important;
    margin-top: 10px;
    margin-bottom: 10px;
  }
`;
const CustomBtn = styled(Button)`
  cursor: pointer;
  ${p_16_semibold};
  color: ${primary_color};
  margin-right: 10px;
  font-size: 12px;
  padding: 4px 12px !important;
  box-shadow: none;
  border: 1px solid ${primary_color} !important;
  &:hover {
    border: 1px solid var(--peach) !important;
  }
  > img {
    width: 24px;
    height: 24px;
    margin-right: 8px !important;
  }
  &:disabled {
    cursor: not-allowed !important;
    color: var(--neutral-4) !important;
    border-color: var(--neutral-4) !important;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
`;

const Status = styled.div`
  margin-right: 15px;
  padding: 3px 10px;
  font-size: 12px;
  border-radius: 50px;
  text-transform: capitalize;
  color: ${(props) => props.statusDetails.color};
  font-weight: bold;
  background-color: ${(props) => props.statusDetails.backgroundColor};
  max-height: 35px;
`;
const Summary = styled.div`
  margin-right: 15px;
  padding: 3px 10px;
  font-size: 12px;
  border-radius: 50px;
  color: var(--primary);
  font-weight: bold;
  background-color: var(--primary);
  background-color: rgba(235, 182, 0, 0.1);
  text-align: center;
`;

const Content = styled.div`
  ${p_14_normal};
  color: var(--neutral-1);
  .osn-previewer {
    .markdown-body {
      > p {
        color: ${white_text_color};
      }
    }
    .markdown-body code {
      background-color: var(--background-1) !important;
    }
    .markdown-body pre {
      background-color: transparent !important;
    }
  }
`;

const AccordinWrapper = styled(Accordion)`
  margin-top: 15px !important;
`;
const PanelWrapper = styled(panel)`
  min-height: 400px;
  max-width: 700px !important;

  .Items {
    max-width: 500px;
    word-wrap: break-word;
  }
  @media screen and (max-width: 800px) {
    margin: auto;
  }
`;

export default function SpacePost({ data, spaces, space, postNum }) {
  const router = useRouter();
  const { open, openModal, closeModal } = useModal();
  const onCheckRewards = () => {
    router.push(`/space/${space.id}/rewards?id=${space._id}`);
  };
  const address = useSelector(addressSelector);

  const { addBeraGovRewardAmount } = useEthApis();

  const handleAddIncentive = async (value) => {
    // console.log(value)
    // console.log(data)
    await addBeraGovRewardAmount(
      data?.id,
      value.addIncentive ? ethers.constants.MaxUint256 : value.selectedOptions,
      value.incentiveAmount,
      value.tokenAddress,
      data?.votingStartTime,
      data?.votingEndTime,
    );
  };
  return (
    <Wrapper>
      {/* <HardLink href={`/space/${data.space}/proposal/${data.cid}`}> */}
      <TitleWrapper>
        <Title>{data.title}</Title>
        <ButtonsWrapper>
          <CustomBtn disabled={!address} primary block onClick={openModal}>
            Add incentive
          </CustomBtn>
          <CustomBtn disabled={!address} primary block onClick={onCheckRewards}>
            Check rewards
          </CustomBtn>
        </ButtonsWrapper>
        <PostQuorom>Quorum:{data.quorumPer}</PostQuorom>
      </TitleWrapper>
      <InfoWrapper>
        <LeftWrapper>
          <IncentivesWrapper>
            <span>Total Voters</span>
            <Input type="text" value={data.totalVotes} disabled={true} />
          </IncentivesWrapper>
          <DateSection>
            <p>Start: {data.voteStart}</p>
            <p>End: {data.voteEnd}</p>
          </DateSection>
        </LeftWrapper>
        <RightWrapper>
          <ContentWrapper>
            <Status statusDetails={data.statusDetails}>
              {data.statusDetails.status}
            </Status>
            {/* <Summary>{data.metadata}</Summary> */}
          </ContentWrapper>
          <ProgressBar
            value={data.totalvotesPercentage}
            max={100}
            footer={true}
            finalTallyResult={data.finalTallyResult}
            thresholdPercentage={data.thresholdPercentage}
            requiredQuorumPercentage={data.requiredQuorumPercentage}
          />
        </RightWrapper>
      </InfoWrapper>
      <PanelWrapper folded={true}>
        <Content>
          <MarkdownPreviewer content={data?.description} />
          </Content>
      </PanelWrapper>
      {/* </HardLink> */}
      {open && (
        <AddIncentive
          choices={["For", "Abstain", "Against"]}
          open={open}
          closeModal={closeModal}
          message="The proposal deletion is permanent.Are you sure you want to delete?"
          onSubmit={handleAddIncentive}
        />
      )}
    </Wrapper>
  );
}
