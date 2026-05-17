// Admin: ish e'lonlarini qo'shish/tahrirlash/o'chirish.
// Yozish — GitHub Contents API orqali data/admin-jobs.json'ga commit qiladi.
// Netlify avtomatik qayta build qiladi.

import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { getAdminJobsRaw, saveAdminJobs } from "@/lib/github";
import type { Job } from "@/lib/jobs";

async function requireAdmin() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

export async function GET() {
  const unauth = await requireAdmin();
  if (unauth) return unauth;

  const data = await getAdminJobsRaw();
  return NextResponse.json({
    jobs: (data?.jobs ?? []) as Job[],
    configured: !!process.env.GITHUB_PAT,
  });
}

// Yangi ish qo'shish
export async function POST(req: Request) {
  const unauth = await requireAdmin();
  if (unauth) return unauth;

  const job = (await req.json()) as Job;
  if (!job.title || !job.company) {
    return NextResponse.json({ error: "title va company shart" }, { status: 400 });
  }

  const data = await getAdminJobsRaw();
  const current = (data?.jobs ?? []) as Job[];
  const newJob: Job = {
    ...job,
    id: job.id || `admin-${Date.now()}`,
    fields: job.fields ?? [],
    skills: job.skills ?? [],
    currency: job.currency ?? "UZS",
    type: job.type ?? "to'liq",
    remote: job.remote ?? false,
    diplomaRequired: job.diplomaRequired ?? false,
    experienceYears: job.experienceYears ?? 0,
  };
  const updated = [newJob, ...current];

  try {
    await saveAdminJobs(updated, `Add job: ${job.title}`);
    return NextResponse.json({ ok: true, job: newJob });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}

// Yangilash
export async function PUT(req: Request) {
  const unauth = await requireAdmin();
  if (unauth) return unauth;

  const job = (await req.json()) as Job;
  const data = await getAdminJobsRaw();
  const current = (data?.jobs ?? []) as Job[];
  const idx = current.findIndex((j) => j.id === job.id);
  if (idx < 0) return NextResponse.json({ error: "Topilmadi" }, { status: 404 });
  current[idx] = job;

  try {
    await saveAdminJobs(current, `Update job: ${job.title}`);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}

// O'chirish
export async function DELETE(req: Request) {
  const unauth = await requireAdmin();
  if (unauth) return unauth;

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id shart" }, { status: 400 });

  const data = await getAdminJobsRaw();
  const current = (data?.jobs ?? []) as Job[];
  const filtered = current.filter((j) => j.id !== id);

  try {
    await saveAdminJobs(filtered, `Delete job: ${id}`);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
