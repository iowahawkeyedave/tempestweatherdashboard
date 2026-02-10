interface Props {
  temperature: number;
  dewPoint: number;
  humidity: number;
  pressure: number;
  feelsLike: number;
}

export default function CurrentConditions({ temperature, dewPoint, humidity, pressure, feelsLike }: Props) {
  return (
    <div style={{ 
      border: '1px solid #ccc', 
      borderRadius: '8px', 
      padding: '16px',
      maxWidth: '300px'
    }}>
      <h2 style={{ marginTop: 0 }}>Current Conditions 🌤️</h2>
      
      <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>
        {temperature}°F
      </div>
      
      <div style={{ color: '#666' }}>
        Feels like {feelsLike}°F
      </div>
      
      <hr style={{ margin: '12px 0' }} />
      
      <div>Dew Point: {dewPoint}°F</div>
      <div>Humidity: {humidity}%</div>
      <div>Pressure: {pressure} inHg</div>
    </div>
  );
}