// src/components/EmployeeSalaryChart.js
import React, { useEffect, useRef, useState } from 'react';
import './Salarychart.css'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

// Register necessary components from Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const EmployeeSalaryChart = () => {
  const [chartData, setChartData] = useState({});
  const chartRef = useRef(null); // Reference to the chart instance

  useEffect(() => {
    fetchEmployeeSalaries();

    // Cleanup function to destroy the chart instance when component unmounts
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy(); // Destroy the existing chart instance
      }
    };
  }, []);

  const fetchEmployeeSalaries = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/employee/');
      if (response.data && Array.isArray(response.data)) {
        const employees = response.data;

        const names = employees.map(emp => emp.name || 'N/A');
        const salaries = employees.map(emp => parseFloat(emp.salary) || 0);

        setChartData({
          labels: names,
          datasets: [
            {
              label: 'Employee Salaries',
              data: salaries,
              backgroundColor: 'rgba(54, 162, 235, 0.6)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
            },
          ],
        });
      } else {
        console.error('Unexpected data format:', response.data);
      }
    } catch (error) {
      console.error('Error fetching employee data:', error);
    }
  };

  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Employee Name',
        },
        type: 'category',
      },
      y: {
        title: {
          display: true,
          text: 'Salary ($)',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h2 className="text-center">Employee Salary Chart</h2>
      {chartData.labels ? (
        <Bar
          data={chartData}
          options={chartOptions}
          ref={chartRef} // Attach the ref to the Bar component
        />
      ) : (
        <p>Loading chart data...</p>
      )}
    </div>
  );
};

export default EmployeeSalaryChart;