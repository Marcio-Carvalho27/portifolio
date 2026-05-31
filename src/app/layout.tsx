import type { Metadata } from "next";
import { ThemeProvider } from "@/src/context/ThemeContext";
import { LanguageProvider } from "@/src/context/LanguageContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Marcio Carvalho",
  description: "Full Stack Developer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}