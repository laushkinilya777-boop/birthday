# DoWorkHere (DWH) — проект

Этот репозиторий начнёт трансформацию существующего поздравительного лендинга в минимально работающее приложение-маркетплейс DoWorkHere (DWH).

Цель текущей ветки: scaffold и первичная реализация PHASE 1 — подготовка инфраструктуры для DWH (Next.js App Router, TypeScript, Tailwind, Prisma, Auth).

Быстрый старт для разработки

1. Скопируй `.env.local.example` в `.env.local` и заполните переменные (DATABASE_URL, NEXTAUTH_SECRET и пр.).
2. Установи зависимости:
   ```bash
   npm install
   ```
3. Сгенерируй Prisma клиент и сделай миграцию (Postgres должен быть доступен):
   ```bash
   npm run prisma:generate
   npm run db:migrate
   npm run db:seed
   ```
4. Запусти проект:
   ```bash
   npm run dev
   ```

Важно

- Для полноценной работы нужно Postgres (локально в Docker или удалённый). В `.env.local.example` указан пример DATABASE_URL.
- Не хранить реальные секреты в Git.

Краткое описание текущей реализации

- Prisma schema с моделями User, Order, OrderImage, Application, Chat, Message, Review, Notification (`prisma/schema.prisma`).
- Seed-скрипт (`prisma/seed.ts`) создаёт несколько демонстрационных пользователей и заказов.
- NextAuth (Credentials) настроен в `app/api/auth/[...nextauth]/route.ts`.
- Простые страницы: Landing (`app/page.tsx`), Orders (`app/orders`), Create Order (`app/orders/create`).

Дальше (план на PHASE 2+)

- Реализовать регистрацию, профили, CRUD для заказов, отклики, выбор исполнителя, чат, завершение заказа, отзывы и рейтинги.
- Покрыть серверную валидацию (Zod), авторизацию и транзакции Prisma.

Если готовы, продолжу реализацию следующих этапов: Auth UI и регистрации → Orders CRUD → Applications → Chat.
