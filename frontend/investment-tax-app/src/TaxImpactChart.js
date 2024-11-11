// TaxImpactChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register the necessary components with Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const TaxImpactChart = ({ investmentHistory }) => {
  // Prepare data for the chart
  const labels = investmentHistory.map((investment, index) => `Investment ${index + 1}`);
  const data = investmentHistory.map((investment) => investment.taxImpact);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Tax Impact ($)',
        data: data,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };


  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Prevent chart from stretching
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="chart-container" style={{ width: '80%', height: '300px', marginTop: '30px' }}>
      <h3>Tax Impact Over Time</h3>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default TaxImpactChart;
