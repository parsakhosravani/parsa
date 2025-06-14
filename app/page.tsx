import Link from "next/link";
import React from "react";
import Particles from "./components/particles";
import { Github, Twitter, ArrowDown, Code, Database, Globe } from "lucide-react";
import { SnakeGame } from "./components/snake-game";
import { StarlightCursor } from "./components/starlight-cursor";

const navigation = [
	{ name: "Projects", href: "/projects" },
	{ name: "About", href: "/about" },
	{ name: "Contact", href: "/contact" },
];

const socialLinks = [
	{
		name: "GitHub",
		href: "https://github.com/parsakhosravani",
		icon: Github,
		label: "View my code",
	},
	{
		name: "Twitter",
		href: "https://twitter.com/parsakhosravan1",
		icon: Twitter,
		label: "Follow me",
	},
];

const highlights = [
	{
		icon: Code,
		text: "Open Source Contributor",
		description: "Building tools for developers",
	},
	{
		icon: Database,
		text: "Serverless Expert",
		description: "Edge computing & Redis specialist",
	},
	{
		icon: Globe,
		text: "Full-Stack Engineer",
		description: "From infrastructure to UI",
	},
];

export default function Home() {
	return (
		<div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black relative cursor-none">
			{/* Starlight Cursor */}
			<StarlightCursor />

			{/* Enhanced Navigation */}
			<nav className="fixed top-0 left-0 right-0 z-50 my-6 animate-fade-in">
				<div className="flex items-center justify-between max-w-6xl mx-auto px-6">
					<Link
						href="/"
						className="text-lg font-semibold text-zinc-300 hover:text-white transition-colors"
					>
						PK
					</Link>
					<ul className="flex items-center justify-center gap-6">
						{navigation.map((item) => (
							<Link
								key={item.href}
								href={item.href}
								className="text-sm duration-500 text-zinc-400 hover:text-zinc-100 transition-colors px-3 py-2 rounded-md hover:bg-zinc-800/30"
							>
								{item.name}
							</Link>
						))}
					</ul>
				</div>
			</nav>

			{/* Snake Game - Top Right */}
			<div className="fixed top-20 right-6 z-40">
				<SnakeGame />
			</div>

			{/* Animated Lines */}
			<div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />

			{/* Particles Background */}
			<Particles
				className="absolute inset-0 -z-10 animate-fade-in"
				quantity={100}
			/>

			{/* Main Content */}
			<main className="flex flex-col items-center justify-center flex-1 max-w-4xl mx-auto px-6">
				{/* Hero Title */}
				<div className="text-center mb-8">
					<h1 className="z-10 text-4xl text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text">
						Parsa
					</h1>
					<div className="mt-4 relative">
						<p className="text-xl md:text-2xl text-zinc-300 font-medium animate-fade-in animation-delay-200">
							Khosravani
						</p>
						<div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-zinc-500 to-zinc-300 rounded-full animate-fade-in animation-delay-400"></div>
					</div>
				</div>

				{/* Enhanced Description */}
				<div className="text-center animate-fade-in animation-delay-600 mb-8">
					<h2 className="text-lg md:text-xl text-zinc-400 mb-4 max-w-2xl">
						Software Engineer building{" "}
						<span className="text-zinc-200 font-medium">developer tools</span>,{" "}
						<span className="text-zinc-200 font-medium">serverless infrastructure</span>, and{" "}
						<span className="text-zinc-200 font-medium">open source solutions</span>
					</h2>
					<p className="text-sm text-zinc-500 max-w-lg mx-auto">
						Currently working at Mofid Securities, building applications for the stock exchange and financial markets.
					</p>
				</div>

				{/* Highlights Grid */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 animate-fade-in animation-delay-800">
					{highlights.map((highlight, index) => (
						<div
							key={index}
							className="flex flex-col items-center text-center p-4 rounded-lg bg-zinc-900/20 border border-zinc-800/50 hover:border-zinc-700/50 transition-colors group"
						>
							<highlight.icon className="w-6 h-6 text-zinc-400 group-hover:text-zinc-300 transition-colors mb-2" />
							<h3 className="text-sm font-medium text-zinc-300 mb-1">
								{highlight.text}
							</h3>
							<p className="text-xs text-zinc-500">
								{highlight.description}
							</p>
						</div>
					))}
				</div>

				{/* Social Links */}
				<div className="flex items-center gap-6 mb-8 animate-fade-in animation-delay-1000">
					{socialLinks.map((social) => (
						<Link
							key={social.name}
							href={social.href}
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-200 transition-colors group"
							aria-label={social.label}
						>
							<social.icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
							<span className="hidden sm:inline">{social.name}</span>
						</Link>
					))}
				</div>

				{/* CTA Buttons */}
				<div className="flex flex-col sm:flex-row items-center gap-4 animate-fade-in animation-delay-1200">
					<Link
						href="/projects"
						className="px-6 py-3 bg-zinc-100 text-zinc-900 rounded-lg font-medium hover:bg-white transition-colors flex items-center gap-2"
					>
						View My Work
						<ArrowDown className="w-4 h-4 rotate-[-90deg]" />
					</Link>
					<Link
						href="/contact"
						className="px-6 py-3 border border-zinc-600 text-zinc-300 rounded-lg font-medium hover:border-zinc-400 hover:text-zinc-100 transition-colors"
					>
						Get In Touch
					</Link>
				</div>
			</main>

			{/* Bottom Line */}
			<div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
		</div>
	);
}
