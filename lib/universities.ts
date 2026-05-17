// O'zbekistondagi asosiy oliy ta'lim muassasalari
// Manba: OTM ro'yxati (umumiy keng tarqalgan ro'yxat)

export type University = {
  id: string;
  name: string; // Lotin
  nameRu?: string;
  city: string;
  category: "davlat" | "xususiy" | "xorijiy-filial";
  fields: string[]; // Asosiy yo'nalishlar (sohalar)
};

export const UNIVERSITIES: University[] = [
  { id: "ozmu", name: "O'zbekiston Milliy universiteti (O'zMU)", nameRu: "Национальный университет Узбекистана", city: "Toshkent", category: "davlat", fields: ["IT", "Fizika", "Matematika", "Biologiya", "Kimyo", "Tarix", "Filologiya"] },
  { id: "tatu", name: "Toshkent axborot texnologiyalari universiteti (TATU)", nameRu: "ТУИТ", city: "Toshkent", category: "davlat", fields: ["IT", "Dasturlash", "Kiberxavfsizlik", "Telekommunikatsiya"] },
  { id: "tdtu", name: "Toshkent davlat texnika universiteti (TDTU)", nameRu: "ТашГТУ", city: "Toshkent", category: "davlat", fields: ["Muhandislik", "Energetika", "Mexanika", "Qurilish"] },
  { id: "tdiu", name: "Toshkent davlat iqtisodiyot universiteti (TDIU)", nameRu: "ТГЭУ", city: "Toshkent", category: "davlat", fields: ["Iqtisodiyot", "Buxgalteriya", "Marketing", "Bank ishi"] },
  { id: "tma", name: "Toshkent tibbiyot akademiyasi (TMA)", nameRu: "ТМА", city: "Toshkent", category: "davlat", fields: ["Tibbiyot", "Stomatologiya", "Farmasevtika"] },
  { id: "tdpu", name: "Nizomiy nomidagi TDPU", nameRu: "ТГПУ им. Низами", city: "Toshkent", category: "davlat", fields: ["Pedagogika", "Psixologiya", "Tillar"] },
  { id: "tdyu", name: "Toshkent davlat yuridik universiteti", nameRu: "ТГЮУ", city: "Toshkent", category: "davlat", fields: ["Huquq", "Yurisprudensiya"] },
  { id: "tashpmi", name: "Toshkent pediatriya tibbiyot instituti", city: "Toshkent", category: "davlat", fields: ["Tibbiyot", "Pediatriya"] },
  { id: "tiqxmmi", name: "Toshkent irrigatsiya va qishloq xo'jaligini mexanizatsiyalash muhandislari instituti", city: "Toshkent", category: "davlat", fields: ["Qishloq xo'jaligi", "Irrigatsiya", "Muhandislik"] },
  { id: "tdau", name: "Toshkent davlat agrar universiteti", city: "Toshkent", category: "davlat", fields: ["Qishloq xo'jaligi", "Veterinariya", "Agronomiya"] },
  { id: "tdtku", name: "Toshkent davlat transport universiteti", city: "Toshkent", category: "davlat", fields: ["Transport", "Logistika", "Muhandislik"] },
  { id: "tashkimyo", name: "Toshkent kimyo-texnologiya instituti", city: "Toshkent", category: "davlat", fields: ["Kimyo", "Texnologiya", "Oziq-ovqat"] },
  { id: "tdsi", name: "Toshkent davlat sharqshunoslik universiteti", city: "Toshkent", category: "davlat", fields: ["Sharqshunoslik", "Tarjima", "Tillar"] },
  { id: "ozdjtu", name: "O'zbekiston davlat jahon tillari universiteti", city: "Toshkent", category: "davlat", fields: ["Tillar", "Tarjima", "Pedagogika"] },
  { id: "tashduk", name: "Toshkent davlat o'zbek tili va adabiyoti universiteti", city: "Toshkent", category: "davlat", fields: ["Filologiya", "Adabiyot", "Jurnalistika"] },
  { id: "uwed", name: "Jahon iqtisodiyoti va diplomatiya universiteti (UWED)", nameRu: "УМЭД", city: "Toshkent", category: "davlat", fields: ["Xalqaro munosabatlar", "Iqtisodiyot", "Diplomatiya"] },
  { id: "inha", name: "Inha University Tashkent", city: "Toshkent", category: "xorijiy-filial", fields: ["IT", "Kompyuter muhandisligi", "Logistika"] },
  { id: "wiut", name: "Westminster International University in Tashkent", city: "Toshkent", category: "xorijiy-filial", fields: ["Iqtisodiyot", "Biznes", "Moliya", "Marketing"] },
  { id: "amity", name: "Amity University Tashkent", city: "Toshkent", category: "xorijiy-filial", fields: ["IT", "Biznes", "Muhandislik"] },
  { id: "tiiame", name: "TIIAME (Toshkent irrigatsiya)", city: "Toshkent", category: "davlat", fields: ["Irrigatsiya", "Qishloq xo'jaligi"] },
  { id: "tashtti", name: "Toshkent to'qimachilik va yengil sanoat instituti", city: "Toshkent", category: "davlat", fields: ["To'qimachilik", "Dizayn", "Texnologiya"] },
  { id: "tuit-samarkand", name: "TATU Samarqand filiali", city: "Samarqand", category: "davlat", fields: ["IT", "Dasturlash"] },
  { id: "samdu", name: "Samarqand davlat universiteti", city: "Samarqand", category: "davlat", fields: ["Filologiya", "Tarix", "Matematika", "Fizika", "IT"] },
  { id: "samtu", name: "Samarqand davlat tibbiyot universiteti", city: "Samarqand", category: "davlat", fields: ["Tibbiyot", "Stomatologiya"] },
  { id: "sampi", name: "Samarqand davlat chet tillar instituti", city: "Samarqand", category: "davlat", fields: ["Tillar", "Tarjima"] },
  { id: "samqi", name: "Samarqand davlat veterinariya tibbiyoti universiteti", city: "Samarqand", category: "davlat", fields: ["Veterinariya", "Chorvachilik"] },
  { id: "samiqi", name: "Samarqand iqtisodiyot va servis instituti", city: "Samarqand", category: "davlat", fields: ["Iqtisodiyot", "Servis", "Turizm"] },
  { id: "buxdu", name: "Buxoro davlat universiteti", city: "Buxoro", category: "davlat", fields: ["Filologiya", "Pedagogika", "Tarix", "IT"] },
  { id: "buxtti", name: "Buxoro muhandislik-texnologiya instituti", city: "Buxoro", category: "davlat", fields: ["Muhandislik", "Texnologiya"] },
  { id: "ferpi", name: "Farg'ona politexnika instituti", city: "Farg'ona", category: "davlat", fields: ["Muhandislik", "Energetika", "Mexanika"] },
  { id: "fardu", name: "Farg'ona davlat universiteti", city: "Farg'ona", category: "davlat", fields: ["Filologiya", "Pedagogika", "Fizika", "Matematika"] },
  { id: "andmi", name: "Andijon mashinasozlik instituti", city: "Andijon", category: "davlat", fields: ["Mashinasozlik", "Avtomobil"] },
  { id: "andtu", name: "Andijon davlat tibbiyot instituti", city: "Andijon", category: "davlat", fields: ["Tibbiyot"] },
  { id: "andu", name: "Andijon davlat universiteti", city: "Andijon", category: "davlat", fields: ["Filologiya", "Tarix", "Pedagogika"] },
  { id: "namdu", name: "Namangan davlat universiteti", city: "Namangan", category: "davlat", fields: ["Filologiya", "Tarix", "Matematika"] },
  { id: "namiti", name: "Namangan muhandislik-texnologiya instituti", city: "Namangan", category: "davlat", fields: ["Muhandislik", "Texnologiya"] },
  { id: "qarsu", name: "Qarshi davlat universiteti", city: "Qarshi", category: "davlat", fields: ["Filologiya", "Pedagogika", "Tarix"] },
  { id: "qarmi", name: "Qarshi muhandislik-iqtisodiyot instituti", city: "Qarshi", category: "davlat", fields: ["Muhandislik", "Iqtisodiyot"] },
  { id: "termizdu", name: "Termiz davlat universiteti", city: "Termiz", category: "davlat", fields: ["Filologiya", "Pedagogika"] },
  { id: "nukgu", name: "Qoraqalpoq davlat universiteti", city: "Nukus", category: "davlat", fields: ["Filologiya", "Tarix", "IT", "Pedagogika"] },
  { id: "urgu", name: "Urganch davlat universiteti", city: "Urganch", category: "davlat", fields: ["Filologiya", "Tarix", "Pedagogika"] },
  { id: "navdu", name: "Navoiy davlat pedagogika instituti", city: "Navoiy", category: "davlat", fields: ["Pedagogika"] },
  { id: "navkmi", name: "Navoiy davlat konchilik instituti", city: "Navoiy", category: "davlat", fields: ["Konchilik", "Geologiya"] },
  { id: "guliston", name: "Guliston davlat universiteti", city: "Guliston", category: "davlat", fields: ["Filologiya", "Pedagogika"] },
  { id: "jizdu", name: "Jizzax davlat pedagogika instituti", city: "Jizzax", category: "davlat", fields: ["Pedagogika"] },
  { id: "boshqa", name: "Boshqa OTM / Other", city: "—", category: "davlat", fields: [] },
];

export const ALL_FIELDS = Array.from(
  new Set(UNIVERSITIES.flatMap((u) => u.fields))
).sort();
