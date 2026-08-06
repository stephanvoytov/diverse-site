import { defineConfig } from "tinacms";

const branch =
  process.env.NEXT_PUBLIC_TINA_BRANCH ||
  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID!,
  token: process.env.NEXT_PUBLIC_TINA_TOKEN!,
  branch,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
    host: "127.0.0.1",
  },

  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public",
    },
  },

  schema: {
    collections: [
      /* ==================================================================
         COLLECTION: Главная (home)
         ================================================================== */
      {
        name: "home",
        label: "Главная",
        path: "content/home",
        format: "json",
        ui: { router: () => "/" },
        templates: [
          {
            name: "homeHero",
            label: "Hero (главный экран)",
            fields: [
              { type: "string", name: "tagline", label: "Тэглайн" },
              { type: "string", name: "heading", label: "Заголовок (H1)" },
              { type: "string", name: "description", label: "Описание", ui: { component: "textarea" } },
              { type: "string", name: "pricing", label: "Цена (строка)" },
              {
                type: "object",
                name: "cta",
                label: "Кнопки",
                fields: [
                  { type: "string", name: "consultation", label: "Получить консультацию" },
                  { type: "string", name: "cases", label: "Посмотреть кейсы" },
                ],
              },
              {
                type: "object",
                name: "stats",
                label: "Статистика",
                list: true,
                fields: [
                  { type: "string", name: "value", label: "Значение" },
                  { type: "string", name: "label", label: "Подпись" },
                ],
              },
            ],
          },
          {
            name: "homeAbout",
            label: "About (О бренде)",
            fields: [
              { type: "string", name: "eyebrow", label: "Айброу" },
              { type: "string", name: "headingBefore", label: "Заголовок (до акцента)" },
              { type: "string", name: "headingAccent", label: "Заголовок (акцент)" },
              { type: "string", name: "headingAfter", label: "Заголовок (после акцента)" },
              { type: "string", name: "body", label: "Текст", ui: { component: "textarea" } },
              {
                type: "object",
                name: "aboutLinks",
                label: "Ссылки",
                fields: [
                  { type: "string", name: "about", label: "О бренде" },
                  { type: "string", name: "collection", label: "Коллекции" },
                ],
              },
              {
                type: "object",
                name: "aboutStats",
                label: "Статистика",
                list: true,
                fields: [
                  { type: "number", name: "num", label: "Число" },
                  { type: "string", name: "suffix", label: "Суффикс (+)" },
                  { type: "string", name: "label", label: "Подпись" },
                  { type: "boolean", name: "accent", label: "Акцентный цвет" },
                ],
              },
            ],
          },
          {
            name: "homeFranchise",
            label: "Franchise (Франшиза на главной)",
            fields: [
              { type: "string", name: "eyebrow", label: "Айброу" },
              { type: "string", name: "heading", label: "Заголовок" },
              { type: "string", name: "desc", label: "Описание" },
              { type: "string", name: "ctaButton", label: "Кнопка CTA" },
              {
                type: "object",
                name: "franchiseLabels",
                label: "Подписи к карточкам",
                fields: [
                  { type: "string", name: "profitMonth", label: "Прибыль / мес" },
                ],
              },
              {
                type: "object",
                name: "franchiseLinks",
                label: "Ссылки под CTA",
                fields: [
                  { type: "string", name: "allConditions", label: "Все условия франшизы" },
                  { type: "string", name: "example", label: "Пример магазина" },
                ],
              },
              { type: "string", name: "disclaimer", label: "Дисклеймер", ui: { component: "textarea" } },
              {
                type: "object",
                name: "plans",
                label: "Форматы (карточки)",
                list: true,
                fields: [
                  { type: "string", name: "id", label: "ID (island|multibrand|renovation|manwomen|brandstore)" },
                  { type: "string", name: "tagline", label: "Тэглайн" },
                  { type: "string", name: "name", label: "Название" },
                  { type: "string", name: "desc", label: "Описание", ui: { component: "textarea" } },
                  { type: "string", name: "details", label: "Характеристики", list: true, ui: { component: "textarea" } },
                ],
              },
              {
                type: "object",
                name: "cardProfit",
                label: "Прибыль по форматам",
                fields: [
                  { type: "string", name: "island", label: "POP-UP STORE" },
                  { type: "string", name: "multibrand", label: "MULTI BRAND STORE" },
                  { type: "string", name: "renovation", label: "Реновация" },
                  { type: "string", name: "manwomen", label: "DIVERSE Man / Women" },
                  { type: "string", name: "brandstore", label: "DIVERSE Brand Store" },
                ],
              },
            ],
          },
          {
            name: "homeMarketBlock",
            label: "MarketBlock (Почему сейчас)",
            fields: [
              { type: "string", name: "eyebrow", label: "Айброу" },
              { type: "string", name: "headingBefore", label: "Заголовок (до акцента)" },
              { type: "string", name: "headingAccent", label: "Заголовок (акцент)" },
              { type: "string", name: "desc", label: "Описание" },
              {
                type: "string",
                name: "reasons",
                label: "Причины",
                list: true,
                ui: { component: "textarea" },
              },
            ],
          },
          {
            name: "homeTrustModel",
            label: "TrustModel (Как устроена модель)",
            fields: [
              { type: "string", name: "eyebrow", label: "Айброу" },
              { type: "string", name: "headingBefore", label: "Заголовок (до акцента)" },
              { type: "string", name: "headingAccent", label: "Заголовок (акцент)" },
              { type: "string", name: "desc", label: "Описание" },
              {
                type: "object",
                name: "points",
                label: "Карточки",
                list: true,
                fields: [
                  { type: "string", name: "title", label: "Заголовок" },
                  { type: "string", name: "desc", label: "Описание", ui: { component: "textarea" } },
                ],
              },
            ],
          },
          {
            name: "homeRoadmap",
            label: "Roadmap (Как открыть)",
            fields: [
              { type: "string", name: "eyebrow", label: "Айброу" },
              { type: "string", name: "headingBefore", label: "Заголовок (до акцента)" },
              { type: "string", name: "headingAccent", label: "Заголовок (акцент)" },
              { type: "string", name: "desc", label: "Описание" },
              {
                type: "object",
                name: "steps",
                label: "Шаги",
                list: true,
                fields: [
                  { type: "number", name: "number", label: "Номер" },
                  { type: "string", name: "title", label: "Заголовок" },
                  { type: "string", name: "desc", label: "Описание", ui: { component: "textarea" } },
                  { type: "string", name: "duration", label: "Длительность" },
                ],
              },
            ],
          },
          {
            name: "homeCaseStudies",
            label: "CaseStudies (Кейсы)",
            fields: [
              { type: "string", name: "eyebrow", label: "Айброу" },
              { type: "string", name: "headingBefore", label: "Заголовок (до акцента)" },
              { type: "string", name: "headingAccent", label: "Заголовок (акцент)" },
              { type: "string", name: "desc", label: "Описание" },
              {
                type: "object",
                name: "caseLabels",
                label: "Подписи",
                fields: [
                  { type: "string", name: "payback", label: "Окупаемость" },
                  { type: "string", name: "profitMonth", label: "Прибыль / мес" },
                  { type: "string", name: "investment", label: "Инвестиции" },
                  { type: "string", name: "video", label: "Видео" },
                  { type: "string", name: "photo", label: "Фото" },
                ],
              },
              { type: "string", name: "openedPrefix", label: "Префикс даты открытия" },
              { type: "string", name: "openedSuffix", label: "Суффикс даты открытия" },
              {
                type: "object",
                name: "cases",
                label: "Кейсы франчайзи",
                list: true,
                fields: [
                  { type: "string", name: "id", label: "ID" },
                  { type: "string", name: "city", label: "Город" },
                  { type: "string", name: "mall", label: "ТЦ" },
                  { type: "string", name: "photo", label: "Фото (путь)" },
                  { type: "string", name: "opened", label: "Год открытия" },
                  { type: "string", name: "area", label: "Площадь" },
                  { type: "string", name: "format", label: "Формат" },
                  { type: "string", name: "tag", label: "Тег (кратко)" },
                  { type: "string", name: "quote", label: "Цитата", ui: { component: "textarea" } },
                  { type: "string", name: "investment", label: "Инвестиции" },
                  { type: "string", name: "profitMonth", label: "Прибыль / мес" },
                  { type: "string", name: "paybackPeriod", label: "Окупаемость" },
                  { type: "string", name: "roi", label: "Доходность" },
                  { type: "string", name: "youtubeId", label: "ID видео YouTube" },
                ],
              },
            ],
          },
          {
            name: "homeFaq",
            label: "FAQ (Часто спрашивают)",
            fields: [
              { type: "string", name: "eyebrow", label: "Айброу" },
              { type: "string", name: "headingBefore", label: "Заголовок (до акцента)" },
              { type: "string", name: "headingAccent", label: "Заголовок (акцент)" },
              { type: "string", name: "desc", label: "Описание" },
              {
                type: "object",
                name: "items",
                label: "Вопросы",
                list: true,
                fields: [
                  { type: "string", name: "question", label: "Вопрос" },
                  { type: "string", name: "answer", label: "Ответ", ui: { component: "textarea" } },
                ],
              },
            ],
          },
          {
            name: "homeContacts",
            label: "Contacts (Контакты)",
            fields: [
              { type: "string", name: "eyebrow", label: "Айброу" },
              { type: "string", name: "heading", label: "Заголовок" },
              { type: "string", name: "desc", label: "Описание" },
              {
                type: "object",
                name: "form",
                label: "Форма",
                fields: [
                  { type: "string", name: "name", label: "Имя (label)" },
                  { type: "string", name: "namePlaceholder", label: "Имя (placeholder)" },
                  { type: "string", name: "phone", label: "Телефон (label)" },
                  { type: "string", name: "phonePlaceholder", label: "Телефон (placeholder)" },
                  { type: "string", name: "format", label: "Формат (label)" },
                  { type: "string", name: "formatPlaceholder", label: "Формат (placeholder)" },
                  { type: "string", name: "message", label: "Сообщение (label)" },
                  { type: "string", name: "messagePlaceholder", label: "Сообщение (placeholder)" },
                  { type: "string", name: "submit", label: "Кнопка отправки" },
                  { type: "string", name: "submitting", label: "Отправка..." },
                  { type: "string", name: "submitted", label: "Отправлено" },
                  { type: "string", name: "success", label: "Успех" },
                  { type: "string", name: "error", label: "Ошибка" },
                  { type: "string", name: "telegram", label: "Telegram (текст ссылки)" },
                  { type: "string", name: "or", label: "или" },
                  { type: "string", name: "mail", label: "почта (текст ссылки)" },
                  { type: "string", name: "leadQueueFallback", label: "Фолбэк сообщения" },
                ],
              },
              {
                type: "object",
                name: "company",
                label: "Компания",
                fields: [
                  { type: "string", name: "name", label: "Название" },
                  { type: "string", name: "inn", label: "ИНН" },
                  { type: "string", name: "address", label: "Адрес" },
                ],
              },
              {
                type: "object",
                name: "sections",
                label: "Заголовки секций",
                fields: [
                  { type: "string", name: "details", label: "Реквизиты" },
                  { type: "string", name: "contacts", label: "Контакты" },
                  { type: "string", name: "socials", label: "Социальные сети" },
                ],
              },
              { type: "string", name: "privacy", label: "Privacy text", ui: { component: "textarea" } },
            ],
          },
          {
            name: "homeStores",
            label: "Stores (Партнёрская сеть)",
            fields: [
              { type: "string", name: "eyebrow", label: "Айброу" },
              { type: "string", name: "heading", label: "Заголовок" },
              { type: "string", name: "desc", label: "Описание" },
              {
                type: "object",
                name: "ghost",
                label: "Ghost marker",
                fields: [
                  { type: "string", name: "label", label: "Метка" },
                  { type: "string", name: "tooltip", label: "Тултип" },
                  { type: "string", name: "sidebarYourCity", label: "Ваш город" },
                  { type: "string", name: "sidebarCTA", label: "CTA в сайдбаре" },
                  { type: "string", name: "sidebarSubtext", label: "Подтекст" },
                ],
              },
              {
                type: "object",
                name: "storeItems",
                label: "Магазины (список)",
                list: true,
                ui: { component: "group-list" },
                fields: [
                  { type: "string", name: "city", label: "Город" },
                  { type: "string", name: "mall", label: "ТЦ" },
                  { type: "string", name: "address", label: "Адрес", ui: { component: "textarea" } },
                  { type: "number", name: "lng", label: "Долгота" },
                  { type: "number", name: "lat", label: "Широта" },
                  { type: "string", name: "country", label: "Страна" },
                  { type: "string", name: "photo", label: "Фото (путь)" },
                ],
              },
            ],
          },
          {
            name: "homePartners",
            label: "Partners (Партнёры)",
            fields: [
              { type: "string", name: "partnersEyebrow", label: "Айброу" },
              { type: "string", name: "partnersHeading", label: "Заголовок", ui: { component: "textarea" } },
              {
                type: "object",
                name: "partnersEyebrowSimple",
                label: "Айброу (упрощённый, для страницы О бренде)",
                fields: [
                  { type: "string", name: "simpleEyebrow", label: "Текст упрощённого айброу" },
                ],
              },
              {
                type: "object",
                name: "partnerItems",
                label: "Партнёры",
                list: true,
                fields: [
                  { type: "string", name: "id", label: "ID" },
                  { type: "string", name: "name", label: "Название" },
                  { type: "string", name: "logo", label: "Логотип (путь)" },
                ],
              },
            ],
          },
          {
            name: "homeFooter",
            label: "Footer (Подвал)",
            fields: [
              { type: "string", name: "tagline", label: "Тэглайн («Официальный дистрибьютор...»)", ui: { component: "textarea" } },
              { type: "string", name: "navSectionTitle", label: "Заголовок «Навигация»" },
              { type: "string", name: "contactsSectionTitle", label: "Заголовок «Контакты»" },
              { type: "string", name: "companyName", label: "Название юрлица" },
              { type: "string", name: "companyInn", label: "ИНН" },
              { type: "string", name: "companyAddress", label: "Адрес", ui: { component: "textarea" } },
              { type: "string", name: "readyToStartTitle", label: "Заголовок «Готовы начать?»" },
              { type: "string", name: "ctaButton", label: "Кнопка CTA" },
              { type: "string", name: "socialsSectionTitle", label: "Заголовок «Соцсети»" },
              { type: "string", name: "copyright", label: "Копирайт" },
              { type: "string", name: "privacyLink", label: "Ссылка на политику" },
              { type: "string", name: "partnerText", label: "Текст «Diverse — официальный партнёр»" },
            ],
          },
          {
            name: "homeKpRating",
            label: "KpRating (Рейтинг КП)",
            fields: [
              { type: "string", name: "eyebrow", label: "Айброу" },
              { type: "string", name: "headingAccent", label: "Заголовок (акцент)" },
              { type: "string", name: "headingAfter", label: "Заголовок (после акцента)" },
              { type: "string", name: "desc", label: "Описание" },
              {
                type: "object",
                name: "badge",
                label: "Бейдж",
                fields: [
                  { type: "string", name: "rank", label: "Ранг" },
                  { type: "string", name: "label", label: "Подпись" },
                ],
              },
              { type: "string", name: "body", label: "Текст", ui: { component: "textarea" } },
              { type: "string", name: "ctaLink", label: "Текст ссылки" },
              { type: "string", name: "source", label: "Источник" },
              { type: "string", name: "imageAlt", label: "Alt изображения" },
            ],
          },
        ],
      },

      /* ==================================================================
         COLLECTION: О бренде (about)
         ================================================================== */
      {
        name: "about",
        label: "О бренде",
        path: "content/about",
        format: "json",
        ui: { router: () => "/about" },
        templates: [
          {
            name: "aboutHero",
            label: "Hero",
            fields: [
              { type: "string", name: "heroEyebrow", label: "Айброу" },
              { type: "string", name: "heroHeading", label: "Заголовок", ui: { component: "textarea" } },
              { type: "string", name: "heroDesc", label: "Описание" },
            ],
          },
          {
            name: "aboutStats",
            label: "Статистика",
            fields: [
              {
                type: "object",
                name: "stats",
                label: "Цифры",
                list: true,
                fields: [
                  { type: "number", name: "num", label: "Число" },
                  { type: "string", name: "suffix", label: "Суффикс (+)" },
                  { type: "string", name: "label", label: "Подпись" },
                  { type: "boolean", name: "accent", label: "Акцентный цвет" },
                ],
              },
            ],
          },
          {
            name: "aboutPhilosophy",
            label: "Философия",
            fields: [
              { type: "string", name: "philosophyEyebrow", label: "Айброу" },
              { type: "string", name: "philosophyHeading", label: "Заголовок", ui: { component: "textarea" } },
              { type: "string", name: "philosophyBody1", label: "Абзац 1", ui: { component: "textarea" } },
              { type: "string", name: "philosophyBody2", label: "Абзац 2", ui: { component: "textarea" } },
            ],
          },
          {
            name: "aboutAdvantages",
            label: "Преимущества",
            fields: [
              { type: "string", name: "advantagesEyebrow", label: "Айброу" },
              { type: "string", name: "advantagesHeading", label: "Заголовок", ui: { component: "textarea" } },
              {
                type: "object",
                name: "advantages",
                label: "Карточки",
                list: true,
                fields: [
                  { type: "string", name: "title", label: "Заголовок" },
                  { type: "string", name: "desc", label: "Описание", ui: { component: "textarea" } },
                ],
              },
            ],
          },
          {
            name: "aboutTimeline",
            label: "Таймлайн",
            fields: [
              { type: "string", name: "timelineEyebrow", label: "Айброу" },
              { type: "string", name: "timelineHeading", label: "Заголовок", ui: { component: "textarea" } },
              {
                type: "object",
                name: "milestones",
                label: "События",
                list: true,
                fields: [
                  { type: "string", name: "year", label: "Год" },
                  { type: "string", name: "title", label: "Заголовок" },
                  { type: "string", name: "desc", label: "Описание", ui: { component: "textarea" } },
                ],
              },
              {
                type: "object",
                name: "timelineLink",
                label: "Ссылка под таймлайном",
                fields: [
                  { type: "string", name: "label", label: "Подпись («Узнайте больше о продукте»)" },
                  { type: "string", name: "text", label: "Текст ссылки («Посмотреть коллекции»)" },
                  { type: "string", name: "href", label: "URL ссылки" },
                ],
              },
            ],
          },
          {
            name: "aboutRepresentative",
            label: "Представитель",
            fields: [
              { type: "string", name: "repEyebrow", label: "Айброу" },
              { type: "string", name: "repHeading", label: "Заголовок" },
              { type: "string", name: "repBody", label: "Текст", ui: { component: "textarea" } },
              { type: "string", name: "repInn", label: "ИНН" },
              { type: "string", name: "repAddress", label: "Адрес" },
            ],
          },
          {
            name: "aboutCta",
            label: "CTA",
            fields: [
              { type: "string", name: "ctaHeading", label: "Заголовок", ui: { component: "textarea" } },
              { type: "string", name: "ctaButton", label: "Кнопка" },
            ],
          },
          {
            name: "aboutPartners",
            label: "Партнёры",
            fields: [
              { type: "string", name: "partnersEyebrow", label: "Айброу" },
              {
                type: "object",
                name: "partnerItems",
                label: "Партнёры",
                list: true,
                fields: [
                  { type: "string", name: "id", label: "ID" },
                  { type: "string", name: "name", label: "Название" },
                  { type: "string", name: "logo", label: "Логотип (путь)" },
                ],
              },
            ],
          },
        ],
      },

      /* ==================================================================
         COLLECTION: Франшиза (franchise)
         ================================================================== */
      {
        name: "franchise",
        label: "Франшиза",
        path: "content/franchise",
        format: "json",
        ui: { router: () => "/franchise" },
        templates: [
          {
            name: "franchiseHero",
            label: "Hero",
            fields: [
              { type: "string", name: "heroEyebrow", label: "Айброу" },
              { type: "string", name: "heroHeading", label: "Заголовок", ui: { component: "textarea" } },
              { type: "string", name: "heroDesc", label: "Описание", ui: { component: "textarea" } },
            ],
          },
          {
            name: "franchisePlans",
            label: "Планы",
            fields: [
              { type: "string", name: "plansEyebrow", label: "Айброу" },
              { type: "string", name: "plansDesc", label: "Описание" },
              { type: "string", name: "plansHeading", label: "Заголовок", ui: { component: "textarea" } },
              { type: "string", name: "plansCollapse", label: "Свернуть" },
              { type: "string", name: "plansDetails", label: "Подробнее" },
              {
                type: "object",
                name: "plansList",
                label: "Форматы",
                list: true,
                fields: [
                  { type: "string", name: "id", label: "ID (island|multibrand|renovation|manwomen|brandstore)" },
                  { type: "string", name: "tagline", label: "Тэглайн" },
                  { type: "string", name: "name", label: "Название" },
                  { type: "string", name: "desc", label: "Описание", ui: { component: "textarea" } },
                  { type: "string", name: "details", label: "Характеристики", list: true, ui: { component: "textarea" } },
                ],
              },
            ],
          },
          {
            name: "franchiseComparison",
            label: "Сравнение",
            fields: [
              { type: "string", name: "comparisonEyebrow", label: "Айброу" },
              { type: "string", name: "comparisonHeading", label: "Заголовок", ui: { component: "textarea" } },
              {
                type: "object",
                name: "comparisonRows",
                label: "Строки сравнения",
                list: true,
                fields: [
                  { type: "string", name: "label", label: "Параметр" },
                  { type: "string", name: "values", label: "Значения (через запятую)", list: true },
                ],
              },
            ],
          },
          {
            name: "franchiseFinancial",
            label: "Финансовая модель",
            fields: [
              { type: "string", name: "financialEyebrow", label: "Айброу" },
              { type: "string", name: "financialDesc", label: "Описание", ui: { component: "textarea" } },
              { type: "string", name: "financialHeading", label: "Заголовок", ui: { component: "textarea" } },
              {
                type: "object",
                name: "financialRows",
                label: "Строки",
                list: true,
                fields: [
                  { type: "string", name: "label", label: "Название" },
                  { type: "string", name: "value", label: "Значение" },
                  { type: "string", name: "detail", label: "Детали" },
                  { type: "boolean", name: "accent", label: "Акцент" },
                ],
              },
              { type: "string", name: "seasonalityNote", label: "Примечание о сезонности", ui: { component: "textarea" } },
            ],
          },
          {
            name: "franchiseBenefits",
            label: "Преимущества",
            fields: [
              { type: "string", name: "benefitsEyebrow", label: "Айброу" },
              { type: "string", name: "benefitsHeading", label: "Заголовок", ui: { component: "textarea" } },
              { type: "string", name: "benefitsItems", label: "Преимущества", list: true, ui: { component: "textarea" } },
            ],
          },
          {
            name: "franchiseGallery",
            label: "Галерея",
            fields: [
              { type: "string", name: "galleryEyebrow", label: "Айброу" },
              { type: "string", name: "galleryDesc", label: "Описание" },
              { type: "string", name: "galleryHeading", label: "Заголовок", ui: { component: "textarea" } },
              {
                type: "object",
                name: "galleryImages",
                label: "Изображения",
                list: true,
                fields: [
                  { type: "string", name: "src", label: "Путь к изображению" },
                  { type: "string", name: "alt", label: "Alt-текст" },
                ],
              },
            ],
          },
          {
            name: "franchiseContact",
            label: "Контакты",
            fields: [
              { type: "string", name: "contactHeading", label: "Заголовок", ui: { component: "textarea" } },
              { type: "string", name: "contactDesc", label: "Описание" },
            ],
          },
        ],
      },

      /* ==================================================================
         COLLECTION: Коллекции (collections)
         ================================================================== */
      {
        name: "pageCollections",
        label: "Коллекции",
        path: "content/pageCollections",
        format: "json",
        ui: { router: () => "/collection" },
        templates: [
          {
            name: "collectionHero",
            label: "Hero",
            fields: [
              { type: "string", name: "heroEyebrow", label: "Айброу" },
              { type: "string", name: "heroHeading", label: "Заголовок", ui: { component: "textarea" } },
              { type: "string", name: "heroDesc", label: "Описание", ui: { component: "textarea" } },
              { type: "string", name: "scrollHint", label: "Подсказка листать" },
              {
                type: "object",
                name: "collectionItems",
                label: "Коллекции",
                list: true,
                ui: { component: "group-list" },
                fields: [
                  { type: "string", name: "id", label: "ID" },
                  { type: "string", name: "name", label: "Название" },
                  { type: "string", name: "short", label: "Кратко (2 буквы)" },
                  { type: "string", name: "tag", label: "Тег" },
                  { type: "string", name: "vibe", label: "Описание", ui: { component: "textarea" } },
                  { type: "string", name: "colorFrom", label: "Градиент от (hex)" },
                  { type: "string", name: "colorTo", label: "Градиент до (hex)" },
                  { type: "string", name: "image", label: "Фон (путь)" },
                  { type: "string", name: "bgPosition", label: "Позиция фона" },
                ],
              },
            ],
          },
          {
            name: "collectionCta",
            label: "CTA",
            fields: [
              { type: "string", name: "ctaEyebrow", label: "Айброу" },
              { type: "string", name: "ctaHeading", label: "Заголовок", ui: { component: "textarea" } },
              { type: "string", name: "ctaDesc", label: "Описание", ui: { component: "textarea" } },
              { type: "string", name: "ctaButton", label: "Кнопка" },
            ],
          },
        ],
      },

      /* ==================================================================
         COLLECTION: Магазины (stores)
         ================================================================== */
      {
        name: "stores",
        label: "Магазины",
        path: "content/stores",
        format: "json",
        ui: { router: () => "/stores" },
        templates: [
          {
            name: "storesHero",
            label: "Hero",
            fields: [
              { type: "string", name: "heroEyebrow", label: "Айброу" },
              { type: "string", name: "heroHeading", label: "Заголовок", ui: { component: "textarea" } },
              { type: "string", name: "heroDesc", label: "Описание" },
            ],
          },
          {
            name: "storesList",
            label: "Магазины (список)",
            fields: [
              { type: "string", name: "storesEyebrow", label: "Айброу" },
              { type: "string", name: "storesDesc", label: "Описание" },
              { type: "string", name: "storesHeading", label: "Заголовок", ui: { component: "textarea" } },
              {
                type: "object",
                name: "storeItems",
                label: "Магазины",
                list: true,
                ui: { component: "group-list" },
                fields: [
                  { type: "string", name: "city", label: "Город" },
                  { type: "string", name: "mall", label: "ТЦ" },
                  { type: "string", name: "address", label: "Адрес", ui: { component: "textarea" } },
                  { type: "number", name: "lng", label: "Долгота" },
                  { type: "number", name: "lat", label: "Широта" },
                  { type: "string", name: "country", label: "Страна" },
                  { type: "string", name: "photo", label: "Фото (путь)" },
                ],
              },
            ],
          },
          {
            name: "storesCta",
            label: "CTA",
            fields: [
              { type: "string", name: "ctaHeading", label: "Заголовок", ui: { component: "textarea" } },
              { type: "string", name: "ctaDesc", label: "Описание" },
              { type: "string", name: "ctaButton", label: "Кнопка" },
            ],
          },
        ],
      },
    ],
  },
});