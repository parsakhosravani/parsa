export interface Project {
  name: string;
  description: string;
  language: string;
  url: string;
  demo?: string;
  stars: number;
  tags: string[];
}

// Curated, real public repositories from github.com/parsakhosravani.
export const githubUrl = "https://github.com/parsakhosravani";

export const projects: Project[] = [
  {
    name: "valorians-frontend",
    description:
      "Frontend for Valorians, an interactive game experience built with TypeScript and a modern React stack.",
    language: "TypeScript",
    url: "https://github.com/parsakhosravani/valorians-frontend",
    demo: "https://valorians-legend.vercel.app",
    stars: 1,
    tags: ["React", "TypeScript", "Game UI"],
  },
  {
    name: "lobox-frontend-challenge",
    description:
      "A polished frontend challenge implementation focused on clean component architecture and interaction details.",
    language: "TypeScript",
    url: "https://github.com/parsakhosravani/lobox-frontend-challenge",
    demo: "https://lobox-frontend-challenge.vercel.app",
    stars: 1,
    tags: ["TypeScript", "Frontend", "UI"],
  },
  {
    name: "nextjs-prisma-postgres",
    description:
      "Full-stack Next.js app using Prisma as a next-generation ORM over PostgreSQL for type-safe data access.",
    language: "TypeScript",
    url: "https://github.com/parsakhosravani/nextjs-prisma-postgres",
    demo: "https://nextjs-prisma-postgres-five.vercel.app",
    stars: 0,
    tags: ["Next.js", "Prisma", "PostgreSQL"],
  },
  {
    name: "mini-game",
    description:
      "An interactive browser mini-game built in TypeScript, exploring state, animation, and game loop logic.",
    language: "TypeScript",
    url: "https://github.com/parsakhosravani/mini-game",
    demo: "https://mini-game-lac.vercel.app",
    stars: 0,
    tags: ["TypeScript", "Canvas", "Interaction"],
  },
  {
    name: "Customer-Support-Agent-Dashboard",
    description:
      "A TypeScript dashboard for customer-support agents, focused on clear data presentation and workflow.",
    language: "TypeScript",
    url: "https://github.com/parsakhosravani/Customer-Support-Agent-Dashboard",
    stars: 0,
    tags: ["TypeScript", "Dashboard", "React"],
  },
  {
    name: "design-system",
    description:
      "Reactx Design System — reusable UI components and design tokens for consistent product interfaces.",
    language: "TypeScript",
    url: "https://github.com/parsakhosravani/design-system",
    demo: "https://studio.backlight.dev/doc/1Xi2juxDnPKEmY4XdxAp",
    stars: 0,
    tags: ["Design System", "Components", "UI"],
  },
];
