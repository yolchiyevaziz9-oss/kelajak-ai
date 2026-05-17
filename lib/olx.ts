// OLX.uz scraper — Next.js'da yaratilgan sahifadan __PRERENDERED_STATE__ ni o'qiymiz.
// HTML strukturasi o'zgarsa, bu fayl yangilanadi.

import type { Job } from "./jobs";

type OLXLocation = {
  cityName?: string;
  regionName?: string;
  pathName?: string;
};

type OLXParam = {
  key: string;
  name: string;
  type: string;
  value: string;
  normalizedValue?: string;
};

type OLXSalary = {
  from?: number;
  to?: number;
  type?: string;
  currency?: string;
  arranged?: boolean;
};

type OLXAd = {
  id: number | string;
  title: string;
  description?: string;
  url: string;
  createdTime?: string;
  isJob?: boolean;
  location?: OLXLocation;
  price?: { value?: number; arranged?: boolean } | null;
  salary?: OLXSalary | null;
  params?: OLXParam[];
};

// OLX viloyat/shahar nomlarini bizning shahar nomlariga o'tkazish
const CITY_MAP: Record<string, string> = {
  Ташкент: "Toshkent shahri",
  "Ташкентская область": "Toshkent viloyati",
  Самарканд: "Samarqand",
  "Самаркандская область": "Samarqand",
  Бухара: "Buxoro",
  "Бухарская область": "Buxoro",
  Андижан: "Andijon",
  "Андижанская область": "Andijon",
  Фергана: "Farg'ona",
  "Ферганская область": "Farg'ona",
  Наманган: "Namangan",
  "Наманганская область": "Namangan",
  Карши: "Qarshi",
  "Кашкадарьинская область": "Qarshi",
  Термез: "Termiz",
  "Сурхандарьинская область": "Termiz",
  Нукус: "Nukus",
  "Республика Каракалпакстан": "Nukus",
  Ургенч: "Urganch",
  "Хорезмская область": "Urganch",
  Навои: "Navoiy",
  "Навоийская область": "Navoiy",
  Джизак: "Jizzax",
  "Джизакская область": "Jizzax",
  Гулистан: "Guliston",
  "Сырдарьинская область": "Guliston",
};

function mapCity(loc?: OLXLocation): string {
  if (!loc) return "Boshqa shahar";
  const city = loc.cityName && CITY_MAP[loc.cityName];
  if (city) return city;
  const region = loc.regionName && CITY_MAP[loc.regionName];
  if (region) return region;
  return loc.cityName || loc.regionName || "Boshqa shahar";
}

function fmtDesc(html?: string): string {
  if (!html) return "";
  return html.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim().slice(0, 280);
}

function parseSalary(s: OLXSalary | null | undefined, price: OLXAd["price"]): { from?: number; to?: number; currency: "UZS" | "USD" } {
  // OLX salary: { from, to, type: 'monthly', currency: 'UZS' }
  if (s && (s.from || s.to)) {
    const currency: "UZS" | "USD" = s.currency === "USD" ? "USD" : "UZS";
    return { from: s.from, to: s.to, currency };
  }
  if (price?.value) {
    return { from: price.value, currency: "UZS" };
  }
  return { currency: "UZS" };
}

function paramByKey(params: OLXParam[] | undefined, key: string): string | undefined {
  return params?.find((p) => p.key === key)?.normalizedValue ?? params?.find((p) => p.key === key)?.value;
}

function mapEmployment(ad: OLXAd): Job["type"] {
  const timing = paramByKey(ad.params, "job_timing");
  if (timing === "part") return "yarim";
  if (timing === "contract") return "loyiha";
  if (paramByKey(ad.params, "job_type") === "internship") return "amaliyot";
  return "to'liq";
}

// Sodda keyword-based soha va hunar aniqlash (UZ + RU)
const FIELD_KW: Record<string, string[]> = {
  IT: ["dasturchi", "developer", "программист", "javascript", "react", "python", "frontend", "backend", "qa tester"],
  Tibbiyot: ["shifokor", "врач", "медсестра", "hamshira", "stomatolog"],
  Pedagogika: ["o'qituvchi", "учитель", "репетитор", "tarbiyachi", "воспитатель"],
  Iqtisodiyot: ["buxgalter", "бухгалтер", "iqtisodchi", "экономист"],
  Marketing: ["smm", "маркетолог", "копирайтер", "marketolog"],
  Huquq: ["юрист", "yurist", "адвокат"],
  Qurilish: ["строитель", "muhandis", "quruvchi"],
  Tillar: ["переводчик", "tarjimon"],
};

