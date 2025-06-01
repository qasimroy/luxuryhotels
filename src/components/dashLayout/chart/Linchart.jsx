import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from 'chart.js';

// Register required Chart.js components
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

const LineChart = ({ lineChartData: visitData }) => {
  // Define the months (x-axis labels)
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  // Map visitData to the visits array (y-axis values)
  const visits = Array(12).fill(0); // Initialize with 0 for each month
  visitData.forEach((item) => {
    const monthIndex = item._id.month - 1; // Convert 1-based month to 0-based index
    visits[monthIndex] = item.count;
  });

  console.log(visits, 'Mapped visits');

  // Line chart data
  const lineChartData = {
    labels: months, // X-axis labels
    datasets: [
      {
        label: 'Website Visits',
        data: visits, // Y-axis data
        borderColor: '#9e7922',
        backgroundColor: '#9e7922',
        borderWidth: 2,
        pointRadius: 4,
        pointBackgroundColor: '#9e7922',
        hoverRadius: 6,
      },
    ],
  };

  // Line chart options
  const lineChartOptions = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const value = tooltipItem.raw;
            return `Website visits: ${value}`;
          },
        },
      },
      legend: {
        display: true,
        position: 'top',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Months',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Number of Visits',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <Line data={lineChartData} options={lineChartOptions} />
    </div>
  );
};

export default LineChart;
