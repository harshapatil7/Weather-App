const axios = require('axios');
const WeatherSummary = require('../models/weatherSummary');
const { getCityWeatherModel } = require('../models/weatherSummary');

const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];

const fetchWeatherData = async (city) => {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHER_API_KEY}`);
    const tempC = response.data.main.temp - 273.15; // Convert Kelvin to Celsius
    const feelsLikeC = response.data.main.feels_like - 273.15; // Convert feels like temperature to Celsius

    return {
        main: response.data.weather[0].main,
        temp: tempC,
        feels_like: feelsLikeC,
        dt: response.data.dt,
        windSpeed: response.data.wind.speed, 
        humidity: response.data.main.humidity, 
        minTemp: response.data.main.temp_min - 273.15, 
        maxTemp: response.data.main.temp_max - 273.15  
    };
};

// Function to fetch and save weather data for each city
const fetchAndSaveWeatherData = async () => {
    const saveWeatherPromises = cities.map(async (city) => {
        try {
            const data = await fetchWeatherData(city);
            const dailySummary = {
                city: city,
                date: new Date(),
                temp: data.temp,
                averageTemp: (data.maxTemp + data.minTemp) / 2,
                maxTemp: data.maxTemp,
                minTemp: data.minTemp,
                dominantCondition: data.main,
                feelsLike: data.feels_like,
                windSpeed: data.windSpeed,
                humidity: data.humidity
            };

            const CityWeatherModel = getCityWeatherModel(city);
            await CityWeatherModel.create(dailySummary);
            console.log(`Data saved for ${city}`);
        } catch (error) {
            console.error(`Error saving data for ${city}:`, error);
        }
    });

    return Promise.all(saveWeatherPromises); // Ensure all cities’ data are saved before continuing
};

module.exports = { fetchWeatherData, fetchAndSaveWeatherData };
