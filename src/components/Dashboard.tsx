import { useState, useEffect } from 'react';
import "./Dashboard.css";
import CurrentConditions from './CurrentConditions';
import WindDisplay from './WindDisplay';
import RainDisplay from './RainDisplay';
import UVSolarDisplay from './UVSolarDisplay';
import TemperatureChart from './TemperatureChart';
import WeatherAlertsBanner, { type WeatherAlert, type WeatherOutlookLink } from './WeatherAlertsBanner';
import HwoModal from "./HwoModal";

interface TemperaturePoint {
  timestamp: number;
  temperature: number;
}

interface WeatherData {
  temperature: number;
  humidity: number;
  pressure: string;
  feelsLike: number;
  dewPoint: number;
  windSpeed: number;
  windDirection: number;
  windGust: number;
  rainToday: number;
  rainRate: string;   // Changed from rainLastHour
  uv: number;
  solarRadiation: number;
  temperatureTrend: TemperaturePoint[];
  alerts?: WeatherAlert[];
  latestHwo?: WeatherOutlookLink | null;
}       

export default function Dashboard() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [loading, setLoading] = useState(true);
  const [openHwoId, setOpenHwoId] = useState<string | null>(null);

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
    fontFamily: "inherit",
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
      <WeatherAlertsBanner
        alerts={weather.alerts ?? []}
        latestHwo={weather.latestHwo}
        onOpenHwo={(id) => setOpenHwoId(id)}
      />

      <div style={{ display: "flex", justifyContent: "flex-end", padding: "0 1rem 0.5rem" }}>
        <div
          style={{
            color: "rgba(255, 255, 255, 0.95)",
            background: "rgba(15, 23, 42, 0.35)",
            border: "1px solid rgba(255, 255, 255, 0.25)",
            borderRadius: "999px",
            padding: "0.35rem 0.75rem",
            fontSize: "0.9rem",
            fontWeight: 500,
          }}
        >
          Last updated: {lastUpdated?.toLocaleTimeString()}
          {loading && " (refreshing...)"}
        </div>
      </div>

      {/* Grid container for all widgets */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1rem',
        padding: '1rem'
      }}>
         <div className="dashboard-card" style={{ gridColumn: 'span 2', ...glassStyle }}>
        <CurrentConditions 
          temperature={weather.temperature}
          humidity={weather.humidity}
          pressure={weather.pressure}
          feelsLike={weather.feelsLike}
          dewPoint={weather.dewPoint}
        />
        </div>
        
          <div className="dashboard-card" style={{ ...glassStyle }}>
        <WindDisplay 
          windSpeed={weather.windSpeed}
          windDirection={weather.windDirection}
          windGust={weather.windGust}
        />
        </div>
        
          <div className="dashboard-card" style={{ ...glassStyle }}>
        <RainDisplay 
            rainToday={weather.rainToday}
            rainLastHour={parseFloat(weather.rainRate)}
        />
        </div>

          <div className="dashboard-card" style={{ ...glassStyle }}>
        <UVSolarDisplay 
          uvIndex={weather.uv}
          solarRadiation={weather.solarRadiation}
        />
        </div>

          <div className="dashboard-card" style={{ gridColumn: 'span 2', ...glassStyle }}>
        <TemperatureChart points={weather.temperatureTrend} />
        </div>
      </div>

      {openHwoId ? <HwoModal productId={openHwoId} onClose={() => setOpenHwoId(null)} /> : null}
    </div>
  );
}
