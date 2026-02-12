import { useEffect, useState } from "react";

interface HwoModalProps {
	productId: string;
	onClose: () => void;
}

interface HwoResponse {
	productName?: string;
	issuanceTime?: string;
	issuingOffice?: string;
	productText?: string;
}

export default function HwoModal({ productId, onClose }: HwoModalProps) {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [data, setData] = useState<HwoResponse | null>(null);

	useEffect(() => {
		let cancelled = false;

		async function fetchHwo() {
			try {
				setLoading(true);
				setError(null);
				const response = await fetch(
					`https://api.weather.gov/products/${encodeURIComponent(productId)}`,
					{ headers: { Accept: "application/geo+json" } },
				);
				if (!response.ok) {
					throw new Error(`Unable to load HWO (${response.status})`);
				}
				const json = (await response.json()) as HwoResponse;
				if (!cancelled) {
					setData(json);
				}
			} catch (err) {
				if (!cancelled) {
					setError("Unable to load the Hazardous Weather Outlook right now.");
				}
			} finally {
				if (!cancelled) {
					setLoading(false);
				}
			}
		}

		fetchHwo();
		return () => {
			cancelled = true;
		};
	}, [productId]);

	return (
		<div
			style={{
				position: "fixed",
				inset: 0,
				background: "rgba(10, 18, 34, 0.55)",
				display: "grid",
				placeItems: "center",
				zIndex: 1200,
				padding: "1rem",
			}}
		>
			<div
				style={{
					width: "min(1000px, 100%)",
					maxHeight: "85vh",
					background:
						"linear-gradient(135deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.08) 100%)",
					backdropFilter: "blur(12px)",
					WebkitBackdropFilter: "blur(12px)",
					borderRadius: "20px",
					border: "1px solid rgba(255, 255, 255, 0.25)",
					boxShadow: "0 20px 45px rgba(0, 0, 0, 0.2)",
					color: "white",
					display: "grid",
					gridTemplateRows: "auto 1fr",
					overflow: "hidden",
				}}
			>
				<div
					style={{
						padding: "1rem 1.1rem",
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						borderBottom: "1px solid rgba(255,255,255,0.16)",
					}}
				>
					<div style={{ fontWeight: 700 }}>
						{data?.productName || "Hazardous Weather Outlook"}
					</div>
					<button
						type="button"
						onClick={onClose}
						style={{
							background: "transparent",
							border: "1px solid rgba(255,255,255,0.45)",
							color: "white",
							borderRadius: "8px",
							padding: "0.35rem 0.7rem",
							cursor: "pointer",
						}}
					>
						Close
					</button>
				</div>

				<div style={{ overflow: "auto", padding: "1rem 1.1rem 1.2rem" }}>
					{loading ? <div>Loading outlook...</div> : null}
					{error ? <div>{error}</div> : null}
					{!loading && !error && data ? (
						<>
							<div style={{ color: "rgba(255,255,255,0.82)", marginBottom: "0.65rem" }}>
								Issued:{" "}
								{data.issuanceTime
									? new Date(data.issuanceTime).toLocaleString()
									: "Unknown"}{" "}
								| Office: {data.issuingOffice || "NWS"}
							</div>
							<pre
								style={{
									margin: 0,
									whiteSpace: "pre-wrap",
									wordBreak: "break-word",
									background: "rgba(7, 15, 34, 0.35)",
									border: "1px solid rgba(255,255,255,0.2)",
									borderRadius: "12px",
									padding: "1rem",
									fontSize: "0.9rem",
									lineHeight: 1.5,
									color: "#f8fafc",
								}}
							>
								{data.productText || "No bulletin text available."}
							</pre>
						</>
					) : null}
				</div>
			</div>
		</div>
	);
}
