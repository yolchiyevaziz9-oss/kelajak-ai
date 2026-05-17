"use client";

import { useState } from "react";
import type { Job } from "@/lib/jobs";
import { CITIES } from "@/lib/cities";
import { SKILLS } from "@/lib/skills";
import { ALL_FIELDS } from "@/lib/universities";
import { Save, X } from "lucide-react";

type Props = {
  initial?: Job;
  onSubmit: (job: Job) => void | Promise<void>;
  onCancel: () => void;
};

export function JobForm({ initial, onSubmit, onCancel }: Props) {
  const [job, setJob] = useState<Job>(
    initial ?? {
      id: "",
      title: "",
      company: "",
      city: CITIES[0],
      type: "to'liq",
      currency: "UZS",
      remote: false,
      fields: [],
      skills: [],
      diplomaRequired: false,
      experienceYears: 0,
      description: "",
      contact: "",
    }
  );
  const [busy, setBusy] = useState(false);

  const update = (patch: Partial<Job>) => setJob((j) => ({ ...j, ...patch }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      await onSubmit(job);
    } finally {
      setBusy(false);
    }
  };

  const toggleField = (f: string) =>
    update({ fields: job.fields.includes(f) ? job.fields.filter((x) => x !== f) : [...job.fields, f] });
  const toggleSkill = (s: string) =>
    update({ skills: job.skills.includes(s) ? job.skills.filter((x) => x !== s) : [...job.skills, s] });

  return (
    <form onSubmit={submit} className="glass-strong rounded-3xl p-6 sm:p-7 animate-fade-up">
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-display text-xl font-semibold text-white">
          {initial ? "Tahrirlash" : "Yangi ish e'loni"}
        </h2>
        <button type="button" onClick={onCancel} className="text-gray-400 hover:text-white">
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="block text-xs text-gray-400 mb-1.5">Lavozim *</label>
          <input
            required
            className="input-dark"
            value={job.title}
            onChange={(e) => update({ title: e.target.value })}
            placeholder="Junior Frontend dasturchi"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1.5">Kompaniya *</label>
          <input
            required
            className="input-dark"
            value={job.company}
            onChange={(e) => update({ company: e.target.value })}
            placeholder="Uzum Technologies"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1.5">Shahar *</label>
          <select className="input-dark" value={job.city} onChange={(e) => update({ city: e.target.value })}>
            {CITIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs text-gray-400 mb-1.5">Maosh: dan</label>
          <input
            type="number"
            className="input-dark"
            value={job.salaryFrom ?? ""}
            onChange={(e) => update({ salaryFrom: e.target.value ? Number(e.target.value) : undefined })}
            placeholder="6000000"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1.5">Maosh: gacha</label>
          <input
            type="number"
            className="input-dark"
            value={job.salaryTo ?? ""}
            onChange={(e) => update({ salaryTo: e.target.value ? Number(e.target.value) : undefined })}
            placeholder="12000000"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1.5">Valyuta</label>
          <select className="input-dark" value={job.currency} onChange={(e) => update({ currency: e.target.value as Job["currency"] })}>
            <option value="UZS">UZS (so'm)</option>
            <option value="USD">USD</option>
          </select>
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1.5">Ish turi</label>
          <select className="input-dark" value={job.type} onChange={(e) => update({ type: e.target.value as Job["type"] })}>
            <option value="to'liq">To'liq stavka</option>
            <option value="yarim">Yarim stavka</option>
            <option value="loyiha">Loyiha asosida</option>
            <option value="amaliyot">Amaliyot</option>
          </select>
        </div>

        <div>
          <label className="block text-xs text-gray-400 mb-1.5">Tajriba (yil)</label>
          <input
            type="number"
            min={0}
            className="input-dark"
            value={job.experienceYears}
            onChange={(e) => update({ experienceYears: Number(e.target.value) || 0 })}
          />
        </div>

        <div className="sm:col-span-2 flex flex-wrap gap-4">
          <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
            <input
              type="checkbox"
              checked={job.remote}
              onChange={(e) => update({ remote: e.target.checked })}
              className="w-4 h-4 accent-brand-500"
            />
            Masofadan ishlash
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
            <input
              type="checkbox"
              checked={job.diplomaRequired}
              onChange={(e) => update({ diplomaRequired: e.target.checked })}
              className="w-4 h-4 accent-brand-500"
            />
            Diplom talab qilinadi
          </label>
        </div>

        <div className="sm:col-span-2">
          <label className="block text-xs text-gray-400 mb-1.5">Tavsif</label>
          <textarea
            rows={3}
            className="input-dark resize-none"
            value={job.description}
            onChange={(e) => update({ description: e.target.value })}
            placeholder="Ish haqida qisqacha..."
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-xs text-gray-400 mb-1.5">Aloqa (email/telefon/havola) *</label>
          <input
            required
            className="input-dark"
            value={job.contact}
            onChange={(e) => update({ contact: e.target.value })}
            placeholder="hr@company.uz yoki +998 90 123 45 67"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-xs text-gray-400 mb-1.5">Ariza havolasi (ixtiyoriy)</label>
          <input
            className="input-dark"
            value={job.url ?? ""}
            onChange={(e) => update({ url: e.target.value || undefined })}
            placeholder="https://company.uz/career/123"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-xs text-gray-400 mb-2">Soha (ta'lim yo'nalishi)</label>
          <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
            {ALL_FIELDS.map((f) => (
              <button
                type="button"
                key={f}
                onClick={() => toggleField(f)}
                className={`chip ${job.fields.includes(f) ? "chip-active" : ""}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="sm:col-span-2">
          <label className="block text-xs text-gray-400 mb-2">Hunarlar / ko'nikmalar</label>
          <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
            {SKILLS.map((s) => (
              <button
                type="button"
                key={s.id}
                onClick={() => toggleSkill(s.id)}
                className={`chip ${job.skills.includes(s.id) ? "chip-active" : ""}`}
              >
                {s.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-3 justify-end">
        <button type="button" onClick={onCancel} className="btn-ghost !px-5 !py-2.5 text-sm">
          Bekor qilish
        </button>
        <button type="submit" disabled={busy} className="btn-primary !px-5 !py-2.5 text-sm disabled:opacity-50">
          <Save className="h-4 w-4" />
          {busy ? "Saqlanmoqda…" : "Saqlash"}
        </button>
      </div>
    </form>
  );
}
