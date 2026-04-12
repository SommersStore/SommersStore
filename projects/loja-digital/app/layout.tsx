import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./design-system.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Essência Ativa BR — Alquimia Artesanal de Elite | SommersStore",
  description: "Descubra o método que transforma ingredientes naturais em rituais de bem-estar de alto valor. Aprenda a criar sua própria linha de sais de banho terapêuticos.",
  keywords: "sais de banho, alquimia artesanal, bem-estar, rituais naturais, curso online",
  openGraph: {
    title: "Essência Ativa BR — Alquimia Artesanal de Elite",
    description: "Transforme banhos comuns em rituais de cura e crie sua linha de produtos premium.",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
