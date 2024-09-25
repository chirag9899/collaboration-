import React from "react";
import styled from "styled-components";
import { Wrapper } from "./styled";
import { white_text_color } from "../styles/colors";

const InnerWrapper = styled.div`
  max-width: 6xl;
  margin: 0 auto;
`;

const Title = styled.h1`
  margin: 1rem 0;
  text-align: start;
  font-size: 2.25rem;
`;

const TableContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  overflow-x: auto;
`;

const TableWrapper = styled.div`
  min-width: 100%;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  text-align: center;
  align-items: middle;
  @media (min-width: 640px) {
    min-width: 500px;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
`;

const TableHeader = styled.th`
  padding: 0.875rem;
  text-align: left;
  font-weight: 300;
  color: ${white_text_color};
  background-color: var(--background-1);
  cursor: pointer;
  &.dark {
    background-color: #1e293b;
    color: white;
  }
`;

const TableCell = styled.td`
  padding: 1rem;
  text-align: left;
  color: ${white_text_color};
  &.dark {
    color: white;
    background-color: #1e293b;
  }
`;

const Row = styled.tr``;

export default function TokenSection() {
  return (
    <Wrapper>
      <InnerWrapper>
        <Title>Token Wars</Title>
        <TableContainer>
          <TableWrapper>
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <Table>
                <thead>
                  <tr>
                    <TableHeader>
                      <div className="flex flex-row justify-begin">
                        <p>Name</p>
                      </div>
                    </TableHeader>
                    <TableHeader>
                      <div className="flex flex-row justify-end">
                        <p>Locked</p>
                      </div>
                    </TableHeader>
                    <TableHeader>
                      <div className="flex flex-row justify-end items-center">
                        <p># protocols</p>
                      </div>
                    </TableHeader>
                    <TableHeader>
                      <div className="flex flex-row justify-end items-center">
                        <p>#1 holder</p>
                      </div>
                    </TableHeader>
                    <TableHeader>
                      <div className="flex flex-row justify-end items-center">
                        <p># of holders to reach 50%</p>
                      </div>
                    </TableHeader>
                  </tr>
                </thead>
                <tbody>
                  <Row className="hoverable">
                    <TableCell>
                      <a href="/wars/aerodrome">
                        <div className="flex flex-row">
                          <p className="ml-2">Aerodrome Wars</p>
                        </div>
                      </a>
                    </TableCell>
                    <TableCell>
                      <a href="/wars/aerodrome">
                        <p className="text-right">$584,482,445.41</p>
                      </a>
                    </TableCell>
                    <TableCell>
                      <a href="/wars/aerodrome">
                        <p className="text-right">8</p>
                      </a>
                    </TableCell>
                    <TableCell>
                      <a href="/wars/aerodrome">
                        <div className="flex flex-row">
                          <p className="text-right px-3">20.27%</p>
                        </div>
                      </a>
                    </TableCell>
                    <TableCell>
                      <a href="/wars/aerodrome">
                        <p className="text-right">4</p>
                      </a>
                    </TableCell>
                  </Row>
                </tbody>
              </Table>
            </div>
          </TableWrapper>
        </TableContainer>
      </InnerWrapper>
    </Wrapper>
  );
}
