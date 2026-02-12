import { useMemo } from "react";
import {
	CategoryScale,
	Chart as ChartJS,
	type ChartOptions,
	Filler,
	Legend,
	LinearScale,
	LineElement,
	PointElement,
	Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
	CategoryScale,
	LinearScale,
	LineElement,
	PointElement,
	Tooltip,
	Legend,
	Filler,
);

interface TemperaturePoint {
	timestamp: number;
	temperature: number;
}

interface TemperatureChartProps {
	points: TemperaturePoint[];
}

export default function TemperatureChart({ points }: TemperatureChartProps) {
	if (points.length === 0) {
		return <div>Temperature trend unavailable.</div>;
	}

	const data = useMemo(() => {
		const labels = points.map((point) =>
			new Date(point.timestamp * 1000).toLocaleTimeString([], {
				hour: "numeric",
				minute: "2-digit",
			}),
		);
		const values = points.map((point) => point.temperature);

		return {
			labels,
			datasets: [
				{
					label: "Temperature (degF)",
					data: values,
					borderColor: "rgba(99, 179, 237, 1)",
					backgroundColor: "rgba(99, 179, 237, 0.2)",
					tension: 0.35,
					fill: true,
					pointRadius: 2,
				},
			],
		};
	}, [points]);

	const options: ChartOptions<"line"> = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				display: true,
				labels: { color: "#ffffff" },
			},
			tooltip: { enabled: true },
		},
		scales: {
			x: {
				ticks: {
					color: "#e2e8f0",
					maxTicksLimit: 8,
				},
				grid: { color: "rgba(255,255,255,0.08)" },
			},
			y: {
				ticks: {
					color: "#e2e8f0",
					callback(value) {
						return `${value} F`;
					},
				},
				grid: { color: "rgba(255,255,255,0.08)" },
			},
		},
	};

	return (
		<div>
			<h3 style={{ marginTop: 0 }}>Temperature Trend (24h)</h3>
			<div style={{ height: "240px" }}>
				<Line data={data} options={options} />
			</div>
		</div>
	);
}
