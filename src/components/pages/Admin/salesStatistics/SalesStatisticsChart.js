import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const SalesStatisticsChart = ({ data }) => {
    const chartData = {
        labels: ['Today', 'Last Month', 'Last Year'],
        datasets: [
            {
                label: 'Revenue',
                data: [data.revenueToday, data.revenueLastMonth, data.revenueLastYear],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return `$${context.raw.toFixed(2)}`;
                    },
                },
            },
        },
    };

    return (
        <div>
            <h3>Revenue Statistics</h3>
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default SalesStatisticsChart;
