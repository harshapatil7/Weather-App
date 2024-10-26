// WindChart.js
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

const WindChart = ({ historicalData }) => {
    const labels = historicalData.map(dataPoint => {
        const date = new Date(dataPoint.date);
        return date.toLocaleTimeString();
    });

    const data = historicalData.map(dataPoint => dataPoint.windSpeed);

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Wind Speed (m/s)',
                data: data,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
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
                    text: 'Wind Speed (m/s)',
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

export default WindChart;
