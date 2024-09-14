// AttendancePieChart.js
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const AttendancePieChart = () => {
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
      .get('http://127.0.0.1:8000/api/attendance-summary/') // Update the endpoint based on your backend
      .then((response) => {
        const { present, absent, late } = response.data || { present: 0, absent: 0, late: 0 };
        setChartData({
          labels: ['Present', 'Absent', 'Late'],
          datasets: [
            {
              data: [present, absent, late],
              backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
              hoverBackgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
            },
          ],
        });
      })
      .catch((error) => {
        console.error('Error fetching attendance data:', error);
      });
  }, []);

  return (
    <div>
      <h2>Attendance Summary</h2>
      <Pie data={chartData} />
    </div>
  );
};

export default AttendancePieChart;