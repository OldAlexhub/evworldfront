import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const GraphThree = () => {
  const [chartData, setChartData] = useState({
    datasets: [],
  });
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.REACT_APP_SHOW_HEALTH}/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200 && response.data.show.length) {
          const processedData = processChartData(response.data.show);
          setChartData({
            labels: processedData.labels,
            datasets: [
              {
                label: "Average Lost Miles",
                data: processedData.data,
                fill: false,
                borderColor: "rgb(255, 205, 86)", // Bright color for visibility
                backgroundColor: "rgba(255, 205, 86, 0.5)",
                tension: 0.1,
                borderWidth: 2,
                pointBackgroundColor: "rgb(255, 205, 86)",
                pointBorderColor: "#fff",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "rgb(255, 205, 86)",
              },
            ],
          });

          setChartOptions({
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                labels: {
                  color: "white", // Ensures legend is visible against dark background
                },
              },
              title: {
                display: true,
                text: "Average Lost Miles Over Time",
                color: "white", // Ensures title is visible
              },
            },
            scales: {
              x: {
                ticks: {
                  color: "white", // Ensures x-axis labels are visible
                },
                grid: {
                  color: "rgba(255, 255, 255, 0.1)", // Light grid lines against the dark background
                },
              },
              y: {
                beginAtZero: true,
                ticks: {
                  color: "white", // Ensures y-axis labels are visible
                },
                grid: {
                  color: "rgba(255, 255, 255, 0.1)", // Light grid lines against the dark background
                },
              },
            },
          });
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
        width: "100%",
        textShadow: "2px 2px 4px #000000",
      }}
    >
      <div
        style={{
          width: "90%", // Adjust width as needed
          height: "90%", // Adjust height as needed
        }}
      >
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

function processChartData(data) {
  const groupedByDate = {};

  data.forEach((item) => {
    const dateStr = new Date(item.date).toLocaleDateString();
    if (!groupedByDate[dateStr]) {
      groupedByDate[dateStr] = [];
    }
    groupedByDate[dateStr].push(item.lost_miles);
  });

  const labels = [];
  const averagedData = [];

  Object.keys(groupedByDate).forEach((date) => {
    labels.push(date);
    const average =
      groupedByDate[date].reduce((acc, cur) => acc + cur, 0) /
      groupedByDate[date].length;
    averagedData.push(average);
  });

  return { labels, data: averagedData };
}

export default GraphThree;
