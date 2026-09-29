import type { Metadata } from "next";
import { Outfit, Inter, Great_Vibes } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const greatVibes = Great_Vibes({
  variable: "--font-signature",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Prashant Sisodhiya — Senior Product & UX Designer",
  description: "Portfolio of Prashant Sisodhiya — Senior Product Designer, UX Systems Lead, and Creative Technologist specializing in AI platforms, complex financial terminals, and accessible design systems.",
  keywords: [
    "Prashant Sisodhiya",
    "Senior Product Designer",
    "UI/UX Designer",
    "Design Systems Lead",
    "AI Product Design",
    "Fintech UX",
    "Video Editing",
    "Motion Graphics",
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
    title: "Prashant Sisodhiya — Senior Product & UX Designer",
    description: "Portfolio of Prashant Sisodhiya — Senior Product Designer, UX Systems Lead, and Creative Technologist specializing in AI platforms, complex financial terminals, and accessible design systems.",
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
    title: "Prashant Sisodhiya — Senior Product & UX Designer",
    description: "Portfolio of Prashant Sisodhiya — Senior Product Designer, UX Systems Lead, and Creative Technologist specializing in AI platforms, complex financial terminals, and accessible design systems.",
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
      className={`${outfit.variable} ${inter.variable} ${greatVibes.variable} h-full antialiased scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-[#FAFAF7] dark:bg-[#06070A] text-[#111318] dark:text-[#F8FAFC] font-sans overflow-x-hidden selection:bg-[#00E5FF]/20 selection:text-white transition-colors duration-250">
        {/* WCAG AA Skip to Main Content Link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-[#00E5FF] focus:text-[#06070A] focus:font-bold focus:rounded-md focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-white transition-all"
        >
          Skip to main content
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          storageKey="xportfolio-theme"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

