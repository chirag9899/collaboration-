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
      backgroundColor: [
        "#FF5733", // Bright red
        "#FFBD33", // Bright yellow-orange
        "#75FF33", // Bright green
        "#33FFBD", // Bright cyan
        "#335BFF", // Bright blue
        "#FF33A8", // Bright pink
      ],
      borderColor: [
        "#FF5733",
        "#FFBD33",
        "#75FF33",
        "#33FFBD",
        "#335BFF",
        "#FF33A8",
      ],
      borderWidth: 2,
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
