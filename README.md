# DevHub

[![Deploy with Vercel](https://vercel.com/button)](https://devhub-virid.vercel.app)

**Live:** [devhub-virid.vercel.app](https://devhub-virid.vercel.app)

En utvikler-community plattform for deling av kode-snippets, tekniske artikler og samarbeid.

> **Læringsprosjekt:** Dette prosjektet er bygget for å mestre moderne fullstack-utvikling med Payload CMS, Next.js, PostgreSQL, og relaterte teknologier.

## Tech Stack

| Teknologi | Versjon | Formål |
|-----------|---------|--------|
| [Next.js](https://nextjs.org/) | 15.x | App Router, Server Components |
| [Payload CMS](https://payloadcms.com/) | 3.x | Headless CMS, Admin Panel |
| [TypeScript](https://www.typescriptlang.org/) | 5.x | Type-sikkerhet (strict mode) |
| [PostgreSQL](https://www.postgresql.org/) | 15+ | Database (via Neon) |
| [pnpm](https://pnpm.io/) | 9+ | Package manager |
| [Tailwind CSS](https://tailwindcss.com/) | 3.x | Styling |

## Prerequisites

- **Node.js** 18.20.2+ eller 20.9.0+
- **pnpm** 9+ eller 10+
- **PostgreSQL** database (lokal eller cloud, f.eks. [Neon](https://neon.tech))

## Kom i gang

### 1. Clone repository

```bash
git clone git@github.com:johannes-guilty/devhub.git
cd devhub
```

### 2. Installer dependencies

```bash
pnpm install
```

### 3. Konfigurer environment variables

```bash
cp .env.example .env
```

Rediger `.env` og legg til:
- `DATABASE_URL` - PostgreSQL connection string
- `PAYLOAD_SECRET` - Minst 32 tegn lang hemmelig nøkkel

### 4. Start utviklingsserver

```bash
pnpm dev
```

Åpne [http://localhost:3000](http://localhost:3000) i nettleseren.

## Tilgjengelige Scripts

| Script | Beskrivelse |
|--------|-------------|
| `pnpm dev` | Start utviklingsserver |
| `pnpm build` | Bygg for produksjon |
| `pnpm start` | Kjør produksjonsbygg |
| `pnpm lint` | Sjekk for lint-feil |
| `pnpm lint:fix` | Auto-fiks lint-feil |
| `pnpm format` | Formater kode med Prettier |
| `pnpm type-check` | Kjør TypeScript sjekk |

### Database Scripts (Prisma)

| Script | Beskrivelse |
|--------|-------------|
| `pnpm db:generate` | Generer Prisma Client |
| `pnpm db:migrate` | Kjør database migrations |
| `pnpm db:push` | Push schema til database (uten migration) |
| `pnpm db:studio` | Åpne Prisma Studio (visuell database editor) |
| `pnpm db:seed` | Seed database med testdata |

### Payload CMS Scripts

| Script | Beskrivelse |
|--------|-------------|
| `pnpm generate:types` | Generer TypeScript typer fra Payload collections |
| `pnpm generate:importmap` | Generer import map for custom components |

## Dual-ORM Arkitektur

DevHub bruker en **dual-ORM strategi** hvor Payload CMS og Prisma opererer på samme PostgreSQL database, men håndterer forskjellige domener:

```
┌─────────────────────────────────────────────────────────────────┐
│                    PostgreSQL Database                          │
├────────────────────────────┬────────────────────────────────────┤
│     PAYLOAD TABLES         │         PRISMA TABLES              │
│     (CMS-innhold)          │         (App-data)                 │
├────────────────────────────┼────────────────────────────────────┤
│  • users (CMS admins)      │  • User (App-brukere via Clerk)    │
│  • media (bildeopplasting) │  • Snippet (kode-snippets)         │
│  • pages (CMS-sider)       │  • Tag, Discussion, etc.           │
│  • payload_* (system)      │                                    │
└────────────────────────────┴────────────────────────────────────┘
```

### Når bruke hvilken?

| Bruksområde | ORM | Eksempel |
|-------------|-----|----------|
| **CMS-innhold** | Payload | Sider, media, admin-brukere |
| **App-data** | Prisma | Snippets, brukerprofiler, diskusjoner |
| **Admin panel** | Payload | Innholdsredigering på `/admin` |
| **Server Actions** | Prisma | CRUD-operasjoner for app-features |

### Viktige forskjeller

- **Payload `users`**: CMS-administratorer som logger inn på `/admin`
- **Prisma `User`**: App-brukere som logger inn via Clerk (autentisering)
- Disse er **separate tabeller** som IKKE synkroniseres runtime

## Prosjektstruktur

```
devhub/
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── (frontend)/       # Offentlig frontend
│   │   ├── (payload)/        # Payload admin & API
│   │   └── api/health/       # Health check endpoint
│   ├── collections/          # Payload collections (CMS)
│   │   ├── Users.ts          # CMS admin-brukere
│   │   └── Media.ts          # Bildeopplastinger
│   ├── components/           # React components
│   └── lib/
│       ├── db/               # Prisma Client singleton
│       └── utils/            # Shared utilities
├── prisma/
│   ├── schema.prisma         # Prisma database schema (App-data)
│   ├── migrations/           # Database migrations
│   └── seed.ts               # Database seed script
├── media/                    # Upload-mappe for Payload media (gitignored)
├── docs/                     # Prosjektdokumentasjon
│   ├── architecture.md       # Arkitekturbeslutninger
│   ├── prd.md               # Product Requirements
│   └── stories/             # User stories
└── prisma.config.ts          # Prisma 7 configuration
```

## API Endpoints

### App Endpoints

| Endpoint | Beskrivelse |
|----------|-------------|
| `GET /api/health` | Health check - returnerer `{ status: "ok" }` |

### Payload CMS Endpoints

| Endpoint | Beskrivelse |
|----------|-------------|
| `GET /admin` | Payload CMS admin panel |
| `GET/POST /api/users` | CRUD for CMS-brukere (krever auth) |
| `GET/POST /api/media` | CRUD for media/bilder |
| `POST /api/graphql` | GraphQL API |
| `GET /api/graphql-playground` | GraphQL IDE (kun development) |

> **Merk:** Payload API er for CMS-data. App-data (snippets, etc.) håndteres via Server Actions med Prisma.

## Dokumentasjon

- [Arkitektur](./docs/architecture.md) - Tekniske beslutninger og design
- [PRD](./docs/prd.md) - Product Requirements Document
- [Stories](./docs/stories/) - User stories og tasks

## Lisens

MIT
