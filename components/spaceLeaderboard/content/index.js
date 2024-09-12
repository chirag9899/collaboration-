import React from "react";
import {
  AddressWrapper,
  LeaderboardContainer,
  LeaderboardHeader,
  LeaderboardTable,
  PanelWrapper,
  RankCell,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Wrapper,
} from "./styled";
import Address from "/components/address";
import { filterTopVoters } from "utils";
import Avatar from "@/components/avatar";

const Content = ({ space, spaceVoters }) => {
  const { mostActiveVoters, richestVotersBySymbol } = spaceVoters || {};

  const filteredActiveVoters = filterTopVoters(mostActiveVoters, "rank", 10);

  const filteredRichestVoters = filterTopVoters(
    richestVotersBySymbol,
    "rank",
    10,
  );

  return (
    <Wrapper>
      <PanelWrapper>
        <LeaderboardHeader>Top Richest Voters</LeaderboardHeader>
        <LeaderboardTable>
          <TableHead>
            <TableRow>
              <TableHeader width="20%">Rank</TableHeader>
              <TableHeader width="50%">Address</TableHeader>
              <TableHeader width="30%">Voting Power</TableHeader>
            </TableRow>
          </TableHead>
          <tbody>
            {filteredRichestVoters?.map((voter, index) => (
              <TableRow key={voter._id}>
                <RankCell width="20%">{"rank" + " " + voter.rank}</RankCell>
                <TableCell width="50%">
                  <AddressWrapper>
                    <Avatar address={voter?._id?.voter} size={24} />
                    <Address>{voter?._id?.voter}</Address>
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
      </PanelWrapper>
      <PanelWrapper>
        <LeaderboardHeader>Top Active Voters </LeaderboardHeader>
        <LeaderboardTable>
          <TableHead>
            <TableRow>
              <TableHeader width="20%">Rank</TableHeader>
              <TableHeader width="50%">Address</TableHeader>
              <TableHeader width="30%">Votes</TableHeader>
            </TableRow>
          </TableHead>
          <tbody>
            {filteredActiveVoters?.map((voter, index) => (
              <TableRow key={voter._id}>
                <RankCell width="20%">{"rank" + " " + voter.rank}</RankCell>
                <TableCell width="50%">
                  <AddressWrapper>
                    <Avatar address={voter?._id} size={24} />
                    <Address>{voter?._id}</Address>
                  </AddressWrapper>
                </TableCell>
                <TableCell width="30%">{voter?.voteCount}</TableCell>
              </TableRow>
            ))}
          </tbody>
        </LeaderboardTable>
      </PanelWrapper>
    </Wrapper>
  );
};

export default Content;
