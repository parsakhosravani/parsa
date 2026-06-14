export interface Chapter {
  id: string;
  era: string;
  title: string;
  subtitle: string;
  paragraphs: string[];
}

export const intro = {
  name: "Parsa Khosravani",
  role: "Software Engineer",
  tagline:
    "A journey told three ways — through React, Vue, and Angular. Same story, three lenses.",
};

export const chapters: Chapter[] = [
  {
    id: "first-light",
    era: "The Beginning",
    title: "First Light",
    subtitle: "A curious kid and a blinking cursor",
    paragraphs: [
      "It started with a question I couldn't let go of: how does any of this actually work?",
      "The first time a few lines of code changed something on a screen, I was hooked. That tiny moment of cause and effect felt like a small kind of magic.",
    ],
  },
  {
    id: "breaking-to-build",
    era: "Learning the Craft",
    title: "Breaking to Build",
    subtitle: "Years of breaking things on purpose",
    paragraphs: [
      "I learned the web the honest way — by breaking it. Every bug was a teacher, every error message a breadcrumb.",
      "Slowly the browser stopped being a mystery and became a canvas. HTML, CSS, JavaScript, and the frameworks that grew around them became the tools I reached for every day.",
    ],
  },
  {
    id: "into-the-markets",
    era: "The Work",
    title: "Into the Markets",
    subtitle: "Building where milliseconds and trust matter",
    paragraphs: [
      "At Mofid Securities I started building for financial markets — platforms where a fraction of a second and a moment of trust can mean everything.",
      "I learned that great frontend work is not just pixels. It is clarity under pressure, performance when it counts, and interfaces people can rely on with real stakes on the line.",
    ],
  },
  {
    id: "the-human-side",
    era: "The Life",
    title: "The Human Side",
    subtitle: "Everything the editor doesn't show",
    paragraphs: [
      "Code is only half the story. The other half is the people, the rest, the long walks where a stubborn problem finally untangles itself.",
      "Balance turned out to be a skill too — knowing when to push, when to step back, and how to keep curiosity alive without burning it out.",
    ],
  },
  {
    id: "whats-next",
    era: "The Road Ahead",
    title: "What Comes Next",
    subtitle: "Still building, still learning",
    paragraphs: [
      "I'm still that curious kid, just with better tools and harder questions.",
      "The next chapter is unwritten — and that is exactly the part I love most.",
    ],
  },
];

export const frameworks = [
  {
    slug: "react",
    name: "React",
    accent: "#61dafb",
    blurb: "The story rendered with hooks and JSX.",
  },
  {
    slug: "vue",
    name: "Vue",
    accent: "#42b883",
    blurb: "The same journey, mounted with a live Vue app.",
  },
  {
    slug: "angular",
    name: "Angular",
    accent: "#dd0031",
    blurb: "One more telling, bootstrapped with Angular.",
  },
] as const;
