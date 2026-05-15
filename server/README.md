# Etalstyle Email Server

Безплатен Node.js/Express backend за форма за запитвания. Използва **Gmail SMTP** (безплатно — 500 имейла/ден).

## 1. Инсталация

```bash
cd server
npm install
```

## 2. Конфигурация на Gmail (App Password)

1. Отвори: https://myaccount.google.com/security
2. Активирай **2-Step Verification** (задължително)
3. Отвори: https://myaccount.google.com/apppasswords
4. Generate → Mail → Other → "Etalstyle"
5. Копирай 16-символната парола (без интервалите)

## 3. Настройка на `.env`

```bash
cp .env.example .env
```

Отвори `.env` и попълни:

```
SMTP_USER=твоятимейл@gmail.com
SMTP_PASS=xxxxxxxxxxxxxxxx     # 16-символна App Password
MAIL_TO=твоятимейл@gmail.com   # къде ще получаваш запитванията
ALLOWED_ORIGINS=http://localhost:8080,https://твоятдомейн.com
```

## 4. Стартиране

```bash
npm start          # production
npm run dev        # с auto-reload
```

Сървърът работи на `http://localhost:3001`.

## 5. Frontend настройка

Във root-а на React проекта създай `.env`:

```
VITE_API_URL=http://localhost:3001
```

За production замени с реалния URL на сървъра.

## 6. Deploy на сървъра (безплатно)

- **Render.com** (free tier) — добавяш repo, set env vars, готово
- **Railway.app** — $5 free credit/месец
- **Fly.io** — free tier
- **VPS** (Hetzner €4/мес) — най-евтино за production

След deploy → обнови `VITE_API_URL` в frontend `.env` и `ALLOWED_ORIGINS` в server `.env`.

## Алтернативни безплатни SMTP

Ако не искаш Gmail:
- **Brevo** (Sendinblue) — 300 имейла/ден безплатно — `smtp-relay.brevo.com:587`
- **Mailtrap** — за тестване
- **Zoho Mail** — 5GB безплатно