const SKILL_KW: Record<string, string[]> = {
  elektrik: ["электрик", "elektrik"],
  santexnik: ["сантехник", "santexnik"],
  payvandchi: ["сварщик", "payvandchi"],
  avtomexanik: ["автомеханик", "автослесар", "avtomexanik"],
  tikuvchi: ["швея", "tikuvchi"],
  oshpaz: ["повар", "oshpaz", "пазандачи"],
  sartarosh: ["парикмахер", "sartarosh", "barber"],
  ofitsiant: ["официант", "ofitsiant", "бариста", "barista"],
  kuryer: ["курьер", "kuryer", "courier"],
  haydovchi: ["водитель", "haydovchi", "driver"],
  smm: ["smm", "соцсет"],
  dizayner: ["дизайнер", "designer", "dizayner"],
  sotuvchi: ["продавец", "sotuvchi"],
  operator: ["оператор", "operator", "call"],
  hamshira: ["медсестра", "hamshira"],
  duradgor: ["плотник", "duradgor"],
  molyar: ["маляр", "molyar", "bo'yoqchi"],
  quruvchi: ["строитель", "quruvchi"],
  plitka: ["плиточник", "plitka"],
  kassir: ["кассир", "kassir"],
  manikur: ["маникюр", "manikur"],
  kosmetolog: ["косметолог", "kosmetolog"],
  fitnes: ["фитнес", "fitnes", "тренер"],
};

function detectFieldsSkills(text: string): { fields: string[]; skills: string[] } {
  const t = text.toLowerCase();
  const fields = Object.entries(FIELD_KW).filter(([, ks]) => ks.some((k) => t.includes(k))).map(([f]) => f);
  const skills = Object.entries(SKILL_KW).filter(([, ks]) => ks.some((k) => t.includes(k))).map(([s]) => s);
  return { fields, skills };
}

function mapOLXToJob(ad: OLXAd): Job {
  const haystack = `${ad.title} ${ad.description ?? ""}`;
  const { fields, skills } = detectFieldsSkills(haystack);
  const { from, to, currency } = parseSalary(ad.salary, ad.price);

  return {
    id: `olx-${ad.id}`,
    title: ad.title,
    company: "OLX (xususiy ish beruvchi)",
    city: mapCity(ad.location),
    salaryFrom: from,
    salaryTo: to,
    currency,
    type: mapEmployment(ad),
    remote: false,
    fields,
    skills,
    diplomaRequired: false,
    experienceYears: 0,
    description: fmtDesc(ad.description) || ad.title,
    contact: ad.url,
    url: ad.url,
  };
}

// HTML'dan __PRERENDERED_STATE__ ni ajratib oladi
function extractPrerenderedState(html: string): unknown | null {
  const start = html.indexOf("window.__PRERENDERED_STATE__=");
  if (start < 0) return null;
  const quoteStart = html.indexOf('"', start);
  if (quoteStart < 0) return null;
  let i = quoteStart + 1;
  while (i < html.length) {
    if (html[i] === "\\") {
      i += 2;
      continue;
    }
    if (html[i] === '"') break;
    i++;
  }
  try {
    const raw = html.slice(quoteStart, i + 1);
    const decoded = JSON.parse(raw); // unescape JS string
    return JSON.parse(decoded);
  } catch {
    return null;
  }
}

export async function fetchOLXJobs(page = 1): Promise<Job[]> {
  const url = `https://www.olx.uz/rabota/${page > 1 ? `?page=${page}` : ""}`;
  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      Accept: "text/html",
      "Accept-Language": "uz,ru;q=0.9,en;q=0.8",
    },
    next: { revalidate: 3600 }, // 1 soat cache
  });
  if (!res.ok) return [];
  const html = await res.text();
  const state = extractPrerenderedState(html) as { listing?: { listing?: { ads?: OLXAd[] } } } | null;
  const ads = state?.listing?.listing?.ads ?? [];
  return ads.filter((a) => a.isJob !== false).map(mapOLXToJob);
}
