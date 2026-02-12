interface WeatherAlert {
	id: string;
	title: string;
	description?: string;
	severity: "advisory" | "watch" | "warning";
}

interface WeatherOutlookLink {
	id: string;
	url: string;
	issuedAt: string;
	office: string;
	title: string;
}

interface WeatherAlertsBannerProps {
	alerts: WeatherAlert[];
	latestHwo?: WeatherOutlookLink | null;
	onOpenHwo?: (id: string) => void;
}

const stylesBySeverity: Record<WeatherAlert["severity"], { bg: string; border: string; text: string }> = {
	advisory: {
		bg: "rgba(250, 204, 21, 0.18)",
		border: "rgba(250, 204, 21, 0.55)",
		text: "#fef9c3",
	},
	watch: {
		bg: "rgba(249, 115, 22, 0.2)",
		border: "rgba(249, 115, 22, 0.58)",
		text: "#ffedd5",
	},
	warning: {
		bg: "rgba(239, 68, 68, 0.2)",
		border: "rgba(239, 68, 68, 0.58)",
		text: "#fee2e2",
	},
};

export type { WeatherAlert, WeatherOutlookLink };

export default function WeatherAlertsBanner({
	alerts,
	latestHwo,
	onOpenHwo,
}: WeatherAlertsBannerProps) {
	if (alerts.length === 0 && !latestHwo) {
		return null;
	}

	return (
		<section style={{ display: "grid", gap: "0.75rem", padding: "1rem" }}>
			{latestHwo ? (
				<article
					style={{
						background: "rgba(56, 189, 248, 0.14)",
						border: "1px solid rgba(56, 189, 248, 0.45)",
						borderRadius: "12px",
						padding: "0.9rem 1rem",
						color: "#e0f2fe",
					}}
				>
					<div style={{ fontWeight: 700, marginBottom: "0.3rem" }}>
						Latest Hazardous Weather Outlook ({latestHwo.office})
					</div>
					<div style={{ color: "rgba(255, 255, 255, 0.92)", marginBottom: "0.25rem" }}>
						{latestHwo.title}
					</div>
					<div style={{ fontSize: "0.9rem", color: "rgba(255, 255, 255, 0.78)", marginBottom: "0.45rem" }}>
						Issued {latestHwo.issuedAt ? new Date(latestHwo.issuedAt).toLocaleString() : "recently"}
					</div>
					<button
						type="button"
						onClick={() => onOpenHwo?.(latestHwo.id)}
						style={{
							background: "transparent",
							border: "none",
							color: "#e0f2fe",
							fontWeight: 600,
							cursor: "pointer",
							padding: 0,
						}}
					>
						Open full HWO
					</button>
				</article>
			) : null}

			{alerts.map((alert) => {
				const palette = stylesBySeverity[alert.severity];
				return (
					<article
						key={alert.id}
						style={{
							background: palette.bg,
							border: `1px solid ${palette.border}`,
							borderRadius: "12px",
							padding: "0.9rem 1rem",
							color: palette.text,
						}}
					>
						<div style={{ fontWeight: 700, marginBottom: "0.25rem" }}>{alert.title}</div>
						{alert.description ? (
							<div style={{ color: "rgba(255, 255, 255, 0.9)" }}>{alert.description}</div>
						) : null}
					</article>
				);
			})}
		</section>
	);
}
