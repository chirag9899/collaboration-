import styled from "styled-components";
// import HardLink from "components/hardLink";
import { p_16_semibold, p_18_semibold } from "styles/textStyles";
import { shadow_100, shadow_200 } from "styles/globalCss";
import { p_24 } from "../styles/paddings";
import { Flex, FlexBetween } from "@osn/common-ui";
import { bg_white, primary_color } from "./styles/colors";
import Input from "./Input";
import ProgressBar from "./progressBar";
import Button from "./Button";
import { useRouter } from "next/router";
import useModal from "hooks/useModal";
import AddIncentive from "./addIncentiveModal";

const Wrapper = styled.div`
  background: ${bg_white};
  border: 1px solid #f0f3f8;
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

  > :not(:first-child)::before {
    margin: 0 8px;
  }
  @media screen and (max-width: 800px) {
    width: 100%;
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
`;
export default function SpacePost({ data, spaces, space }) {
  const router = useRouter();
  const { open, openModal, closeModal } = useModal();
  const onCheckRewards = () => {
    router.push(`/space/${space.id}/rewards?id=${space._id}`);
  };

  const handleAddIncentive = (value) => {
    console.log("handleAddIncentive click", value);
  };
  return (
    <Wrapper>
      {/* <HardLink href={`/space/${data.space}/proposal/${data.cid}`}> */}
      <TitleWrapper>
        <Title>{data.title}</Title>
        <ButtonsWrapper>
          <CustomBtn primary block onClick={openModal}>
            Add incentive
          </CustomBtn>
          <CustomBtn primary block onClick={onCheckRewards}>
            Check rewards
          </CustomBtn>
        </ButtonsWrapper>
        <PostQuorom>Quorom:10%</PostQuorom>
      </TitleWrapper>
      <InfoWrapper>
        <LeftWrapper>
          <IncentivesWrapper>
            <span>Incentives/Votes</span>
            <Input type="text" value="$555" disabled={true} />
          </IncentivesWrapper>
        </LeftWrapper>
        <RightWrapper>
          <ProgressBar value={51} max={100} footer={true} />
        </RightWrapper>
      </InfoWrapper>
      {/* </HardLink> */}
      {open && (
        <AddIncentive
          open={open}
          closeModal={closeModal}
          message="The proposal deletion is permanent.Are you sure you want to delete?"
          onSubmit={handleAddIncentive}
        />
      )}
    </Wrapper>
  );
}
