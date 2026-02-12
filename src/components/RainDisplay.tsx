interface Props {
	rainToday: number;
	rainLastHour: number;
}

export default function RainDisplay({ rainToday, rainLastHour }: Props) {
	const formattedToday = Number(rainToday).toFixed(2);
	const formattedHour = Number(rainLastHour).toFixed(2);

	return (
		<section style={{ display: "grid", gap: "0.75rem", alignContent: "start" }}>
			<h2 style={{ margin: 0, fontSize: "2rem", fontWeight: 700 }}>Rain</h2>

			<div style={{ fontSize: "2rem", fontWeight: 600, lineHeight: 1.1 }}>
				Today: {formattedToday}"
			</div>

			<div style={{ color: "rgba(255, 255, 255, 0.8)", fontSize: "1.05rem" }}>
				Last Hour: {formattedHour}"/hr
			</div>
		</section>
	);
}
