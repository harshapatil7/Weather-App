// HumidityChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Register the scales
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const HumidityChart = ({ historicalData }) => {
    const labels = historicalData.map(dataPoint => {
        const date = new Date(dataPoint.date);
        return date.toLocaleTimeString();
    });

    const data = historicalData.map(dataPoint => dataPoint.humidity);

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Humidity (%)',
                data: data,
                backgroundColor: 'rgba(255, 206, 86, 0.2)',
                borderColor: 'rgba(255, 206, 86, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Time',
                },
                ticks: {
                    autoSkip: true,
                    maxTicksLimit: 20,
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Humidity (%)',
                },
                beginAtZero: true,
            },
        },
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <div style={{ position: 'relative', height: '40vh', width: '80vw' }}>
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default HumidityChart;
