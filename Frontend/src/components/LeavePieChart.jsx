// LeavePieChart.js
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const LeavePieChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
        hoverBackgroundColor: [],
      },
    ],
  });

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/leave-summary/') // Update the endpoint based on your backend
      .then((response) => {
        const { pending, approved, rejected } = response.data || { pending: 0, approved: 0, rejected: 0 };
        setChartData({
          labels: ['Pending', 'Approved', 'Rejected'],
          datasets: [
            {
              data: [pending, approved, rejected],
              backgroundColor: ['#FFCE56', '#4BC0C0', '#FF6384'],
              hoverBackgroundColor: ['#FFCE56', '#4BC0C0', '#FF6384'],
            },
          ],
        });
      })
      .catch((error) => {
        console.error('Error fetching leave data:', error);
      });
  }, []);

  return (
    <div>
      <h2>Leave Request Summary</h2>
      <Pie data={chartData} />
    </div>
  );
};

export default LeavePieChart;