import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";
import { SITE_CONFIG } from "./constants";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${SITE_CONFIG.name} | ${SITE_CONFIG.title}`,
  description: SITE_CONFIG.description,
  keywords: [
    "AI Developer",
    "Full-Stack Developer",
    "Next.js",
    "Drupal",
    "React",
    "LLM",
    "Machine Learning",
    "Web Development",
  ],
  authors: [{ name: SITE_CONFIG.name }],
  openGraph: {
    title: `${SITE_CONFIG.name} | ${SITE_CONFIG.title}`,
    description: SITE_CONFIG.description,
    url: `https://${SITE_CONFIG.domain}`,
    siteName: SITE_CONFIG.domain,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.name} | ${SITE_CONFIG.title}`,
    description: SITE_CONFIG.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${outfit.variable} ${jetbrainsMono.variable} font-sans antialiased`}
        style={{ fontFamily: "var(--font-outfit), system-ui, sans-serif" }}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
