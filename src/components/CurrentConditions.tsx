interface Props {
	temperature: number;
	humidity: number;
	pressure: string;
	feelsLike: number;
	dewPoint: number;
}

function getConditionBadge(temperature: number, humidity: number) {
	if (temperature <= 32) {
		return { icon: "❄", label: "Freezing" };
	}
	if (temperature >= 85) {
		return { icon: "☀", label: "Hot" };
	}
	if (humidity >= 85) {
		return { icon: "🌫", label: "Foggy" };
	}
	if (humidity >= 70) {
		return { icon: "💧", label: "Humid" };
	}
	return { icon: "⛅", label: "Mild" };
}

export default function CurrentConditions({
	temperature,
	humidity,
	pressure,
	feelsLike,
	dewPoint,
}: Props) {
	const condition = getConditionBadge(temperature, humidity);

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
				<div
					style={{
						display: "inline-flex",
						alignItems: "center",
						gap: "0.35rem",
						width: "fit-content",
						padding: "0.24rem 0.6rem",
						borderRadius: "999px",
						background: "rgba(255,255,255,0.14)",
						border: "1px solid rgba(255,255,255,0.24)",
						fontSize: "0.82rem",
						fontWeight: 600,
					}}
				>
					<span aria-hidden>{condition.icon}</span>
					<span>{condition.label}</span>
				</div>
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
					display: "grid",
					gridTemplateColumns: "1fr auto",
					alignItems: "center",
					gap: "1rem",
				}}
			>
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
					aria-label={`Condition: ${condition.label}`}
					style={{
						width: "132px",
						height: "132px",
						borderRadius: "50%",
						display: "grid",
						placeItems: "center",
						fontSize: "4.5rem",
						background:
							"radial-gradient(circle at 30% 25%, rgba(255,255,255,0.26), rgba(255,255,255,0.08) 68%)",
						border: "1px solid rgba(255,255,255,0.3)",
						boxShadow: "0 10px 24px rgba(0, 0, 0, 0.16)",
					}}
				>
					<span aria-hidden>{condition.icon}</span>
				</div>
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
						💧 Humidity
					</div>
					<div style={{ fontSize: "1.2rem", fontWeight: 600 }}>{humidity}%</div>
				</div>

				<div>
					<div style={{ fontSize: "0.8rem", color: "rgba(255, 255, 255, 0.68)" }}>
						🧭 Pressure
					</div>
					<div style={{ fontSize: "1.2rem", fontWeight: 600 }}>{pressure} inHg</div>
				</div>

				<div>
					<div style={{ fontSize: "0.8rem", color: "rgba(255, 255, 255, 0.68)" }}>
						🌡 Dew Point
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
