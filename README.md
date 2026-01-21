# DevHub

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

## Prosjektstruktur

```
devhub/
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── (frontend)/       # Offentlig frontend
│   │   ├── (payload)/        # Payload admin & API
│   │   └── api/health/       # Health check endpoint
│   ├── collections/          # Payload collections
│   ├── components/           # React components
│   └── lib/                  # Shared utilities
├── docs/                     # Prosjektdokumentasjon
│   ├── architecture.md       # Arkitekturbeslutninger
│   ├── prd.md               # Product Requirements
│   └── stories/             # User stories
└── prisma/                   # Database schema (kommer)
```

## API Endpoints

| Endpoint | Beskrivelse |
|----------|-------------|
| `GET /api/health` | Health check - returnerer `{ status: "ok" }` |
| `GET /admin` | Payload CMS admin panel |
| `POST /api/graphql` | GraphQL endpoint |

## Dokumentasjon

- [Arkitektur](./docs/architecture.md) - Tekniske beslutninger og design
- [PRD](./docs/prd.md) - Product Requirements Document
- [Stories](./docs/stories/) - User stories og tasks

## Lisens

MIT
