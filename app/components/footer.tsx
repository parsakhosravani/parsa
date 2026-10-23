import { site } from "../lib/site";

const elsewhere = [
  { href: "https://www.linkedin.com/in/parsakhosravani", label: "LinkedIn" },
  { href: "https://github.com/parsakhosravani", label: "GitHub" },
  { href: "https://adplist.org/mentors/parsa-khosravani", label: "AdpList" },
  { href: "/feed.xml", label: "RSS" },
];

export function Footer() {
  return (
    <footer className="mt-28 border-t border-rule">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 md:grid-cols-[11rem_1fr]">
        <p className="text-sm text-ink-faint">Colophon</p>
        <div>
          <p className="font-display max-w-2xl text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] text-ink">
            Building something that has to hold up under pressure? I’d like to
            hear about it.
          </p>
          <a
            href={`mailto:${site.email}`}
            className="font-display link mt-6 inline-block text-[clamp(1.25rem,2.6vw,1.75rem)] text-cobalt"
          >
            {site.email}
          </a>

          <div className="mt-14 flex flex-col gap-6 text-sm text-ink-soft sm:flex-row sm:items-end sm:justify-between">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {elsewhere.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    {...(link.href.startsWith("http")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="link"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="max-w-sm text-ink-faint">
              Set in Newsreader and Hanken Grotesk. Built with Next.js, with
              chapters rendered in React, Vue and Angular. ©{" "}
              {new Date().getFullYear()} {site.author}.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
