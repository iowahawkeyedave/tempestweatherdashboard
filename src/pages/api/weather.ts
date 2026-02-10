import type { APIRoute } from 'astro';
import { fetchCurrentConditions } from '../../lib/tempest';

export const GET: APIRoute = async () => {
  try {
    const data = await fetchCurrentConditions();
    const current = data?.obs?.[0] || {};
    console.log('Fetched weather data:', current); // Debug log
    
    // Helper functions (same as your index.astro)
    const cToF = (c: number) => Math.round((c * 9/5) + 32);
    const kmhToMph = (kmh: number) => Math.round(kmh * 0.621371);
    const hPaToInHg = (hpa: number) => (hpa * 0.02953).toFixed(2);
    const mmToInches = (mm: number) => (mm * 0.03937).toFixed(2);

    return new Response(JSON.stringify({
  temperature: cToF(current.air_temperature),
  humidity: current.relative_humidity,
  pressure: hPaToInHg(current.sea_level_pressure),
  feelsLike: cToF(current.feels_like || current.air_temperature),
  windSpeed: kmhToMph(current.wind_avg),
  windDirection: current.wind_direction,
  windGust: kmhToMph(current.wind_gust),
  uv: current.uv,
  solarRadiation: current.solar_radiation,
  rainToday: mmToInches(current.precip_accum_local_day || 0),
  rainRate: mmToInches(current.precip_accum_last_1hr || 0)  // Changed from rainLastHour
}), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch weather' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};