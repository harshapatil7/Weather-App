import { useState } from 'react';

const WeatherForm = ({ onFetchWeather, onCitySelect }) => {
    const [threshold, setThreshold] = useState('');
    const [weatherCondition, setWeatherCondition] = useState('');
    const [email, setEmail] = useState('');
    const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];

    const handleCityFetch = (city) => {
        onCitySelect(city);
        onFetchWeather(city, Number(threshold), weatherCondition, email); // Pass all inputs as-is
    };

    return (
        <div>
            <form onSubmit={(e) => e.preventDefault()}>
                <div>
                    <label>
                        Temperature Threshold (°C):
                        <input 
                            type="number" 
                            value={threshold}
                            onChange={(e) => setThreshold(e.target.value)} 
                            placeholder="e.g., 25°C" 
                        />
                    </label>
                </div>
                <br />
                <div>
                    <label>
                        Weather Condition:
                        <input 
                            type="text" 
                            value={weatherCondition} 
                            onChange={(e) => setWeatherCondition(e.target.value)} 
                            placeholder="e.g., Rain, Wind" 
                        />
                    </label>
                </div>
                <br />
                <div>
                    <label>
                        Email for Alerts (optional):
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            placeholder="test@mail.com" 
                        />
                    </label>
                </div>
                <br />
            </form>
            <div>
                {cities.map((city) => (
                    <button key={city} onClick={() => handleCityFetch(city)} style={{ margin: '5px' }}>
                        Fetch Weather for {city}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default WeatherForm;
