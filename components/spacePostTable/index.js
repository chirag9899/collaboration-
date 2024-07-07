import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { useEffect, useState } from "react";
import {
  ButtonsGroup,
  CustomBtn,
  DateSection,
  HeadWrapper,
  LoadBtnWrapper,
  LoadButton,
  PostsWrapper,
  ProposalsCount,
  Status,
  StatusWrapper,
  Table,
  TableCell,
  TableContainer,
  TableHeader,
  TableRow,
  Title,
  TitleWrapper,
} from "./styled";
import { addressSelector } from "store/reducers/accountSlice";
import { useSelector } from "react-redux";
import useModal from "hooks/useModal";
import AddIncentive from "../addIncentiveModal";
import { formatNumber } from "utils";
import Tooltip from "../tooltip";
import CheckRewardsModal from "../checkRewardsModal";
import USDC from "cryptocurrency-icons/svg/color/usdc.svg";
import Image from "next/image";
import NoData from "../NoData";

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_BGT_GRAPH_ENDPOINT,
  cache: new InMemoryCache(),
});

const GET_HOLDERS = gql`
  query bgt {
    tokens {
      holdersCount
      totalSupply
    }
  }
`;

export default function SpacePostTable({
  title,
  posts,
  limit = 5,
  status = "",
  proposalInfo,
}) {
  const [data, setData] = useState([]);
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(5);
  const [totalCount, setTotalCount] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [showRewards, setShowRewards] = useState(false);
  const [holdersCount, setHoldersCount] = useState(0); // New state for holders count
  const address = useSelector(addressSelector);

  const { failedProposalsCount, passedProposalsCount, totalVotersCount } =
    proposalInfo;

  const { open, openModal, closeModal } = useModal();

  // Fetch holders count on mount
  useEffect(() => {
    const fetchHoldersCount = async () => {
      try {
        const { data } = await client.query({ query: GET_HOLDERS });
        setHoldersCount(data.tokens[0].holdersCount);
      } catch (error) {
        console.error("Error fetching holders count:", error);
      }
    };

    fetchHoldersCount();
  }, []);

  const fetchProposals = async (from, to) => {
    const result = posts?.length > 0 ? posts?.slice(from, to) : [];
    setIsLoading(true);
    setTotalCount(posts.length);
    setData((prev) => [...prev, ...result]);
    setIsLoading(false);
  };

  useEffect(() => {
    setData([]);
    setFrom(0);
    setTo(5);
  }, [status]);

  useEffect(() => {
    fetchProposals(from, to);
  }, [posts]);

  const handleLoadMore = () => {
    if (to < totalCount) {
      setFrom(from + limit);
      setTo(to + limit);
      fetchProposals(from + limit, to + limit);
    }
  };

  const handleLoadLess = () => {
    if (from > 0) {
      setFrom(from - limit);
      setTo(to - limit);
      setData(data.slice(0, -5));
    }
  };

  const handleAddIncentive = async (value) => {
    await addBeraVoteRewardAmount(
      data?.id,
      value.addIncentive ? ethers.constants.MaxUint256 : value.selectedOptions,
      value.incentiveAmount,
      value.tokenAddress,
      data?.votingStartTime,
      data?.votingEndTime,
    );
  };

  return (
    <>
      <ProposalsCount>
        <div>
          <p>{formatNumber(posts.length)}</p>
          <span>Proposals</span>
        </div>
        <div>
          <p>{formatNumber(holdersCount)}</p>
          <span>Holders</span>
        </div>
        <div>
          <p>{formatNumber(totalVotersCount)}</p>
          <span>Voters</span>
        </div>
      </ProposalsCount>
      {title && (
        <HeadWrapper>
          <Title>{title}</Title>
          <div>
            <p>
              {passedProposalsCount} <span className="green">Passed</span>
            </p>
            <p>
              {failedProposalsCount} <span className="red">Failed</span>
            </p>
          </div>
        </HeadWrapper>
      )}
      <PostsWrapper>
        <TableContainer>
          <Table>
            <thead>
              <TableRow>
                <TableHeader colWidth={35}>Proposals</TableHeader>
                <TableHeader colWidth={15}>Rewards</TableHeader>
                <TableHeader colWidth={15}>Vote For</TableHeader>
                <TableHeader colWidth={10}>Vote Against</TableHeader>
                <TableHeader colWidth={10}>Total Voters</TableHeader>
                <TableHeader colWidth={15}>Actions</TableHeader>
              </TableRow>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <TableRow key={index}>
                  <TableCell colWidth={35} data-label="Proposals">
                    <TitleWrapper>
                      <Title>{item.title}</Title>
                    </TitleWrapper>
                    <StatusWrapper>
                      <Status statusDetails={item.statusDetails}>
                        {item.statusDetails.status}
                      </Status>
                      <DateSection>{item.voteStart}</DateSection>
                    </StatusWrapper>
                  </TableCell>
                  <TableCell colWidth={15} data-label="Rewards">
                    <div className="rewards">
                      <span className="fw_bold">USD 12112</span>
                      <Tooltip
                        content={
                          <div className="rewards_popup">
                            <div className="popup_title">
                              <p>Ethereum</p>
                            </div>
                            <div className="popup_body">
                              <Image
                                src={USDC}
                                alt="Bitcoin"
                                width={32}
                                height={32}
                              />
                              <span>$9,576.37 USDC</span>
                            </div>
                            <div className="popup_body">
                              <Image
                                src={USDC}
                                alt="Bitcoin"
                                width={32}
                                height={32}
                              />
                              <span>$3,682.31 RPL</span>
                            </div>
                          </div>
                        }
                        icon={"/imgs/icons/tooltip-info.svg"}
                        iconSize={14}
                      />
                    </div>
                  </TableCell>
                  <TableCell colWidth={15} data-label="Vote For">
                    <span className="fw_bold green">
                      {item.finalTallyResult.forCount}
                    </span>
                  </TableCell>
                  <TableCell
                    className="fw_bold"
                    colWidth={10}
                    data-label="Vote Against"
                  >
                    <span className="fw_bold red">
                      {item.finalTallyResult.againstCount}
                    </span>
                  </TableCell>
                  <TableCell
                    className="fw_bold"
                    colWidth={10}
                    data-label="Total Voters"
                  >
                    <span className="fw_bold">{item.totalVotes}</span>
                  </TableCell>
                  <TableCell colWidth={15} data-label="Actions">
                    <ButtonsGroup>
                      <CustomBtn
                        disabled={
                          !address || item.statusDetails.status !== "active"
                        }
                        primary
                        block
                        onClick={openModal}
                      >
                        Add incentive
                      </CustomBtn>
                      <CustomBtn
                        disabled={!address}
                        primary
                        block
                        onClick={() => setShowRewards(true)}
                      >
                        Check rewards
                      </CustomBtn>
                    </ButtonsGroup>
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </TableContainer>

        {data.length === 0 && <NoData message="No current active proposals" />}
        <LoadBtnWrapper>
          {to > limit && (
            <LoadButton
              primary
              className="button button-modern"
              onClick={handleLoadLess}
            >
              Load Less
            </LoadButton>
          )}
          {to < totalCount && (
            <LoadButton
              isLoading={isLoading}
              primary
              className="button button-modern"
              onClick={handleLoadMore}
            >
              Load More
            </LoadButton>
          )}
        </LoadBtnWrapper>
      </PostsWrapper>
      {open && (
        <AddIncentive
          choices={["For", "Abstain", "Against"]}
          open={open}
          closeModal={closeModal}
          message="The proposal deletion is permanent.Are you sure you want to delete?"
          onSubmit={handleAddIncentive}
        />
      )}

      {showRewards && (
        <CheckRewardsModal
          open={showRewards}
          closeModal={() => setShowRewards(false)}
        />
      )}
    </>
  );
}
