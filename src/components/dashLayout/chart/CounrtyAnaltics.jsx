import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import Select from 'react-select';

function CountryAnalytics({ barChartData: reviewData }) {
  const { countryData } = useSelector((state) => state.siteSetting);
  const [selectedCountry, setSelectedCountry] = useState({ value: 'USA', label: 'USA' });

  // Dummy country data with 25 countries for all months
  const dummyCountryData = [];
  const countries = [
    'USA', 'India', 'Germany', 'France', 'UK', 'Canada', 'Australia', 'Japan', 'China', 'Brazil',
    'Russia', 'South Africa', 'Mexico', 'Italy', 'Spain', 'Netherlands', 'Sweden', 'Switzerland',
    'Argentina', 'South Korea', 'Turkey', 'Indonesia', 'Saudi Arabia', 'Thailand', 'Vietnam'
  ];

  for (let i = 1; i <= 12; i++) {
    countries.forEach((country) => {
      dummyCountryData.push({ country, month: i, count: Math.floor(Math.random() * 500) + 50 });
    });
  }

  // Initialize months
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  // Filter data based on selected country
  const filteredData = dummyCountryData.filter((item) => item.country === selectedCountry.value);

  // Map filteredData to visits array
  const visits = Array(12).fill(0);
  filteredData.forEach((item) => {
    const monthIndex = item.month - 1;
    visits[monthIndex] += item.count;
  });

  // Get total visits for the current month
  const currentMonthIndex = new Date().getMonth();
  const currentMonthVisits = visits[currentMonthIndex];

  // Bar chart data
  const barChartData = {
    labels: months,
    datasets: [
      {
        label: `GUEST Coming from ${selectedCountry.label} this month`,
        data: visits,
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
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

  return (
    <>
      <Select
        options={countries.map((country) => ({ value: country, label: country }))}
        onChange={(selectedOption) => setSelectedCountry(selectedOption)}
        value={selectedCountry}
        placeholder="Select Country"
      />
      <Bar data={barChartData} options={barChartOptions} />
    </>
  );
}

export default CountryAnalytics;
