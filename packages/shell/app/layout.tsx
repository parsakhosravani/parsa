import "./globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Parsa Khosravani | Portfolio",
  description: "Software engineer portfolio.",
};

// Applies the saved theme before paint to avoid a flash. Defaults to dark.
const themeInit = `(function(){try{var t=localStorage.getItem('theme');if(t==='light'){document.documentElement.classList.remove('dark');}else{document.documentElement.classList.add('dark');}}catch(e){document.documentElement.classList.add('dark');}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
