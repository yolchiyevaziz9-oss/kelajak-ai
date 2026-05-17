"use client";

import Link from "next/link";
import { useLang } from "./LangProvider";
import { Sparkles, Globe2 } from "lucide-react";

export function Navbar() {
  const { lang, setLang, t } = useLang();

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-4">
        <div className="glass-strong rounded-2xl px-5 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 shadow-lg shadow-brand-500/40">
              <Sparkles className="h-5 w-5 text-white" />
              <span className="absolute -inset-1 rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 opacity-50 blur-md group-hover:opacity-80 transition" />
            </span>
            <span className="font-display font-bold text-lg tracking-tight text-white">
              {t.brand}
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-7 text-sm text-gray-300">
            <Link href="/" className="hover:text-white transition">{t.nav.home}</Link>
            <Link href="/#how" className="hover:text-white transition">{t.nav.how}</Link>
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1 rounded-full border border-brand-500/30 bg-ink-800/60 p-1">
              <button
                onClick={() => setLang("uz")}
                className={`px-3 py-1 rounded-full text-xs font-medium transition ${
                  lang === "uz" ? "bg-brand-500 text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                UZ
              </button>
              <button
                onClick={() => setLang("ru")}
                className={`px-3 py-1 rounded-full text-xs font-medium transition ${
                  lang === "ru" ? "bg-brand-500 text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                RU
              </button>
            </div>
            <button
              onClick={() => setLang(lang === "uz" ? "ru" : "uz")}
              className="sm:hidden p-2 rounded-full border border-brand-500/30 bg-ink-800/60 text-gray-300"
              aria-label="Toggle language"
            >
              <Globe2 className="h-4 w-4" />
            </button>
            <Link href="/anketa" className="btn-primary text-sm !px-5 !py-2.5">
              {t.nav.start}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
