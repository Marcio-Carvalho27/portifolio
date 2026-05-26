import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Márcio Carvalho",
  description: "Portfolio Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="m-0 p-0">
      <body className="m-0 p-0">{children}</body>
    </html>
  );
}