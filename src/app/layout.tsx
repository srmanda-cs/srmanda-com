import type { Metadata } from "next";
import { Atkinson_Hyperlegible, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { getProfile } from "@/lib/data";
import AuroraBackground from "@/components/AuroraBackground";
import ScrollProgress from "@/components/ScrollProgress";

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
  const title = `${profile.name} — ${profile.title}`;
  const description = profile.bio;
  const ogImage = "/profile-avatar.jpg";

  return {
    title,
    description,
    metadataBase: new URL("https://ashmanda.dev"),
    openGraph: {
      title,
      description,
      type: "profile",
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
      title,
      description,
      images: [ogImage],
    },
    icons: {
      icon: [{ url: "/profile-avatar.jpg", type: "image/jpeg" }],
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
        {children}
      </body>
    </html>
  );
}
