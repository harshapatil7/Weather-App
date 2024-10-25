const express = require('express');
const connectDB = require('./config/db');
const weatherRoutes = require('./routes/weather');
const weatherService = require('./utils/weatherService');
const cron = require('node-cron');
require('dotenv').config();

const app = express();

connectDB();

app.use(express.json());
app.use('/api/weather', weatherRoutes);

// Run the data fetch and save function on server start
(async () => {
    console.log('Fetching and saving weather data on server start...');
    await weatherService.fetchAndSaveWeatherData();
})();

// Schedule the job to run every 5 minute
cron.schedule('*/5 * * * *', weatherService.fetchAndSaveWeatherData);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
