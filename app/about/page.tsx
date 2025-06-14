"use client";
import { Code, Database, Globe, Rocket, Server, Zap } from "lucide-react";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";

const skills = [
    {
        icon: <Code size={20} />,
        title: "Full-Stack Development",
        description: "TypeScript, React, Next.js, Node.js",
        color: "from-blue-500 to-cyan-500",
    },
    {
        icon: <Server size={20} />,
        title: "Serverless & Edge",
        description: "Vercel Edge, Cloudflare Workers, AWS Lambda",
        color: "from-purple-500 to-pink-500",
    },
    {
        icon: <Database size={20} />,
        title: "Database & Storage",
        description: "Redis, PostgreSQL, Kafka",
        color: "from-green-500 to-emerald-500",
    },
    {
        icon: <Globe size={20} />,
        title: "Frontend Engineering",
        description: "React, Next.js, TypeScript, Tailwind CSS",
        color: "from-orange-500 to-red-500",
    },
    {
        icon: <Zap size={20} />,
        title: "Performance",
        description: "Edge computing, CDN optimization, Caching",
        color: "from-yellow-500 to-orange-500",
    },
    {
        icon: <Rocket size={20} />,
        title: "Open Source",
        description: "Libraries, Tools, DevEx optimization",
        color: "from-indigo-500 to-purple-500",
    },
];

export default function About() {
    return (
        <div className="bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0">
            <Navigation />
            <div className="container flex items-center justify-center min-h-screen px-4 mx-auto">
                <div className="max-h-7xl mx-auto py-4 md:py-8 lg:py-16">
                    {/* Hero Section */}
                    <div className="text-center mb-16">
                        <h1 className="text-4xl font-bold text-zinc-100 mb-6 lg:text-6xl">
                            About Me
                        </h1>
                        <p className="text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
                            I'm a frontend engineer passionate about building applications that
                            drive business growth across various industries. Currently working at{" "}
                            <a
                                href="https://www.emofid.com/"
                                className="text-zinc-200 hover:text-white transition-colors underline decoration-zinc-600 hover:decoration-zinc-400"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Mofid Securities
                            </a>
                            , building applications for the stock exchange and financial markets.
                        </p>
                    </div>

                    {/* Skills Grid */}
                    <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
                        {skills.map((skill, index) => (
                            <Card key={index}>
                                <div className="p-6 relative flex flex-col items-center gap-4 duration-700 group md:gap-6 md:py-12">
                                    <span
                                        className="absolute w-px h-2/3 bg-gradient-to-b from-zinc-500 via-zinc-500/50 to-transparent"
                                        aria-hidden="true"
                                    />
                                    <div className="relative z-10 flex items-center justify-center w-16 h-16 text-sm duration-1000 border rounded-full text-zinc-200 group-hover:text-white group-hover:bg-zinc-900 border-zinc-500 bg-zinc-900 group-hover:border-zinc-200">
                                        {skill.icon}
                                    </div>
                                    <div className="z-10 flex flex-col items-center text-center">
                                        <h3 className="text-lg font-medium duration-150 text-zinc-200 group-hover:text-white font-display mb-2">
                                            {skill.title}
                                        </h3>
                                        <p className="text-sm duration-1000 text-zinc-400 group-hover:text-zinc-200">
                                            {skill.description}
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>

                    {/* Additional Info */}
                    <div className="mt-16 text-center">
                        <div className="max-w-2xl mx-auto">
                            <h2 className="text-2xl font-bold text-zinc-100 mb-6">
                                What I'm Working On
                            </h2>
                            <div className="space-y-4 text-zinc-400">
                                <p>
                                    Currently building robust applications that help businesses thrive
                                    in various sectors including fintech and e-commerce. I specialize
                                    in creating user-friendly interfaces that solve real business
                                    problems and drive growth.
                                </p>
                                <p>
                                    As a frontend engineer, I focus on delivering exceptional user
                                    experiences while ensuring scalability and performance. Whether
                                    it's building trading platforms for financial markets or creating
                                    seamless shopping experiences for e-commerce, I help businesses
                                    connect with their customers through technology.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}