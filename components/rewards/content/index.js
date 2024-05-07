import { useDispatch } from "react-redux";
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
import { useEffect } from "react";

export default function Content() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { getRewards } = useEthApis();

  async function loadRewards() {
    const data = await getRewards();
    const { rewards, claimInfo } = data;
    console.log(data, "data");
  }

  useEffect(() => {
    loadRewards();
  }, []);

  const handleGoBack = () => {
    router.back();
  };

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
          <Amount>$ 72.22</Amount>
        </ClaimSection>
        <ClaimSection className="text-left">
          <TextWrapper>Total all spaces claimed rewards</TextWrapper>
          <Amount>$ 93.39</Amount>
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
