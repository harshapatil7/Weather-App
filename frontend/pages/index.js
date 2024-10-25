import { useState } from 'react';
import WeatherForm from '../components/WeatherForm';
import WeatherSummary from '../components/WeatherSummary';
import Alerts from '../components/Alerts';

const HomePage = () => {
    const [summary, setSummary] = useState({});
    const [alertMessages, setAlertMessages] = useState([]); // Change to an array of messages

    const fetchWeatherData = async (city, threshold, weatherCondition, email) => {
        try {
            const response = await fetch(`http://localhost:5000/api/weather/city/${city}`);
            if (!response.ok) {
                throw new Error('Failed to fetch weather summary');
            }
    
            const data = await response.json();
            const latestSummary = data[0];
    
            if (latestSummary) {
                setSummary(latestSummary);
                const newAlertMessages = []; // Temp array to store alert messages for this fetch
    
                if (threshold || weatherCondition) {
                    // Check temperature threshold
                    if (threshold && latestSummary.temp > threshold) {
                        const tempAlert = `Alert: Temperature exceeded ${threshold}°C!`;
                        newAlertMessages.push(tempAlert);
                    }
    
                    // Check weather condition
                    if (weatherCondition && latestSummary.dominantCondition.toLowerCase() === weatherCondition.toLowerCase()) {
                        const conditionAlert = `Alert: Current weather condition is ${latestSummary.dominantCondition}!`;
                        newAlertMessages.push(conditionAlert);
                    }
    
                    setAlertMessages(newAlertMessages); // Update state with new messages
    
                    // Send emails for each alert if email is provided
                    if (newAlertMessages.length > 0 && email) {
                        await Promise.all(newAlertMessages.map(async (alertMessage) => {
                            await fetch('http://localhost:5000/api/weather/sendAlertEmail', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    email,
                                    alertMessage,
                                    city,
                                    summary: latestSummary,
                                }),
                            });
                        }));
                    } else if (newAlertMessages.length > 0) {
                        console.log('Alerts:', newAlertMessages.join(' ')); // Log if no email provided
                    }
    
                } else {
                    setAlertMessages([]); // Clear messages if no alert conditions are met
                }
            } else {
                setAlertMessages(['No weather data available for this city.']);
            }
        } catch (error) {
            console.error('Error fetching weather data:', error);
            setAlertMessages(['Error fetching weather data']);
        }
    };

    return (
        <div>
            <h1>Weather Monitoring System</h1>
            <WeatherForm onFetchWeather={fetchWeatherData} />
            <WeatherSummary summary={summary} />
            <Alerts alertMessages={alertMessages} /> {/* Pass array of messages */}
        </div>
    );
};

export default HomePage;
