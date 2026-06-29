# Diverse — сайт франшизы

Франшизный сайт польского бренда одежды **Diverse**. Привлечение партнёров в России и СНГ.

**Домен:** [diversebrand.vercel.app](https://diversebrand.vercel.app)

[![Видео-обзор сайта Diverse](https://img.youtube.com/vi/wUpwKDFlilI/maxresdefault.jpg)](https://www.youtube.com/watch?v=wUpwKDFlilI)

---

## Стек

| Технология | Назначение |
|------------|------------|
| Next.js 16 (App Router, Turbopack) | Фреймворк |
| TypeScript | Типизация |
| Tailwind CSS v4 | Стилизация |
| Framer Motion | Анимации |
| Leaflet + MarkerCluster | Карта магазинов |
| React Hook Form + Zod | Валидация форм |
| DaData API | Геолокация по IP |
| Nodemailer (SMTP) | Email-уведомления |
| Telegram Bot API | Уведомления в Telegram |

---

## Быстрый старт

```bash
cp .env.example .env.local
npm install
npm run dev      # http://localhost:3000
```

Сборка:

```bash
npm run build
npm run start
```

---

## Страницы

| Маршрут | Описание |
|---------|----------|
| `/` | Главный лендинг франшизы: hero, три формата, финмодель, кейсы, FAQ |
| `/about` | История бренда: 30+ лет, таймлайн, суббренды, партнёры |
| `/franchise` | Условия франшизы: таблица форматов, преимущества, галерея |
| `/collection` | 10 коллекций бренда (Dakar, Denim, 24H Le Mans, DEXT и др.) |
| `/stores` | 11 магазинов в РФ и Казахстане: список + карта |
| `/privacy` | Политика конфиденциальности |

---

## Возможности

- **Гео-персонализация** — DaData определяет город по IP, подставляет в Hero и CTA
- **Форма заявки** — 3 шага (формат → контакты → сообщение)
- **Карта магазинов** — Leaflet с кластеризацией, 11 точек, ghost-маркер с городом пользователя
- **Галерея** — 6 фото магазина, lightbox со стрелками и свайпом
- **Кейсы франчайзи** — реальные цифры и истории
- **Офлайн-очередь заявок** — сохранение в localStorage при недоступности SMTP/Telegram
- **Rate limiter** — защита формы от спама

---

## Структура

```
src/
├── app/
│   ├── about/            # /about
│   ├── collection/       # /collection
│   ├── franchise/        # /franchise
│   ├── stores/           # /stores
│   ├── api/geo/city/     # DaData по IP
│   ├── api/lead/         # POST заявок (SMTP + Telegram)
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Главная
│   └── not-found.tsx     # 404
├── components/
│   ├── blocks/           # Секции страниц
│   ├── shared/           # Header, Footer, StoresMap, ContactModal...
│   └── ui/               # Button, CountUp
├── lib/                  # Контексты, утилиты
└── data/                 # Статические данные
    ├── stores.ts         # 11 магазинов
    ├── franchise.ts      # Планы, FAQ
    ├── formats.ts        # Финмодель
    └── metrics.ts        # Цифры для Hero и About
```

---

## Деплой

```bash
npm run build
npm run start
```

Подходит Vercel, Railway или любой Node.js-хостинг.

---

## Примечания

- Заявки уходят через `POST /api/lead` одновременно в SMTP и Telegram
- При недоступности обоих каналов — очередь в `localStorage`
- Магазины правятся в `src/data/stores.ts` без вёрстки
- Координаты в формате `[lng, lat]` (Leaflet)

---

## Переменные окружения

### SMTP (почта для заявок)

| Переменная | Обязательно | Описание |
|------------|-------------|----------|
| `SMTP_HOST` | нет | SMTP-сервер |
| `SMTP_PORT` | нет | По умолчанию `465` |
| `SMTP_SECURE` | нет | `false` для TLS |
| `SMTP_USER` | нет | Логин |
| `SMTP_PASS` | нет | Пароль |
| `MAIL_TO` | нет | Кому приходят заявки |

### Telegram (основной канал)

| Переменная | Обязательно | Описание |
|------------|-------------|----------|
| `TELEGRAM_BOT_TOKEN` | нет | Токен от @BotFather |
| `TELEGRAM_CHAT_ID` | нет | ID чата |

### Прочее

| Переменная | Описание |
|------------|----------|
| `NEXT_PUBLIC_BASE_PATH` | Базовый путь (если не в корне домена) |
| `NEXT_PUBLIC_FORM_ENDPOINT` | Эндпоинт для POST (по умолч. `/api/lead`) |
| `DADATA_API_KEY` | Ключ DaData для геолокации по IP |
