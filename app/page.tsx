"use client";

import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { AnimatedBg } from "@/components/AnimatedBg";
import { TypingHero } from "@/components/TypingHero";
import { AIOrb } from "@/components/AIOrb";
import { Footer } from "@/components/Footer";
import { useLang } from "@/components/LangProvider";
import {
  ArrowRight,
  ClipboardList,
  Brain,
  ListChecks,
  GraduationCap,
  Wrench,
  MapPin,
  TrendingUp,
  Sparkles,
} from "lucide-react";

export default function Home() {
  const { t } = useLang();

  return (
    <>
      <AnimatedBg />
      <Navbar />

      <main className="relative pt-28 sm:pt-32 bg-stars min-h-screen">
        <div className="absolute inset-0 bg-grid -z-10" />
        <div className="absolute inset-0 bg-hero-radial -z-10" />

        {/* HERO */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center py-12 sm:py-20">
            <div className="animate-fade-up">
              <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs sm:text-sm text-accent-200">
                <Sparkles className="h-3.5 w-3.5" />
                {t.hero.badge}
              </div>

              <h1 className="mt-6 font-display font-extrabold tracking-tight text-4xl sm:text-5xl lg:text-6xl leading-tight">
                <span className="text-white">{t.hero.title1}</span>
                <br />
                <span className="gradient-text">{t.hero.title2}</span>
              </h1>

              <p className="mt-5 text-base sm:text-lg text-gray-300 max-w-xl">
                {t.hero.subtitle}
              </p>

              <div className="mt-6">
                <TypingHero phrases={t.hero.typingPhrases} />
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/anketa" className="btn-primary">
                  {t.hero.cta} <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="#how" className="btn-ghost">
                  {t.hero.ctaSecondary}
                </Link>
              </div>

              <div className="mt-10 grid grid-cols-3 gap-4 max-w-md">
                {[t.hero.stat1, t.hero.stat2, t.hero.stat3].map((s, i) => (
                  <div key={i} className="card-glow px-4 py-3">
                    <div className="text-2xl font-bold gradient-text">
                      {s.match(/\d+\+?/)?.[0] ?? ""}
                    </div>
                    <div className="text-[11px] uppercase tracking-wider text-gray-400 mt-0.5">
                      {s.replace(/\d+\+?\s*/, "")}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative animate-fade-in">
              <AIOrb />
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
              {t.how.title}
            </h2>
            <p className="mt-3 text-gray-400">{t.how.subtitle}</p>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {[
              { Icon: ClipboardList, title: t.how.step1Title, text: t.how.step1Text, n: "01" },
              { Icon: Brain, title: t.how.step2Title, text: t.how.step2Text, n: "02" },
              { Icon: ListChecks, title: t.how.step3Title, text: t.how.step3Text, n: "03" },
            ].map(({ Icon, title, text, n }, i) => (
              <div key={i} className="card-glow p-6 sm:p-7 relative overflow-hidden">
                <div className="absolute -right-4 -top-4 text-6xl font-black text-brand-500/10 select-none">
                  {n}
                </div>
                <div className="relative">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500/30 to-accent-500/20 border border-brand-500/30">
                    <Icon className="h-6 w-6 text-accent-300" />
                  </div>
                  <h3 className="mt-4 font-display text-xl font-semibold text-white">{title}</h3>
                  <p className="mt-2 text-sm text-gray-400 leading-relaxed">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FEATURES */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
              {t.features.title}
            </h2>
          </div>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { Icon: GraduationCap, title: t.features.f1Title, text: t.features.f1Text },
              { Icon: Wrench, title: t.features.f2Title, text: t.features.f2Text },
              { Icon: MapPin, title: t.features.f3Title, text: t.features.f3Text },
              { Icon: TrendingUp, title: t.features.f4Title, text: t.features.f4Text },
            ].map(({ Icon, title, text }, i) => (
              <div key={i} className="card-glow p-6 hover:border-accent-400/40">
                <Icon className="h-7 w-7 text-accent-300" />
                <h3 className="mt-4 font-display font-semibold text-lg text-white">{title}</h3>
                <p className="mt-2 text-sm text-gray-400 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link href="/anketa" className="btn-primary">
              {t.hero.cta} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
