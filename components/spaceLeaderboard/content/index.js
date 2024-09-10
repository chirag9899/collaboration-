import React from "react";
import {
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

const Content = ({ space, proposals }) => {
  console.log(proposals, "proposals");

  return (
    <Wrapper>
      <PanelWrapper>
        <LeaderboardTable>
          <TableHead>
            <TableRow>
              <TableHeader>Proposal</TableHeader>
              <TableHeader>Address</TableHeader>
              <TableHeader>Votes</TableHeader>
            </TableRow>
          </TableHead>
          <tbody>
            {proposals?.items?.map((proposal, index) => (
              <TableRow key={proposal._id}>
                <RankCell>{proposal.title}</RankCell>
                <TableCell>
                <Address>{proposal?.address}</Address>
                </TableCell>
                <TableCell>{150}</TableCell>
              </TableRow>
            ))}
          </tbody>
        </LeaderboardTable>
      </PanelWrapper>
    </Wrapper>
  );
};

export default Content;
