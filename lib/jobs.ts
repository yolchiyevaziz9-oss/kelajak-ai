// Test ish e'lonlari (mock data). Keyinchalik real manbalarga ulanadi.

export type Job = {
  id: string;
  title: string;
  titleRu?: string;
  company: string;
  city: string;
  salaryFrom?: number; // so'mda
  salaryTo?: number;
  currency: "UZS" | "USD";
  type: "to'liq" | "yarim" | "loyiha" | "amaliyot";
  remote: boolean;
  fields: string[]; // mos keladigan ta'lim yo'nalishlari
  skills: string[]; // mos keladigan hunar id'lari
  languages?: string[]; // talab qilinadigan tillar
  diplomaRequired: boolean; // diplom talab qilinadimi
  experienceYears: number; // minimum tajriba (0 — talabsiz)
  description: string;
  contact: string; // email/telefon
  url?: string;
};

export const JOBS: Job[] = [
  // IT
  { id: "j1", title: "Junior Frontend dasturchi", company: "EPAM Uzbekistan", city: "Toshkent shahri", salaryFrom: 6_000_000, salaryTo: 12_000_000, currency: "UZS", type: "to'liq", remote: false, fields: ["IT", "Dasturlash", "Kompyuter muhandisligi"], skills: [], languages: ["en"], diplomaRequired: false, experienceYears: 0, description: "React/TS asoslarini biluvchi yosh dasturchini ish o'rganib boruvchi sifatida olamiz.", contact: "hr@epam.uz" },
  { id: "j2", title: "QA tester (intern)", company: "Uzum Technologies", city: "Toshkent shahri", salaryFrom: 4_000_000, currency: "UZS", type: "amaliyot", remote: false, fields: ["IT", "Dasturlash"], skills: [], diplomaRequired: false, experienceYears: 0, description: "QA bo'limida 3 oylik haqli amaliyot. Talabalar va bitiruvchilarni kutamiz.", contact: "career@uzum.uz" },
  { id: "j3", title: "Data analyst (junior)", company: "TBC Bank Uzbekistan", city: "Toshkent shahri", salaryFrom: 8_000_000, currency: "UZS", type: "to'liq", remote: true, fields: ["IT", "Matematika", "Iqtisodiyot"], skills: [], languages: ["en", "ru"], diplomaRequired: true, experienceYears: 0, description: "SQL va Excel asoslarini biluvchi tahlilchi kerak.", contact: "hr@tbcbank.uz" },

  // Pedagogika
  { id: "j4", title: "Boshlang'ich sinf o'qituvchisi", company: "Prezident maktabi", city: "Samarqand", salaryFrom: 7_000_000, salaryTo: 10_000_000, currency: "UZS", type: "to'liq", remote: false, fields: ["Pedagogika"], skills: [], languages: ["en"], diplomaRequired: true, experienceYears: 0, description: "Ingliz tilini biluvchi boshlang'ich sinf o'qituvchisi.", contact: "vacancy@prezident.uz" },
  { id: "j5", title: "Ingliz tili o'qituvchisi", company: "Cambridge Learning Centre", city: "Buxoro", salaryFrom: 5_000_000, salaryTo: 9_000_000, currency: "UZS", type: "yarim", remote: false, fields: ["Tillar", "Pedagogika", "Filologiya"], skills: [], languages: ["en"], diplomaRequired: false, experienceYears: 0, description: "B2+ darajada ingliz tili biluvchi yosh o'qituvchi.", contact: "+998 90 123 45 67" },

  // Tibbiyot
  { id: "j6", title: "Hamshira", company: "Akfa Medline", city: "Toshkent shahri", salaryFrom: 6_500_000, currency: "UZS", type: "to'liq", remote: false, fields: ["Tibbiyot"], skills: ["hamshira"], diplomaRequired: true, experienceYears: 0, description: "Statsionar bo'limga hamshira.", contact: "hr@akfamedline.uz" },
  { id: "j7", title: "Yosh shifokor (terapevt)", company: "MediClinic Tashkent", city: "Toshkent shahri", salaryFrom: 9_000_000, currency: "UZS", type: "to'liq", remote: false, fields: ["Tibbiyot"], skills: [], diplomaRequired: true, experienceYears: 0, description: "Bitiruvchi shifokorlar uchun mentorlik dasturi mavjud.", contact: "career@mediclinic.uz" },

  // Iqtisodiyot/Bank
  { id: "j8", title: "Buxgalter yordamchisi", company: "Hamkorbank", city: "Farg'ona", salaryFrom: 5_500_000, currency: "UZS", type: "to'liq", remote: false, fields: ["Iqtisodiyot", "Buxgalteriya", "Moliya"], skills: [], diplomaRequired: true, experienceYears: 0, description: "1C bilan ishlashni biladigan junior buxgalter.", contact: "hr@hamkorbank.uz" },
  { id: "j9", title: "Kredit mutaxassisi", company: "Anorbank", city: "Toshkent shahri", salaryFrom: 7_000_000, currency: "UZS", type: "to'liq", remote: false, fields: ["Iqtisodiyot", "Bank ishi", "Moliya"], skills: [], diplomaRequired: true, experienceYears: 0, description: "Mijozlar bilan ishlash, kredit so'rovlarini ko'rib chiqish.", contact: "career@anorbank.uz" },

  // SMM / dizayn
  { id: "j10", title: "SMM mutaxassisi", company: "Korzinka.uz", city: "Toshkent shahri", salaryFrom: 7_000_000, salaryTo: 12_000_000, currency: "UZS", type: "to'liq", remote: true, fields: ["Marketing", "Jurnalistika"], skills: ["smm", "kontent"], languages: ["uz", "ru"], diplomaRequired: false, experienceYears: 0, description: "Instagram va TikTok bo'yicha kontent strategiyasini olib boruvchi.", contact: "hr@korzinka.uz" },
  { id: "j11", title: "Grafik dizayner", company: "Click", city: "Toshkent shahri", salaryFrom: 8_000_000, currency: "UZS", type: "to'liq", remote: true, fields: [], skills: ["dizayner"], diplomaRequired: false, experienceYears: 0, description: "Brendbook va vizual materiallar ustida ishlash.", contact: "design@click.uz" },

  // Hunar
  { id: "j12", title: "Elektrik (3-4 razryad)", company: "UzAuto Motors", city: "Andijon", salaryFrom: 6_000_000, salaryTo: 9_500_000, currency: "UZS", type: "to'liq", remote: false, fields: [], skills: ["elektrik"], diplomaRequired: false, experienceYears: 0, description: "Zavodning elektr ta'minoti bo'limiga elektrik kerak. Yotoqxona bor.", contact: "+998 74 240 00 00" },
  { id: "j13", title: "Avtomexanik", company: "Chevrolet Service", city: "Samarqand", salaryFrom: 6_000_000, salaryTo: 11_000_000, currency: "UZS", type: "to'liq", remote: false, fields: [], skills: ["avtomexanik"], diplomaRequired: false, experienceYears: 0, description: "Yengil avtomobillarni ta'mirlash. Yoshlarni o'rgatib boramiz.", contact: "+998 91 555 22 11" },
  { id: "j14", title: "Payvandchi (svarka)", company: "Enter Engineering", city: "Buxoro", salaryFrom: 9_000_000, salaryTo: 15_000_000, currency: "UZS", type: "to'liq", remote: false, fields: [], skills: ["payvandchi"], diplomaRequired: false, experienceYears: 1, description: "Vaxta usulida — 28/14 grafigida ishlash. Yotoqxona va ovqat tekin.", contact: "hr@enter.uz" },
  { id: "j15", title: "Oshpaz", company: "Cafe \"Bahor\"", city: "Toshkent shahri", salaryFrom: 5_000_000, salaryTo: 8_000_000, currency: "UZS", type: "to'liq", remote: false, fields: [], skills: ["oshpaz"], diplomaRequired: false, experienceYears: 0, description: "Milliy va Yevropa taomlari oshpazi. Tajriba yo'q bo'lsa ham o'rgatamiz.", contact: "+998 90 333 44 55" },
  { id: "j16", title: "Tikuvchi", company: "Global Textile", city: "Namangan", salaryFrom: 4_500_000, salaryTo: 8_000_000, currency: "UZS", type: "to'liq", remote: false, fields: ["To'qimachilik"], skills: ["tikuvchi"], diplomaRequired: false, experienceYears: 0, description: "Trikotaj fabrikasi. Yangi xodimlarni o'rgatib boriladi.", contact: "+998 69 555 11 22" },
  { id: "j17", title: "Sartarosh (Barber)", company: "Barbershop \"Brutal\"", city: "Toshkent shahri", salaryFrom: 6_000_000, salaryTo: 12_000_000, currency: "UZS", type: "to'liq", remote: false, fields: [], skills: ["sartarosh"], diplomaRequired: false, experienceYears: 0, description: "Foiz asosida ishlaymiz. O'rganuvchilar uchun ham joy bor.", contact: "@brutal_barbershop" },
  { id: "j18", title: "Kuryer (avtomobil)", company: "Yandex Eats", city: "Toshkent shahri", salaryFrom: 5_000_000, salaryTo: 13_000_000, currency: "UZS", type: "to'liq", remote: false, fields: [], skills: ["kuryer", "haydovchi"], diplomaRequired: false, experienceYears: 0, description: "Erkin grafik. Buyurtma soniga qarab ish haqi.", contact: "courier.yandex.uz" },
  { id: "j19", title: "Call-markaz operatori", company: "Beeline Uzbekistan", city: "Toshkent shahri", salaryFrom: 4_500_000, salaryTo: 7_000_000, currency: "UZS", type: "to'liq", remote: true, fields: [], skills: ["operator"], languages: ["uz", "ru"], diplomaRequired: false, experienceYears: 0, description: "O'zbek va rus tilida mijozlarga xizmat ko'rsatish.", contact: "career@beeline.uz" },

  // Muhandislik / Qurilish
  { id: "j20", title: "Junior muhandis-quruvchi", company: "Murad Buildings", city: "Toshkent shahri", salaryFrom: 8_000_000, currency: "UZS", type: "to'liq", remote: false, fields: ["Qurilish", "Muhandislik"], skills: [], diplomaRequired: true, experienceYears: 0, description: "Bitiruvchi muhandislar uchun mentorlik bilan.", contact: "hr@muradbuildings.uz" },
  { id: "j21", title: "Geolog (bitiruvchi)", company: "Navoiy Mining", city: "Navoiy", salaryFrom: 12_000_000, currency: "UZS", type: "to'liq", remote: false, fields: ["Geologiya", "Konchilik"], skills: [], diplomaRequired: true, experienceYears: 0, description: "Yotoqxona, ovqat va transport tekin.", contact: "hr@ngmk.uz" },

  // Qishloq xo'jaligi
  { id: "j22", title: "Agronom yordamchisi", company: "Agrofermer Cluster", city: "Jizzax", salaryFrom: 6_000_000, currency: "UZS", type: "to'liq", remote: false, fields: ["Qishloq xo'jaligi", "Agronomiya"], skills: ["dehqon"], diplomaRequired: false, experienceYears: 0, description: "Paxta va g'alla maydonlari uchun yosh agronom.", contact: "+998 72 226 33 44" },

  // Huquq
  { id: "j23", title: "Yurist yordamchisi", company: "Centil Law Firm", city: "Toshkent shahri", salaryFrom: 7_000_000, currency: "UZS", type: "to'liq", remote: false, fields: ["Huquq", "Yurisprudensiya"], skills: [], languages: ["en", "ru"], diplomaRequired: true, experienceYears: 0, description: "Hujjatlar bilan ishlash, klientlarga xizmat.", contact: "hr@centil.law" },

  // Tarjima
  { id: "j24", title: "Tarjimon (ingliz-o'zbek)", company: "Wooppay", city: "Toshkent shahri", salaryFrom: 6_000_000, currency: "UZS", type: "yarim", remote: true, fields: ["Tillar", "Tarjima", "Filologiya"], skills: [], languages: ["en"], diplomaRequired: false, experienceYears: 0, description: "Texnik hujjatlar va veb-sayt tarjimasi.", contact: "career@wooppay.com" },

  // Hotel/Turizm
  { id: "j25", title: "Resepsion (hotel)", company: "Hyatt Regency Tashkent", city: "Toshkent shahri", salaryFrom: 6_500_000, currency: "UZS", type: "to'liq", remote: false, fields: ["Turizm", "Servis"], skills: [], languages: ["en", "ru"], diplomaRequired: false, experienceYears: 0, description: "Mehmonlarni qabul qilish, ingliz tili B2+.", contact: "hr@hyatt.com" },
];
