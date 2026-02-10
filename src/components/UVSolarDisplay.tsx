interface Props {
  uvIndex: number;
  solarRadiation: number; // W/m²
}

export default function UVSolarDisplay({ uvIndex, solarRadiation }: Props) {
  const uvLevel = uvIndex <= 2 ? 'Low' : uvIndex <= 5 ? 'Moderate' : uvIndex <= 7 ? 'High' : 'Extreme';
  
  return (
    <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '16px', maxWidth: '300px' }}>
      <h2>☀️ UV & Solar</h2>
      <div>UV Index: {uvIndex} ({uvLevel})</div>
      <div>Solar: {solarRadiation} W/m²</div>
    </div>
  );
}