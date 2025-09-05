import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "sonner";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { CommandPalette } from "@/components/site/CommandPalette";
import "@/styles/globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Juan Fernando Valenzuela Solís - Desarrollador Full Stack",
    template: "%s | Juan Fernando Valenzuela"
  },
  description: "Estudiante de Ingeniería en Sistemas y desarrollador junior especializado en C#/.NET, Python, Laravel y React. Portafolio profesional de Juan Fernando Valenzuela Solís.",
  keywords: [
    "Juan Fernando Valenzuela",
    "desarrollador full stack",
    "Guatemala",
    "C# .NET",
    "Python",
    "Laravel",
    "React",
    "TypeScript",
    "ingeniería en sistemas"
  ],
  authors: [{ name: "Juan Fernando Valenzuela Solís" }],
  creator: "Juan Fernando Valenzuela Solís",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://juanfernandovalenzuela.com",
    siteName: "Juan Fernando Valenzuela - Portfolio",
    title: "Juan Fernando Valenzuela Solís - Desarrollador Full Stack",
    description: "Estudiante de Ingeniería en Sistemas y desarrollador junior especializado en C#/.NET, Python, Laravel y React.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Juan Fernando Valenzuela Solís - Desarrollador Full Stack",
    description: "Estudiante de Ingeniería en Sistemas y desarrollador junior especializado en C#/.NET, Python, Laravel y React.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.variable} bg-background text-foreground antialiased`}>
        <div className="relative min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
        <CommandPalette />
        <Toaster 
          theme="dark"
          position="bottom-right"
          expand={false}
          richColors
        />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}