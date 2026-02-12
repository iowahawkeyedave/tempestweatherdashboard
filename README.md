# Tempest Weather Dashboard

A weather dashboard built with Astro + React that displays live station conditions from Tempest, active alerts from the National Weather Service (NWS), and a 24-hour temperature trend.

## What This Project Does

- Shows current conditions (temperature, feels like, humidity, pressure, dew point)
- Displays wind details with a visual compass
- Shows rain and UV/solar metrics
- Renders a 24-hour temperature trend chart
- Pulls active NWS alerts for the station location
- Links to the latest Hazardous Weather Outlook (HWO) and opens full text in-app

## Tech Stack

- Astro 5
- React 19
- TypeScript
- Chart.js + react-chartjs-2
- Biome (formatting/linting)

## Data Sources

- Tempest API (WeatherFlow): station observations and historical trend data
- National Weather Service API (`api.weather.gov`): active alerts and HWO products

## Environment Variables

Create a `.env` file in the project root:

```env
TEMPEST_API_TOKEN=your_token_here
TEMPEST_STATION_ID=your_station_id_here
# optional, defaults to DVN
NWS_OFFICE=KDVN
```

## Getting Started

```bash
npm install
npm run dev
```

The app runs at `http://localhost:4321` by default.

## Available Scripts

- `npm run dev` - Start local dev server (polling enabled for reliable file watching in WSL)
- `npm run build` - Create a production build in `dist/`
- `npm run preview` - Preview the production build locally
- `npm run astro ...` - Run Astro CLI commands

## Project Structure

```text
src/
  components/
    CurrentConditions.tsx
    WindDisplay.tsx
    WindCompass.tsx
    RainDisplay.tsx
    UVSolarDisplay.tsx
    TemperatureChart.tsx
    WeatherAlertsBanner.tsx
    HwoModal.tsx
    Dashboard.tsx
  lib/
    tempest.ts
  pages/
    index.astro
    hwo.astro
    api/
      weather.ts
  layouts/
    Layout.astro
```

## Notes

- The dashboard refreshes weather data every 60 seconds.
- NWS coverage is U.S.-focused.
- HWO modal content is loaded directly from NWS product endpoints at runtime.

## Deployment

This project outputs a static site (`dist/`) and can be deployed to static hosts such as Vercel, Netlify, GitHub Pages, or Cloudflare Pages.

## Roadmap

- Add keyboard/escape and click-outside close behavior for the HWO modal
- Introduce unit tests for alert mapping and weather data transforms
- Add user-selectable units (F/C, mph/kph, in/mm)
- Expand forecast views beyond current conditions (hourly + multi-day)
