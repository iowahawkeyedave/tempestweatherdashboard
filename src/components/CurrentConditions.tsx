interface Props {
	temperature: number;
	humidity: number;
	pressure: string;
	feelsLike: number;
	dewPoint: number;
}

export default function CurrentConditions({
	temperature,
	humidity,
	pressure,
	feelsLike,
	dewPoint,
}: Props) {
	return (
		<section
			style={{
				display: "grid",
				gap: "1rem",
				alignContent: "start",
				height: "100%",
			}}
		>
			<div style={{ display: "grid", gap: "0.35rem" }}>
				<h2
					style={{
						margin: 0,
						fontSize: "1.3rem",
						fontWeight: 600,
						letterSpacing: "0.02em",
					}}
				>
					Current Conditions
				</h2>
				<p
					style={{
						margin: 0,
						color: "rgba(255, 255, 255, 0.72)",
						fontSize: "0.92rem",
					}}
				>
					Live station readings
				</p>
			</div>

			<div
				style={{
					fontSize: "4rem",
					fontWeight: 300,
					lineHeight: 1,
					letterSpacing: "-0.02em",
				}}
			>
				{temperature}
				{"\u00B0"}F
			</div>

			<div
				style={{
					fontSize: "1.05rem",
					color: "rgba(255, 255, 255, 0.8)",
				}}
			>
				Feels like {feelsLike}
				{"\u00B0"}F
			</div>

			<div
				style={{
					height: "1px",
					background:
						"linear-gradient(90deg, rgba(255,255,255,0.5), rgba(255,255,255,0.05))",
				}}
			/>

			<div
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
					gap: "0.75rem 1rem",
				}}
			>
				<div>
					<div style={{ fontSize: "0.8rem", color: "rgba(255, 255, 255, 0.68)" }}>
						Humidity
					</div>
					<div style={{ fontSize: "1.2rem", fontWeight: 600 }}>{humidity}%</div>
				</div>

				<div>
					<div style={{ fontSize: "0.8rem", color: "rgba(255, 255, 255, 0.68)" }}>
						Pressure
					</div>
					<div style={{ fontSize: "1.2rem", fontWeight: 600 }}>{pressure} inHg</div>
				</div>

				<div>
					<div style={{ fontSize: "0.8rem", color: "rgba(255, 255, 255, 0.68)" }}>
						Dew Point
					</div>
					<div style={{ fontSize: "1.2rem", fontWeight: 600 }}>
						{dewPoint}
						{"\u00B0"}F
					</div>
				</div>
			</div>
		</section>
	);
}
