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
import { filterTopVoters } from "utils";
import Avatar from "@/components/avatar";
import IdentityOrAddr from "@/components/identityOrAddr";
import { useSelector } from "react-redux";
import { loginAccountSelector } from "store/reducers/accountSlice";

const Content = ({ space, spaceVoters }) => {
  const { mostActiveVoters, richestVotersBySymbol } = spaceVoters || {};
  const account = useSelector(loginAccountSelector);

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
              <TableHeader width="30%">Rank</TableHeader>
              <TableHeader width="40%">Address</TableHeader>
              <TableHeader width="30%">Voting Power</TableHeader>
            </TableRow>
          </TableHead>
          <tbody>
            {filteredRichestVoters?.map((voter, index) => (
              <TableRow key={voter._id}>
                <RankCell width="30%">{"rank" + " " + voter.rank}</RankCell>
                <TableCell width="40%">
                  <AddressWrapper>
                    <Avatar address={voter?._id?.voter} size={24} />
                    <IdentityOrAddr
                      network={account?.network}
                      address={voter?._id?.voter}
                    />
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
              <TableHeader width="30%">Rank</TableHeader>
              <TableHeader width="40%">Address</TableHeader>
              <TableHeader width="30%">Votes</TableHeader>
            </TableRow>
          </TableHead>
          <tbody>
            {filteredActiveVoters?.map((voter, index) => (
              <TableRow key={voter._id}>
                <RankCell width="30%">{"rank" + " " + voter.rank}</RankCell>
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
      </PanelWrapper>
    </Wrapper>
  );
};

export default Content;
