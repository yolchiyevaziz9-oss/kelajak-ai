// Ish e'lonlari proksisi — curated (lib/jobs.ts) + admin (data/admin-jobs.json) + OLX.uz.

import { NextResponse } from "next/server";
import { fetchOLXJobs } from "@/lib/olx";
import { JOBS as CURATED_JOBS, type Job } from "@/lib/jobs";
import adminJobsRaw from "@/data/admin-jobs.json";

export const revalidate = 3600;

export async function GET() {
  const adminJobs = adminJobsRaw as Job[];

  let olxJobs: Job[] = [];
  try {
    const pages = await Promise.all([fetchOLXJobs(1), fetchOLXJobs(2), fetchOLXJobs(3)]);
    olxJobs = pages.flat();
  } catch (err) {
    console.error("OLX fetch failed", err);
  }

  // Admin birinchi (eng tanlangan), keyin curated, keyin OLX
  const all = [...adminJobs, ...CURATED_JOBS, ...olxJobs];

  return NextResponse.json({
    source: olxJobs.length > 0 ? "all" : "no-olx",
    count: all.length,
    adminCount: adminJobs.length,
    curatedCount: CURATED_JOBS.length,
    olxCount: olxJobs.length,
    jobs: all,
  });
}
