"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatedBg } from "@/components/AnimatedBg";
import { Lock, Sparkles, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const r = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (r.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        const d = await r.json().catch(() => ({}));
        setError(d.error || "Xatolik");
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <AnimatedBg />
      <main className="relative min-h-screen bg-stars flex items-center justify-center px-4">
        <div className="absolute inset-0 bg-grid -z-10" />

        <form onSubmit={submit} className="glass-strong rounded-3xl p-8 sm:p-10 w-full max-w-md animate-fade-up">
          <div className="text-center mb-6">
            <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-accent-500 shadow-lg shadow-brand-500/40">
              <Lock className="h-6 w-6 text-white" />
            </div>
            <h1 className="mt-4 font-display text-2xl font-bold text-white">Admin panel</h1>
            <p className="mt-1 text-sm text-gray-400">
              Faqat siz uchun. Parolni kiriting.
            </p>
          </div>

          <label className="block text-sm text-gray-400 mb-2">Parol</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-dark"
            placeholder="••••••••"
            autoFocus
          />

          {error && (
            <div className="mt-3 flex items-center gap-2 text-sm text-red-400">
              <AlertCircle className="h-4 w-4" /> {error}
            </div>
          )}

          <button
            type="submit"
            disabled={busy || !password}
            className="btn-primary w-full mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Sparkles className="h-4 w-4" /> {busy ? "Tekshirilmoqda…" : "Kirish"}
          </button>

          <p className="mt-6 text-xs text-gray-500 text-center">
            Bu sahifa faqat sayt egasi uchun
          </p>
        </form>
      </main>
    </>
  );
}
