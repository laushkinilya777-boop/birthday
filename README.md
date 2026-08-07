# Birthday Tribute

Мобильный поздравительный лендинг на Next.js 14, TypeScript и Tailwind CSS.

## Запуск

1. Скопируй `.env.local.example` в `.env.local`.
2. Установи `RESEND_API_KEY`, `TO_EMAIL` и `FROM_EMAIL`.
3. Для тестов Resend можно использовать `onboarding@resend.dev`.
4. Установи зависимости:
   ```bash
   npm install
   ```
5. Запусти проект:
   ```bash
   npm run dev
   ```

### Resend email setup

Если Resend возвращает ошибку отправки, убедись, что в `.env.local` настроены:

- `RESEND_API_KEY`
- `TO_EMAIL`
- `FROM_EMAIL` (если отправительская почта должна быть верифицирована в Resend)

## Особенности

- premium glassmorphism
- мягкие кинематографичные анимации
- интерактивная галерея и пожелания
- Resend API для отправки желания
- музыкальный плеер и конфетти

Замена музыки:

Чтобы заменить музыку, просто удалите birthday.mp3 и положите в папку /public/music/ новый файл с таким же названием.
Никаких изменений в коде не требуется.
- адаптирован для мобильного просмотра
