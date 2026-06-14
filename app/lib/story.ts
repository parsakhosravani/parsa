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
    "A journey told three ways — through React, Vue, and Angular. Same story, three lenses. Read it in whichever speaks your language.",
};

export const chapters: Chapter[] = [
  {
    id: "first-light",
    era: "The Beginning",
    title: "First Light",
    subtitle: "A curious kid and a blinking cursor",
    paragraphs: [
      "Long before I knew the word 'engineer', I was the kid taking things apart just to see what made them tick — and not always getting them back together.",
      "Then I met a blinking cursor on a black screen. I typed a few timid lines, hit enter, and something on the page moved because I told it to. That small jolt of cause and effect rewired me.",
      "I didn't know it yet, but that was the first chapter. A question had taken root and refused to leave: how does any of this actually work?",
    ],
  },
  {
    id: "breaking-to-build",
    era: "Learning the Craft",
    title: "Breaking to Build",
    subtitle: "Years of breaking things on purpose",
    paragraphs: [
      "I learned the web the honest way — by breaking it, over and over, on purpose. Every red error message was a locked door, and I collected the keys one frustrating night at a time.",
      "HTML gave me structure, CSS gave me voice, JavaScript gave me motion. The browser stopped being a mystery and slowly became a canvas I actually trusted.",
      "Frameworks arrived like new dialects of a language I already loved. I stopped asking 'can I build this?' and started asking 'how should this feel to use?'",
    ],
  },
  {
    id: "into-the-markets",
    era: "The Work",
    title: "Into the Markets",
    subtitle: "Where milliseconds and trust both matter",
    paragraphs: [
      "At Mofid Securities I stepped into the world of financial markets — screens where a fraction of a second and a sliver of trust can decide someone's day.",
      "Here I learned that frontend is never 'just the UI'. It's clarity when the numbers are moving, composure when the load spikes, and an interface people lean on with real money on the line.",
      "I grew from someone who shipped features into someone who owns outcomes — measuring, refining, and sweating the details nobody notices until they're missing.",
    ],
  },
  {
    id: "the-human-side",
    era: "The Life",
    title: "The Human Side",
    subtitle: "Everything the editor doesn't show",
    paragraphs: [
      "Code is only half of who I am. The other half is the people around me, the quiet mornings, and the long walks where a stubborn bug finally untangles itself a mile from any keyboard.",
      "I learned that rest is not the opposite of work — it's part of it. The best ideas rarely arrive while I'm staring at the screen; they show up once I've stepped away from it.",
      "Balance turned out to be its own craft: knowing when to push hard, when to log off, and how to protect the curiosity that started all of this.",
    ],
  },
  {
    id: "whats-next",
    era: "The Road Ahead",
    title: "What Comes Next",
    subtitle: "Still building, still learning",
    paragraphs: [
      "I'm still that curious kid — just with sharper tools, harder questions, and a little more patience for the messy middle of every project.",
      "I want to build things that feel effortless to the people using them and honest to the people maintaining them. Fast, clear, human.",
      "The next chapter is unwritten, and that's the part I love most. If any of this resonated, I'd genuinely love to write some of it with you.",
    ],
  },
];

export const frameworks = [
  {
    slug: "react",
    name: "React",
    accent: "#61dafb",
    accentText: "#0b9dc7",
    blurb: "The story rendered with hooks and JSX.",
  },
  {
    slug: "vue",
    name: "Vue",
    accent: "#42b883",
    accentText: "#2f9e6b",
    blurb: "The same journey, mounted with a live Vue app.",
  },
  {
    slug: "angular",
    name: "Angular",
    accent: "#dd0031",
    accentText: "#dd0031",
    blurb: "One more telling, bootstrapped with Angular.",
  },
] as const;
