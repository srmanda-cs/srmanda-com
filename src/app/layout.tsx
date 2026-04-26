import type { Metadata } from "next";
import { Atkinson_Hyperlegible, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { getProfile } from "@/lib/data";
import AuroraBackground from "@/components/AuroraBackground";
import ScrollProgress from "@/components/ScrollProgress";
import AuroraCursor from "@/components/AuroraCursor";

const atkinson = Atkinson_Hyperlegible({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const profile = getProfile();
  // Short tab-title (survives heavy truncation), long social/OG title.
  const shortTitle = `${profile.first_name} ${profile.last_name} — ${profile.title}`;
  const tabTitle = `${profile.first_name} · ${profile.title.replace(
    "Cloud Infrastructure Engineer",
    "Cloud Infra"
  )}`;
  const description = profile.bio;
  const ogImage = "/profile-avatar.jpg";

  return {
    title: {
      default: tabTitle,
      template: `%s · ${profile.first_name} ${profile.last_name}`,
    },
    description,
    metadataBase: new URL("https://ashmanda.dev"),
    openGraph: {
      title: shortTitle,
      description,
      type: "profile",
      siteName: `${profile.name}`,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 1200,
          alt: `${profile.name} portrait`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: shortTitle,
      description,
      images: [ogImage],
    },
    icons: {
      icon: [{ url: "/icon.jpg", type: "image/jpeg" }],
      shortcut: [{ url: "/icon.jpg", type: "image/jpeg" }],
      apple: [{ url: "/profile-avatar.jpg" }],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${atkinson.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <AuroraBackground />
        <ScrollProgress />
        <AuroraCursor />
        {children}
      </body>
    </html>
  );
}
