interface Props {
	windSpeed: number;
	windDirection: number;
	windGust: number;
}

export default function WindDisplay({ windSpeed, windDirection, windGust }: Props) {
	return (
		<section style={{ display: "grid", gap: "0.75rem", alignContent: "start" }}>
			<h2 style={{ margin: 0, fontSize: "2rem", fontWeight: 700 }}>Wind</h2>

			<div style={{ fontSize: "2.8rem", fontWeight: 600, lineHeight: 1 }}>
				{windSpeed} mph
			</div>

			<div style={{ display: "grid", gap: "0.35rem" }}>
				<div style={{ color: "rgba(255, 255, 255, 0.8)", fontSize: "1.05rem" }}>
					Direction: {windDirection}
					{"\u00B0"}
				</div>
				<div style={{ color: "rgba(255, 255, 255, 0.8)", fontSize: "1.05rem" }}>
					Gusts: {windGust} mph
				</div>
			</div>
		</section>
	);
}
