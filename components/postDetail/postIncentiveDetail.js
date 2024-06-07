import Panel from "@/components/postDetail/panel";
import SideSectionTitle from "@/components/sideBar/sideSectionTitle";
import Divider from "../styled/divider";
import styled from "styled-components";
import Button from "../Button";
import AddIncentive from "../addIncentiveModal";
import useModal from "hooks/useModal";
import { p_16_semibold } from "styles/textStyles";
import { primary_color } from "../styles/colors";
import { useRouter } from "next/router";
import { Text } from "../styled/text";
import useEthApis from "hooks/useEthApis";
import { ethers } from "ethers";

const ButtonsWrapper = styled.div`
  width: 100%;
  align-items: center;
  display: flex;
  flex-direction: column;
`;
const CustomBtn = styled(Button)`
  cursor: pointer;
  ${p_16_semibold};
  color: ${primary_color};
  margin-bottom: 10px;
  font-size: 12px;
  padding: 8px 25px !important;
  box-shadow: none;
  border: 1px solid ${primary_color} !important;
  width: 100% !important;
  &:hover {
    border: 1px solid var(--peach) !important;
  }
  > img {
    width: 24px;
    height: 24px;
    margin-right: 8px !important;
  }
`;

const TextWrapper = styled(Text)`
  font-weight: 600;
  font-size: 12px;
  line-height: 24px;
  margin: 0;
  padding: 20px 0px;
  opacity: 0.7;
  text-align: start;
`;

export default function PostIncentive({ data, voteStatus, space }) {
  console.log(data, "data here");
  const router = useRouter();
  const { open, openModal, closeModal } = useModal();
  const onCheckRewards = () => {
    router.push(`/space/${space.id}/rewards?id=beravote-${space._id}`);
  };

  const { addBeraVoteRewardAmount } = useEthApis();

  const handleAddIncentive = async (value) => {
    await addBeraVoteRewardAmount(
      data?._id,
      value.addIncentive ? ethers.constants.MaxUint256 : value.selectedOptions,
      value.incentiveAmount,
      value.tokenAddress,
      data?.startDate,
      data?.endDate,
    );
  };
  return (
    <Panel>
      <SideSectionTitle title="Incentives" />
      <Divider />
      <TextWrapper>
        You can add a reward for voters that choose the desired option
      </TextWrapper>
      <ButtonsWrapper>
        <CustomBtn primary block onClick={openModal}>
          Add incentive
        </CustomBtn>
        <CustomBtn primary block onClick={onCheckRewards}>
          Check rewards
        </CustomBtn>
      </ButtonsWrapper>

      {open && (
        <AddIncentive
          open={open}
          closeModal={closeModal}
          message="The proposal deletion is permanent.Are you sure you want to delete?"
          onSubmit={handleAddIncentive}
        />
      )}
    </Panel>
  );
}
