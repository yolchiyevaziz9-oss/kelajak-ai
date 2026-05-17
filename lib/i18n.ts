// Soddalashtirilgan i18n — O'zbek (lotin) va Rus tillari uchun.

export type Lang = "uz" | "ru";

export const DICT = {
  uz: {
    brand: "Kelajak AI",
    tagline: "Sizga mos ishni AI yordamida topamiz",
    nav: { home: "Bosh sahifa", how: "Qanday ishlaydi", start: "Boshlash" },

    hero: {
      badge: "AI bilan ish qidirish — yangicha yondashuv",
      title1: "Kelajagingizga",
      title2: "yo'l ochamiz",
      subtitle:
        "Diplom, hunar, til va maqsadingizni bizga ayting — sun'iy intellekt sizga mos ish o'rinlari va o'sish yo'nalishlarini tavsiya qiladi.",
      cta: "Anketani boshlash",
      ctaSecondary: "Qanday ishlaydi?",
      stat1: "150+ ish o'rni bazada",
      stat2: "60 OTM tan oladi",
      stat3: "30 ta hunar yo'nalishi",
      typingPhrases: [
        "Diplomingiz bor — lekin ish topa olmayapsizmi?",
        "Hunaringiz bor — lekin oziga mos joyni izlayapsizmi?",
        "Ingliz tilini bilasiz — qaerda ishlatishni bilmayapsizmi?",
        "Biz sizga to'g'ri yo'lni ko'rsatamiz.",
      ],
    },

    how: {
      title: "Qanday ishlaydi",
      subtitle: "3 ta oddiy qadam — bir necha daqiqada natija",
      step1Title: "Anketani to'ldiring",
      step1Text: "Ta'lim, hunar, tillar, shahar va maqsadingizni kiriting.",
      step2Title: "AI tahlil qiladi",
      step2Text: "Sun'iy intellekt sizning profilingizni minglab ish o'rinlari bilan solishtiradi.",
      step3Title: "Tavsiyalarni oling",
      step3Text: "Sizga eng mos kelgan ishlar + qaerda ariza topshirish + qanaqa ko'nikmalarni o'rganishni ayting.",
    },

    features: {
      title: "Nima uchun aynan Kelajak AI?",
      f1Title: "Diplom + Hunar birgalikda",
      f1Text: "Faqat diplomga emas, qo'lingizdagi hunarga ham qarab tavsiya beramiz.",
      f2Title: "60+ OTM ro'yxati",
      f2Text: "O'zbekistondagi barcha asosiy oliy ta'lim muassasalari va yo'nalishlari kiritilgan.",
      f3Title: "Shaharingizga e'tibor",
      f3Text: "Toshkentda, viloyatda yoki masofadan ishlash — siz tanlaysiz.",
      f4Title: "O'sish yo'nalishi",
      f4Text: "Faqat hozir emas — kelajagingiz uchun qaysi ko'nikmalarni o'rganishni ham aytamiz.",
    },

    form: {
      title: "Sizni yaxshiroq tanishaylik",
      subtitle: "Ma'lumotlaringiz hech qaerga jo'natilmaydi — faqat sizga tavsiya berish uchun ishlatamiz.",
      step: "Qadam",
      of: "/",
      next: "Keyingi",
      back: "Orqaga",
      submit: "Tavsiyalarni olish",

      q1Title: "Ism va yoshingiz",
      name: "Ism",
      age: "Yosh",

      q2Title: "Oliy ta'limingiz",
      hasHigher: "Oliy ma'lumotim bor",
      noHigher: "Yo'q, lekin hunarim/qo'limdan kelgan ishi bor",
      university: "Qaysi OTM?",
      field: "Yo'nalishingiz",

      q3Title: "Hunaringiz / Ko'nikmalaringiz",
      skillsHint: "Bir nechtasini tanlashingiz mumkin",

      q4Title: "Tillar",
      langLevelLabel: "Daraja",
      addLang: "+ Til qo'shish",

      q5Title: "Diplom va sertifikatlar",
      diplomasHint: "Tilga, kursga, kasbga doir sertifikatlaringizni kiriting (ixtiyoriy)",
      addDiploma: "+ Sertifikat qo'shish",

      q6Title: "Shahringiz",

      q7Title: "Maqsadingiz",
      goalHere: "O'z shahrimda ishlash",
      goalAnother: "Boshqa shaharga ko'chishga tayyorman",
      goalRemote: "Masofadan ishlamoqchiman",
      goalAbroad: "Chet elda ishlamoqchiman",
    },

    results: {
      title: "Sizga mos ishlar",
      subtitle: "AI sizning profilingizni tahlil qildi. Mana tavsiyalar:",
      match: "moslik",
      apply: "Ariza yuborish",
      adviceTitle: "Kelajak uchun maslahatlar",
      noResults: "Mos ish topilmadi — anketani qaytadan to'ldiring.",
      restart: "Anketani qaytadan",
      whyMatch: "Nima uchun mos:",
    },

    footer: {
      tagline: "Yoshlar kelajagi uchun — AI bilan birga",
      rights: "© 2026 Kelajak AI. Barcha huquqlar himoyalangan.",
      creatorLabel: "Yaratuvchi",
      creatorName: "Azizxoja",
      creatorRole: "Yaratuvchi",
      creatorBio: "Yoshlar uchun ish topish va kelajak qurishni osonlashtirish maqsadida Kelajak AI loyihasini boshlagan.",
      contact: "Aloqa",
    },

    lang: { uz: "O'zbek", ru: "Русский" },
  },

  ru: {
    brand: "Kelajak AI",
    tagline: "Найдём для вас подходящую работу с помощью AI",
    nav: { home: "Главная", how: "Как это работает", start: "Начать" },

    hero: {
      badge: "Поиск работы с AI — новый подход",
      title1: "Открываем путь",
      title2: "к вашему будущему",
      subtitle:
        "Расскажите о дипломе, навыках, языках и целях — искусственный интеллект подберёт подходящие вакансии и направления роста.",
      cta: "Начать анкету",
      ctaSecondary: "Как это работает?",
      stat1: "150+ вакансий",
      stat2: "60 ВУЗов",
      stat3: "30 направлений",
      typingPhrases: [
        "У вас есть диплом — но не можете найти работу?",
        "У вас есть навыки — но ищете подходящее место?",
        "Знаете английский — но не знаете где применить?",
        "Мы покажем вам правильный путь.",
      ],
    },

    how: {
      title: "Как это работает",
      subtitle: "3 простых шага — результат за пару минут",
      step1Title: "Заполните анкету",
      step1Text: "Образование, навыки, языки, город и цели.",
      step2Title: "AI анализирует",
      step2Text: "Искусственный интеллект сравнит ваш профиль с тысячами вакансий.",
      step3Title: "Получите рекомендации",
      step3Text: "Подходящие вакансии + куда подавать + чему ещё научиться.",
    },

    features: {
      title: "Почему Kelajak AI?",
      f1Title: "Диплом + навыки вместе",
      f1Text: "Рекомендуем не только по диплому, но и по реальным навыкам.",
      f2Title: "60+ ВУЗов",
      f2Text: "Все основные ВУЗы Узбекистана и их направления уже в базе.",
      f3Title: "С учётом города",
      f3Text: "Ташкент, область или удалённо — выбираете вы.",
      f4Title: "Путь роста",
      f4Text: "Не только сейчас — подскажем, что изучить для карьеры.",
    },

    form: {
      title: "Давайте познакомимся",
      subtitle: "Данные никуда не отправляются — используются только для рекомендаций.",
      step: "Шаг",
      of: "/",
      next: "Далее",
      back: "Назад",
      submit: "Получить рекомендации",

      q1Title: "Имя и возраст",
      name: "Имя",
      age: "Возраст",

      q2Title: "Высшее образование",
      hasHigher: "Есть высшее образование",
      noHigher: "Нет, но есть навыки / ремесло",
      university: "Какой ВУЗ?",
      field: "Направление",

      q3Title: "Навыки / Ремесло",
      skillsHint: "Можно выбрать несколько",

      q4Title: "Языки",
      langLevelLabel: "Уровень",
      addLang: "+ Добавить язык",

      q5Title: "Дипломы и сертификаты",
      diplomasHint: "Сертификаты по языкам, курсам, профессии (необязательно)",
      addDiploma: "+ Добавить сертификат",

      q6Title: "Город",

      q7Title: "Цель",
      goalHere: "Работать в своём городе",
      goalAnother: "Готов(а) переехать",
      goalRemote: "Хочу удалённо",
      goalAbroad: "Хочу работать за границей",
    },

    results: {
      title: "Подходящие вакансии",
      subtitle: "AI проанализировал ваш профиль. Вот рекомендации:",
      match: "совпадение",
      apply: "Откликнуться",
      adviceTitle: "Советы на будущее",
      noResults: "Подходящих вакансий не найдено — заполните анкету заново.",
      restart: "Заново",
      whyMatch: "Почему подходит:",
    },

    footer: {
      tagline: "Для будущего молодёжи — вместе с AI",
      rights: "© 2026 Kelajak AI. Все права защищены.",
      creatorLabel: "Создатель",
      creatorName: "Azizxoja",
      creatorRole: "Создатель",
      creatorBio: "Запустил проект Kelajak AI, чтобы помочь молодёжи находить работу и строить будущее.",
      contact: "Связь",
    },

    lang: { uz: "O'zbek", ru: "Русский" },
  },
} as const;

export type Dict = typeof DICT.uz;
