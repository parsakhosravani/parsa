import { frameworks, type FrameworkSlug } from "./story";

/**
 * The book's table of contents. Chapters run in the order they happened,
 * so the numbering is a real sequence.
 */
export interface ChapterEntry {
  slug: FrameworkSlug;
  numeral: string;
  framework: string;
  company: string;
  city: string;
  years: string;
  /** One line that says what the chapter is about. */
  line: string;
  linkedin: string;
  /** Framework brand color, for fills and rules. */
  accent: string;
  /** Chapter color for text: a CSS variable that adapts to the theme. */
  accentText: string;
}

function colors(slug: FrameworkSlug) {
  const fw = frameworks.find((f) => f.slug === slug)!;
  return { accent: fw.accent, accentText: `var(--ch-${slug})` };
}

export const chapterIndex: ChapterEntry[] = [
  {
    slug: "vue",
    numeral: "I",
    framework: "Vue",
    company: "Khanoumi",
    city: "Tehran",
    years: "2021–22",
    line: "Ecommerce on sales days, with 50,000 customers arriving at once",
    linkedin: "https://www.linkedin.com/company/khanoumi",
    ...colors("vue"),
  },
  {
    slug: "react",
    numeral: "II",
    framework: "React",
    company: "AMR Tech",
    city: "Dubai",
    years: "2022–23",
    line: "Travel and visa flows at startup speed, with AI doing the paperwork",
    linkedin: "https://www.linkedin.com/company/amr-tech-co",
    ...colors("react"),
  },
  {
    slug: "angular",
    numeral: "III",
    framework: "Angular",
    company: "Mofid Securities",
    city: "Tehran",
    years: "2023–now",
    line: "Live market data for traders who decide in seconds",
    linkedin: "https://www.linkedin.com/company/mofidsecurities",
    ...colors("angular"),
  },
];

export function getChapter(slug: FrameworkSlug) {
  const i = chapterIndex.findIndex((c) => c.slug === slug);
  return {
    chapter: chapterIndex[i],
    prev: i > 0 ? chapterIndex[i - 1] : undefined,
    next: i < chapterIndex.length - 1 ? chapterIndex[i + 1] : undefined,
  };
}
