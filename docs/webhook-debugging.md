# Webhook Debugging Guide

## Problem: Webhook mottar ikke events automatisk

Hvis webhook ikke mottar events fra Clerk, følg denne guiden for å feilsøke.

## Steg 1: Verifiser webhook-endpointet er tilgjengelig

Gå til: `http://localhost:3000/api/webhooks/clerk`

Du skal se en JSON-response som bekrefter at endpointet er konfigurert.

## Steg 2: Sjekk at localtunnel/ngrok kjører

### Med localtunnel:
```bash
npx localtunnel --port 3000
```

Du skal se en URL som: `https://random-name.loca.lt`

### Med ngrok:
```bash
ngrok http 3000
```

Du skal se en URL som: `https://abc123.ngrok.io`

## Steg 3: Verifiser webhook URL i Clerk Dashboard

1. Gå til [Clerk Dashboard](https://dashboard.clerk.com)
2. Velg din app → **Developers** → **Instance** → **Webhooks**
3. Sjekk at webhook URL matcher din tunnel URL:
   - Lokaltunnel: `https://xxx.loca.lt/api/webhooks/clerk`
   - ngrok: `https://xxx.ngrok.io/api/webhooks/clerk`

## Steg 4: Sjekk environment variables

I `.env.local`, sjekk at:
```bash
CLERK_WEBHOOK_SECRET=whsec_...
```

Secret skal matche det som står i Clerk Dashboard → Webhooks → Endpoint → Signing Secret.

## Steg 5: Test webhook med ny bruker

1. **Restart dev serveren** (viktig etter å ha lagt til CLERK_WEBHOOK_SECRET):
   ```bash
   pnpm dev
   ```

2. **Opprett en ny testbruker**:
   - Gå til `/sign-up`
   - Opprett en ny bruker (eller bruk Google OAuth)

3. **Se i terminalen** etter disse loggene:
   ```
   [CLERK WEBHOOK] ========================================
   [CLERK WEBHOOK] POST request received at: ...
   [CLERK WEBHOOK] ✅ Webhook secret is configured
   [CLERK WEBHOOK] ✅ Event verified: user.created
   [CLERK WEBHOOK] ✅ User created in Prisma: user_xxx (username)
   [CLERK WEBHOOK] ========================================
   ```

## Feilsøking

### Ingen webhook logs i terminalen

**Mulige årsaker:**
1. **Localtunnel/ngrok kjører ikke** - Start tunnel på nytt
2. **Webhook URL i Clerk Dashboard er feil** - Sjekk at URL matcher tunnel URL
3. **Webhook er ikke aktivert** - Sjekk at webhook er "Enabled" i Clerk Dashboard

**Løsning:**
- Sjekk at tunnel kjører og er tilgjengelig
- Test tunnel URL direkte: `https://xxx.loca.lt/api/webhooks/clerk` (skal returnere JSON)
- Verifiser webhook URL i Clerk Dashboard

### Webhook mottas men feiler

**Se etter disse feilmeldingene i terminalen:**

1. **"Missing svix headers"**
   - Dette betyr at requesten ikke kommer fra Clerk
   - Sjekk at webhook URL er riktig i Clerk Dashboard

2. **"Invalid signature"**
   - CLERK_WEBHOOK_SECRET matcher ikke
   - Sjekk at secret i `.env.local` matcher secret i Clerk Dashboard
   - Restart dev serveren etter å ha lagt til secret

3. **"Webhook processing error"**
   - Database-feil eller valideringsfeil
   - Sjekk Prisma schema og database connection
   - Se full error message i terminalen

### Webhook fungerer men bruker opprettes ikke

**Sjekk:**
1. Prisma Studio: `pnpm db:studio`
2. Se om brukeren faktisk ble opprettet
3. Sjekk terminalen for database-feil

**Workaround:**
- Bruk `/api/sync-user` endpoint for å manuelt synkronisere brukeren

## Test webhook manuelt

Du kan teste webhook-endpointet direkte med curl:

```bash
curl -X POST http://localhost:3000/api/webhooks/clerk \
  -H "Content-Type: application/json" \
  -d '{"test": "data"}'
```

Dette skal gi deg en "Missing svix headers" feil, som bekrefter at endpointet fungerer.

## For produksjon

Når du deployer til produksjon:
1. Konfigurer webhook i Clerk Dashboard med produksjons-URL
2. Legg til `CLERK_WEBHOOK_SECRET` i Vercel environment variables
3. Test webhook med en ny bruker
