// WeatherChart.js
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

const WeatherChart = ({ historicalData }) => {
    // Extract labels (time) and data (temperature)
    const labels = historicalData.map((dataPoint) => {
        const date = new Date(dataPoint.date); // Create a Date object
        return date.toLocaleTimeString(); // Format the time as needed
    });
    
    const data = historicalData.map((dataPoint) => dataPoint.temp); 

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Temperature (°C)',
                data: data,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
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
                    maxTicksLimit: 20, // Adjust to limit the number of x-axis ticks
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Temperature (°C)',
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

export default WeatherChart;
