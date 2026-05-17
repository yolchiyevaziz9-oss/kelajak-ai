// Hunarlar / Skills — qo'l hunari va texnik hunarlar

export type Skill = {
  id: string;
  name: string;
  nameRu?: string;
  category: "qurilish" | "texnika" | "ijodiy" | "xizmat" | "raqamli" | "tibbiy" | "qishloq" | "savdo";
  demand: 1 | 2 | 3 | 4 | 5; // bozordagi talab (5 — yuqori)
};

export const SKILLS: Skill[] = [
  // Qurilish
  { id: "quruvchi", name: "Quruvchi / Bino quruvchi", nameRu: "Строитель", category: "qurilish", demand: 5 },
  { id: "elektrik", name: "Elektrik", nameRu: "Электрик", category: "qurilish", demand: 5 },
  { id: "santexnik", name: "Santexnik", nameRu: "Сантехник", category: "qurilish", demand: 5 },
  { id: "payvandchi", name: "Payvandchi (svarka)", nameRu: "Сварщик", category: "qurilish", demand: 4 },
  { id: "duradgor", name: "Duradgor (yog'och ustasi)", nameRu: "Плотник", category: "qurilish", demand: 4 },
  { id: "molyar", name: "Bo'yoqchi (molyar)", nameRu: "Маляр", category: "qurilish", demand: 4 },
  { id: "plitka", name: "Plitka ustasi", nameRu: "Плиточник", category: "qurilish", demand: 4 },

  // Texnika
  { id: "avtomexanik", name: "Avtomobil mexanigi", nameRu: "Автомеханик", category: "texnika", demand: 5 },
  { id: "kondisioner", name: "Konditsioner ustasi", nameRu: "Мастер кондиционеров", category: "texnika", demand: 4 },
  { id: "telefon-ustasi", name: "Telefon / kompyuter ustasi", nameRu: "Мастер по ремонту телефонов", category: "texnika", demand: 4 },
  { id: "tikuvchi", name: "Tikuvchi", nameRu: "Швея", category: "texnika", demand: 4 },
  { id: "haydovchi", name: "Haydovchi (B/C/D/E toifa)", nameRu: "Водитель", category: "texnika", demand: 5 },

  // Ijodiy
  { id: "dizayner", name: "Grafik dizayner", nameRu: "Графический дизайнер", category: "ijodiy", demand: 4 },
  { id: "fotograf", name: "Fotograf / Videograf", nameRu: "Фотограф / Видеограф", category: "ijodiy", demand: 4 },
  { id: "smm", name: "SMM (ijtimoiy tarmoq mutaxassisi)", nameRu: "SMM специалист", category: "ijodiy", demand: 5 },
  { id: "kontent", name: "Kontent yaratuvchi (blogger)", nameRu: "Контент-мейкер", category: "ijodiy", demand: 4 },
  { id: "muharrir", name: "Video muharrir", nameRu: "Видеомонтажёр", category: "ijodiy", demand: 4 },

  // Xizmat
  { id: "oshpaz", name: "Oshpaz / Pazandachi", nameRu: "Повар", category: "xizmat", demand: 5 },
  { id: "ofitsiant", name: "Ofitsiant / Barista", nameRu: "Официант / Бариста", category: "xizmat", demand: 4 },
  { id: "fitnes", name: "Fitnes trener", nameRu: "Фитнес-тренер", category: "xizmat", demand: 3 },
  { id: "sartarosh", name: "Sartarosh / Barber", nameRu: "Парикмахер / Барбер", category: "xizmat", demand: 4 },
  { id: "kosmetolog", name: "Kosmetolog / Vizajist", nameRu: "Косметолог / Визажист", category: "xizmat", demand: 4 },
  { id: "manikur", name: "Manikur / Pedikur ustasi", nameRu: "Мастер маникюра", category: "xizmat", demand: 4 },

  // Raqamli (kasb-hunar darajasida)
  { id: "kassir", name: "Kassir / Ofis xodimi", nameRu: "Кассир / Офис менеджер", category: "savdo", demand: 4 },
  { id: "operator", name: "Call-markaz operatori", nameRu: "Оператор call-центра", category: "xizmat", demand: 4 },
  { id: "kuryer", name: "Kuryer / Yetkazib beruvchi", nameRu: "Курьер", category: "xizmat", demand: 5 },

  // Tibbiy
  { id: "hamshira", name: "Hamshira", nameRu: "Медсестра", category: "tibbiy", demand: 4 },
  { id: "massazh", name: "Massajchi", nameRu: "Массажист", category: "tibbiy", demand: 3 },

  // Qishloq
  { id: "dehqon", name: "Dehqon / Fermer", nameRu: "Фермер", category: "qishloq", demand: 3 },
  { id: "chorvador", name: "Chorvador", nameRu: "Животновод", category: "qishloq", demand: 3 },

  // Savdo
  { id: "sotuvchi", name: "Sotuvchi / Konsultant", nameRu: "Продавец-консультант", category: "savdo", demand: 5 },

  { id: "boshqa", name: "Boshqa hunar", nameRu: "Другое", category: "xizmat", demand: 2 },
];
