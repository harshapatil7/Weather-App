#  Real-Time Data Processing System for Weather Monitoring

## Table of Contents

   1. [Overview](#Overview)
   2. [Features](#Features)
   3. [Technologies Used](#Technologies-Used)
   4. [Project Structure](#project-structure)
   5. [Data Storage](#data-storage)
   6. [API Design](#api-Design)
   7. [Setup Instructions](#setup-instructions)
   8. [Demo Video](#Demo-Video)
   9. [Visualizations](#Visualizations)
   10. [Contact](#for-queries-contact)

## Overview

The Real-Time Data Processing System for Weather Monitoring is a comprehensive web application designed to collect, process, and analyze real-time weather data for cities across India. The application leverages data from the OpenWeatherMap API to retrieve live weather updates, which are then processed, stored, and analyzed to provide valuable insights to users.

## Features

List the main features of the application, such as:

  * Real-time weather data retrieval from OpenWeatherMap API
  * Historical weather data analysis and insights
  * Dynamic rule-based alert system
  * Visualizations of weather parameters (temperature, humidity, wind speed, etc.)
  * AI-generated insights based on historical data

## Technologies Used

  * `Frontend`: Next.js, React, Chart.js
  * `Backend`: Node.js, Express
  * `Database`: MongoDB (MongoDB Atlas)
  * `APIs`: OpenWeatherMap API
  * `Others`: npm, Mongoose, dotenv

## Project Structure

The project directory is organized as follows:

```
/Weather-App
 ├── /backend
 │   ├── /config
 │   │   └── db.js                    # Connects to MongoDB
 │   ├── /models
 │   │   └── weatherSummary.js         # Defines the Mongoose schema for weather summaries
 │   ├── /node_modules                  # Node.js dependencies for backend
 │   ├── /routes
 │   │   └── weather.js                # Contains routes for weather-related API endpoints
 │   ├── /utils
 │   │   └── weatherService.js         # Functions for fetching weather data from the API
 │   ├── .env                           # Environment variables
 │   ├── package-lock.json              # Lockfile for backend dependencies
 │   ├── package.json                   # Node.js project metadata and dependencies
 │   └── server.js                      # Sets up the Express server and data fetching
 └── /frontend
 │   ├── /next
 │   ├── /components
 │   │   ├── Alerts.js                  # Component for displaying alerts
 │   │   ├── FeelsLikeChart.js          # Chart for feels-like temperatures
 │   │   ├── HumidityChart.js           # Chart for humidity levels
 │   │   ├── TemperatureChart.js        # Chart for temperature data
 │   │   ├── WeatherForm.js             # Form for user inputs
 │   │   ├── WeatherSummary.js          # Component for summarizing weather data
 │   │   └── WindChart.js               # Chart for wind speed data
 │   ├── /node_modules                   # Node.js dependencies for frontend
 │   ├── /pages
 │   │   └── index.js                   # Main entry page for the frontend
 │   ├── package-lock.json              # Lockfile for frontend dependencies
 │   └── package.json                   # Node.js project metadata and dependencies
 └── .gitignore                         # Files and directories to ignore in Git

```

Backend

  * `/backend`: Contains the backend application files for the weather monitoring system.

      * `/config/db.js`: Establishes the connection to the MongoDB database using Mongoose. This file handles error logging for failed connections and exports the connection function to be used throughout the application.

      * `/models/weatherSummary.js`: Defines the Mongoose schema for weather summaries, including fields for temperature, humidity, wind speed, and other relevant weather metrics. This model represents the data structure stored in the MongoDB collection.

      * `/node_modules`: Contains all Node.js dependencies required for the backend application, managed by npm.

      * `/routes/weather.js`: Defines the Express routes for weather-related API endpoints. It maps HTTP requests to the appropriate handler functions, facilitating data retrieval and interaction with the weather service.

      * `/utils/weatherService.js`: Contains functions for fetching weather data from the OpenWeatherMap API and processing it for storage in the MongoDB database. This file encapsulates the logic for handling external data requests and response processing.

      * `.env`: Stores environment variables such as the MongoDB URI and API keys. This file is essential for keeping sensitive information secure and should not be committed to version control.

      * `package-lock.json`: Automatically generated file that locks the dependencies for the backend, ensuring consistent installations across different environments.

      * `package.json`: Contains project metadata, including scripts for running the server and a list of dependencies required for the backend application, such as Express, Mongoose, and body-parser.

      * `server.js`: The entry point of the backend application. It initializes the Express server, sets up middleware for parsing requests, and defines the API endpoint for handling weather-related requests.

Frontend

  * `/frontend`: Contains the frontend application files built with Next.js.

      * `/next`: This directory holds the configuration and routing for the Next.js application.

      * `/components`: This directory includes reusable React components used throughout the application.

          * `Alerts.js`: Component for displaying weather alerts to the user. It dynamically shows alerts based on fetched weather data and user-defined thresholds.

          * `FeelsLikeChart.js`: Chart component that visualizes "feels like" temperature data over time, helping users understand how temperature feels compared to the actual temperature.

          * `HumidityChart.js`: Chart component for displaying humidity levels over time, providing insights into moisture levels in the atmosphere.

          * `TemperatureChart.js`: Chart component that visualizes temperature data, allowing users to track changes and trends in temperature over specified periods.

          * `WeatherForm.js`: Form component for user inputs, allowing users to specify city names and other parameters to fetch weather data.

          * `WeatherSummary.js`: Component for summarizing the current weather data for the selected city, displaying key metrics like temperature, humidity, and wind speed.

          * `WindChart.js`: Chart component that visualizes wind speed data over time, aiding users in understanding wind patterns.

        * `/node_modules`: Contains all Node.js dependencies required for the frontend application, managed by npm.

        * `/pages/index.js`: The main entry page of the application. It renders the overall UI, including the weather summary, input forms, and charts.

        * `package-lock.json`: Automatically generated file that locks the dependencies for the frontend, ensuring consistent installations across different environments.

        * `package.json`: Contains metadata for the frontend project, including dependencies like React and Next.js, as well as scripts for development and production builds.

Other Files

  * `README.md`: A comprehensive documentation file for the project. It includes an overview of the application, setup instructions, usage guidelines, and additional notes for development.

  * `.gitignore`: Specifies files and directories that should be ignored by Git, such as node_modules and .env files, to keep the repository clean and secure.

## Data Storage

### Database Choice

   * Database: MongoDB (using Mongoose for object data modeling)

### MongoDB Schema

```
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
```

## API Design

### Endpoints

  * **GET** `/api/weather/city/:city`: Fetch current weather summary for a city.
  * **GET** `/api/weather/historical/:city`: Retrieve historical weather data for a city.
  * **POST** `/api/weather/sendAlertEmail`: Send alert emails based on defined thresholds.

## Setup Instructions

### Prerequisites

  * Node.js (v14 or later)
  * MongoDB (local or Atlas account)

### Clone repository

* Go to the file location you want to clone the application
  
```
git clone https://github.com/harshapatil7/Weather-App.git
cd Weather-App
```

### Backend Setup

1. Navigate to the `backend` directory:
```
cd backend
```
3. Install dependencies:
```
npm install
```
3. Create a `.env` file in the `backend` directory with the following content:
```
PORT=5000
MONGO_URI=mongodb://<username>:<password>@<host>:<port>/<database>
OPENWEATHER_API_KEY=YOUR_OPENWEATHER_API_KEY
EMAIL_USER=test@mail.com
EMAIL_PASS=*******
```
4. To run the backend:
```
npm run dev
```

### Frontend Setup

1. Navigate to the `frontend` directory:
```
cd frontend
```
3. Install dependencies:
```
npm install
```
4. To run the Frontend:
```
npm run dev
```
5. Now open the `web browser`
```
http://localhost:3000/
```

## Demo Video

https://github.com/user-attachments/assets/b591b517-c09c-440c-99f1-315ebb70e94a

## Visualizations

Describe the various visualizations present in the frontend, such as:

1. Temperature Chart

    * Description: This chart provides a graphical representation of the temperature over a selected period, allowing users to observe trends and fluctuations.
    * Purpose: It helps users understand daily or hourly temperature patterns, making it easier to anticipate highs, lows, and any sudden changes.
    * Usage: Particularly useful for analyzing seasonal patterns, extreme weather events, or daily temperature peaks and dips.

2. Wind Speed Chart

    * Description: This chart visualizes wind speed data over time, typically measured in meters per second or kilometers per hour.
    * Purpose: It enables users to track how wind speed varies, which is helpful for assessing windy conditions that might affect outdoor activities, travel plans, or even certain infrastructure operations.
    * Usage: Useful for those who need to understand weather patterns affecting air quality, flights, construction, and outdoor events.

3. Humidity Chart

    * Description: The humidity chart shows changes in atmospheric moisture levels, displayed as a percentage over time.
    * Purpose: This chart is valuable for assessing comfort levels and predicting precipitation. Higher humidity generally means more moisture in the air, which can lead to discomfort in hot weather or signal rain.
    * Usage: This is particularly helpful for individuals interested in weather-sensitive industries like agriculture, where moisture levels directly impact soil and crop conditions.

4. Feels Like Temperature Chart

    * Description: The “Feels Like” temperature chart provides data on the perceived temperature, which considers factors such as humidity and wind speed.
    * Purpose: It reflects how the temperature actually feels to the human body, rather than the measured air temperature. This is essential for user comfort, as certain weather conditions can make temperatures feel hotter or colder than they are.
    * Usage: Useful for day-to-day decisions like what to wear, as well as for planning outdoor activities that may be impacted by extreme perceived temperatures.

## Things you go through before starting

### Installing Node.js (v14 or Later)

  1. Visit the Node.js Website: Go to the official [Node.js download page](https://nodejs.org/en/download/prebuilt-installer).

  2. Choose the Version:
        * Select the LTS (Long Term Support) version, which is recommended for most users.
        * Ensure that the version is 14 or later (the current LTS version will typically be displayed on the download page).

  3. Download the Installer:
        * Select the Operating System and processor architectures.
        * Download it.

  4. Run the Installer:
        * Follow the prompts in the installer to complete the installation.

  5. Verify the Installation:
        * Open a terminal or command prompt and run the following command:
          ```
          node -v
          ```
        * You should see the version number, which confirms that Node.js is installed successfully.

  6. Install npm (Node Package Manager):

        * npm is included with Node.js installation. To verify, run:
          ```
          npm -v
          ```
        
### Installing MongoDB (Local Installation)

  1. Visit the MongoDB Download Page: Go to the official [MongoDB Community Server download page](https://www.mongodb.com/try/download/community).

  2. Choose Your Version:
        * Select the desired version and your operating system (Windows, macOS, or Linux).
        * Click Download to get the installer.

  3. Run the Installer:
        * Follow the installation instructions provided for your specific operating system:
            * Windows: Run the `.msi` installer and follow the prompts. You can select the option to install as a service if you want MongoDB to start automatically.
            * macOS: You can use the Homebrew package manager by running the following command:
              ```
              brew tap mongodb/brew
              brew install mongodb-community
              ```
            * Linux: Follow the instructions provided for your specific distribution.

  4. Start MongoDB:
        * After installation, you can start MongoDB using:
          ```
          mongod
          ```
        * This command starts the MongoDB server. Ensure you have created the necessary directories for MongoDB data if prompted.

  5. Verify the Installation:

        * Open a new terminal window and run:
          ```
          mongo
          ```
        * You should see the MongoDB shell prompt, indicating that the installation was successful.

### Using MongoDB Atlas (Cloud Installation)

  1. Sign Up for an Account:
        * Go to the [MongoDB Atlas website](https://www.mongodb.com/products/platform/atlas-database) and create an account.

  2. Create a New Cluster:
        * Once logged in, click on the **"Build a Cluster"** button.
        * Choose the free tier option and follow the prompts to select your cloud provider and region.

  3. Configure Cluster:
        * After your cluster is created, you’ll need to set up database access by creating a user with a username and password.

  4. Get the Connection String:
        * Go to your cluster in the Atlas dashboard, click on the **"Connect"** button, and choose **"Connect your application"**.
        * Copy the connection string provided, replacing `<password>` with the password for the user you created.

  5. Connect Using MongoDB Compass (Optional):
        * You can also use [MongoDB Compass](https://www.mongodb.com/try/download/compass) for a graphical interface to manage your databases. Download and install Compass, then use the connection string to connect to your Atlas cluster.

### Getting OpenWeather API Access

  1. Sign Up for an Account:
        * Go to the [OpenWeather website](https://openweathermap.org/).
        * Click on the `Sign Up` button in the top right corner and fill out the registration form to create an account.

  2. Choose an API Plan:
        * After logging in, navigate to the **API section**. OpenWeather offers various API plans, including a free tier that provides limited access to data.
        * Select the plan that suits your needs. For most basic applications, the free tier is sufficient.

  3. Access Your API Key:
        * Once you have chosen your plan, go to the `API keys` section in your account dashboard.
        * You will see your default API key. If you need multiple keys for different applications, you can create additional keys here.
  
  4. Add Your API Key in `.env`:
        ```
        OPENWEATHER_API_KEY=YOUR_OPENWEATHER_API_KEY
        ```

## For queries contact

**Harsha Patil:** [**harshapatil.hp01@gmail.com**](mailto:harshapatil.hp01@gmail.com)
