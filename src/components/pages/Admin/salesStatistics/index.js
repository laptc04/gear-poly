import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SalesStatisticsChart from './SalesStatisticsChart'; // Import the new chart component
import './SalesStatistics.css';

const SalesStatistics = () => {
    const [statistics, setStatistics] = useState([]);

    useEffect(() => {
        fetchSalesStatistics();
    }, []);

    const fetchSalesStatistics = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/sales/statistics');
            setStatistics(response.data);
        } catch (error) {
            console.error('Error fetching sales statistics:', error);
        }
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
    };

    return (
        <div className="sales-statistics-container">
            <aside className="statistics-info">
                <h2><strong>Bản thống kê</strong></h2>
                <p><strong>Tổng sản phẩm:</strong> {statistics.totalProducts}</p>
                <p><strong>Tổng số lượng bán được:</strong> {statistics.totalQuantitySold}</p>
                <p><strong>Tổng doanh thu:</strong> {formatCurrency(statistics.totalRevenue)}</p>
            </aside>
            <article className="statistics-chart">
                <SalesStatisticsChart data={statistics} />
            </article>
        </div>
    );
};

export default SalesStatistics;
