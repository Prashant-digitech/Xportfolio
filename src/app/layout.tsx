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
  title: "Prashant Sisodhiya | Elite UI/UX Designer & Creative Director",
  description: "Crafting digital experiences that inspire. Elite UI/UX Design, cinematic Video Editing, and premium Graphics Design by Prashant Sisodhiya.",
  keywords: ["UI/UX Design", "Video Editing", "Graphics Design", "Web Design", "Creative Portfolio", "Prashant Sisodhiya", "Vadodara", "Gujarat"],
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
      <body className="min-h-full bg-white dark:bg-[#050505] text-[#171717] dark:text-white font-sans overflow-x-hidden selection:bg-[#D4A017]/30 selection:text-white transition-colors duration-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

