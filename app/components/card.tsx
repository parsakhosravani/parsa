"use client";
import {
	motion,
	useMotionTemplate,
	useMotionValue,
	useSpring,
} from "framer-motion";
import { MouseEventHandler, PropsWithChildren } from "react";

interface CardProps extends PropsWithChildren {
	className?: string;
	href?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = "", href }) => {
	const mouseX = useSpring(0, { stiffness: 500, damping: 100 });
	const mouseY = useSpring(0, { stiffness: 500, damping: 100 });

	function onMouseMove({ currentTarget, clientX, clientY }: any) {
		const { left, top } = currentTarget.getBoundingClientRect();
		mouseX.set(clientX - left);
		mouseY.set(clientY - top);
	}

	const maskImage = useMotionTemplate`radial-gradient(240px at ${mouseX}px ${mouseY}px, white, transparent)`;
	const style = {
		maskImage,
		WebkitMaskImage: maskImage,
		// Force specific colors to prevent Dark Reader interference
		backgroundColor: 'rgba(39, 39, 42, 0.1)',
		borderColor: 'rgba(161, 161, 170, 0.2)'
	};

	const CardContent = () => (
		<div
			onMouseMove={onMouseMove}
			className={`overflow-hidden relative duration-700 border rounded-xl hover:bg-zinc-800/10 group md:gap-8 hover:border-zinc-400/50 border-zinc-600 transition-all ${className}`}
			style={{
				backgroundColor: 'rgba(39, 39, 42, 0.05)',
				borderColor: 'rgb(82, 82, 91)'
			}}
		>
			<div className="pointer-events-none">
				<div className="absolute inset-0 z-0 transition duration-1000 [mask-image:linear-gradient(black,transparent)]" />
				<motion.div
					className="absolute inset-0 z-10 bg-gradient-to-br opacity-100 via-zinc-100/10 transition duration-1000 group-hover:opacity-50"
					style={style}
				/>
				<motion.div
					className="absolute inset-0 z-10 opacity-0 mix-blend-overlay transition duration-1000 group-hover:opacity-100"
					style={style}
				/>
			</div>
			{children}
		</div>
	);

	if (href) {
		return (
			<a href={href} className="block">
				<CardContent />
			</a>
		);
	}

	return <CardContent />;
};

// Additional card variants
export const ProjectCard: React.FC<{
	title: string;
	description: string;
	tags: string[];
	href?: string;
	image?: string;
}> = ({ title, description, tags, href, image }) => {
	return (
		<Card href={href} className="p-6 h-full">
			{image && (
				<div className="relative w-full h-48 mb-4 overflow-hidden rounded-lg">
					<img
						src={image}
						alt={title}
						className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
						style={{ filter: 'none' }} // Prevent Dark Reader from modifying images
					/>
				</div>
			)}
			<div className="relative z-20">
				<h3 className="text-xl font-semibold text-zinc-100 mb-2">{title}</h3>
				<p className="text-zinc-400 mb-4 leading-relaxed">{description}</p>
				<div className="flex flex-wrap gap-2">
					{tags.map((tag) => (
						<span
							key={tag}
							className="px-2 py-1 text-xs rounded-full bg-zinc-800/50 text-zinc-300 border border-zinc-700"
							style={{
								backgroundColor: 'rgba(39, 39, 42, 0.5)',
								borderColor: 'rgb(63, 63, 70)',
								color: 'rgb(212, 212, 216)'
							}}
						>
							{tag}
						</span>
					))}
				</div>
			</div>
		</Card>
	);
};
