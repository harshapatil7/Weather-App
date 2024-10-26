import { useState } from 'react';

const WeatherSummary = ({ summary }) => {
    const [isCelsius, setIsCelsius] = useState(true); 

    // Convert temperature from Celsius to Kelvin and vice versa
    const convertTemperature = (temp) => {
        if (temp === undefined) return 'N/A'; // Handle undefined temp
        return isCelsius ? temp.toFixed(1) : (temp + 273.15).toFixed(2); // Keep Celsius to 1 decimal, Kelvin to 2 decimals
    };

    // Handler to toggle temperature unit
    const handleConvert = () => {
        setIsCelsius(!isCelsius); // Toggle the temperature unit
    };

    return (
        <div>
            <h3>Daily Summary</h3>
            <button onClick={handleConvert}>
                Convert to °{isCelsius ? 'K' : 'C'}
            </button>
            
            <p>Selected City: {summary.city}</p>
            <p>Current Temp: {convertTemperature(summary.temp)}°{isCelsius ? 'C' : 'K'}</p>
            <p>Average Temp: {convertTemperature(summary.averageTemp)}°{isCelsius ? 'C' : 'K'}</p>
            <p>Max Temp: {convertTemperature(summary.maxTemp)}°{isCelsius ? 'C' : 'K'}</p>
            <p>Min Temp: {convertTemperature(summary.minTemp)}°{isCelsius ? 'C' : 'K'}</p>
            <p>Feels Like: {convertTemperature(summary.feelsLike)}°{isCelsius ? 'C' : 'K'}</p>  
            <p>Wind Speed: {summary.windSpeed} m/s</p> 
            <p>Humidity: {summary.humidity}%</p>         
            <p>Dominant Condition: {summary.dominantCondition}</p>
        </div>
    );
};

export default WeatherSummary;
