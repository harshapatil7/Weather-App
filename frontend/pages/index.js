// frontend/pages/index.js
import { useState, useEffect } from 'react';
import WeatherForm from '../components/WeatherForm';
import WeatherSummary from '../components/WeatherSummary';
import Alerts from '../components/Alerts';
import TemperatureChart from '../components/TemperatureChart';
import WindChart from '../components/WindChart';
import HumidityChart from '../components/HumidityChart';
import FeelsLikeChart from '../components/FeelsLikeChart';

const HomePage = () => {
    const [summary, setSummary] = useState({});
    const [alertMessages, setAlertMessages] = useState([]);
    const [historicalData, setHistoricalData] = useState([]);
    const [selectedCity, setSelectedCity] = useState(''); 
    const [aiInsight, setAIInsight] = useState(''); // State to hold AI insights


    const fetchAIInsights = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/weather/generateInsights', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ historicalData }), // Send historical data
            });
    
            if (!response.ok) {
                throw new Error('Failed to fetch AI insights');
            }
    
            const data = await response.json();
            setAIInsight(data.insight);
            // alert(`Gemini AI Insight: ${data.insight}`);
        } catch (error) {
            console.error('Error fetching AI insights:', error);
        }
    };
    

    const fetchHistoricalData = async (city) => {
        try {
            const response = await fetch(`http://localhost:5000/api/weather/historical/${city}`);
            if (!response.ok) {
                throw new Error('Failed to fetch historical data');
            }
            const historicalData = await response.json();
            // console.log(historicalData);// Debug
            setHistoricalData(historicalData); 
        } catch (error) {
            console.error('Error fetching historical data:', error);
        }
    };

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
                    setAlertMessages([]);
                }
            } else {
                setAlertMessages(['No weather data available for this city.']);
            }
        } catch (error) {
            console.error('Error fetching weather data:', error);
            setAlertMessages(['Error fetching weather data']);
        }
    };

    // Polling function to fetch updated data
    const pollData = () => {
        if (selectedCity) {
            fetchWeatherData(selectedCity); 
            fetchHistoricalData(selectedCity); 
            console.log("pooling succes") 
        }
    };

    // Load historical data whenever the selected city changes
    useEffect(() => {
        const loadHistoricalData = async () => {
            if (selectedCity) {
                await fetchHistoricalData(selectedCity);
            }
        };

        loadHistoricalData();
    }, [selectedCity]); // Add selectedCity as a dependency

    useEffect(() => {
        const intervalId = setInterval(pollData, 600000); // Poll every 10 min

        // Clean up the interval on component unmount
        return () => clearInterval(intervalId);
    }, [selectedCity]); 

    return (
        <div>
            <h1>Weather Monitoring System</h1>
            <WeatherForm 
                onFetchWeather={fetchWeatherData} 
                onCitySelect={setSelectedCity}
            />
            <WeatherSummary summary={summary} />
            <Alerts alertMessages={alertMessages} /> 
            <TemperatureChart historicalData={historicalData} />
            <WindChart historicalData={historicalData} />
            <HumidityChart historicalData={historicalData} />
            <FeelsLikeChart historicalData={historicalData} />
            {/* Button to get AI insights
            <button onClick={fetchAIInsights}>Get Gemini AI Insights</button>

            Display AI insights if available
            {aiInsight && (
                <div>
                    <h2>AI Insights</h2>
                    <p>{aiInsight}</p> Render the AI insight here
                </div>
            )} */}

        </div>
    );
};

export default HomePage;
