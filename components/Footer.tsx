"use client";

import { useLang } from "./LangProvider";
import { Sparkles, Send, Heart } from "lucide-react";

export function Footer() {
  const { t } = useLang();

  return (
    <footer className="mt-16 border-t border-brand-500/15">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Creator card */}
        <div className="glass-strong rounded-3xl p-6 sm:p-7 mb-10 max-w-2xl mx-auto">
          <div className="flex items-center gap-5">
            <div className="relative shrink-0">
              <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl bg-gradient-to-br from-brand-500 via-brand-400 to-accent-500 flex items-center justify-center font-display font-extrabold text-2xl sm:text-3xl text-white shadow-lg shadow-brand-500/40">
                A
              </div>
              <span className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-brand-500 to-accent-500 opacity-40 blur-md -z-10" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[11px] uppercase tracking-[0.2em] text-accent-300 font-semibold">
                {t.footer.creatorLabel}
              </div>
              <h3 className="mt-1 font-display text-xl sm:text-2xl font-bold text-white">
                {t.footer.creatorName}
              </h3>
              <p className="mt-1 text-sm text-gray-400 leading-relaxed">
                {t.footer.creatorBio}
              </p>
              <a
                href="https://t.me/AzizxojaYolchiyev"
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-sm text-accent-300 hover:text-accent-200 transition"
              >
                <Send className="h-3.5 w-3.5" />
                @AzizxojaYolchiyev
              </a>
            </div>
          </div>
        </div>

        {/* Brand + rights */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-accent-500">
              <Sparkles className="h-4 w-4 text-white" />
            </span>
            <span className="font-display font-bold text-white">{t.brand}</span>
            <span className="text-gray-500 text-sm hidden sm:inline">— {t.footer.tagline}</span>
          </div>
          <p className="text-xs text-gray-500 flex items-center gap-1.5">
            {t.footer.rights}
            <span className="hidden sm:inline-flex items-center gap-1">
              · Made with <Heart className="h-3 w-3 text-red-400 fill-red-400" /> by {t.footer.creatorName}
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
