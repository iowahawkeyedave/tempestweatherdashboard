interface Props {
	uvIndex: number;
	solarRadiation: number;
}

export default function UVSolarDisplay({ uvIndex, solarRadiation }: Props) {
	const uvLevel =
		uvIndex <= 2 ? "Low" : uvIndex <= 5 ? "Moderate" : uvIndex <= 7 ? "High" : "Extreme";

	return (
		<section style={{ display: "grid", gap: "0.75rem", alignContent: "start" }}>
			<h2 style={{ margin: 0, fontSize: "2rem", fontWeight: 700 }}>UV & Solar</h2>

			<div style={{ color: "rgba(255, 255, 255, 0.9)", fontSize: "1.2rem", fontWeight: 600 }}>
				UV Index: {uvIndex.toFixed(2)} ({uvLevel})
			</div>

			<div style={{ color: "rgba(255, 255, 255, 0.8)", fontSize: "1.05rem" }}>
				Solar: {solarRadiation} W/m2
			</div>
		</section>
	);
}
