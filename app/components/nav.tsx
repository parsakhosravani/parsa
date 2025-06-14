"use client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

export const Navigation: React.FC = () => {
	const ref = useRef<HTMLElement>(null);
	const [isIntersecting, setIntersecting] = useState(true);

	useEffect(() => {
		if (!ref.current) return;
		const observer = new IntersectionObserver(([entry]) =>
			setIntersecting(entry.isIntersecting),
		);

		observer.observe(ref.current);
		return () => observer.disconnect();
	}, []);

	return (
		<header ref={ref}>
			<div
				className={`fixed inset-x-0 top-0 z-50 backdrop-blur duration-200 border-b transition-all ${isIntersecting
						? "bg-zinc-900/0 border-transparent"
						: "bg-zinc-900/80 border-zinc-800"
					}`}
				style={{
					backgroundColor: isIntersecting ? "transparent" : "rgba(24, 24, 27, 0.8)",
					backdropFilter: "blur(12px)",
					WebkitBackdropFilter: "blur(12px)",
				}}
			>
				<div className="container flex flex-row-reverse items-center justify-between p-6 mx-auto">
					<nav className="flex justify-between gap-8">
						<Link
							href="/projects"
							className="duration-200 text-zinc-400 hover:text-zinc-100 transition-colors"
						>
							Projects
						</Link>
						<Link
							href="/about"
							className="duration-200 text-zinc-400 hover:text-zinc-100 transition-colors"
						>
							About
						</Link>
						<Link
							href="/contact"
							className="duration-200 text-zinc-400 hover:text-zinc-100 transition-colors"
						>
							Contact
						</Link>
					</nav>

					<Link
						href="/"
						className="duration-200 text-zinc-300 hover:text-zinc-100 transition-colors flex items-center gap-2"
						aria-label="Go home"
					>
						<ArrowLeft className="w-6 h-6" />
						<span className="hidden sm:inline">Home</span>
					</Link>
				</div>
			</div>
		</header>
	);
};
