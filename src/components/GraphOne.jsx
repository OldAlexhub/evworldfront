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

const GraphOne = () => {
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
          const groupedData = groupAndAverageData(response.data.show);

          const labels = Object.keys(groupedData);
          const fullRangeData = labels.map(
            (date) => groupedData[date].avgFullRange
          );
          const currentRangeData = labels.map(
            (date) => groupedData[date].avgCurrentRange
          );

          setChartData({
            labels,
            datasets: [
              {
                label: "Full Range",
                data: fullRangeData,
                borderColor: "#ff6384",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
                textShadow: "2px 2px 4px #000000",
              },
              {
                label: "Current Range",
                data: currentRangeData,
                borderColor: "#36a2eb",
                backgroundColor: "rgba(54, 162, 235, 0.5)",
                textShadow: "2px 2px 4px #000000",
              },
            ],
          });

          setChartOptions({
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: "top",
                labels: {
                  color: "white",
                  textShadow: "2px 2px 4px #000000",
                },
              },
              title: {
                display: true,
                text: "EV Battery Health Over Time",
                color: "white",
                textShadow: "2px 2px 4px #000000",
              },
            },
            scales: {
              x: {
                ticks: {
                  color: "white",
                  textShadow: "2px 2px 4px #000000",
                },
                grid: {
                  color: "rgba(255, 255, 255, 0.1)",
                },
              },
              y: {
                ticks: {
                  color: "white",
                },
                grid: {
                  color: "rgba(255, 255, 255, 0.1)",
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
        height: "calc(80vh - 100px)", // Adjust 100px if your footer's height is different
        width: "100%",
        textShadow: "2px 2px 4px #000000",
      }}
    >
      <div
        style={{
          width: "90%", // Adjust this value to make the chart smaller or larger
          height: "90%", // Adjust this value to control the chart's height
        }}
      >
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

// Helper function to group and average the data
function groupAndAverageData(data) {
  const grouped = {};

  data.forEach((item) => {
    const date = new Date(item.date).toLocaleDateString();
    if (grouped[date]) {
      grouped[date].count += 1;
      grouped[date].totalFullRange += item.full_range;
      grouped[date].totalCurrentRange += item.current_range;
    } else {
      grouped[date] = {
        count: 1,
        totalFullRange: item.full_range,
        totalCurrentRange: item.current_range,
      };
    }
  });

  // Calculate the averages
  Object.keys(grouped).forEach((date) => {
    grouped[date].avgFullRange =
      grouped[date].totalFullRange / grouped[date].count;
    grouped[date].avgCurrentRange =
      grouped[date].totalCurrentRange / grouped[date].count;
  });

  return grouped;
}

export default GraphOne;
