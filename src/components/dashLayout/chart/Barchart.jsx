import React from 'react';
import { Bar } from 'react-chartjs-2';

function Barchart({ barChartData: reviewData }) {
  console.log("barChartData", reviewData);

  // Initialize months
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

  // Map reviewData to visits array
  const visits = Array(12).fill(0); // Initialize visits array with 0 for all months
  reviewData?.forEach((item) => {
    const monthIndex = item._id.month - 1; // Convert month (1-based) to array index (0-based)
    visits[monthIndex] = item.count;
  });

  // Bar chart data
  const barChartData = {
    labels: months, // X-axis labels
    datasets: [
      {
        label: 'Views',
        data: visits, // Y-axis data
        backgroundColor: 'rgba(75, 192, 192, 0.5)', // Bar color
      },
    ],
  };

  // Bar chart options
  const barChartOptions = {
    plugins: {
      legend: {
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
          text: 'Number of Views',
        },
        beginAtZero: true,
      },
    },
  };

  return <Bar data={barChartData} options={barChartOptions} />;
}

export default Barchart;
