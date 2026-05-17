import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";
import { LangProvider } from "@/components/LangProvider";

const display = Manrope({ subsets: ["latin"], variable: "--font-display", weight: ["400", "500", "600", "700", "800"] });
const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Kelajak AI — Sizga mos ishni AI yordamida topamiz",
  description:
    "O'zbekistondagi yoshlar uchun sun'iy intellekt yordamida ish topish platformasi. Diplom, hunar va tilingizga qarab eng mos ish o'rinlarini tavsiya qilamiz.",
  keywords: ["ish", "ish topish", "kelajak", "AI", "Uzbekistan", "yoshlar", "bitiruvchi"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz" className={`${display.variable} ${sans.variable}`}>
      <body>
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
