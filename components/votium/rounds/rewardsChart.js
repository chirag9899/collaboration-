import React from "react";
import styled from "styled-components";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ChartTitle,
  Tooltip,
  Legend,
);

const Wrapper = styled.div`
  margin: 20px;
  gap: 20px;
  background-color: var(--background-1);
  padding: 20px;
`;

const Title = styled.h1`
  margin-left: 10px;
  text-align: start;
`;

// Fake volume data for the chart
const data = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      label: "Volume",
      data: [1200, 1900, 3000, 5000, 2300, 4200], // Fake volume data
      backgroundColor: "rgba(75, 192, 192, 0.6)",
      borderColor: "rgba(75, 192, 192, 1)",
      borderWidth: 1,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Volume Over Time",
    },
  },
};

const RewardsChart = () => {
  return (
    <Wrapper>
      <Title>Rewards</Title>
      <Bar data={data} options={options} />
    </Wrapper>
  );
};

export default RewardsChart;
