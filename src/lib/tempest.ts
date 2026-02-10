const API_BASE = "https://swd.weatherflow.com/swd/rest";
const TOKEN = import.meta.env.TEMPEST_API_TOKEN;
const STATION_ID = import.meta.env.TEMPEST_STATION_ID;

export async function fetchCurrentConditions() {
  const url = `${API_BASE}/observations/station/${STATION_ID}?token=${TOKEN}`;
  
  const response = await fetch(url);
  const data = await response.json();
  return data;
}