// O'zbekiston shaharlari va viloyatlari

export const CITIES = [
  "Toshkent shahri",
  "Toshkent viloyati",
  "Samarqand",
  "Buxoro",
  "Andijon",
  "Farg'ona",
  "Namangan",
  "Qarshi",
  "Termiz",
  "Nukus",
  "Urganch",
  "Xiva",
  "Navoiy",
  "Jizzax",
  "Guliston",
  "Nurafshon",
  "Zarafshon",
  "Olmaliq",
  "Angren",
  "Chirchiq",
  "Bekobod",
  "Kogon",
  "Boshqa shahar",
] as const;

export type City = (typeof CITIES)[number];

export const LANGUAGES = [
  { id: "uz", name: "O'zbek tili", nameRu: "Узбекский" },
  { id: "ru", name: "Rus tili", nameRu: "Русский" },
  { id: "en", name: "Ingliz tili", nameRu: "Английский" },
  { id: "tr", name: "Turk tili", nameRu: "Турецкий" },
  { id: "ar", name: "Arab tili", nameRu: "Арабский" },
  { id: "de", name: "Nemis tili", nameRu: "Немецкий" },
  { id: "ko", name: "Koreys tili", nameRu: "Корейский" },
  { id: "zh", name: "Xitoy tili", nameRu: "Китайский" },
  { id: "fa", name: "Fors / Tojik tili", nameRu: "Персидский / Таджикский" },
  { id: "ja", name: "Yapon tili", nameRu: "Японский" },
] as const;

export type LangLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | "native";
