import "./globals.css";
import { Metadata } from "next";
import { Header } from "./components/header";

export const metadata: Metadata = {
  title: "Parsa Khosravani | Senior Frontend Engineer",
  description:
    "Portfolio of Parsa Khosravani — a product-minded frontend engineer building fast, reliable interfaces across ecommerce, travel, and market systems with React, Vue, and Angular.",
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
      <body className="flex flex-col min-h-screen">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Header />
        <div id="main-content" className="flex-1">
          {children}
        </div>
      </body>
    </html>
  );
}
