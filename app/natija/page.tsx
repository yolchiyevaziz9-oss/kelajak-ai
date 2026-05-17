"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { AnimatedBg } from "@/components/AnimatedBg";
import { Footer } from "@/components/Footer";
import { useLang } from "@/components/LangProvider";
import {
  recommendJobs,
  generateAdvice,
  formatSalary,
  type Profile,
  type Recommendation,
  type AdviceBlock,
} from "@/lib/recommend";
import {
  MapPin,
  Briefcase,
  Wallet,
  Building2,
  Mail,
  Sparkles,
  RotateCcw,
  Lightbulb,
  ExternalLink,
  Brain,
  CheckCircle2,
} from "lucide-react";

export default function NatijaPage() {
  const { t, lang } = useLang();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [analyzing, setAnalyzing] = useState(true);
  const [recs, setRecs] = useState<Recommendation[]>([]);
  const [advice, setAdvice] = useState<AdviceBlock[]>([]);

  useEffect(() => {
    const raw = typeof window !== "undefined" ? localStorage.getItem("kelajak_profile") : null;
    if (!raw) return;
    const p = JSON.parse(raw) as Profile & { name?: string };
    setProfile(p);

    // AI "tahlil qilmoqda" effekti
    const timer = setTimeout(() => {
      setRecs(recommendJobs(p, 6));
      setAdvice(generateAdvice(p));
      setAnalyzing(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  if (!profile) {
    return (
      <>
        <AnimatedBg />
        <Navbar />
        <main className="relative pt-32 min-h-screen bg-stars">
          <div className="mx-auto max-w-2xl px-4 text-center">
            <p className="text-gray-300">{t.results.noResults}</p>
            <Link href="/anketa" className="btn-primary mt-6">
              <RotateCcw className="h-4 w-4" /> {t.results.restart}
            </Link>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <AnimatedBg />
      <Navbar />

      <main className="relative pt-28 sm:pt-32 bg-stars min-h-screen pb-16">
        <div className="absolute inset-0 bg-grid -z-10" />

        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          {/* Header */}
          <div className="text-center mb-10 animate-fade-up">
            <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs text-accent-200">
              <Sparkles className="h-3.5 w-3.5" />
              {(profile as any).name ? `${(profile as any).name}, ` : ""}AI
            </div>
            <h1 className="mt-4 font-display text-3xl sm:text-4xl font-bold text-white">
              {t.results.title}
            </h1>
            <p className="mt-2 text-gray-400">{t.results.subtitle}</p>
          </div>

          {/* Analyzing animation */}
          {analyzing && (
            <div className="glass-strong rounded-3xl p-10 text-center animate-fade-in">
              <div className="relative mx-auto h-24 w-24">
                <div className="absolute inset-0 rounded-full border-2 border-brand-500/20 animate-spin-slow" />
                <div
                  className="absolute inset-3 rounded-full border-2 border-accent-400/30 animate-spin-slow"
                  style={{ animationDirection: "reverse", animationDuration: "4s" }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Brain className="h-8 w-8 text-accent-300 animate-pulse-soft" />
                </div>
              </div>
              <p className="mt-5 text-gray-300">
                {lang === "uz"
                  ? "Sun'iy intellekt sizning profilingizni tahlil qilmoqda…"
                  : "Искусственный интеллект анализирует ваш профиль…"}
              </p>
              <div className="mt-4 text-xs text-gray-500 space-y-1">
                <p>✓ {lang === "uz" ? "Ta'lim yo'nalishi tekshirildi" : "Образование проверено"}</p>
                <p>✓ {lang === "uz" ? "Hunarlar tahlil qilindi" : "Навыки проанализированы"}</p>
                <p>⏳ {lang === "uz" ? "Mos ish o'rinlari qidirilmoqda…" : "Поиск подходящих вакансий…"}</p>
              </div>
            </div>
          )}

          {!analyzing && (
            <>
              {/* Recs */}
              <div className="grid lg:grid-cols-2 gap-5 animate-fade-up">
                {recs.map((r, i) => (
                  <JobCard key={r.job.id} rec={r} t={t} rank={i + 1} />
                ))}
              </div>

              {recs.length === 0 && (
                <div className="glass-strong rounded-3xl p-10 text-center">
                  <p className="text-gray-300">{t.results.noResults}</p>
                </div>
              )}

              {/* Advice */}
              <section className="mt-14">
                <div className="flex items-center gap-3 mb-6">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent-500/30 to-brand-500/20 border border-accent-400/30">
                    <Lightbulb className="h-5 w-5 text-accent-300" />
                  </span>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
                    {t.results.adviceTitle}
                  </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {advice.map((a, i) => (
                    <div key={i} className="card-glow p-6">
                      <h3 className="font-display font-semibold text-white text-lg">{a.title}</h3>
                      <p className="mt-2 text-sm text-gray-400 leading-relaxed">{a.text}</p>
                      {a.links && a.links.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {a.links.map((l, j) => (
                            <a
                              key={j}
                              href={l.url}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-brand-500/15 border border-brand-500/30 text-brand-100 hover:bg-brand-500/30 transition"
                            >
                              {l.label} <ExternalLink className="h-3 w-3" />
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              <div className="mt-12 text-center">
                <Link href="/anketa" className="btn-ghost">
                  <RotateCcw className="h-4 w-4" /> {t.results.restart}
                </Link>
              </div>
            </>
          )}
        </div>
        <Footer />
      </main>
    </>
  );
}

function JobCard({ rec, t, rank }: { rec: Recommendation; t: any; rank: number }) {
  const { job, score, reasons } = rec;

  // Score ranggi
  const tone =
    score >= 75 ? "from-emerald-400 to-accent-400" :
    score >= 55 ? "from-accent-400 to-brand-400" :
    "from-brand-500 to-purple-500";

  return (
    <div className="card-glow p-6 relative overflow-hidden">
      <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-brand-500/10 blur-2xl" />

      <div className="flex items-start justify-between gap-3 relative">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-brand-500/20 text-brand-200 font-semibold text-[10px]">
              #{rank}
            </span>
            <Building2 className="h-3.5 w-3.5" />
            <span className="truncate">{job.company}</span>
          </div>
          <h3 className="mt-2 font-display text-lg font-semibold text-white leading-snug">
            {job.title}
          </h3>
        </div>

        <div className={`shrink-0 px-3 py-1.5 rounded-full bg-gradient-to-r ${tone} text-white text-xs font-semibold shadow-lg`}>
          {score}% {t.results.match}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-gray-300">
        <div className="flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5 text-accent-300" />
          {job.city}{job.remote ? " · remote" : ""}
        </div>
        <div className="flex items-center gap-1.5">
          <Briefcase className="h-3.5 w-3.5 text-accent-300" />
          {job.type}
        </div>
        <div className="flex items-center gap-1.5 col-span-2">
          <Wallet className="h-3.5 w-3.5 text-accent-300" />
          {formatSalary(job.salaryFrom, job.salaryTo, job.currency)}
        </div>
      </div>

      <p className="mt-4 text-sm text-gray-400 leading-relaxed">{job.description}</p>

      {reasons.length > 0 && (
        <div className="mt-4 rounded-xl border border-brand-500/15 bg-ink-800/50 p-3">
          <p className="text-[11px] uppercase tracking-wider text-accent-300 font-semibold mb-2">
            {t.results.whyMatch}
          </p>
          <ul className="space-y-1">
            {reasons.slice(0, 4).map((r, i) => (
              <li key={i} className="flex items-start gap-1.5 text-xs text-gray-300">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 mt-0.5 shrink-0" />
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-5 flex items-center gap-2">
        <a
          href={job.contact.includes("@") ? `mailto:${job.contact}` : `#`}
          className="btn-primary !px-4 !py-2 text-xs"
        >
          <Mail className="h-3.5 w-3.5" /> {t.results.apply}
        </a>
        <span className="text-xs text-gray-500 truncate">{job.contact}</span>
      </div>
    </div>
  );
}
