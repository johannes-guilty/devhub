# Clerk Webhook Setup Guide

## Problem: Brukere opprettet i Clerk synkroniseres ikke til Prisma

Når du oppretter en bruker via Clerk (sign-up), må webhook-endpointet vårt (`/api/webhooks/clerk`) motta en `user.created` event fra Clerk for å opprette brukeren i Prisma-databasen.

## Løsning: Test webhook lokalt med ngrok eller localtunnel

### Metode 1: Bruk ngrok (Anbefalt)

#### Steg 1: Installer ngrok

```bash
# macOS med Homebrew
brew install ngrok

# Eller last ned fra https://ngrok.com/download
```

#### Steg 2: Start din dev server

```bash
pnpm dev
```

Serveren kjører nå på `http://localhost:3000`

#### Steg 3: Start ngrok tunnel (i ny terminal)

```bash
ngrok http 3000
```

Dette gir deg en public URL, f.eks: `https://abc123.ngrok.io`

#### Steg 4: Konfigurer webhook i Clerk Dashboard

1. Gå til [Clerk Dashboard](https://dashboard.clerk.com) → Your App → Webhooks
2. Klikk "Add Endpoint"
3. URL: `https://abc123.ngrok.io/api/webhooks/clerk` (bruk din ngrok URL)
4. Velg events: `user.created`, `user.updated`, `user.deleted`
5. Klikk "Add Endpoint"
6. Kopier "Signing Secret" (starter med `whsec_...`)
7. Legg til i `.env.local`:
   ```
   CLERK_WEBHOOK_SECRET=whsec_...
   ```

#### Steg 5: Restart dev server

```bash
# Stop og start på nytt for å laste inn CLERK_WEBHOOK_SECRET
pnpm dev
```

### Metode 2: Bruk localtunnel (Enklere, men mindre stabil)

#### Steg 1: Installer localtunnel

```bash
pnpm add -D localtunnel
```

#### Steg 2: Start tunnel (i ny terminal)

```bash
npx localtunnel --port 3000
```

Dette gir deg en URL, f.eks: `https://random-name.loca.lt`

#### Steg 3: Følg samme steg som ngrok (4-5) over

### Steg 6: Test sign-up på nytt

1. Gå til `/sign-up` i nettleseren
2. Opprett en ny bruker (eller bruk Google OAuth)
3. Se i dev server terminalen at `[CLERK WEBHOOK] ✅ User created in Prisma` logges
4. Sjekk Prisma Studio (`pnpm db:studio`) - brukeren skal nå være der!

## Alternativ: Manuell webhook-konfigurasjon (for produksjon)

For produksjon:

1. Gå til [Clerk Dashboard](https://dashboard.clerk.com) → Your App → Webhooks
2. Klikk "Add Endpoint"
3. URL: `https://your-domain.com/api/webhooks/clerk`
4. Velg events: `user.created`, `user.updated`, `user.deleted`
5. Kopier "Signing Secret" og legg til i environment variables på Vercel/produksjon

## Feilsøking

### Webhook mottas ikke

- Sjekk at ngrok/localtunnel kjører og er tilgjengelig
- Sjekk at webhook URL i Clerk Dashboard matcher din tunnel URL
- Sjekk at dev serveren kjører (`pnpm dev`)
- Sjekk terminalen for feilmeldinger
- Test webhook endpointet: Gå til `http://localhost:3000/api/webhooks/clerk` (skal returnere JSON)

### Webhook feiler med "Invalid signature"

- Sjekk at `CLERK_WEBHOOK_SECRET` er satt i `.env.local`
- Sjekk at secret matcher det som står i Clerk Dashboard → Webhooks → Endpoint → Signing Secret
- Restart dev serveren etter å ha lagt til secret i `.env.local`
- For produksjon: Bruk secret fra Clerk Dashboard

### Bruker opprettes ikke i Prisma

- Sjekk Prisma Studio for feil
- Sjekk server logs for webhook errors
- Verifiser at database connection fungerer (`pnpm db:studio`)

## Test eksisterende brukere

Hvis du allerede har opprettet brukere i Clerk som ikke er i Prisma:

1. Gå til Clerk Dashboard → Users
2. Finn brukeren
3. Klikk "..." → "Delete user"
4. Opprett brukeren på nytt via sign-up
5. Webhook vil nå trigge og opprette brukeren i Prisma

Eller manuelt opprett brukeren i Prisma Studio med samme Clerk user ID.
