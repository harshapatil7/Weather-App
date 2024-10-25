const mongoose = require('mongoose');

const WeatherSummarySchema = new mongoose.Schema({
    city: { type: String, required: true },
    date: { type: Date, required: true },
    temp: { type: Number },
    averageTemp: { type: Number },
    maxTemp: { type: Number },
    minTemp: { type: Number },
    dominantCondition: { type: String },
    feelsLike: { type: Number },  
    windSpeed: { type: Number }, 
    humidity: { type: Number } 
});

// Function to get a city-specific model
const getCityWeatherModel = (city) => {
    return mongoose.model(`${city}_WeatherSummary`, WeatherSummarySchema, `${city}_WeatherSummary`);
};

module.exports = { WeatherSummarySchema, getCityWeatherModel };
