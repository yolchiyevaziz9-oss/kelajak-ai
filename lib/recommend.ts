// Demo AI tavsiya logikasi.
// Foydalanuvchi anketasidan kelgan ma'lumotlarni ish e'lonlari bilan solishtiramiz.
// Har bir ish uchun 0..100 oralig'ida ball hisoblanadi.
// Keyinchalik bu funksiya o'rniga Claude API chaqiruvi qo'yiladi.

import { JOBS, type Job } from "./jobs";
import { SKILLS } from "./skills";
import { UNIVERSITIES } from "./universities";

export type Profile = {
  hasHigherEducation: boolean;
  universityId?: string;
  field?: string; // ta'lim yo'nalishi
  skills: string[]; // hunar id'lari
  languages: { id: string; level: string }[];
  diplomas: string[]; // diplom/sertifikatlar (erkin matn)
  city: string;
  goal: "shahrimda" | "boshqa-shahar" | "masofadan" | "chet-elda";
};

export type Recommendation = {
  job: Job;
  score: number;
  reasons: string[]; // nima uchun mos kelishi haqida tushuntirish
};

export type AdviceBlock = {
  title: string;
  text: string;
  links?: { label: string; url: string }[];
};

function matchScore(profile: Profile, job: Job): { score: number; reasons: string[] } {
  let score = 30; // base
  const reasons: string[] = [];

  // Shahar mosligi
  if (job.remote && (profile.goal === "masofadan" || profile.goal === "chet-elda")) {
    score += 25;
    reasons.push("Masofadan ishlash imkoniyati");
  } else if (job.city.toLowerCase().includes(profile.city.toLowerCase()) || profile.city.toLowerCase().includes(job.city.toLowerCase())) {
    score += 20;
    reasons.push(`Sizning shahringizda — ${job.city}`);
  } else if (profile.goal === "boshqa-shahar") {
    score += 10;
    reasons.push("Boshqa shaharda ishlashga tayyorsiz");
  } else {
    score -= 5;
  }

  // Ta'lim yo'nalishi mosligi
  if (profile.hasHigherEducation && profile.field && job.fields.includes(profile.field)) {
    score += 20;
    reasons.push(`Ta'lim yo'nalishingiz mos — "${profile.field}"`);
  }

  // Diplom talabi
  if (job.diplomaRequired) {
    if (profile.hasHigherEducation) {
      score += 5;
    } else {
      score -= 25;
      reasons.push("⚠️ Ushbu ish diplom talab qiladi");
    }
  } else {
    if (!profile.hasHigherEducation) {
      score += 10;
      reasons.push("Diplom talab qilinmaydi");
    }
  }

  // Hunar mosligi
  const matchedSkills = job.skills.filter((s) => profile.skills.includes(s));
  if (matchedSkills.length > 0) {
    score += 25 + matchedSkills.length * 3;
    const names = matchedSkills
      .map((id) => SKILLS.find((s) => s.id === id)?.name)
      .filter(Boolean)
      .join(", ");
    reasons.push(`Hunaringiz mos: ${names}`);
  }

  // Til mosligi
  if (job.languages && job.languages.length > 0) {
    const userLangs = profile.languages.map((l) => l.id);
    const matched = job.languages.filter((l) => userLangs.includes(l));
    if (matched.length === job.languages.length) {
      score += 10;
      reasons.push("Talab qilingan tillarni bilasiz");
    } else if (matched.length > 0) {
      score += 4;
    } else {
      score -= 5;
    }
  }

  // Tajriba (bizda barcha 0 yoki past — yangi boshlovchilar uchun)
  if (job.experienceYears === 0) {
    score += 5;
  }

  return { score: Math.max(0, Math.min(100, score)), reasons };
}

export function recommendJobs(profile: Profile, top = 6): Recommendation[] {
  return JOBS.map((job) => {
    const { score, reasons } = matchScore(profile, job);
    return { job, score, reasons };
  })
    .sort((a, b) => b.score - a.score)
    .slice(0, top);
}

