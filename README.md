# Diverse — официальный представитель бренда в России

Сайт для привлечения партнёров по франшизе **Diverse** (польский бренд одежды, основан в 1993, 400+ магазинов в 9 странах).

**Домен:** [diversebrand.vercel.app](https://diversebrand.vercel.app)

**Видео-обзор сайта:**

<video src="https://github.com/stephanvoytov/diverse-site/raw/main/site-demo.mp4" controls width="100%" style="max-width:720px" poster="https://diversebrand.vercel.app/images/hero/main.webp"></video>

---

## Страницы

| Маршрут | Описание |
|---------|----------|
| `/` | Главный лендинг франшизы: hero, три формата, финмодель, кейсы, FAQ |
| `/about` | История бренда: 30+ лет, таймлайн, суббренды (DEXT, Coalition), партнёры |
| `/franchise` | Условия франшизы: таблица сравнения, преимущества, галерея магазина |
| `/collection` | 10 коллекций (Dakar, Denim, 24H Le Mans, DEXT, EVO Series и др.) |
| `/stores` | 11 магазинов в РФ и Казахстане: список + карта Leaflet |
| `/privacy` | Политика конфиденциальности |

---

## Стек

| Технология | Назначение |
|------------|------------|
| Next.js 16 (App Router, Turbopack) | Фреймворк |
| TypeScript | Типизация |
| Tailwind CSS | Стилизация |
| Framer Motion | Анимации |
| Leaflet + MarkerCluster | Карта магазинов |
| React Hook Form + Zod | Валидация форм |
| DaData API | Геолокация по IP |
| Nodemailer (SMTP) | Email-уведомления |
| Telegram Bot API | Уведомления в Telegram |

---

## Быстрый старт

```bash
cp .env.example .env.local   # настроить переменные
npm install
npm run dev
# http://localhost:3000
```

Сборка:

```bash
npm run build
npm run start
```

---

## Переменные окружения (.env.local)

### SMTP (почта для заявок)

| Переменная | Обязательно | Описание |
|------------|-------------|----------|
| `SMTP_HOST` | нет | SMTP-сервер (напр. `smtp.yandex.ru`) |
| `SMTP_PORT` | нет | По умолчанию `465` |
| `SMTP_SECURE` | нет | `false` для TLS |
| `SMTP_USER` | нет | Логин от почты |
| `SMTP_PASS` | нет | Пароль от почты |
| `MAIL_TO` | нет | Кому приходят заявки |

### Telegram (основной канал заявок)

| Переменная | Обязательно | Описание |
|------------|-------------|----------|
| `TELEGRAM_BOT_TOKEN` | нет | Токен от @BotFather |
| `TELEGRAM_CHAT_ID` | нет | ID чата для уведомлений |

### Прочее

| Переменная | Описание |
|------------|----------|
| `NEXT_PUBLIC_BASE_PATH` | Базовый путь (если не в корне домена) |
| `NEXT_PUBLIC_FORM_ENDPOINT` | Эндпоинт для POST (по умолч. `/api/lead`) |
| `DADATA_API_KEY` | Ключ DaData для геолокации по IP |

---

## Ключевые фичи

- **Персонализация по городу** — DaData определяет город по IP, подставляет в Hero и CTA
- **Многошаговая форма** — 3 шага (формат → контакты → сообщение)
- **Галерея магазина** — 6 фото, lightbox со стрелками, точками и touch-свайпом
- **Карта магазинов** — Leaflet с кластеризацией, 11 точек
- **Кейсы франчайзи** — реальные цифры окупаемости
- **Офлайн-очередь заявок** — если почта/Telegram недоступны, заявки сохраняются в localStorage

---

## Структура проекта

```
src/
├── app/
│   ├── about/               # /about
│   ├── collection/          # /collection
│   ├── franchise/           # /franchise
│   ├── stores/              # /stores
│   ├── api/geo/city/        # DaData по IP
│   ├── api/lead/            # POST заявок (SMTP + Telegram)
│   ├── layout.tsx           # Корневой layout
│   ├── page.tsx             # Главная
│   └── not-found.tsx        # 404
├── components/
│   ├── blocks/              # Секции страниц (Hero, Franchise, Faq...)
│   ├── shared/              # Header, Footer, StoresMap, ContactModal...
│   └── ui/                  # CountUp и мелкие компоненты
├── lib/                     # Контексты, утилиты, helpers
└── data/                    # Статические данные
    ├── stores.ts            # 11 магазинов
    ├── franchise.ts         # Планы, преимущества, FAQ
    ├── formats.ts           # Финмодель, сценарии
    └── metrics.ts           # Цифры для Hero и About
```

---

## Деплой

Next.js стандартно. Подходит любой Node.js-хостинг (Vercel, Railway, выделенный сервер).

```bash
npm run build
npm run start
```

---

## Примечания

- Заявки уходят через `POST /api/lead` одновременно в SMTP и Telegram
- При недоступности обоих каналов заявка сохраняется в `localStorage` и отправляется позже
- Данные о магазинах правятся в `src/data/stores.ts` — без вёрстки
- Координаты в формате `[lng, lat]` (Leaflet)
