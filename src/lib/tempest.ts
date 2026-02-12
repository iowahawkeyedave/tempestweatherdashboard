const API_BASE = "https://swd.weatherflow.com/swd/rest";
const TOKEN = import.meta.env.TEMPEST_API_TOKEN;
const STATION_ID = import.meta.env.TEMPEST_STATION_ID;
const NWS_ALERTS_BASE = "https://api.weather.gov/alerts/active";
const NWS_PRODUCTS_BASE = "https://api.weather.gov/products";
const NWS_OFFICE = (import.meta.env.NWS_OFFICE || "DVN").toUpperCase().replace(/^K/, "");

type AlertSeverity = "advisory" | "watch" | "warning";

interface TempestAlert {
  id: string;
  title: string;
  description: string;
  severity: AlertSeverity;
}

interface NwsAlertFeature {
  id: string;
  properties?: {
    event?: string;
    headline?: string;
    description?: string;
    severity?: string;
  };
}

interface NwsProductEntry {
  id?: string;
  "@id"?: string;
  issuanceTime?: string;
  productName?: string;
}

interface LatestHwo {
  id: string;
  url: string;
  issuedAt: string;
  office: string;
  title: string;
}

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

function mapNwsSeverity(event: string, severity: string): AlertSeverity {
  const eventLower = event.toLowerCase();
  const severityLower = severity.toLowerCase();

  if (eventLower.includes("warning")) {
    return "warning";
  }
  if (eventLower.includes("watch")) {
    return "watch";
  }
  if (eventLower.includes("advisory")) {
    return "advisory";
  }

  if (severityLower === "extreme" || severityLower === "severe") {
    return "warning";
  }
  if (severityLower === "moderate") {
    return "watch";
  }
  return "advisory";
}

function mapNwsFeatureToAlert(feature: NwsAlertFeature): TempestAlert {
  const event = feature.properties?.event || "Weather Alert";
  const severity = feature.properties?.severity || "Unknown";
  const headline = feature.properties?.headline || event;
  const description = feature.properties?.description || "Active weather alert.";

  return {
    id: feature.id,
    title: headline,
    description,
    severity: mapNwsSeverity(event, severity),
  };
}

export async function fetchWeatherAlerts(latitude?: number, longitude?: number) {
  if (latitude == null || longitude == null) {
    return [];
  }

  try {
    const point = `${latitude.toFixed(4)},${longitude.toFixed(4)}`;
    const url = `${NWS_ALERTS_BASE}?point=${point}`;
    const response = await fetch(url, {
      headers: {
        "User-Agent": "tempestweatherdashboard (github)",
        Accept: "application/geo+json",
      },
    });

    if (!response.ok) {
      throw new Error(`NWS alerts request failed: ${response.status}`);
    }

    const data = await response.json();
    const features = (data?.features || []) as NwsAlertFeature[];
    return features.map(mapNwsFeatureToAlert);
  } catch (error) {
    console.error("Failed to fetch NWS alerts:", error);
    return [];
  }
}

export async function fetchLatestHazardousWeatherOutlook(office = NWS_OFFICE): Promise<LatestHwo | null> {
  try {
    const normalizedOffice = office.toUpperCase().replace(/^K/, "");
    const url = `${NWS_PRODUCTS_BASE}/types/HWO/locations/${normalizedOffice}`;
    const response = await fetch(url, {
      headers: {
        "User-Agent": "tempestweatherdashboard (github)",
        Accept: "application/geo+json",
      },
    });

    if (!response.ok) {
      throw new Error(`NWS HWO request failed: ${response.status}`);
    }

    const data = await response.json();
    const products = (data?.["@graph"] || []) as NwsProductEntry[];
    if (products.length === 0) {
      return null;
    }

    const latest = [...products].sort((a, b) => {
      const aTime = new Date(a.issuanceTime || 0).getTime();
      const bTime = new Date(b.issuanceTime || 0).getTime();
      return bTime - aTime;
    })[0];

    const id = latest.id || (latest["@id"] ? latest["@id"].split("/").pop() : undefined);
    if (!id) {
      return null;
    }

    const productUrl = latest["@id"] || `${NWS_PRODUCTS_BASE}/${id}`;
    return {
      id,
      url: productUrl,
      issuedAt: latest.issuanceTime || "",
      office: normalizedOffice,
      title: latest.productName || "Hazardous Weather Outlook",
    };
  } catch (error) {
    console.error("Failed to fetch latest HWO:", error);
    return null;
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
