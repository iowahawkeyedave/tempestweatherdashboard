interface Props {
  rainToday: number;      // mm or inches
  rainLastHour: number;       // mm/hr or in/hr
}

export default function RainDisplay({ rainToday, rainLastHour }: Props) {
  return (
    <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '16px', maxWidth: '300px' }}>
      <h2>🌧️ Rain</h2>
      <div style={{ fontSize: '1.5rem' }}>Today: {rainToday}"</div>
      <div>Last Hour: {rainLastHour}"/hr</div>
    </div>
  );
}