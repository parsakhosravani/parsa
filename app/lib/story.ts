export interface Chapter {
  id: string;
  era: string;
  title: string;
  subtitle: string;
  paragraphs: string[];
}

export type FrameworkSlug = "react" | "vue" | "angular";

export interface FrameworkStory {
  eyebrow: string;
  title: string;
  lede: string;
  company: string;
  period: string;
  highlights: string[];
  chapters: Chapter[];
}

export const intro = {
  name: "Parsa Khosravani",
  role: "Software Engineer",
  tagline:
    "This is the story version of my career: long releases, Black Friday pressure, startup deadlines, market-scale systems, and the habits that kept me sane somewhere between shipping code and playing Dota or Counter-Strike at night.",
};

export const chapters: Chapter[] = [
  {
    id: "foundation",
    era: "The Foundation",
    title: "How I Ended Up Here",
    subtitle: "Curiosity, engineering, and liking the hard parts",
    paragraphs: [
      "I did not get into software because it looked calm. I got into it because I liked the feeling of figuring things out, especially when the problem looked bigger than me at first.",
      "Frontend stuck with me because it has both sides of the job in one place: the clean engineering part and the human part. You can optimize a render path in the morning and still spend the afternoon thinking about what a user feels when a page hesitates for half a second.",
      "Outside work, I have always liked games like Dota and Counter-Strike for the same reason I like engineering teams: timing matters, communication matters, and one small mistake can change the whole round. That mindset follows me into product work more than I expected.",
    ],
  },
  {
    id: "yecomsoft",
    era: "The First Professional Chapter",
    title: "The Early Days",
    subtitle: "Learning how real work feels once users are involved",
    paragraphs: [
      "YecomSoft was where things stopped being theoretical for me. Suddenly the work was not just about whether code runs. It was about whether people could use it, whether teams could depend on it, and whether shipping it actually helped the business.",
      "I worked on a bilingual audiobook store and on EPUB automation scripts, and that mix was surprisingly useful for shaping how I think. One side taught me product polish, the other taught me that a good internal tool can save a team more pain than any flashy feature.",
      "That chapter gave me my first real taste of ownership. Not senior ownership yet, but the kind where you start seeing software as a system of tradeoffs instead of a list of tickets.",
    ],
  },
  {
    id: "khanoumi",
    era: "Vue and Ecommerce",
    title: "When Traffic Gets Real",
    subtitle: "Khanoumi, Vue, and learning to respect big events",
    paragraphs: [
      "Khanoumi was one of the first places where I really felt the rhythm of ecommerce. Normal days were one thing, but campaign days were something else entirely. You could feel the pressure in the room before a big event even started.",
      "Part of that chapter happened around the coronavirus period, when online demand changed how people bought and how seriously uptime had to be treated. Then there were Black Friday-style moments, with more than 50,000 customers depending on the experience not falling apart at exactly the wrong time.",
      "Using Vue and Nuxt there taught me that frontend is not decoration. It is infrastructure for trust. If the app is slow, broken, or confusing during the peak, nobody cares how nice the component architecture looks. They just leave.",
    ],
  },
  {
    id: "amr",
    era: "React and Operations",
    title: "Startup Pace, Startup Nights",
    subtitle:
      "AMR, React, deadlines, and learning to move fast without losing the plot",
    paragraphs: [
      "AMR had a very different energy. It was fresh, ambitious, and very startup in the truest sense. The kind of place where the roadmap changes fast, deadlines come hard, and some nights become much longer than you planned in the morning.",
      "We were building for OTA-style travel and visa flows, and React became the tool I used to keep complicated experiences from feeling heavy. Some of the work was performance tuning, some of it was AI-assisted form processing, and some of it was simply surviving the pace without letting the product become messy.",
      "That chapter taught me a lot about going through deadline pressure with a team. There is a specific feeling to shipping after an overnight push, checking the result the next day, and realizing you are more capable than you thought. Exhausting, yes. But unforgettable too.",
    ],
  },
  {
    id: "mofid",
    era: "Markets and Scale",
    title: "Scale, Structure, and Breathing Room",
    subtitle: "Mofid, market systems, and a more mature way of building",
    paragraphs: [
      "Mofid felt different from the moment I joined. It had scale, structure, many teams, and the kind of engineering environment where one decision can ripple through a much bigger system than your own squad.",
      "I liked that. After startup intensity, it was valuable to work somewhere that still moved seriously but also taught me more about balance, ownership at scale, and how larger tech organizations coordinate without everything turning into chaos.",
      "It is also where I learned that I enjoy mature engineering problems: legacy migration, live data, design systems, monitoring, and the slow careful work of improving a product that already matters to a lot of people.",
    ],
  },
];

