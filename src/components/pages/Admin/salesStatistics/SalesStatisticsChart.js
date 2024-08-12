import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const SalesStatisticsChart = ({ data }) => {
    const chartData = {
        labels: [''],
        datasets: [
            {
                label: 'Doanh thu hôm nay',
                data: [data.revenueToday],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
            {
                label: 'Doanh thu tháng trước',
                data: [data.revenueLastMonth],
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
            },
            {
                label: 'Doanh thu năm trước',
                data: [data.revenueLastYear],
                backgroundColor: 'rgba(255, 159, 64, 0.2)',
                borderColor: 'rgba(255, 159, 64, 1)',
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
                        const value = context.raw;
                        const formattedValue = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
                        return `${context.dataset.label}: ${formattedValue}`;
                    },
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Thống kê (VNĐ)',
                },
                ticks: {
                    callback: function(value) {
                        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
                    },
                },
            },
        },
    };

    return (
        <div>
            {/* <h3>Bảng thống kê - cột</h3> */}
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default SalesStatisticsChart;
