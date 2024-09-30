import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  margin: 20px;
  display: flex;
  gap: 20px;
`;

const Card = styled.div`
  background-color: var(--background-1);
  padding: 20px;
  width: 100%;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 0px;
`;

const CardTitle = styled.div`
  font-weight: bold;
  font-size: 15px;
`;

const Table = styled.div`
  width: 100%;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  padding: 10px 0;
  >div{
    width: 33%;
  }
`;

const ColumnHeader = styled.div`
  flex: 1;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  width: 33%;
`;

const AsyncValue = styled.div`
  display: flex;
  font-weight: bold;
`;

const DataRow = ({ pool, vlCVX, total }) => (
  <Row>
    <div>{pool}</div>
    <AsyncValue>${vlCVX}</AsyncValue>
    <AsyncValue>${total}</AsyncValue>
  </Row>
);

const TableCard = ({ title, data }) => (
  <Card>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <Table>
      <Row>
        <ColumnHeader>Deadline</ColumnHeader>
        <ColumnHeader>$/vlCVX</ColumnHeader>
        <ColumnHeader>Total</ColumnHeader>
      </Row>
      {data.map((item, index) => (
        <DataRow key={index} {...item} />
      ))}
    </Table>
  </Card>
);

const Additional = () => {
  const poolData = [
    { pool: "01/10/2024", vlCVX: "0.04393", total: "242.26k" },
    { pool: "01/10/2024", vlCVX: "0.04393", total: "242.26k" },
    { pool: "01/10/2024", vlCVX: "0.04393", total: "242.26k" },
  ];

  return (
    <Wrapper>
      <TableCard title="All Rounds" data={poolData} />
    </Wrapper>
  );
};

export default Additional;
