const API_BASE = "https://swd.weatherflow.com/swd/rest";
const TOKEN = import.meta.env.TEMPEST_API_TOKEN;
const STATION_ID = import.meta.env.TEMPEST_STATION_ID;

export async function fetchCurrentConditions() {
  try {
    const url = `${API_BASE}/observations/station/${STATION_ID}?token=${TOKEN}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch weather:", error);
    throw error;
  }
}

export async function fetchTemperatureHistory24h() {
	try {
		const end = Math.floor(Date.now() / 1000);
		const start = end - 24 * 60 * 60;
		const url = `${API_BASE}/observations/stn/${STATION_ID}?token=${TOKEN}&time_start=${start}&time_end=${end}`;

		const response = await fetch(url);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		return data?.obs ?? [];
	} catch (error) {
		console.error("Failed to fetch temperature history:", error);
		throw error;
	}
}
