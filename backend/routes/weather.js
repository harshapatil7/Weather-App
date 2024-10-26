const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const { getCityWeatherModel } = require('../models/weatherSummary');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

router.post('/generateInsights', async (req, res) => {
    const { historicalData } = req.body;

    const tempTrend = historicalData.map(data => data.temp).join(', ');
    const humidityTrend = historicalData.map(data => data.humidity).join(', ');
    const conditionTrend = historicalData.map(data => data.dominantCondition).join(', ');

    const prompt = `
        Based on these temperature trends (${tempTrend}), humidity levels (${humidityTrend}), 
        and dominant weather conditions (${conditionTrend}), provide a reasoned explanation 
        for the current weather pattern observed.
    `;

    try {
        const result = await model.generateContent(prompt);
        const insight = result.response.text();
        console.log(result.response.text());
        res.status(200).json({ insight });
    } catch (error) {
        console.error('Error generating insights:', error);
        res.status(500).json({ message: 'Failed to generate insights' });
    }
});

router.get('/city/:city', async (req, res) => {
    const { city } = req.params;
    try {
        const CityWeatherModel = getCityWeatherModel(city); // Get model for the specific city
        // console.log(CityWeatherModel)
        console.log("got the weather model",city)
        const summaries = await CityWeatherModel.find({}).sort({ date: -1 }).limit(1); // Get latest summary
        if (summaries.length === 0) {
            return res.status(404).json({ message: 'No weather data available for this city.' });
        }
        // console.log(summaries)
        res.status(200).json(summaries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Route to send email alerts
router.post('/sendAlertEmail', async (req, res) => {
    const { email, alertMessage, city, summary } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER, 
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: `Weather Alert for ${city}`,
        text: `${alertMessage}\n\nDetails:\nTemperature: ${summary.temp}°C\nFeels Like: ${summary.feels_like}°C\nCondition: ${summary.dominantCondition}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Alert email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Failed to send email' });
    }
});

// Route to get historical weather data for the last day
router.get('/historical/:city', async (req, res) => {
    const { city } = req.params;
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000); // 24 hours ago

    try {
        const CityWeatherModel = getCityWeatherModel(city);
        const summaries = await CityWeatherModel.find({ date: { $gte: oneDayAgo } }).sort({ date: 1 }); // Sort by date
        if (summaries.length === 0) {
            return res.status(404).json({ message: 'No historical data available for this city.' });
        }
        res.status(200).json(summaries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
