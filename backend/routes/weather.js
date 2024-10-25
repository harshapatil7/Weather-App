const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const { getCityWeatherModel } = require('../models/weatherSummary');

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

module.exports = router;