export const frameworks = [
  {
    slug: "react",
    name: "React",
    accent: "#61dafb",
    accentText: "#0b9dc7",
    blurb:
      "The AMR Tech chapter: faster travel flows, AI-assisted forms, and React-driven performance work.",
  },
  {
    slug: "vue",
    name: "Vue",
    accent: "#42b883",
    accentText: "#2f9e6b",
    blurb:
      "The Khanoumi chapter: Nuxt migration, design systems, and conversion-focused ecommerce work.",
  },
  {
    slug: "angular",
    name: "Angular",
    accent: "#dd0031",
    accentText: "#dd0031",
    blurb:
      "The Mofid Securities chapter: Angular-era migration, live market data, and platform quality at scale.",
  },
] as const;

export const frameworkStories: Record<FrameworkSlug, FrameworkStory> = {
  react: {
    eyebrow: "React at AMR Tech",
    title: "The startup chapter: React, deadlines, and late nights",
    lede: "AMR Tech was one of those chapters that felt alive all the time. New company energy, OTA-style travel products, visa flows, fast deadlines, and the kind of teamwork where some of the best stories come from the nights that ran longer than anyone planned.",
    company: "AMR Tech · Dubai",
    period: "Aug 2022 — Jul 2023",
    highlights: ["Crunch Nights", "OTA Rush", "AI Assist", "Ship by Dawn"],
    chapters: [
      {
        id: "react-performance",
        era: "Performance",
        title: "Trying to Make a Busy Product Feel Calm",
        subtitle: "Because speed is emotional before it is technical",
        paragraphs: [
          "Travel products can become noisy very quickly. A few extra widgets here, a heavier screen there, and suddenly the whole thing feels more stressful than it should.",
          "A lot of my React work at AMR was about calming that down: optimizing libraries, improving asset loading, and dynamically importing heavy components like charts until the experience felt lighter in the hand.",
          "We improved web performance by 20%, but what I remember more is the feeling that the product finally breathed better. It stopped fighting the user so much.",
        ],
      },
      {
        id: "react-ai-forms",
        era: "Automation",
        title: "The Kind of AI Work That Actually Helps",
        subtitle: "Less hype, more real operational relief",
        paragraphs: [
          "One of the most satisfying things we built was an AI image-processing flow that helped populate visa forms automatically.",
          "I liked that project because it was not trying to impress anyone with buzzwords. It was trying to remove boring, error-prone work from people's days and give them back time.",
          "That flow reduced processing time by 54%, and for me it was a good reminder that the best engineering wins often feel simple once they are working.",
        ],
      },
      {
        id: "react-design-sync",
        era: "Systems",
        title: "Shipping Fast Without Letting Things Drift",
        subtitle: "Design sync, tests, and surviving startup velocity",
        paragraphs: [
          "Fast teams can drift if nobody protects the system. I built a Figma variables script to keep design tokens aligned with the app, which cut implementation time by 30% and saved us from a lot of small inconsistencies.",
          "I also kept leaning on Jest and Cypress because deadlines are exactly when a team needs guardrails, not guesswork.",
          "That is how I remember AMR now: ambitious, a little chaotic in the best startup way, and full of moments where the team had to stay sharp together.",
        ],
      },
    ],
  },
  vue: {
    eyebrow: "Vue at Khanoumi",
    title: "The ecommerce chapter: traffic, campaigns, and trust",
    lede: "Khanoumi taught me what ecommerce pressure really feels like. You do not just build pages there. You prepare for spikes, campaigns, late changes, and the quiet fear that the most important hour is the exact hour something could break.",
    company: "Khanoumi · Tehran",
    period: "Mar 2021 — Aug 2022",
    highlights: [
      "Black Friday Pulse",
      "Corona Surge",
      "50K Uptime",
      "Conversion Gravity",
    ],
    chapters: [
      {
        id: "vue-migration",
        era: "Migration",
        title: "Modernizing in the Middle of Real Traffic",
        subtitle: "Nuxt migration while the business keeps moving",
        paragraphs: [
          "At Khanoumi, I worked on moving the frontend from C#.Net to Nuxt.js, and what I liked about that migration was that it happened in the middle of a living business, not in a quiet lab.",
          "The goal was simple to say but hard to do: make the stack more modern, improve developer experience, and still keep the product dependable while customers continue shopping.",
          "We improved developer experience by 45%, but the bigger value was confidence. The team could move faster without feeling like every change might crack the foundation.",
        ],
      },
      {
        id: "vue-system",
        era: "Design Systems",
        title: "Getting Ready for the Big Days",
        subtitle: "Design systems matter more when the pressure rises",
        paragraphs: [
          "Campaign periods change the mood of an ecommerce company. Everyone is watching traffic, everyone is watching conversion, and everyone wants changes yesterday.",
          "That is exactly when a design system becomes more than a nice engineering idea. Reusable, predictable UI helped us ship faster, stay consistent, and keep our heads during busy periods.",
          "It improved development efficiency by 20%, but emotionally it did something even more useful: it reduced panic.",
        ],
      },
      {
        id: "vue-conversion",
        era: "Growth",
        title: "Coronavirus, Black Friday Energy, and Not Going Down",
        subtitle: "When frontend becomes part of the business heartbeat",
        paragraphs: [
          "The Khanoumi chapter is the one where I most remember the atmosphere around events. Coronavirus changed online behavior, big campaigns raised the stakes, and Black Friday-style traffic made uptime feel personal.",
          "When more than 50,000 customers are showing up, frontend stops being a layer and starts feeling like part of the storefront itself. Every slowdown, every bug, every confusing state has a real cost.",
          "We built campaign mechanics like lucky wheel and event experiences that lifted conversion by 48%, but what stayed with me most was the responsibility of keeping the experience standing when the attention was at its highest.",
        ],
      },
    ],
  },
  angular: {
    eyebrow: "Angular at Mofid Securities",
    title: "The scale chapter: structure, markets, and long-term thinking",
    lede: "Mofid is where the story becomes bigger in every direction: more teams, more users, more structure, more responsibility, and honestly a healthier understanding of balance too. It taught me how serious engineering feels inside a large-scale product environment.",
    company: "Mofid Securities · Tehran",
    period: "Aug 2023 — Present",
    highlights: [
      "Market Scale",
      "Team of Teams",
      "Calm Under Ticks",
      "Balance Mode",
    ],
    chapters: [
      {
        id: "angular-migration",
        era: "Migration",
        title: "Walking Into a Much Bigger System",
        subtitle: "Legacy, migration, and learning how large teams move",
        paragraphs: [
          "Joining Mofid meant joining a much larger machine. More teams, more dependencies, more users, and more reasons to be thoughtful before changing something important.",
          "Part of the work involved helping move the product away from AngularJS toward Next.js, and I learned quickly that migrations at this scale are as much about coordination and patience as they are about code.",
          "We improved developer experience by 45%, but what mattered most was doing it without shaking user trust. In finance, that trust is the whole game.",
        ],
      },
      {
        id: "angular-live-data",
        era: "Realtime Systems",
        title: "When the Numbers Never Sit Still",
        subtitle: "Real-time data and why calm interfaces matter",
        paragraphs: [
          "Live market products have a very particular tension to them. The data is always moving, users are making decisions in motion, and your UI has to stay readable even when everything underneath it is changing.",
          "I worked on integrating Lightstreamer with AG Grid and related components, which reduced latency by 40% and made the flow of information feel more immediate and reliable.",
          "I love this kind of problem because it is technical in a deep way, but the result is still human. The user either feels confident or they do not.",
        ],
      },
      {
        id: "angular-platform",
        era: "Platform Quality",
        title: "A More Structured Way to Grow",
        subtitle:
          "Design systems, testing, and work-life balance that actually exists",
        paragraphs: [
          "Mofid also changed how I think about sustainability. Strong teams need design systems, tests, monitoring, and conventions not because those things are glamorous, but because they let people work well over time.",
          "I worked on Storybook, testing, component independence, and monitoring improvements, helping push test coverage 70% higher and making the platform less fragile under change.",
          "What I appreciated personally was that this chapter also showed me a better version of work-life balance. Serious work, big scale, many teams, a lot to learn, but still enough structure to grow without burning all the way out.",
        ],
      },
    ],
  },
};
