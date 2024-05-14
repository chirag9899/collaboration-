import {
  Wrapper,
  TitalWrapper,
  Title,
  ClaimWrapper,
  ClaimSection,
  TextWrapper,
  Claim,
  Amount,
  IconWrapper,
} from "./styled";
import NoData from "@/components/NoData";
import Button from "@/components/Button";
import { ReactComponent as ArrowLeft } from "/public/imgs/icons/arrow-left.svg";
import { useRouter } from "next/router";
import useEthApis from "hooks/useEthApis";
import { useEffect, useState } from "react";
import { formatAmount } from "helpers/methods";

export default function Content() {
  const [claimInfo, setClaimInfo] = useState({
    totalBalance: 0,
    totalClaimed: 0,
  });
  const [claiming, setClaiming] = useState("");
  const [rewardClaimedMsg, setRewardClaimedMsg] = useState("");
  const { totalBalance, totalClaimed } = claimInfo;
  const router = useRouter();
  const { getRewards, claimAllRewards } = useEthApis();

  async function loadRewards() {
    const data = await getRewards();
    const { rewards, claimInfo } = data;
    setClaimInfo({
      totalBalance: formatAmount(claimInfo?.totalBalance ?? 0),
      totalClaimed: formatAmount(claimInfo?.totalClaimed ?? 0),
    });
  }

  useEffect(() => {
    loadRewards();
  }, []);

  const handleGoBack = () => {
    router.back();
  };

  async function claimAll() {
    try {
      setClaiming("all");
      await claimAllRewards(rewards);
      setRewardClaimedMsg("all");
      setClaiming("");
      await loadRewards();
    } catch (e) {
      setClaiming("");
    }
  }

  return (
    <Wrapper>
      <TitalWrapper>
        <Title>
          <IconWrapper onClick={handleGoBack}>
            <ArrowLeft />
          </IconWrapper>
          Claim rewards
        </Title>
        <TextWrapper>
          These rewards are automatically reserved on your behalf, allowing you
          to claim them at your convenience without any time constraints. You
          have the option to claim all your rewards at once or to claim them
          individually. However, we recommend claiming them all together to
          minimize gas expenses
        </TextWrapper>
      </TitalWrapper>
      <ClaimWrapper>
        <ClaimSection className="text-left">
          <TextWrapper>Total all spaces unclaimed rewards</TextWrapper>
          <Amount>$ {totalBalance}</Amount>
        </ClaimSection>
        <ClaimSection className="text-left">
          <TextWrapper>Total all spaces claimed rewards</TextWrapper>
          <Amount>$ {totalClaimed}</Amount>
        </ClaimSection>
      </ClaimWrapper>

      <Claim>
        <TextWrapper>
          Yours to claim: <Amount>$0.00</Amount>
        </TextWrapper>
        <Button
          data-v-4571bf26=""
          type="button"
          className="button px-[22px]"
          disabled=""
          onClick={claimAll}
        >
          claim all
        </Button>
      </Claim>

      <TextWrapper>
        Once the vote closes, your rewards will be calculated and updated the
        next day at 1PM UTC.
      </TextWrapper>
      <NoData message="No Record found" />
    </Wrapper>
  );
}
