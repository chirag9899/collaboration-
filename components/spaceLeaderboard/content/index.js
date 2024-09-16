import React, { useCallback, useState } from "react";
import {
  AddressWrapper,
  LeaderboardHeader,
  LeaderboardTable,
  PaginationWrapper,
  PanelWrapper,
  RankCell,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Wrapper,
} from "./styled";
import { filterTopVoters } from "utils";
import Avatar from "@/components/avatar";
import IdentityOrAddr from "@/components/identityOrAddr";
import { useSelector } from "react-redux";
import { loginAccountSelector } from "store/reducers/accountSlice";
import Pagination from "@/components/pagination";
import ClientPagination from "@/components/ClientPagination";
import Switch from "@/components/switchBtn";
import NameFromAddress from "@/components/EnsName";

const Content = ({ space, spaceVoters }) => {
  const { mostActiveVoters, richestVotersBySymbol } = spaceVoters || {};
  const account = useSelector(loginAccountSelector);
  const [isChecked, setIsChecked] = useState(false);

  // Pagination state
  const [currentPageRichest, setCurrentPageRichest] = useState(1);
  const [currentPageActive, setCurrentPageActive] = useState(1);
  const pageSize = 10; // Set how many items per page

  // Filter and paginate data
  const filteredRichestVoters = filterTopVoters(
    richestVotersBySymbol,
    "rank",
    100,
  ); // Adjust based on total count
  const paginatedRichestVoters = filteredRichestVoters.slice(
    (currentPageRichest - 1) * pageSize,
    currentPageRichest * pageSize,
  );

  const filteredActiveVoters = filterTopVoters(mostActiveVoters, "rank", 100);
  const paginatedActiveVoters = filteredActiveVoters.slice(
    (currentPageActive - 1) * pageSize,
    currentPageActive * pageSize,
  );

  // Handle page change
  const handlePageChangeRichest = (page) => {
    setCurrentPageRichest(page);
  };

  const handlePageChangeActive = (page) => {
    setCurrentPageActive(page);
  };

  const onSwitchHandler = useCallback((e) => {
    const { checked } = e.target;
    setIsChecked(checked);
  }, []);

  return (
    <Wrapper>
      {/* Richest Voters */}
      <PanelWrapper>
        <LeaderboardHeader>
          {/* <div> */}
          Top Richest Voters
          {/* </div> */}
          {/* <Switch
            onChange={onSwitchHandler}
            checked={isChecked}
            text={isChecked ? "BVTEST" : "BPPT"}
          /> */}
        </LeaderboardHeader>
        <LeaderboardTable>
          <TableHead>
            <TableRow>
              <TableHeader width="30%">Rank</TableHeader>
              <TableHeader width="40%">Address</TableHeader>
              <TableHeader width="30%">Voting Power</TableHeader>
            </TableRow>
          </TableHead>
          <tbody>
            {paginatedRichestVoters?.map((voter, index) => (
              <TableRow key={voter._id}>
                <RankCell width="30%">{"rank " + voter.rank}</RankCell>
                <TableCell width="40%">
                  <AddressWrapper>
                    <Avatar address={voter?._id?.voter} size={24} />
                    {/* <IdentityOrAddr
                      network={account?.network}
                      address={voter?._id?.voter}
                    /> */}

                    <NameFromAddress address={voter?._id?.voter}/>
                  </AddressWrapper>
                </TableCell>
                <TableCell width="30%">
                  <span>{voter?.totalBalance}</span>{" "}
                  <span>{voter?._id?.symbol}</span>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </LeaderboardTable>
        <PaginationWrapper>
          <ClientPagination
            page={currentPageRichest}
            pageSize={pageSize}
            total={filteredRichestVoters.length}
            onPageChange={handlePageChangeRichest}
          />
        </PaginationWrapper>
      </PanelWrapper>

      {/* Active Voters */}
      <PanelWrapper>
        <LeaderboardHeader>Top Active Voters</LeaderboardHeader>
        <LeaderboardTable>
          <TableHead>
            <TableRow>
              <TableHeader width="30%">Rank</TableHeader>
              <TableHeader width="40%">Address</TableHeader>
              <TableHeader width="30%">Votes</TableHeader>
            </TableRow>
          </TableHead>
          <tbody>
            {paginatedActiveVoters?.map((voter, index) => (
              <TableRow key={voter._id}>
                <RankCell width="30%">{"rank " + voter.rank}</RankCell>
                <TableCell width="40%">
                  <AddressWrapper>
                    <Avatar address={voter?._id} size={24} />
                    <IdentityOrAddr
                      network={account?.network}
                      address={voter?._id}
                    />
                  </AddressWrapper>
                </TableCell>
                <TableCell width="30%">{voter?.voteCount}</TableCell>
              </TableRow>
            ))}
          </tbody>
        </LeaderboardTable>
        <PaginationWrapper>
          <ClientPagination
            page={currentPageActive}
            pageSize={pageSize}
            total={filteredActiveVoters.length}
            onPageChange={handlePageChangeActive}
          />
        </PaginationWrapper>
      </PanelWrapper>
    </Wrapper>
  );
};

export default Content;
