// GitHub Contents API yordamida data/admin-jobs.json fayliga yozish.
// Har yozish — bitta commit + Netlify avtomatik qayta deploy.

const OWNER = process.env.GITHUB_OWNER || "yolchiyevaziz9-oss";
const REPO = process.env.GITHUB_REPO || "kelajak-ai";
const BRANCH = process.env.GITHUB_BRANCH || "main";
const FILE_PATH = "data/admin-jobs.json";

type GithubFile = { sha: string; content: string; encoding: string };

async function gh(path: string, init: RequestInit = {}) {
  const token = process.env.GITHUB_PAT;
  if (!token) throw new Error("GITHUB_PAT not configured");
  const res = await fetch(`https://api.github.com${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`GitHub ${res.status}: ${txt}`);
  }
  return res.json();
}

export async function getAdminJobsRaw(): Promise<{ jobs: unknown[]; sha: string } | null> {
  try {
    const data = (await gh(
      `/repos/${OWNER}/${REPO}/contents/${FILE_PATH}?ref=${BRANCH}`
    )) as GithubFile;
    const content = Buffer.from(data.content, "base64").toString("utf8");
    return { jobs: JSON.parse(content), sha: data.sha };
  } catch (e) {
    console.error("GitHub read failed:", e);
    return null;
  }
}

export async function saveAdminJobs(jobs: unknown[], message: string): Promise<void> {
  const current = await getAdminJobsRaw();
  const content = Buffer.from(JSON.stringify(jobs, null, 2) + "\n", "utf8").toString("base64");
  await gh(`/repos/${OWNER}/${REPO}/contents/${FILE_PATH}`, {
    method: "PUT",
    body: JSON.stringify({
      message,
      content,
      sha: current?.sha,
      branch: BRANCH,
    }),
  });
}
