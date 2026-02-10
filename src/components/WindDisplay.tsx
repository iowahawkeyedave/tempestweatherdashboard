interface Props {
  windSpeed: number;
  windDirection: number; // degrees (0-360)
  windGust: number;
}

export default function WindDisplay({ windSpeed, windDirection, windGust }: Props) {
  return (
    <div style={{ 
      border: '1px solid #ccc', 
      borderRadius: '8px', 
      padding: '16px',
      maxWidth: '300px'
    }}>
      <h2>💨 Wind</h2>
      <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>
        {windSpeed} mph
      </div>
      <div>Direction: {windDirection}°</div>
      <div>Gusts: {windGust} mph</div>
    </div>
  );
}