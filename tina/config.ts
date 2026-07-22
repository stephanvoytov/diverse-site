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
  },

  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public",
    },
  },

  schema: {
    collections: [
      {
        name: "hero",
        label: "Hero (главный экран)",
        path: "content/blocks/hero",
        format: "json",
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
        name: "about",
        label: "About (О бренде)",
        path: "content/blocks/about",
        format: "json",
        fields: [
          { type: "string", name: "eyebrow", label: "Айброу" },
          { type: "string", name: "headingBefore", label: "Заголовок (до акцента)" },
          { type: "string", name: "headingAccent", label: "Заголовок (акцент)" },
          { type: "string", name: "headingAfter", label: "Заголовок (после акцента)" },
          { type: "string", name: "body", label: "Текст", ui: { component: "textarea" } },
          {
            type: "object",
            name: "links",
            label: "Ссылки",
            fields: [
              { type: "string", name: "about", label: "О бренде" },
              { type: "string", name: "collection", label: "Коллекции" },
            ],
          },
        ],
      },
      {
        name: "franchise",
        label: "Franchise (Франшиза на главной)",
        path: "content/blocks/franchise",
        format: "json",
        fields: [
          { type: "string", name: "eyebrow", label: "Айброу" },
          { type: "string", name: "heading", label: "Заголовок" },
          { type: "string", name: "desc", label: "Описание" },
          { type: "string", name: "cta", label: "Кнопка CTA" },
          {
            type: "object",
            name: "labels",
            label: "Подписи к карточкам",
            fields: [
              { type: "string", name: "investment", label: "Инвестиции" },
              { type: "string", name: "profitMonth", label: "Прибыль / мес" },
            ],
          },
          {
            type: "object",
            name: "links",
            label: "Ссылки под CTA",
            fields: [
              { type: "string", name: "allConditions", label: "Все условия франшизы" },
              { type: "string", name: "example", label: "Пример магазина" },
            ],
          },
          { type: "string", name: "disclaimer", label: "Дисклеймер", ui: { component: "textarea" } },
        ],
      },
      {
        name: "marketBlock",
        label: "MarketBlock (Почему сейчас)",
        path: "content/blocks/marketBlock",
        format: "json",
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
        name: "trustModel",
        label: "TrustModel (Как устроена модель)",
        path: "content/blocks/trustModel",
        format: "json",
        fields: [
          { type: "string", name: "eyebrow", label: "Айброу" },
          { type: "string", name: "headingBefore", label: "Заголовок (до акцента)" },
          { type: "string", name: "headingAccent", label: "Заголовок (акцент)" },
          { type: "string", name: "desc", label: "Описание" },
        ],
      },
      {
        name: "roadmap",
        label: "Roadmap (Как открыть)",
        path: "content/blocks/roadmap",
        format: "json",
        fields: [
          { type: "string", name: "eyebrow", label: "Айброу" },
          { type: "string", name: "headingBefore", label: "Заголовок (до акцента)" },
          { type: "string", name: "headingAccent", label: "Заголовок (акцент)" },
          { type: "string", name: "desc", label: "Описание" },
        ],
      },
      {
        name: "caseStudies",
        label: "CaseStudies (Кейсы)",
        path: "content/blocks/caseStudies",
        format: "json",
        fields: [
          { type: "string", name: "eyebrow", label: "Айброу" },
          { type: "string", name: "headingBefore", label: "Заголовок (до акцента)" },
          { type: "string", name: "headingAccent", label: "Заголовок (акцент)" },
          { type: "string", name: "desc", label: "Описание" },
          {
            type: "object",
            name: "labels",
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
        ],
      },
      {
        name: "faq",
        label: "FAQ (Часто спрашивают)",
        path: "content/blocks/faq",
        format: "json",
        fields: [
          { type: "string", name: "eyebrow", label: "Айброу" },
          { type: "string", name: "headingBefore", label: "Заголовок (до акцента)" },
          { type: "string", name: "headingAccent", label: "Заголовок (акцент)" },
          { type: "string", name: "desc", label: "Описание" },
        ],
      },
      {
        name: "contacts",
        label: "Contacts (Контакты)",
        path: "content/blocks/contacts",
        format: "json",
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
        name: "stores",
        label: "Stores (Партнёрская сеть)",
        path: "content/blocks/stores",
        format: "json",
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
        ],
      },
      {
        name: "kpRating",
        label: "KpRating (Рейтинг КП)",
        path: "content/blocks/kpRating",
        format: "json",
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
          { type: "string", name: "cta", label: "Текст ссылки" },
          { type: "string", name: "source", label: "Источник" },
          { type: "string", name: "imageAlt", label: "Alt изображения" },
        ],
      },
    ],
  },
});
