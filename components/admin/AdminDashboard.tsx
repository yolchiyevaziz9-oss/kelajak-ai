"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatedBg } from "@/components/AnimatedBg";
import { JobForm } from "./JobForm";
import type { Job } from "@/lib/jobs";
import {
  Plus,
  LogOut,
  Edit2,
  Trash2,
  Briefcase,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  ExternalLink,
} from "lucide-react";

export function AdminDashboard() {
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Job | null>(null);
  const [creating, setCreating] = useState(false);
  const [configured, setConfigured] = useState(true);
  const [flash, setFlash] = useState<{ kind: "ok" | "err"; text: string } | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const r = await fetch("/api/admin/jobs");
      if (r.ok) {
        const d = await r.json();
        setJobs(d.jobs ?? []);
        setConfigured(d.configured);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const logout = async () => {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  };

  const onSave = async (job: Job, isNew: boolean) => {
    const r = await fetch("/api/admin/jobs", {
      method: isNew ? "POST" : "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(job),
    });
    const d = await r.json().catch(() => ({}));
    if (r.ok) {
      setFlash({ kind: "ok", text: isNew ? "Qo'shildi! GitHub'ga commit qilindi." : "Yangilandi!" });
      setCreating(false);
      setEditing(null);
      load();
    } else {
      setFlash({ kind: "err", text: d.error || "Xatolik" });
    }
    setTimeout(() => setFlash(null), 5000);
  };

  const onDelete = async (id: string) => {
    if (!confirm("O'chirishni tasdiqlaysizmi?")) return;
    const r = await fetch(`/api/admin/jobs?id=${encodeURIComponent(id)}`, { method: "DELETE" });
    if (r.ok) {
      setFlash({ kind: "ok", text: "O'chirildi" });
      load();
    } else {
      const d = await r.json().catch(() => ({}));
      setFlash({ kind: "err", text: d.error || "Xatolik" });
    }
    setTimeout(() => setFlash(null), 5000);
  };

  return (
    <>
      <AnimatedBg />
      <main className="relative min-h-screen bg-stars pt-8 pb-16">
        <div className="absolute inset-0 bg-grid -z-10" />

        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs text-accent-200">
                <Sparkles className="h-3 w-3" /> Admin panel
              </div>
              <h1 className="mt-3 font-display text-3xl font-bold text-white">Ish e'lonlarini boshqarish</h1>
              <p className="mt-1 text-sm text-gray-400">
                Qo'shgan e'lonlaringiz GitHub'ga commit qilinadi, Netlify avtomatik yangilaydi
              </p>
            </div>
            <button onClick={logout} className="btn-ghost !px-4 !py-2 text-sm">
              <LogOut className="h-4 w-4" /> Chiqish
            </button>
          </div>

          {!configured && (
            <div className="glass rounded-2xl p-4 mb-6 border-orange-400/40 bg-orange-500/10">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-orange-300 shrink-0 mt-0.5" />
                <div className="text-sm text-orange-100">
                  <strong>GitHub PAT o'rnatilmagan.</strong> Netlify environment'da{" "}
                  <code className="text-orange-300">GITHUB_PAT</code> ni o'rnating — aks holda yozish ishlamaydi.
                </div>
              </div>
            </div>
          )}

          {flash && (
            <div
              className={`glass rounded-2xl p-4 mb-6 ${
                flash.kind === "ok" ? "border-emerald-400/40 bg-emerald-500/10" : "border-red-400/40 bg-red-500/10"
              }`}
            >
              <div className="flex items-center gap-3">
                {flash.kind === "ok" ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-300" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-300" />
                )}
                <span className="text-sm text-white">{flash.text}</span>
              </div>
            </div>
          )}

          {/* Stats + Add button */}
          <div className="flex items-center justify-between mb-6">
            <div className="text-sm text-gray-400">
              <Briefcase className="h-4 w-4 inline mr-1.5" />
              Admin tomonidan qo'shilganlar: <span className="text-white font-semibold">{jobs.length}</span>
            </div>
            <button onClick={() => setCreating(true)} className="btn-primary !px-5 !py-2.5 text-sm">
              <Plus className="h-4 w-4" /> Yangi e'lon
            </button>
          </div>

          {/* Form */}
          {(creating || editing) && (
            <div className="mb-8">
              <JobForm
                initial={editing ?? undefined}
                onSubmit={(j) => onSave(j, !editing)}
                onCancel={() => {
                  setCreating(false);
                  setEditing(null);
                }}
              />
            </div>
          )}

          {/* Jobs list */}
          {loading ? (
            <div className="text-center text-gray-400 py-12">Yuklanmoqda…</div>
          ) : jobs.length === 0 ? (
            <div className="glass-strong rounded-3xl p-10 text-center">
              <Briefcase className="h-10 w-10 text-gray-500 mx-auto mb-3" />
              <p className="text-gray-400">Hozircha admin tomonidan qo'shilgan e'lon yo'q.</p>
              <p className="text-xs text-gray-500 mt-2">
                Curated (137) va OLX'dan kelganlar baribir saytda ko'rinadi.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {jobs.map((j) => (
                <div key={j.id} className="card-glow p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="font-display font-semibold text-white truncate">{j.title}</h3>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {j.company} · {j.city}
                      </p>
                    </div>
                    <div className="flex gap-1 shrink-0">
                      <button
                        onClick={() => setEditing(j)}
                        className="p-2 rounded-lg border border-brand-500/25 hover:border-accent-400 text-gray-300 hover:text-white transition"
                      >
                        <Edit2 className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => onDelete(j.id)}
                        className="p-2 rounded-lg border border-brand-500/25 hover:border-red-400 text-gray-300 hover:text-red-400 transition"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                  <p className="mt-3 text-xs text-gray-400 line-clamp-2">{j.description}</p>
                  <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                    <span>{j.type}</span>
                    {j.salaryFrom && (
                      <span>
                        · {(j.salaryFrom / 1_000_000).toFixed(1)} mln{j.salaryTo ? ` – ${(j.salaryTo / 1_000_000).toFixed(1)}` : ""} so'm
                      </span>
                    )}
                    {j.url && (
                      <a href={j.url} target="_blank" rel="noreferrer" className="ml-auto text-accent-300 hover:text-accent-200">
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
