interface Props {
  temperature: number;
  humidity: number;
  pressure: string;
  feelsLike: number;
}

export default function CurrentConditions({ 
  temperature, 
  humidity, 
  pressure, 
  feelsLike 
}: Props) {
  // No more useState or useEffect! Just display props.
  return (
    <div style={{ 
      border: '1px solid #ccc', 
      borderRadius: '8px', 
      padding: '16px',
      maxWidth: '300px'
    }}>
      <h2 style={{ marginTop: 0, fontSize: '1.2rem', fontWeight: 500, opacity: 0.9 }}>Current Conditions 🌤️</h2>
      <div style={{ fontSize: '3rem', fontWeight: 200 }}>{temperature}°F</div>
      <div style={{ color: '#666' }}>Feels like {feelsLike}°F</div>
      <hr style={{ margin: '12px 0' }} />
      <div>Humidity: {humidity}%</div>
      <div>Pressure: {pressure} inHg</div>
    </div>
  );
}