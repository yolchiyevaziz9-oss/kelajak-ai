"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { AnimatedBg } from "@/components/AnimatedBg";
import { Footer } from "@/components/Footer";
import { useLang } from "@/components/LangProvider";
import { UNIVERSITIES, ALL_FIELDS } from "@/lib/universities";
import { SKILLS } from "@/lib/skills";
import { CITIES, LANGUAGES } from "@/lib/cities";
import {
  ArrowRight,
  ArrowLeft,
  GraduationCap,
  Wrench,
  Languages as LangIcon,
  Award,
  MapPin,
  Target,
  User2,
  Sparkles,
  Plus,
  X,
} from "lucide-react";

const LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2", "native"] as const;

type LangEntry = { id: string; level: string };

export default function AnketaPage() {
  const { lang, t } = useLang();
  const router = useRouter();

  const [step, setStep] = useState(1);
  const total = 7;

  const [name, setName] = useState("");
  const [age, setAge] = useState<number | "">("");
  const [hasHigher, setHasHigher] = useState<boolean | null>(null);
  const [universityId, setUniversityId] = useState("");
  const [field, setField] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [langs, setLangs] = useState<LangEntry[]>([{ id: "uz", level: "native" }]);
  const [diplomas, setDiplomas] = useState<string[]>([]);
  const [diplomaDraft, setDiplomaDraft] = useState("");
  const [city, setCity] = useState("");
  const [goal, setGoal] = useState<"shahrimda" | "boshqa-shahar" | "masofadan" | "chet-elda" | "">("");

  const uni = UNIVERSITIES.find((u) => u.id === universityId);
  const availableFields = useMemo(() => {
    if (uni && uni.fields.length > 0) return uni.fields;
    return ALL_FIELDS;
  }, [uni]);

  const canNext = () => {
    switch (step) {
      case 1: return name.trim().length > 0 && age !== "" && Number(age) >= 14;
      case 2: return hasHigher !== null && (hasHigher === false || (!!universityId && !!field));
      case 3: return skills.length > 0 || hasHigher === true;
      case 4: return langs.length > 0;
      case 5: return true;
      case 6: return !!city;
      case 7: return !!goal;
      default: return true;
    }
  };

  const toggleSkill = (id: string) =>
    setSkills((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const updateLang = (i: number, patch: Partial<LangEntry>) =>
    setLangs((arr) => arr.map((l, j) => (j === i ? { ...l, ...patch } : l)));
  const addLang = () =>
    setLangs((arr) => [...arr, { id: LANGUAGES.find((l) => !arr.some((a) => a.id === l.id))?.id ?? "en", level: "A2" }]);
  const removeLang = (i: number) => setLangs((arr) => arr.filter((_, j) => j !== i));

  const submit = () => {
    const profile = {
      name,
      age: Number(age),
      hasHigherEducation: hasHigher === true,
      universityId: universityId || undefined,
      field: field || undefined,
      skills,
      languages: langs,
      diplomas,
      city,
      goal,
    };
    if (typeof window !== "undefined") {
      localStorage.setItem("kelajak_profile", JSON.stringify(profile));
    }
    router.push("/natija");
  };

  return (
    <>
      <AnimatedBg />
      <Navbar />

      <main className="relative pt-28 sm:pt-32 bg-stars min-h-screen pb-16">
        <div className="absolute inset-0 bg-grid -z-10" />

        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs text-accent-200">
              <Sparkles className="h-3.5 w-3.5" />
              {t.form.step} {step} {t.form.of} {total}
            </div>
            <h1 className="mt-4 font-display text-3xl sm:text-4xl font-bold text-white">
              {t.form.title}
            </h1>
            <p className="mt-2 text-gray-400">{t.form.subtitle}</p>
          </div>

          {/* Progress */}
          <div className="h-1.5 rounded-full bg-ink-800 overflow-hidden mb-8">
            <div
              className="h-full bg-gradient-to-r from-brand-500 via-brand-400 to-accent-500 transition-all duration-500"
              style={{ width: `${(step / total) * 100}%` }}
            />
          </div>

          <div className="glass-strong rounded-3xl p-6 sm:p-8 animate-fade-up">
            {/* STEP 1 — Ism / Yosh */}
            {step === 1 && (
              <StepWrap Icon={User2} title={t.form.q1Title}>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">{t.form.name}</label>
                    <input
                      className="input-dark"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={lang === "uz" ? "Ali" : "Али"}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">{t.form.age}</label>
                    <input
                      type="number"
                      min={14}
                      max={70}
                      className="input-dark"
                      value={age}
                      onChange={(e) => setAge(e.target.value === "" ? "" : Number(e.target.value))}
                      placeholder="22"
                    />
                  </div>
                </div>
              </StepWrap>
            )}

            {/* STEP 2 — Ta'lim */}
            {step === 2 && (
              <StepWrap Icon={GraduationCap} title={t.form.q2Title}>
                <div className="grid sm:grid-cols-2 gap-3 mb-5">
                  <button
                    onClick={() => setHasHigher(true)}
                    className={`p-4 rounded-2xl border text-left transition ${
                      hasHigher === true
                        ? "border-accent-400 bg-accent-500/15"
                        : "border-brand-500/25 bg-ink-800/50 hover:border-brand-400"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-5 w-5 text-accent-300" />
                      <span className="font-medium text-white">{t.form.hasHigher}</span>
                    </div>
                  </button>
                  <button
                    onClick={() => { setHasHigher(false); setUniversityId(""); setField(""); }}
                    className={`p-4 rounded-2xl border text-left transition ${
                      hasHigher === false
                        ? "border-accent-400 bg-accent-500/15"
                        : "border-brand-500/25 bg-ink-800/50 hover:border-brand-400"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Wrench className="h-5 w-5 text-accent-300" />
                      <span className="font-medium text-white">{t.form.noHigher}</span>
                    </div>
                  </button>
                </div>

                {hasHigher === true && (
                  <div className="grid sm:grid-cols-2 gap-4 animate-fade-up">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">{t.form.university}</label>
                      <select
                        className="input-dark"
                        value={universityId}
                        onChange={(e) => { setUniversityId(e.target.value); setField(""); }}
                      >
                        <option value="">—</option>
                        {UNIVERSITIES.map((u) => (
                          <option key={u.id} value={u.id}>
                            {lang === "ru" && u.nameRu ? u.nameRu : u.name}
                            {u.city !== "—" ? ` — ${u.city}` : ""}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">{t.form.field}</label>
                      <select
                        className="input-dark"
                        value={field}
                        onChange={(e) => setField(e.target.value)}
                      >
                        <option value="">—</option>
                        {availableFields.map((f) => (
                          <option key={f} value={f}>{f}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
              </StepWrap>
            )}

            {/* STEP 3 — Hunarlar */}
            {step === 3 && (
              <StepWrap Icon={Wrench} title={t.form.q3Title}>
                <p className="text-sm text-gray-400 mb-4">{t.form.skillsHint}</p>
                <div className="flex flex-wrap gap-2">
                  {SKILLS.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => toggleSkill(s.id)}
                      className={`chip ${skills.includes(s.id) ? "chip-active" : ""}`}
                    >
                      {lang === "ru" && s.nameRu ? s.nameRu : s.name}
                    </button>
                  ))}
                </div>
              </StepWrap>
            )}

            {/* STEP 4 — Tillar */}
            {step === 4 && (
              <StepWrap Icon={LangIcon} title={t.form.q4Title}>
                <div className="space-y-3">
                  {langs.map((l, i) => (
                    <div key={i} className="grid grid-cols-12 gap-3 items-center">
                      <select
                        className="input-dark col-span-7"
                        value={l.id}
                        onChange={(e) => updateLang(i, { id: e.target.value })}
                      >
                        {LANGUAGES.map((L) => (
                          <option key={L.id} value={L.id}>
                            {lang === "ru" ? L.nameRu : L.name}
                          </option>
                        ))}
                      </select>
                      <select
                        className="input-dark col-span-4"
                        value={l.level}
                        onChange={(e) => updateLang(i, { level: e.target.value })}
                      >
                        {LEVELS.map((v) => (
                          <option key={v} value={v}>{v}</option>
                        ))}
                      </select>
                      <button
                        onClick={() => removeLang(i)}
                        className="col-span-1 h-11 w-11 rounded-xl border border-brand-500/25 bg-ink-800/50 text-gray-400 hover:border-red-400 hover:text-red-400 flex items-center justify-center"
                        aria-label="Remove"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={addLang}
                    className="text-sm text-accent-300 hover:text-accent-200 inline-flex items-center gap-1"
                  >
                    <Plus className="h-4 w-4" /> {t.form.addLang}
                  </button>
                </div>
              </StepWrap>
            )}

            {/* STEP 5 — Sertifikatlar */}
            {step === 5 && (
              <StepWrap Icon={Award} title={t.form.q5Title}>
                <p className="text-sm text-gray-400 mb-4">{t.form.diplomasHint}</p>
                <div className="flex gap-2 mb-4">
                  <input
                    className="input-dark flex-1"
                    value={diplomaDraft}
                    onChange={(e) => setDiplomaDraft(e.target.value)}
                    placeholder={lang === "uz" ? "Masalan: IELTS 6.5" : "Например: IELTS 6.5"}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && diplomaDraft.trim()) {
                        setDiplomas([...diplomas, diplomaDraft.trim()]);
                        setDiplomaDraft("");
                      }
                    }}
                  />
                  <button
                    onClick={() => {
                      if (diplomaDraft.trim()) {
                        setDiplomas([...diplomas, diplomaDraft.trim()]);
                        setDiplomaDraft("");
                      }
                    }}
                    className="px-5 rounded-xl bg-brand-500/30 border border-brand-400/40 text-white hover:bg-brand-500/50"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {diplomas.map((d, i) => (
                    <span key={i} className="chip chip-active">
                      {d}
                      <button onClick={() => setDiplomas(diplomas.filter((_, j) => j !== i))}>
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </span>
                  ))}
                </div>
              </StepWrap>
            )}

            {/* STEP 6 — Shahar */}
            {step === 6 && (
              <StepWrap Icon={MapPin} title={t.form.q6Title}>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {CITIES.map((c) => (
                    <button
                      key={c}
                      onClick={() => setCity(c)}
                      className={`px-4 py-2.5 rounded-xl text-sm text-left transition border ${
                        city === c
                          ? "border-accent-400 bg-accent-500/15 text-white"
                          : "border-brand-500/20 bg-ink-800/50 text-gray-300 hover:border-brand-400"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </StepWrap>
            )}

            {/* STEP 7 — Maqsad */}
            {step === 7 && (
              <StepWrap Icon={Target} title={t.form.q7Title}>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { id: "shahrimda", label: t.form.goalHere },
                    { id: "boshqa-shahar", label: t.form.goalAnother },
                    { id: "masofadan", label: t.form.goalRemote },
                    { id: "chet-elda", label: t.form.goalAbroad },
                  ].map((g) => (
                    <button
                      key={g.id}
                      onClick={() => setGoal(g.id as typeof goal)}
                      className={`p-5 rounded-2xl border text-left transition ${
                        goal === g.id
                          ? "border-accent-400 bg-accent-500/15"
                          : "border-brand-500/25 bg-ink-800/50 hover:border-brand-400"
                      }`}
                    >
                      <span className="font-medium text-white">{g.label}</span>
                    </button>
                  ))}
                </div>
              </StepWrap>
            )}

            {/* Navigation */}
            <div className="mt-8 flex items-center justify-between">
              <button
                onClick={() => setStep((s) => Math.max(1, s - 1))}
                disabled={step === 1}
                className="btn-ghost !px-5 !py-2.5 text-sm disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ArrowLeft className="h-4 w-4" /> {t.form.back}
              </button>

              {step < total ? (
                <button
                  onClick={() => canNext() && setStep((s) => s + 1)}
                  disabled={!canNext()}
                  className="btn-primary !px-6 !py-2.5 text-sm disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {t.form.next} <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  onClick={() => canNext() && submit()}
                  disabled={!canNext()}
                  className="btn-primary !px-6 !py-2.5 text-sm disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Sparkles className="h-4 w-4" /> {t.form.submit}
                </button>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}

function StepWrap({
  Icon,
  title,
  children,
}: {
  Icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="animate-fade-up">
      <div className="flex items-center gap-3 mb-6">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500/30 to-accent-500/20 border border-brand-500/30">
          <Icon className="h-5 w-5 text-accent-300" />
        </span>
        <h2 className="font-display text-xl sm:text-2xl font-semibold text-white">{title}</h2>
      </div>
      {children}
    </div>
  );
}
