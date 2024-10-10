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
import { _handleChainSelect } from "../connect/helper";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import useEthApis from "hooks/useEthApis";
import { connectedWalletSelector } from "store/reducers/showConnectSlice";
import { getCookie } from "frontedUtils/cookie";
import useModal from "hooks/useModal";
import AddIncentive from "../addIncentiveModalGov";
import { formatNumber } from "utils";
import Tooltip from "../tooltip";
import CheckRewardsModal from "../checkRewardsModal";
import NoData from "../NoData";
import { chainMap } from "frontedUtils/consts/chains";
import { newErrorToast } from "store/reducers/toastSlice";
import { commify } from "../../utils";
import { addressSelector } from "store/reducers/accountSlice";

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
  const router = useRouter();
  const [data, setData] = useState([]);
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(5);
  const [totalCount, setTotalCount] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [showRewards, setShowRewards] = useState(false);
  const [holdersCount, setHoldersCount] = useState(0);
  const dispatch = useDispatch();
  const connectedWallet = useSelector(connectedWalletSelector);
  const { open, openModal, closeModal } = useModal();
  const { addBeraGovRewardAmount } = useEthApis();
  const [isSwitching, setIsSwitching] = useState(false);
  const [incentiveData, setIncentiveData] = useState(null);
  const address = useSelector(addressSelector);


  const onCheckRewards = async () => {
    await router.push(`/space/beragov/rewards`);
  };

  const { failedProposalsCount, passedProposalsCount, totalVotersCount } =
    proposalInfo;

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

  const handleChainSelect = async (chain) => {
    try {
      await _handleChainSelect(connectedWallet, dispatch, address, chainMap, chain);
      const currentChainId = await window.ethereum.request({ method: 'eth_chainId' });
      const bartioNetworkId = chainMap.get(chain.network).id;

      if (currentChainId !== bartioNetworkId) {
        return false
      }
      return true;
    } catch (error) {
      console.error("Error switching network:", error);
      dispatch(newErrorToast(error.message));
      return false;
    }
  };

  const handleIncentive = async (item) => {
    try {
      const bartioNetwork = { network: 'berachain-b2' };
      setIsSwitching(true);
      const switched = await handleChainSelect(bartioNetwork);
      console.log(switched)
      setIsSwitching(false);
      if (switched) {
        setIncentiveData(item);
        openModal();
      }

    } catch (error) {
      closeModal();
    }
  };

  const handleCheckRewards = async () => {
    try {
      const bartioNetwork = { network: 'berachain-b2' };
      setIsSwitching(true);
      const switched = await handleChainSelect(bartioNetwork);
      console.log(switched);
      setIsSwitching(false);
      if (switched) {
        onCheckRewards();
      }
    } catch (error) {
      setIsSwitching(false);
    }
  };

  const handleAddIncentive = async (value) => {
    // console.log(incentiveData)
    // console.log(incentiveData.id)
    // console.log(incentiveData.voteStartOrg)
    // console.log(incentiveData.voteEndOrg)
    if (!incentiveData) return;
    try {
      await addBeraGovRewardAmount(
        incentiveData.id,
        value.addIncentive ? ethers.constants.MaxUint256 : value.selectedOptions,
        value.incentiveAmount,
        value.tokenAddress,
        incentiveData.voteStartOrg,
        incentiveData.voteEndOrg,
      );
    } catch (error) {
      console.error("Error adding incentive:", error);
      dispatch(newErrorToast(error.message));
    }
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
                        {item.statusDetails.status} {item.quorumNotReached}
                      </Status>
                      <DateSection>{item.voteStart}</DateSection>
                    </StatusWrapper>
                  </TableCell>
                  <TableCell colWidth={15} data-label="Total incentives">
                    <div className="incentives">
                      <span className="fw_bold">${commify(item.totalIncentivesAmount, 2)}</span>
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
                          process.env.NEXT_PUBLIC_SHOW_BERA_VOTE_BUTTON !== "true" &&
                          (!address || item.statusDetails.status !== "active")
                        }
                        primary
                        block
                        onClick={() => handleIncentive(item)}
                      >
                        Add incentive
                      </CustomBtn>
                      <CustomBtn
                        disabled={!address}
                        primary
                        block
                        onClick={handleCheckRewards}
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
          message="The proposal deletion is permanent. Are you sure you want to delete?"
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
