"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import { Eye, Star, GitFork, ExternalLink, Github } from "lucide-react";

interface GitHubRepo {
    id: number;
    name: string;
    full_name: string;
    description: string | null;
    html_url: string;
    homepage: string | null;
    stargazers_count: number;
    forks_count: number;
    language: string | null;
    created_at: string;
    updated_at: string;
    pushed_at: string;
    topics: string[];
}

interface Project {
    id: number;
    name: string;
    description: string;
    url: string;
    homepage: string | null;
    stars: number;
    forks: number;
    language: string | null;
    createdAt: string;
    updatedAt: string;
    topics: string[];
}

const ProjectCard: React.FC<{ project: Project; featured?: boolean }> = ({
    project,
    featured = false
}) => {
    return (
        <Card>
            <div className="relative w-full h-full p-4 md:p-8">
                <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="text-xs text-zinc-100">
                        <time dateTime={project.createdAt}>
                            {Intl.DateTimeFormat(undefined, {
                                dateStyle: "medium",
                            }).format(new Date(project.createdAt))}
                        </time>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-zinc-500">
                        <span className="flex items-center gap-1">
                            <Star className="w-3 h-3" />
                            {project.stars}
                        </span>
                        <span className="flex items-center gap-1">
                            <GitFork className="w-3 h-3" />
                            {project.forks}
                        </span>
                    </div>
                </div>

                <div className="flex items-start justify-between gap-4 mb-4">
                    <h2 className={`font-bold text-zinc-100 group-hover:text-white font-display ${featured ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'
                        }`}>
                        {project.name}
                    </h2>
                    <div className="flex gap-2 flex-shrink-0">
                        <Link
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-zinc-400 hover:text-zinc-200 transition-colors"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Github className="w-4 h-4" />
                        </Link>
                        {project.homepage && (
                            <Link
                                href={project.homepage}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 text-zinc-400 hover:text-zinc-200 transition-colors"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <ExternalLink className="w-4 h-4" />
                            </Link>
                        )}
                    </div>
                </div>

                {project.description && (
                    <p className="leading-6 duration-150 text-zinc-400 group-hover:text-zinc-300 mb-4">
                        {project.description}
                    </p>
                )}

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        {project.language && (
                            <span className="px-2 py-1 text-xs bg-zinc-800 text-zinc-300 rounded">
                                {project.language}
                            </span>
                        )}
                        {project.topics.slice(0, 2).map((topic) => (
                            <span
                                key={topic}
                                className="px-2 py-1 text-xs bg-zinc-800/50 text-zinc-400 rounded"
                            >
                                {topic}
                            </span>
                        ))}
                    </div>
                    <span className="text-xs text-zinc-500">
                        Updated {new Date(project.updatedAt).toLocaleDateString()}
                    </span>
                </div>
            </div>
        </Card>
    );
};

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                setLoading(true);
                const response = await fetch(
                    'https://api.github.com/users/parsakhosravani/repos?sort=updated&per_page=100'
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch repositories');
                }

                const repos: GitHubRepo[] = await response.json();

                // Filter and transform repositories
                const filteredProjects = repos
                    .filter(repo => !repo.name.includes('.github') && !repo.name.includes('config'))
                    .map(repo => ({
                        id: repo.id,
                        name: repo.name,
                        description: repo.description || '',
                        url: repo.html_url,
                        homepage: repo.homepage,
                        stars: repo.stargazers_count,
                        forks: repo.forks_count,
                        language: repo.language,
                        createdAt: repo.created_at,
                        updatedAt: repo.updated_at,
                        topics: repo.topics || []
                    }))
                    .sort((a, b) => b.stars - a.stars); // Sort by stars

                setProjects(filteredProjects);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    if (loading) {
        return (
            <div className="bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0 relative pb-16">
                <Navigation />
                <div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
                    <div className="max-w-2xl mx-auto lg:mx-0">
                        <h1 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
                            Projects
                        </h1>
                        <p className="mt-4 text-zinc-400">
                            Loading projects from GitHub...
                        </p>
                    </div>
                    <div className="w-full h-px bg-zinc-800" />
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {[...Array(6)].map((_, i) => (
                            <Card key={i}>
                                <div className="p-4 md:p-8 animate-pulse">
                                    <div className="h-4 bg-zinc-800 rounded mb-4"></div>
                                    <div className="h-6 bg-zinc-800 rounded mb-2"></div>
                                    <div className="h-4 bg-zinc-800 rounded w-3/4"></div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0 relative pb-16">
                <Navigation />
                <div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
                    <div className="max-w-2xl mx-auto lg:mx-0">
                        <h1 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
                            Projects
                        </h1>
                        <p className="mt-4 text-red-400">
                            Error loading projects: {error}
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    const featured = projects[0]; // Most starred project
    const topProjects = projects.slice(1, 5); // Next 4 projects
    const otherProjects = projects.slice(5); // Rest of the projects

    return (
        <div className="bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0 relative pb-16">
            <Navigation />
            <div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
                <div className="max-w-2xl mx-auto lg:mx-0">
                    <h1 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
                        Projects
                    </h1>
                    <p className="mt-4 text-zinc-400">
                        A collection of my open source projects and experiments. 
                        All sourced directly from my GitHub repositories.
                    </p>
                </div>
                <div className="w-full h-px bg-zinc-800" />

                {/* Featured Project */}
                {featured && (
                    <>
                        <div className="grid grid-cols-1 gap-8 mx-auto">
                            <ProjectCard project={featured} featured />
                        </div>
                        <div className="hidden w-full h-px md:block bg-zinc-800" />
                    </>
                )}

                {/* Top Projects Grid */}
                {topProjects.length > 0 && (
                    <>
                        <div className="grid grid-cols-1 gap-4 mx-auto md:grid-cols-2 lg:grid-cols-2">
                            {topProjects.map((project) => (
                                <ProjectCard key={project.id} project={project} />
                            ))}
                        </div>
                        <div className="hidden w-full h-px md:block bg-zinc-800" />
                    </>
                )}

                {/* Other Projects */}
                {otherProjects.length > 0 && (
                    <div className="grid grid-cols-1 gap-4 mx-auto lg:mx-0 md:grid-cols-2 lg:grid-cols-3">
                        {otherProjects.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </div>
                )}

                {projects.length === 0 && (
                    <div className="text-center text-zinc-400">
                        <p>No projects found.</p>
                    </div>
                )}
            </div>
        </div>
    );
}