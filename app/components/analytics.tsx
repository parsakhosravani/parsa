"use client";
import { useEffect } from "react";

export function Analytics() {
	const token = process.env.NEXT_PUBLIC_BEAM_TOKEN;

	useEffect(() => {
		if (!token) {
			console.warn("Analytics token not found");
			return;
		}

		const script = document.createElement("script");
		script.src = "https://beamanalytics.b-cdn.net/beam.min.js";
		script.setAttribute("data-token", token);
		script.async = true;

		script.onerror = () => {
			console.warn("Failed to load analytics script");
		};

		document.head.appendChild(script);

		return () => {
			// Cleanup on unmount
			if (document.head.contains(script)) {
				document.head.removeChild(script);
			}
		};
	}, [token]);

	if (!token) {
		return null;
	}

	return null; // Script is loaded via useEffect
}
