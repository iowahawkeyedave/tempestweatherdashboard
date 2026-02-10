import { useState, useEffect } from 'react';
import CurrentConditions from './CurrentConditions';
import WindDisplay from './WindDisplay';
import RainDisplay from './RainDisplay';
import UVSolarDisplay from './UVSolarDisplay';

interface WeatherData {
  temperature: number;
  humidity: number;
  pressure: string;
  feelsLike: number;
  windSpeed: number;
  windDirection: number;
  windGust: number;
  rainToday: number;
  rainRate: string;   // Changed from rainLastHour
  uv: number;
  solarRadiation: number;
}       

export default function Dashboard() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [loading, setLoading] = useState(true);

   // Define glassmorphism style here
  const glassStyle = {
    background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 100%)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    borderRadius: '24px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    padding: '1.5rem',
    color: 'white',
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
  };

  useEffect(() => {
    async function fetchWeather() {
      try {
        setLoading(true);
        const response = await fetch('/api/weather');
        const data = await response.json();
        setWeather(data);
        setLastUpdated(new Date());
      } catch (error) {
        console.error('Failed to fetch weather:', error);
      } finally {
        setLoading(false);
      }
    }

    // Fetch immediately
    fetchWeather();

    // Then every 60 seconds
    const interval = setInterval(fetchWeather, 60000);

    return () => clearInterval(interval);
  }, []);

  // Show loading state
  if (loading && !weather) {
    return <div>Loading weather data...</div>;
  }

  // Show error state if no data
  if (!weather) {
    return <div>Failed to load weather data</div>;
  }

  return (
    <div>
      {/* Grid container for all widgets */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1rem',
        padding: '1rem'
      }}>
         <div style={{ gridColumn: 'span 2', gridRow: 'span 2', ...glassStyle }}>
        <CurrentConditions 
          temperature={weather.temperature}
          humidity={weather.humidity}
          pressure={weather.pressure}
          feelsLike={weather.feelsLike}
        />
        </div>
        
          <div style={{ ...glassStyle }}>
        <WindDisplay 
          windSpeed={weather.windSpeed}
          windDirection={weather.windDirection}
          windGust={weather.windGust}
        />
        </div>
        
          <div style={{ ...glassStyle }}>
        <RainDisplay 
            rainToday={weather.rainToday}
            rainLastHour={parseFloat(weather.rainRate)}
        />
        </div>

          <div style={{ ...glassStyle }}>
        <UVSolarDisplay 
          uvIndex={weather.uv}
          solarRadiation={weather.solarRadiation}
        />
        </div>
      </div>

      {/* Last updated timestamp */}
      <div style={{ textAlign: 'center', color: '#666', padding: '1rem' }}>
        Last updated: {lastUpdated?.toLocaleTimeString()}
        {loading && ' (refreshing...)'}
      </div>
    </div>
  );
}