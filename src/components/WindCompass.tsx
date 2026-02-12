interface WindCompassProps {
	directionDegrees: number;
}

const CARDINALS = [
	"N",
	"NNE",
	"NE",
	"ENE",
	"E",
	"ESE",
	"SE",
	"SSE",
	"S",
	"SSW",
	"SW",
	"WSW",
	"W",
	"WNW",
	"NW",
	"NNW",
];

function getCardinalDirection(degrees: number) {
	const normalized = ((degrees % 360) + 360) % 360;
	const index = Math.round(normalized / 22.5) % 16;
	return CARDINALS[index];
}

export default function WindCompass({ directionDegrees }: WindCompassProps) {
	const normalized = ((directionDegrees % 360) + 360) % 360;
	const cardinal = getCardinalDirection(normalized);

	return (
		<div style={{ display: "grid", gap: "0.6rem" }}>
			<div
				style={{
					position: "relative",
					width: "156px",
					height: "156px",
					margin: "0 auto",
					borderRadius: "50%",
					border: "1px solid rgba(255, 255, 255, 0.38)",
					background:
						"radial-gradient(circle at 30% 25%, rgba(255,255,255,0.2), rgba(255,255,255,0.04) 68%)",
				}}
			>
				<div style={{ position: "absolute", top: "8px", left: "50%", transform: "translateX(-50%)", fontSize: "0.75rem", color: "rgba(255,255,255,0.9)", fontWeight: 700 }}>N</div>
				<div style={{ position: "absolute", top: "50%", right: "8px", transform: "translateY(-50%)", fontSize: "0.75rem", color: "rgba(255,255,255,0.9)", fontWeight: 700 }}>E</div>
				<div style={{ position: "absolute", bottom: "8px", left: "50%", transform: "translateX(-50%)", fontSize: "0.75rem", color: "rgba(255,255,255,0.9)", fontWeight: 700 }}>S</div>
				<div style={{ position: "absolute", top: "50%", left: "8px", transform: "translateY(-50%)", fontSize: "0.75rem", color: "rgba(255,255,255,0.9)", fontWeight: 700 }}>W</div>

				<div
					style={{
						position: "absolute",
						top: "50%",
						left: "50%",
						width: "3px",
						height: "58px",
						background: "linear-gradient(180deg, #f97316 0%, #facc15 100%)",
						transform: `translate(-50%, -90%) rotate(${normalized}deg)`,
						transformOrigin: "50% 90%",
						borderRadius: "999px",
						boxShadow: "0 0 12px rgba(249, 115, 22, 0.4)",
					}}
				/>
				<div
					style={{
						position: "absolute",
						top: "50%",
						left: "50%",
						width: "12px",
						height: "12px",
						borderRadius: "50%",
						transform: "translate(-50%, -50%)",
						background: "#f8fafc",
						border: "1px solid rgba(15, 23, 42, 0.45)",
					}}
				/>
			</div>

			<div style={{ textAlign: "center", color: "rgba(255, 255, 255, 0.9)", fontWeight: 600 }}>
				{cardinal} ({Math.round(normalized)}
				{"\u00B0"})
			</div>
		</div>
	);
}
