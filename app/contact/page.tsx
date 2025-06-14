"use client";
import { Github, Mail, Twitter, MapPin, Calendar, Clock, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import { useState } from "react";

const socials = [
  {
    icon: <Twitter size={20} />,
    href: "https://twitter.com/parsakhosravan1",
    label: "Twitter",
    handle: "@parsakhosravan1",
    description: "Latest thoughts and updates",
    color: "hover:text-blue-400",
    bgColor: "group-hover:bg-blue-500/10",
  },
  {
    icon: <Mail size={20} />,
    href: "mailto:parsakhosravani@gmail.com",
    label: "Email",
    handle: "parsakhosravani@gmail.com",
    description: "Best for collaboration inquiries",
    color: "hover:text-green-400",
    bgColor: "group-hover:bg-green-500/10",
  },
  {
    icon: <Github size={20} />,
    href: "https://github.com/parsakhosravani",
    label: "Github",
    handle: "parsakhosravani",
    description: "Open source projects and code",
    color: "hover:text-purple-400",
    bgColor: "group-hover:bg-purple-500/10",
  },
];

const quickInfo = [
  {
    icon: <MapPin size={16} />,
    label: "Location",
    value: "Tehran",
  },
  {
    icon: <Clock size={16} />,
    label: "Timezone",
    value: "UTC+3:30",
  },
  {
    icon: <Calendar size={16} />,
    label: "Response Time",
    value: "24-48 hours",
  },
];

export default function Contact() {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyEmail = async () => {
    await navigator.clipboard.writeText("parsakhosravani@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0 min-h-screen">
      <Navigation />
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16 mt-16">
          <h1 className="text-4xl font-bold text-zinc-100 mb-6 lg:text-6xl animate-fade-in">
            Let's Connect
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed animate-fade-in animation-delay-200">
            Always interested in new opportunities, collaborations, and connecting
            with fellow developers. Feel free to reach out through any of these
            channels.
          </p>
        </div>

        {/* Quick Info Bar */}
        <div className="flex flex-wrap justify-center gap-6 mb-12 animate-fade-in animation-delay-400">
          {quickInfo.map((info, index) => (
            <div
              key={index}
              className="flex items-center gap-2 text-sm text-zinc-400"
            >
              {info.icon}
              <span className="text-zinc-500">{info.label}:</span>
              <span className="text-zinc-300">{info.value}</span>
            </div>
          ))}
        </div>

        <div className="grid w-full grid-cols-1 gap-8 mx-auto sm:grid-cols-3 lg:gap-12 mb-16">
          {socials.map((social, index) => (
            <Card
              key={social.label}
              className={`animate-fade-in animation-delay-${600 + index * 200
                }`}
            >
              <Link
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-6 relative flex flex-col items-center gap-6 duration-700 group md:gap-8 md:py-16 ${social.bgColor} transition-all`}
              >
                <span
                  className="absolute w-px h-2/3 bg-gradient-to-b from-zinc-500 via-zinc-500/50 to-transparent"
                  aria-hidden="true"
                />
                <span
                  className={`relative z-10 flex items-center justify-center w-16 h-16 text-sm duration-1000 border rounded-full text-zinc-200 group-hover:text-white group-hover:bg-zinc-900 border-zinc-500 bg-zinc-900 group-hover:border-zinc-200 ${social.color} transition-all`}
                >
                  {social.icon}
                </span>

                <div className="z-10 flex flex-col items-center text-center">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg font-medium duration-150 lg:text-2xl text-zinc-200 group-hover:text-white font-display">
                      {social.handle}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-zinc-300 transition-colors" />
                  </div>
                  <span className="text-sm text-zinc-400 group-hover:text-zinc-200 transition-colors mb-2">
                    {social.label}
                  </span>
                  <p className="text-xs text-zinc-500 group-hover:text-zinc-400 transition-colors">
                    {social.description}
                  </p>
                </div>
              </Link>
            </Card>
          ))}
        </div>

        <div className="text-center mb-16 animate-fade-in animation-delay-1200">
          <div className="max-w-md mx-auto">
            <h3 className="text-lg font-medium text-zinc-200 mb-4">
              Prefer Email?
            </h3>
            <button
              onClick={copyEmail}
              className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-zinc-300 hover:bg-zinc-800 hover:border-zinc-600 transition-all"
            >
              <Mail size={16} />
              <span className="font-mono text-sm">
                parsakhosravani@gmail.com
              </span>
              <span className="text-xs text-zinc-500">
                {copiedEmail ? "Copied!" : "Click to copy"}
              </span>
            </button>
          </div>
        </div>

        <div className="max-w-2xl mx-auto text-center mb-16 animate-fade-in animation-delay-1400">
          <div className="bg-zinc-900/30 border border-zinc-800 rounded-lg p-6">
            <h3 className="text-lg font-medium text-zinc-200 mb-4">
              What I'm Looking For
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="text-left">
                <p className="text-zinc-300 mb-2">
                  🔹 Exciting job opportunities in software development
                </p>
                <p className="text-zinc-300 mb-2">
                  🔹 Collaborations on open-source projects
                </p>
                <p className="text-zinc-300 mb-2">
                  🔹 Speaking engagements at tech conferences
                </p>
              </div>
              <div className="text-left">
                <p className="text-zinc-300 mb-2">
                  🔹 Remote work or flexible job arrangements
                </p>
                <p className="text-zinc-300 mb-2">
                  🔹 Mentorship or coaching opportunities
                </p>
                <p className="text-zinc-300 mb-2">
                  🔹 Networking with other professionals in the industry
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center text-sm text-zinc-400 animate-fade-in animation-delay-1600">
          <p>
            &copy; {new Date().getFullYear()} Parsa Khosravani. All rights
            reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
