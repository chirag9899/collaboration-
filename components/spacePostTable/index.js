import NoData from "../NoData";
import { useEffect, useState } from "react";
import {
  ButtonsGroup,
  CustomBtn,
  DateSection,
  HeadWrapper,
  LoadBtnWrapper,
  LoadButton,
  PostsWrapper,
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
import { useRouter } from "next/router";

export default function SpacePostTable({
  title,
  posts,
  limit = 5,
  status = "",
  space,
}) {
  const [data, setData] = useState([]);
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(5);
  const [totalCount, setTotalCount] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const address = useSelector(addressSelector);

  const router = useRouter();
  const { open, openModal, closeModal } = useModal();
  const onCheckRewards = () => {
    router.push(`/space/${space.id}/rewards?id=${space._id}`);
  };

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
      {title && (
        <HeadWrapper>
          <Title>{title}</Title>
          <div>
            <p>
              171 <span className="green">Passed</span>
            </p>
            <p>
              49 <span className="red">Failed</span>
            </p>
          </div>
        </HeadWrapper>
      )}
      <PostsWrapper>
        <TableContainer>
          <Table>
            <thead>
              <TableRow>
                <TableHeader colWidth={40}>Proposals</TableHeader>
                <TableHeader colWidth={15}>Vote For</TableHeader>
                <TableHeader colWidth={15}>Vote Against</TableHeader>
                <TableHeader colWidth={15}>Total Voters</TableHeader>
                <TableHeader colWidth={15}>Actions</TableHeader>
              </TableRow>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <TableRow key={index}>
                  <TableCell colWidth={40} data-label="Proposals">
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
                  <TableCell colWidth={15} data-label="Vote For">
                    <span className="fw_bold green">
                      {item.finalTallyResult.forCount}
                    </span>
                  </TableCell>
                  <TableCell
                    className="fw_bold"
                    colWidth={15}
                    data-label="Vote Against"
                  >
                    <span className="fw_bold red">
                      {item.finalTallyResult.againstCount}
                    </span>
                  </TableCell>
                  <TableCell
                    className="fw_bold"
                    colWidth={15}
                    data-label="Total Voters"
                  >
                    <span className="fw_bold">{item.totalVotes}</span>
                  </TableCell>
                  <TableCell colWidth={15} data-label="Actions">
                    <ButtonsGroup>
                      <CustomBtn
                        disabled={!address}
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
                        onClick={onCheckRewards}
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
    </>
  );
}
