// Central site configuration. Override the URL per environment with
// NEXT_PUBLIC_SITE_URL (e.g. in production), falling back to a sensible default.
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://parsakhosravani.com";

export const site = {
  name: "Parsa Khosravani",
  title: "Parsa Khosravani | Senior Frontend Engineer",
  description:
    "Portfolio of Parsa Khosravani — a product-minded frontend engineer building fast, reliable interfaces across ecommerce, travel, and market systems with React, Vue, and Angular.",
  author: "Parsa Khosravani",
  jobTitle: "Senior Frontend Engineer",
  twitter: "@parsakhosravani",
  email: "parsakhosravani@gmail.com",
  profiles: [
    "https://github.com/parsakhosravani",
    "https://www.linkedin.com/in/parsakhosravani",
    "https://adplist.org/mentors/parsa-khosravani",
  ],
} as const;
