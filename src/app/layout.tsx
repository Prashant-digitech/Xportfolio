import type { Metadata } from "next";
import { Outfit, Great_Vibes } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const greatVibes = Great_Vibes({
  variable: "--font-signature",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Prashant Sisodhiya — UI/UX & AI Product Designer",
  description: "Portfolio of Prashant Sisodhiya — UI/UX, product design, AI experiences, visual design, branding and motion.",
  keywords: [
    "Prashant Sisodhiya",
    "UI/UX Designer",
    "Product Designer",
    "AI Product Design",
    "Design Systems",
    "Video Editing",
    "Motion Graphics",
    "Creative Director",
    "Vadodara",
    "India"
  ],
  authors: [{ name: "Prashant Sisodhiya", url: "https://xportfolio-sigma.vercel.app" }],
  creator: "Prashant Sisodhiya",
  metadataBase: new URL("https://xportfolio-sigma.vercel.app"),
  alternates: {
    canonical: "https://xportfolio-sigma.vercel.app",
  },
  openGraph: {
    title: "Prashant Sisodhiya — UI/UX & AI Product Designer",
    description: "Portfolio of Prashant Sisodhiya — UI/UX, product design, AI experiences, visual design, branding and motion.",
    url: "https://xportfolio-sigma.vercel.app",
    siteName: "Prashant Sisodhiya Portfolio",
    images: [
      {
        url: "/images/ux/projects/TradeX.png",
        width: 1200,
        height: 630,
        alt: "Prashant Sisodhiya Selected Work Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prashant Sisodhiya — UI/UX & AI Product Designer",
    description: "Portfolio of Prashant Sisodhiya — UI/UX, product design, AI experiences, visual design, branding and motion.",
    images: ["/images/ux/projects/TradeX.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${greatVibes.variable} h-full antialiased scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-white dark:bg-[#090A0E] text-[#0A1128] dark:text-white font-sans overflow-x-hidden selection:bg-[#D4AF37]/30 selection:text-white transition-colors duration-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

