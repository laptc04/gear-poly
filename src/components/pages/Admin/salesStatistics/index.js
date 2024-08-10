import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SalesStatisticsChart from './SalesStatisticsChart'; // Import the new chart component

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

    return (
        <div>
            <h2>Sales Statistics</h2>
            <p>Total Products: {statistics.totalProducts}</p>
            <p>Total Quantity Sold: {statistics.totalQuantitySold}</p>
            <p>Total Revenue: ${statistics.totalRevenue}</p>
            <SalesStatisticsChart data={statistics} />
        </div>
    );
};

export default SalesStatistics;
