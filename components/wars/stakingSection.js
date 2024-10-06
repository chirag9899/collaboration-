import React from "react";
import styled from "styled-components";
import Panel from "../styled/panel";
import { white_text_color } from "../styles/colors";
import { Wrapper } from "./styled";

const ContentWrapper = styled.div`
  max-width: 768px;
  margin: 0 auto;
`;

const Title = styled.h1`
  margin: 16px 0;
  text-align: start;
  font-size: 2.5rem;
`;

const TableWrapper = styled.div`
  margin-top: 32px;
  display: flex;
  flex-direction: column;
`;

const TableContainer = styled.div`
  overflow-x: auto;
  padding: 16px;
`;

const Table = styled.table`
  min-width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
`;

const TableHeader = styled.thead`
  background-color: var(--background-1);
  align-items: center;
`;

const TableRow = styled.tr`
  /* background-color: var(--peach);
  &:hover {
    background-color: ${(props) =>
    props.hover ? "rgba(0,0,0,0.1)" : "initial"};
  } */
`;

const TableHeading = styled.th`
  padding: 12px 16px;
  text-align: left;
  font-weight: 300;
`;

const TableHeadingRight = styled(TableHeading)`
  text-align: right;
`;

const TooltipContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  > p {
    margin: 0;
  }
`;

const Icon = styled.svg`
  width: 18px;
  height: 18px;
  margin-left: 8px;
  color: ${white_text_color};
`;

const TableBody = styled.tbody`
  background-color: transparent;
`;

const TableCell = styled.td`
  padding: 16px;
  white-space: nowrap;
`;

const TableCellRight = styled(TableCell)`
  text-align: right;
`;

export default function StakingSection() {
  return (
    <Wrapper>
      <ContentWrapper>
        <Title>Liquid Staking Wars</Title>
        <TableWrapper>
          <TableContainer>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHeading>
                    <p>Name</p>
                  </TableHeading>
                  <TableHeadingRight>
                    <TooltipContainer>
                      <p>Staked USD value</p>
                      <Icon
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                        />
                      </Icon>
                    </TooltipContainer>
                  </TableHeadingRight>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow hover>
                  <TableCell>
                    <p>Polygon Staking Wars</p>
                  </TableCell>
                  <TableCellRight>
                    <p>$2,037,649.25</p>
                  </TableCellRight>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </TableWrapper>
      </ContentWrapper>
    </Wrapper>
  );
}