// Qo'shimcha yo'nalish maslahatlari
export function generateAdvice(profile: Profile): AdviceBlock[] {
  const blocks: AdviceBlock[] = [];

  // Til bo'yicha
  const hasEnglish = profile.languages.some((l) => l.id === "en" && ["B1", "B2", "C1", "C2", "native"].includes(l.level));
  if (!hasEnglish) {
    blocks.push({
      title: "Ingliz tilini B2 darajagacha o'rganing",
      text: "Ingliz tilini bilish ish haqingizni 30–80% ga oshiradi va xalqaro kompaniyalarga eshik ochadi. Kuniga 30 daqiqa — 6 oyda B1 darajaga yetasiz.",
      links: [
        { label: "Cambridge English bepul testlar", url: "https://www.cambridgeenglish.org/test-your-english/" },
        { label: "Duolingo (mobil)", url: "https://www.duolingo.com/" },
      ],
    });
  }

  // IT yo'nalishi
  const inIT = profile.field === "IT" || profile.field === "Dasturlash" || profile.field === "Kompyuter muhandisligi";
  if (inIT || profile.skills.includes("operator")) {
    blocks.push({
      title: "IT bo'yicha amaliy ko'nikmalar oling",
      text: "Diplom yetarli emas — portfolio kerak. GitHub'da 3–5 ta loyiha tayyorlang va Junior darajada ishga arizalar yuboring.",
      links: [
        { label: "freeCodeCamp", url: "https://www.freecodecamp.org/" },
        { label: "PDP Academy (Toshkent)", url: "https://pdp.uz/" },
      ],
    });
  }

  // Hunar yo'q va diplom ham yo'q
  if (!profile.hasHigherEducation && profile.skills.length === 0) {
    blocks.push({
      title: "Bitta hunarni puxta egallang",
      text: "Kasb-hunar kollejlari yoki qisqa kurslarda 3–6 oyda real daromad keltiradigan hunar olishingiz mumkin. Eng talab qilingani: elektrik, avtomexanik, santexnik, payvandchi, oshpaz.",
      links: [
        { label: "Mehnat vazirligi — kurslar", url: "https://mehnat.uz/" },
      ],
    });
  }

  // Bitiruvchi, lekin ish topa olmayotgan
  if (profile.hasHigherEducation) {
    blocks.push({
      title: "Ariza yuborganda diplom + portfolio + tavsiyanoma",
      text: "Faqat rezyume yetmaydi. LinkedIn profilingizni to'ldiring, ustozlardan tavsiyanoma so'rang, va mini-loyihalaringizni Behance/GitHub'ga joylang. HR rezyumeni 7 soniyada o'qiydi — eng kuchli ko'nikmalarni boshiga qo'ying.",
      links: [
        { label: "LinkedIn", url: "https://www.linkedin.com/" },
        { label: "Bepul rezyume yaratish", url: "https://www.canva.com/resumes/templates/" },
      ],
    });
  }

  // Hammaga umumiy
  blocks.push({
    title: "Bu manbalarni har kuni kuzatib boring",
    text: "Ishni faqat bizning saytda emas, balki quyidagi manbalarda ham qidiring — yangi e'lonlar har kuni paydo bo'ladi.",
    links: [
      { label: "ish.uz", url: "https://ish.uz/" },
      { label: "HeadHunter Uzbekistan", url: "https://hh.uz/" },
      { label: "OLX Ish", url: "https://www.olx.uz/rabota/" },
      { label: "Telegram: @uzjobs", url: "https://t.me/uzjobs" },
    ],
  });

  return blocks;
}

export function formatSalary(from?: number, to?: number, currency: "UZS" | "USD" = "UZS"): string {
  const f = (n: number) =>
    currency === "UZS"
      ? `${(n / 1_000_000).toFixed(1)} mln so'm`
      : `$${n.toLocaleString()}`;
  if (from && to) return `${f(from)} – ${f(to)}`;
  if (from) return `${f(from)} dan`;
  if (to) return `${f(to)} gacha`;
  return "Kelishilgan holda";
}
