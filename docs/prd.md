# DevHub Product Requirements Document (PRD)

## Goals and Background Context

### Goals

1. **Mestre Payload CMS** - Forstå collections, schemas, relasjoner og admin panel i dybden
2. **Bygge solid database-kompetanse** - Lære PostgreSQL og Prisma ORM med komplekse relasjoner
3. **Implementere pagebuilder-arkitektur** - Kritisk for CMS-arbeid, må forstås grundig
4. **Utvikle AI-integrasjonsferdigheter** - Vercel AI SDK med strukturert output
5. **Praktisere avansert TypeScript** - Type-sikkerhet i en reell fullstack-kontekst
6. **Lære autentisering med Clerk** - Brukerroller og tilgangskontroll
7. **Bygge moderne UI** - shadcn/ui og Relume design patterns
8. **Levere et fungerende produkt** - DevHub som utvikler-community plattform

### Background Context

DevHub er et læringsprosjekt designet for å mestre en moderne tech stack gjennom praktisk implementering. Prosjektet adresserer behovet for hands-on erfaring med teknologier som brukes i profesjonelle miljøer: Payload CMS, PostgreSQL, Prisma, og Vercel AI SDK.

Utvikler-community ble valgt som nisje fordi det naturlig krever komplekse database-relasjoner (brukere, innhold, kommentarer, tags, likes), flere innholdstyper, og autentisering med roller - akkurat de utfordringene som gir dypest læring. **Viktig:** Tempo og forståelse prioriteres over rask levering. Hver implementasjon skal gjennomgås og forstås fullstendig.

### Change Log

| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 2025-01-20 | 0.1 | Initial draft based on brainstorming session | PM John |
| 2025-01-20 | 1.0 | Complete PRD with 5 epics, 28 stories, checklist validated | PM John |

---

## Requirements

### Functional Requirements

**Brukeradministrasjon & Auth**
- **FR1:** Systemet skal støtte brukerregistrering og innlogging via Clerk
- **FR2:** Brukere skal ha profiler med avatar, bio, og aktivitetsstatistikk
- **FR3:** Systemet skal støtte roller: Guest, Member, Moderator, Admin

**Snippets/Tips**
- **FR4:** Brukere skal kunne opprette, redigere og slette egne kode-snippets
- **FR5:** Snippets skal støtte syntax highlighting for vanlige programmeringsspråk
- **FR6:** Snippets skal kunne tagges med kategorier og språk-tags
- **FR7:** Brukere skal kunne like og bokmerke snippets

**Diskusjoner**
- **FR8:** Brukere skal kunne opprette diskusjonstråder med tittel og innhold
- **FR9:** Brukere skal kunne svare på tråder med nested kommentarer
- **FR10:** Tråder skal kunne tagges og kategoriseres
- **FR11:** Brukere skal kunne like kommentarer og svar

**Code Challenges**
- **FR12:** AI skal generere komplette challenges bestående av:
  - a) Algoritme-problemstilling med lore/historie
  - b) Mini-dataset (ca. 10 enheter) inkludert i oppgaveteksten som eksempel
  - c) Fasitsvar for mini-datasettet (for brukerens egen testing)
  - d) Stort dataset for faktisk submission/validering
  - e) Fasitsvar for stort dataset (server-side, ikke synlig for bruker)
- **FR13:** Oppgaveteksten skal tydelig forklare problemet gjennom eksempel-datasettet slik at bruker forstår oppgaven før de begynner
- **FR14:** Brukere skal kunne teste sin algoritme mot mini-datasettet lokalt før submission
- **FR15:** Brukere submitter kun output/svar fra stort dataset - ingen kode-execution på server
- **FR16:** Challenges skal ha vanskelighetsgrader (Easy, Medium, Hard) med tilsvarende poeng
- **FR17:** Systemet skal validere brukerens svar mot fasit og gi tilbakemelding (riktig/feil, eventuelt delvis riktig)

**AI-features**
- **FR18:** Systemet skal generere TL;DR-oppsummeringer av lange diskusjonstråder
- **FR19:** Systemet skal tilby AI-genererte hints for challenges (uten å avsløre løsning)
- **FR20:** All AI-output skal bruke strukturert output for konsistent formatering

**Gamification**
- **FR21:** Brukere skal tjene poeng for aktivitet (snippets, svar, løste challenges)
- **FR22:** Systemet skal vise stjerner/badges basert på prestasjoner
- **FR23:** En leaderboard skal vise topp-brukere

**CMS & Pagebuilder**
- **FR24:** Administratorer skal kunne redigere landingssider via Payload CMS
- **FR25:** Pagebuilder skal støtte modulære blokker (hero, features, testimonials, etc.)

### Non-Functional Requirements

**Læringsprosjekt-spesifikke**
- **NFR1:** All kode skal være grundig kommentert for læringsformål
- **NFR2:** Hver feature skal implementeres trinnvis med forståelse fremfor hastighet
- **NFR3:** Komplekse konsepter skal dokumenteres inline med forklaringer
- **NFR4:** Prosjektet skal utvikles i klare, sekvensielle steg der hver del er komplett og forstått før neste påbegynnes
- **NFR5:** Ingen feature skal implementeres "halvveis" - hver increment skal være fungerende og testbar
- **NFR6:** Komplekse features (som AI challenge-generering) skal brytes ned i sub-steg som kan læres individuelt

**Tekniske**
- **NFR7:** Applikasjonen skal bruke TypeScript med strict mode
- **NFR8:** Database-relasjoner skal være eksplisitt definert i Prisma schema
- **NFR9:** API-responses skal være type-safe med Zod eller tilsvarende validering
- **NFR10:** UI-komponenter skal følge shadcn/ui konvensjoner

**Ytelse & Tilgjengelighet**
- **NFR11:** Sider skal laste under 3 sekunder på normal nettverkstilkobling
- **NFR12:** Applikasjonen skal være responsiv (mobil, tablet, desktop)
- **NFR13:** Grunnleggende WCAG AA tilgjengelighet skal følges

**Sikkerhet**
- **NFR14:** Alle API-endepunkter skal kreve autentisering der relevant
- **NFR15:** Brukerdata skal valideres på både klient og server

---

## User Interface Design Goals

### Overall UX Vision

DevHub skal ha et **moderne, rent utvikler-fokusert design** som føles profesjonelt men ikke overveldende. Inspirasjonen hentes fra etablerte utvikler-plattformer som GitHub, Dev.to, og LeetCode - men med egen identitet.

Nøkkelprinsipper:
- **Lesbarhet først:** Kode og tekst skal være lett å skanne og lese
- **Mørkt tema som default:** Utviklere foretrekker ofte dark mode
- **Minimalistisk navigasjon:** Fokus på innhold, ikke chrome
- **Progressiv kompleksitet:** Enkelt for nye brukere, kraftig for erfarne

### Key Interaction Paradigms

1. **Feed-basert oppdagelse:** Hjem-feed med snippets, diskusjoner, nye challenges
2. **Card-basert innhold:** Snippets og challenges presentert som kort med preview
3. **Modal/Slide-over for detaljer:** Klikk på kort åpner utvidet visning uten full navigasjon
4. **Inline interaksjon:** Like, bokmerke, og enkle handlinger uten sidelasting
5. **Command palette (Cmd+K):** Rask navigasjon og søk for power users

### Core Screens and Views

| Screen | Formål | Prioritet |
|--------|--------|-----------|
| **Landing Page** | Pagebuilder-drevet markedsføringsside | Høy |
| **Home Feed** | Aggregert feed med all aktivitet | Høy |
| **Snippet Detail** | Visning av enkelt snippet med syntax highlighting | Høy |
| **Snippet Editor** | Opprett/rediger snippet med live preview | Høy |
| **Discussion Thread** | Tråd med nested kommentarer | Høy |
| **Challenge Browser** | Liste over tilgjengelige challenges med filter | Høy |
| **Challenge Detail** | Problemstilling, eksempel-dataset, submission | Høy |
| **User Profile** | Profil, aktivitet, statistikk, badges | Medium |
| **Leaderboard** | Rangering av brukere | Medium |
| **Settings** | Kontoinnstillinger, preferanser | Lav |
| **Admin Dashboard** | CMS-administrasjon (Payload default) | Lav |

### Accessibility

**WCAG AA** - Grunnleggende tilgjengelighet:
- Tilstrekkelig fargekontrast (spesielt viktig for syntax highlighting)
- Keyboard-navigasjon for alle interaktive elementer
- Screen reader-vennlige labels
- Focus-indikatorer synlige

### Branding

- **Navn:** DevHub
- **Fargeprofil:** Mørk base med accent-farge (kan justeres)
- **Typografi:** Monospace for kode (JetBrains Mono eller Fira Code), sans-serif for UI (Inter)
- **Ikonografi:** Lucide icons (inkludert i shadcn/ui)
- **Tone:** Profesjonell men vennlig, ikke korporat

### Target Devices and Platforms

**Web Responsive** - Primært:
- Desktop (1200px+): Full opplevelse med sidebars og rik layout
- Tablet (768-1199px): Forenklet layout, skjult sidebar
- Mobil (< 768px): Stacked layout, hamburger-meny, fokus på lesing

---

## Technical Assumptions

### Repository Structure: Monorepo

Single repository med Next.js og Payload CMS sammen. Enklere for læringsprosjekt - alt på ett sted, lettere å holde oversikt.

### Service Architecture: Monolith

```
┌─────────────────────────────────────────┐
│            Next.js App                   │
│  ┌─────────────────┬─────────────────┐  │
│  │   Frontend      │   Payload CMS   │  │
│  │   (React/UI)    │   (Admin/API)   │  │
│  └────────┬────────┴────────┬────────┘  │
│           │                 │            │
│           └────────┬────────┘            │
│                    │                     │
│              ┌─────▼─────┐              │
│              │  Prisma   │              │
│              └─────┬─────┘              │
│                    │                     │
└────────────────────┼─────────────────────┘
                     │
              ┌──────▼──────┐
              │ PostgreSQL  │
              └─────────────┘
```

Payload CMS gir admin UI og API. Next.js App Router for frontend. Prisma som ORM. Én deployment unit = enklere å forstå og debugge.

### Tech Stack

| Kategori | Teknologi | Versjon/Note |
|----------|-----------|--------------|
| **Framework** | Next.js 14+ | App Router, Server Components |
| **Language** | TypeScript | Strict mode |
| **CMS** | Payload CMS 3.x | Self-hosted, PostgreSQL adapter |
| **Database** | PostgreSQL | Vercel Postgres (Neon) |
| **ORM** | Prisma | Type-safe queries |
| **Auth** | Clerk | Brukerroller, session management |
| **AI** | Vercel AI SDK | Gateway API key, structured output |
| **UI Components** | shadcn/ui | Tailwind-based |
| **Design System** | Relume | Pagebuilder blocks |
| **Styling** | Tailwind CSS | Via shadcn/ui |
| **Code Highlighting** | Shiki eller Prism | TBD av arkitekt |
| **Package Manager** | pnpm | Rask, streng dependency-håndtering |
| **Deployment** | Vercel | Integrert med database og AI |

### Testing Requirements

Pragmatisk testing for læring:
- **Unit tests:** Ja, for utility functions og business logic
- **Integration tests:** Ja, for API-endepunkter og database-operasjoner
- **E2E tests:** Valgfritt/minimal - fokus på manuell testing under læring
- **Test framework:** Vitest (anbefalt)

### Additional Technical Assumptions

- **Node.js:** 18+ (LTS)
- **Database hosting:** Vercel Postgres (256 MB free tier)
- **AI Provider:** Vercel AI SDK med Gateway API key
- **File uploads:** Payload's innebygde media handling
- **Email:** Ikke i scope for MVP

### Lærings-spesifikke tekniske krav

- Verbose logging for å forstå dataflyt
- Prisma Studio aktivert for visuell database-inspeksjon
- TypeScript strict mode - ingen `any` uten god grunn
- Kommentarer som forklarer "hvorfor", ikke bare "hva"

---

## Epic List

| Epic | Tittel | Hovedfokus (Læring) | Leverer |
|------|--------|---------------------|---------|
| **1** | Foundation & Project Setup | Payload CMS, Prisma, Clerk, shadcn/ui, Pagebuilder | Fungerende app med auth, CMS admin, og landing page |
| **2** | Snippets Feature | Payload collections, CRUD, relasjoner, syntax highlighting | Brukere kan opprette og utforske kode-snippets |
| **3** | Discussions Feature | Nested kommentarer, komplekse relasjoner, interaksjoner | Full diskusjonsfunksjonalitet med tråder |
| **4** | Code Challenges + AI | Vercel AI SDK, strukturert output, challenge-generering | AI-genererte challenges med hints |
| **5** | Gamification & Polish | Aggregering, leaderboards, UX-forbedringer | Komplett gamifisert opplevelse |

---

## Epic 1: Foundation & Project Setup

**Mål:** Etablere solid fundament med alle kjerneteknologier integrert og fungerende. Ved fullføring har du en deployet app med autentisering, CMS admin panel, og en CMS-redigerbar landing page.

### Story 1.1: Project Initialization & Deployment

**Som** utvikler,  
**vil jeg** ha et fungerende Next.js prosjekt med TypeScript deployet til Vercel,  
**slik at** jeg har en solid base å bygge videre på.

**Acceptance Criteria:**
1. Next.js 14+ prosjekt opprettet med App Router og TypeScript strict mode
2. pnpm konfigurert som package manager
3. Prosjektstruktur følger Next.js konvensjoner (`app/`, `components/`, `lib/`)
4. ESLint og Prettier konfigurert for konsistent kode
5. Git repository initialisert med .gitignore
6. Prosjektet deployet til Vercel med automatisk deploy på push
7. Health check endpoint (`/api/health`) returnerer `{ status: "ok" }`
8. README med prosjektbeskrivelse og setup-instruksjoner

### Story 1.2: Database & Prisma Setup

**Som** utvikler,  
**vil jeg** ha PostgreSQL database koblet via Prisma,  
**slik at** jeg kan lagre og hente data type-sikkert.

**Acceptance Criteria:**
1. Vercel Postgres database opprettet og koblet til prosjektet
2. Prisma installert og konfigurert med PostgreSQL provider
3. Grunnleggende User-modell definert i Prisma schema
4. Database migrert med initial schema (`prisma migrate dev`)
5. Prisma Client generert og tilgjengelig i prosjektet
6. Prisma Studio fungerer for visuell database-inspeksjon
7. Seed-script oppretter test-bruker for utvikling
8. Environment variables dokumentert i `.env.example`

### Story 1.3: Payload CMS Integration

**Som** administrator,  
**vil jeg** ha tilgang til Payload CMS admin panel,  
**slik at** jeg kan administrere innhold.

**Acceptance Criteria:**
1. Payload CMS 3.x installert med PostgreSQL adapter
2. Payload konfigurert i Next.js prosjektet
3. Admin panel tilgjengelig på `/admin`
4. Grunnleggende User collection synkronisert med Prisma User
5. Media collection konfigurert for bildeopplastinger
6. Admin-bruker kan logge inn og se dashboard
7. Payload API endepunkter tilgjengelige (`/api/...`)
8. TypeScript typer generert fra Payload collections

### Story 1.4: Clerk Authentication Integration

**Som** bruker,  
**vil jeg** kunne registrere meg og logge inn,  
**slik at** jeg har en personlig konto på plattformen.

**Acceptance Criteria:**
1. Clerk installert og konfigurert med Next.js middleware
2. Sign-up og sign-in sider fungerer (`/sign-up`, `/sign-in`)
3. Brukerdata synkroniseres til database via webhook eller Clerk SDK
4. Beskyttede routes krever autentisering
5. Brukerens navn og avatar tilgjengelig i frontend
6. Sign-out funksjonalitet fungerer
7. Clerk-bruker koblet til Prisma User-modell
8. Roller definert i Clerk (member, moderator, admin)

### Story 1.5: UI Foundation with shadcn/ui

**Som** bruker,  
**vil jeg** oppleve et konsistent og pent design,  
**slik at** plattformen føles profesjonell.

**Acceptance Criteria:**
1. Tailwind CSS konfigurert med custom theme (dark mode default)
2. shadcn/ui installert og konfigurert
3. Grunnleggende layout-komponenter opprettet (Header, Footer, Sidebar shell)
4. Minimum 5 shadcn/ui komponenter installert (Button, Card, Input, Avatar, DropdownMenu)
5. Responsiv layout fungerer på desktop, tablet, og mobil
6. Loading states og skeleton components tilgjengelig
7. Konsistent spacing og typografi via Tailwind
8. Lucide icons integrert og brukt i navigasjon

### Story 1.6: Pagebuilder Landing Page

**Som** administrator,  
**vil jeg** kunne redigere landing page innhold via CMS,  
**slik at** jeg kan oppdatere markedsføringssiden uten kode.

**Acceptance Criteria:**
1. Page collection opprettet i Payload med pagebuilder-felt
2. Minimum 3 blokk-typer implementert (Hero, Features, CTA)
3. Blokker har redigerbare felter (tittel, tekst, bilde, knapper)
4. Frontend rendrer blokker dynamisk basert på CMS-data
5. Landing page tilgjengelig på `/` og henter data fra Payload
6. Admin kan legge til, fjerne, og omorganisere blokker
7. Endringer i CMS reflekteres på frontend uten redeploy
8. Blokk-komponenter bruker shadcn/ui for konsistent design

---

## Epic 2: Snippets Feature

**Mål:** Lære Payload collections i dybden gjennom en komplett innholdstype med CRUD, relasjoner, og interaksjoner.

### Story 2.1: Snippet Payload Collection

**Som** utvikler,  
**vil jeg** ha en Snippet collection definert i Payload,  
**slik at** jeg kan lagre kode-snippets med metadata.

**Acceptance Criteria:**
1. Snippet collection opprettet i Payload med felter: title, description, code, language
2. Language-felt har dropdown med vanlige språk (JavaScript, TypeScript, Python, etc.)
3. Code-felt bruker textarea i admin
4. Snippet har relasjon til User (author)
5. createdAt og updatedAt timestamps automatisk håndtert
6. Collection har riktig tilgangskontroll (auth required for create)
7. TypeScript typer generert for Snippet
8. Test-snippet kan opprettes via Payload admin

### Story 2.2: Create Snippet Form

**Som** innlogget bruker,  
**vil jeg** kunne opprette nye kode-snippets via et skjema,  
**slik at** jeg kan dele kode med community.

**Acceptance Criteria:**
1. "New Snippet" side tilgjengelig på `/snippets/new`
2. Skjema med felter: tittel, beskrivelse, språk (dropdown), kode (textarea)
3. Kode-felt har monospace font
4. Form validering med feilmeldinger (tittel required, kode required)
5. Submit oppretter snippet via Payload API
6. Bruker blir author automatisk basert på innlogget bruker
7. Redirect til snippet-visning etter opprettelse
8. Loading state under submission

### Story 2.3: Snippet Display with Syntax Highlighting

**Som** bruker,  
**vil jeg** se kode-snippets med syntax highlighting,  
**slik at** koden er lett å lese.

**Acceptance Criteria:**
1. Snippet detail side på `/snippets/[id]`
2. Kode vises i `<pre><code>` med syntax highlighting
3. Bruk enkel løsning: `react-syntax-highlighter` eller lignende
4. Highlighting basert på snippet's language-felt
5. Tittel, beskrivelse, author, og tags vises
6. Copy-to-clipboard knapp for kode
7. Mørkt tema for kode-blokker (matcher app design)
8. Fungerer - trenger ikke være fancy

### Story 2.4: Tags Collection & Tagging

**Som** bruker,  
**vil jeg** kunne tagge snippets med kategorier,  
**slik at** snippets er lettere å finne og organisere.

**Acceptance Criteria:**
1. Tag collection opprettet i Payload (name, slug, color optional)
2. Snippet collection har many-to-many relasjon til Tags
3. Tag-selector i create/edit snippet form
4. Tags vises på snippet detail side som badges
5. Predefinerte tags seeded (React, Node, CSS, Database, API, etc.)
6. Admin kan opprette nye tags via Payload admin
7. Tags er klikkbare (lenker til filtrert liste)
8. Minimum 10 relevante tags seeded for utvikling

### Story 2.5: Snippet Browse & Discovery

**Som** bruker,  
**vil jeg** kunne bla gjennom og filtrere snippets,  
**slik at** jeg finner relevant kode.

**Acceptance Criteria:**
1. Snippets liste side på `/snippets`
2. Snippet cards viser tittel, beskrivelse (truncated), language, tags, author
3. Filtrering på språk (dropdown)
4. Filtrering på tags (clickable tags)
5. Sortering: nyeste først, mest likte
6. Pagination eller infinite scroll (10-20 per side)
7. Tom-tilstand når ingen snippets matcher filter
8. Link til "New Snippet" for innloggede brukere

### Story 2.6: Like & Bookmark Functionality

**Som** innlogget bruker,  
**vil jeg** kunne like og bokmerke snippets,  
**slik at** jeg kan vise anerkjennelse og lagre favoritter.

**Acceptance Criteria:**
1. Like-knapp på snippet cards og detail side
2. Like count vises og oppdateres
3. Bruker kan kun like én gang per snippet (toggle)
4. Bookmark-knapp for å lagre til "mine bokmerker"
5. "Mine bokmerker" side viser brukerens lagrede snippets
6. Like/bookmark krever innlogging (prompt eller redirect)
7. Optimistic UI update for responsiv følelse
8. Like og Bookmark data lagret i database (User-Snippet relation)

---

## Epic 3: Discussions Feature

**Mål:** Mestre komplekse database-relasjoner gjennom nested kommentarstruktur.

### Story 3.1: Discussion & Comment Collections

**Som** utvikler,  
**vil jeg** ha Discussion og Comment collections definert,  
**slik at** jeg kan lagre tråder med nested svar.

**Acceptance Criteria:**
1. Discussion collection: title, content (markdown), author, tags
2. Comment collection: content, author, parentDiscussion, parentComment (nullable)
3. Discussion har relasjon til User (author) og Tags
4. Comment har relasjon til User, Discussion, og optional parent Comment
5. Timestamps på begge collections
6. Tilgangskontroll: auth required for create
7. TypeScript typer generert
8. Test-data kan opprettes via Payload admin

### Story 3.2: Create Discussion Thread

**Som** innlogget bruker,  
**vil jeg** kunne starte en ny diskusjonstråd,  
**slik at** jeg kan stille spørsmål eller dele tanker.

**Acceptance Criteria:**
1. "New Discussion" side på `/discussions/new`
2. Skjema med: tittel, innhold (textarea), tags
3. Form validering (tittel og innhold required)
4. Submit oppretter discussion via Payload API
5. Author settes automatisk
6. Redirect til discussion-visning etter opprettelse
7. Loading state under submission
8. Markdown preview (nice-to-have)

### Story 3.3: Discussion Thread View

**Som** bruker,  
**vil jeg** se en diskusjonstråd med alle svar,  
**slik at** jeg kan følge samtalen.

**Acceptance Criteria:**
1. Discussion detail side på `/discussions/[id]`
2. Viser tittel, innhold, author, tags, opprettet-dato
3. Innhold rendres som markdown
4. Liste over top-level kommentarer
5. "Reply" knapp synlig
6. Tom-tilstand hvis ingen kommentarer
7. Comment count vises
8. Responsiv layout

### Story 3.4: Add Comment/Reply

**Som** innlogget bruker,  
**vil jeg** kunne kommentere på diskusjoner og svare på kommentarer,  
**slik at** jeg kan delta i samtalen.

**Acceptance Criteria:**
1. Kommentar-skjema på discussion page
2. "Reply" knapp på hver kommentar åpner inline reply-form
3. Reply til kommentar setter parentComment-relasjon
4. Top-level kommentar har kun parentDiscussion
5. Submit legger til kommentar via Payload API
6. Ny kommentar vises umiddelbart (optimistic eller refetch)
7. Kommentar-form cleares etter submit
8. Auth required - viser login-prompt hvis ikke innlogget

### Story 3.5: Nested Comments Display

**Som** bruker,  
**vil jeg** se nested kommentarer med visuell indikasjon på tråd-struktur,  
**slik at** jeg forstår hvem som svarer hvem.

**Acceptance Criteria:**
1. Kommentarer vises hierarkisk (indentert)
2. Maksimalt 3-4 nivåer visuelt (dypere vises flatere)
3. Visuell indikasjon på nesting (border, indentation, eller linje)
4. "View replies" toggle hvis mange nested svar
5. Comment author og timestamp vises
6. Reply-knapp på hvert nivå
7. Fungerer responsivt på mobil
8. Rekursiv rendering-komponent

### Story 3.6: Discussion Browse & Interactions

**Som** bruker,  
**vil jeg** kunne bla gjennom diskusjoner og like kommentarer,  
**slik at** jeg finner interessante samtaler.

**Acceptance Criteria:**
1. Discussions liste side på `/discussions`
2. Discussion cards: tittel, excerpt, author, comment count, tags
3. Filtrering på tags
4. Sortering: nyeste, mest kommentarer
5. Like-knapp på kommentarer
6. Like count på kommentarer vises
7. Pagination (10-20 per side)
8. Link til "New Discussion" for innloggede brukere

---

## Epic 4: Code Challenges + AI

**Mål:** Integrere Vercel AI SDK med strukturert output for å generere og løse algoritme-challenges.

### Story 4.1: Challenge Collection

**Som** utvikler,  
**vil jeg** ha en Challenge collection som støtter varierte dataset-formater,  
**slik at** challenges kan være kreative og varierte.

**Acceptance Criteria:**
1. Challenge collection med felter:
   - title, lore/description (markdown med embedded eksempel-forklaring)
   - dataFormat (text, json, csv, numbers, custom)
   - exampleData (text - rå data, ca. 5-10 linjer/items)
   - exampleAnswer (text - korrekt svar for example)
   - fullDataFile (fil-upload eller text for stort dataset)
   - fullAnswer (text - server-side only, ikke eksponert)
   - difficulty (Easy, Medium, Hard), points
2. Dataset lagres som tekst/fil - ikke påtvunget JSON
3. Bruker laster ned fullDataFile som fil
4. Answer-format spesifiseres i description
5. fullAnswer validering er string-comparison (trimmed)
6. TypeScript typer generert
7. Test-challenge seeded manuelt
8. Støtte for multiline answers hvis nødvendig

### Story 4.2: Challenge Display

**Som** bruker,  
**vil jeg** se en challenge med problemstilling og eksempel-data,  
**slik at** jeg forstår oppgaven før jeg prøver å løse den.

**Acceptance Criteria:**
1. Challenge detail side på `/challenges/[id]`
2. Viser: tittel, lore/beskrivelse (markdown), difficulty badge
3. Eksempel-data vises formatert (code block)
4. Eksempel-fasit vises (så bruker kan teste algoritmen)
5. "Download Full Dataset" knapp
6. Tydelig instruksjon om workflow
7. Points vises
8. Tags vises

### Story 4.3: Challenge Submission & Validation

**Som** innlogget bruker,  
**vil jeg** submitte mitt svar og få tilbakemelding,  
**slik at** jeg vet om algoritmen min fungerer.

**Acceptance Criteria:**
1. Submission-form på challenge page (textarea for svar)
2. Svar valideres server-side mot fullAnswer (string comparison, trimmed)
3. Respons: Correct / Incorrect
4. Ved correct: bruker får poeng, challenge markeres som løst
5. Submission lagres (User, Challenge, answer, correct, timestamp)
6. Bruker kan se sine tidligere submissions
7. Kun første korrekte submission gir poeng
8. Loading state under validation

### Story 4.4: Vercel AI SDK Foundation

**Som** utvikler,  
**vil jeg** ha Vercel AI SDK konfigurert og fungerende,  
**slik at** jeg kan bygge AI-features.

**Acceptance Criteria:**
1. Vercel AI SDK installert (`ai` package)
2. AI Gateway API key konfigurert i environment
3. Test-endpoint som bekrefter AI-tilkobling (`/api/ai/test`)
4. Enkel "generate text" test fungerer
5. Error handling for API-feil
6. Rate limiting-awareness
7. TypeScript typer for AI-responses
8. Dokumentasjon i README

### Story 4.5: AI Challenge Generation

**Som** administrator,  
**vil jeg** kunne generere nye challenges via AI,  
**slik at** plattformen har variert innhold.

**Acceptance Criteria:**
1. "Generate Challenge" funksjon (admin side eller endpoint)
2. Input: difficulty, tema/kategori hint (optional)
3. AI genererer strukturert output med:
   - title, lore/description
   - exampleData + exampleAnswer
   - fullData + fullAnswer
   - dataFormat
4. Zod schema validerer AI-output
5. Generated challenge lagres som draft
6. Admin kan review og publish
7. Prompt engineering for konsistente, løsbare challenges
8. Feilhåndtering hvis AI gir ugyldig output

### Story 4.6: AI Hints System

**Som** bruker som står fast,  
**vil jeg** kunne be om hint,  
**slik at** jeg får hjelp uten at løsningen avsløres.

**Acceptance Criteria:**
1. "Get Hint" knapp på challenge page
2. AI genererer hint basert på challenge-beskrivelse
3. Hint gir retning uten å avsløre algoritmen
4. Progressivt mer spesifikke hints (hint 1, 2, 3)
5. Hint-request lagres
6. Maksimalt 3 hints per challenge per bruker
7. Hints koster ikke poeng
8. Strukturert output for konsistente hints

---

## Epic 5: Gamification & Polish

**Mål:** Implementere engagement-features og polere brukeropplevelsen.

### Story 5.1: Points System

**Som** bruker,  
**vil jeg** tjene poeng for aktivitet på plattformen,  
**slik at** jeg har insentiv til å bidra.

**Acceptance Criteria:**
1. Poeng tildeles for:
   - Opprette snippet: +10p, Snippet får like: +2p
   - Starte diskusjon: +5p, Kommentere: +2p
   - Løse challenge: Easy +10p, Medium +25p, Hard +50p
2. Total poengsum lagres på User
3. Poeng vises i header/profil
4. Poeng beregnes korrekt ved nye handlinger
5. Ingen negative poeng
6. Poeng synlig for andre på profil
7. Effektiv beregning (cached/aggregert)
8. Poeng-historikk (nice-to-have)

### Story 5.2: User Profile Enhancement

**Som** bruker,  
**vil jeg** ha en rik profilside som viser min aktivitet,  
**slik at** jeg kan se min progresjon.

**Acceptance Criteria:**
1. Profilside på `/users/[username]`
2. Viser: avatar, navn, bio, medlem siden
3. Statistikk: poeng, antall snippets, kommentarer, løste challenges
4. Liste over brukerens snippets
5. Liste over løste challenges med difficulty
6. Badges vises
7. Edit-knapp for egen profil
8. Responsiv layout

### Story 5.3: Badges & Achievements

**Som** bruker,  
**vil jeg** låse opp badges for milepæler,  
**slik at** jeg har mål å jobbe mot.

**Acceptance Criteria:**
1. Badge collection (name, description, icon, criteria)
2. Predefinerte badges:
   - "First Blood" - Løs første challenge
   - "Code Sharer" - Post 10 snippets
   - "Conversationalist" - 50 kommentarer
   - "Problem Solver" - Løs 10 challenges
   - "Elite Hacker" - Løs en Hard challenge
   - "Helpful" - Få 100 likes totalt
3. Badges tildeles automatisk ved criteria
4. Badges vises på profil
5. Notification ved ny badge
6. Badge-detaljer ved hover/klikk
7. Visuelt tiltalende ikoner/farger
8. Minimum 6-8 badges

### Story 5.4: Leaderboard

**Som** bruker,  
**vil jeg** se rangering av topp-brukere,  
**slik at** jeg kan sammenligne meg med andre.

**Acceptance Criteria:**
1. Leaderboard side på `/leaderboard`
2. Topp 50 brukere sortert på poeng
3. Rad: rank, avatar, navn, poeng, løste challenges
4. Fremhev innlogget bruker sin posisjon
5. Filter: All time / This month / This week
6. Responsiv tabell/liste
7. Link til brukerprofil
8. Rimelig oppdateringsfrekvens

### Story 5.5: AI Thread Summaries

**Som** bruker,  
**vil jeg** se AI-oppsummeringer av lange tråder,  
**slik at** jeg raskt forstår innholdet.

**Acceptance Criteria:**
1. "Generate Summary" knapp på diskusjoner med 5+ kommentarer
2. AI genererer TL;DR (2-3 setninger)
3. Summary vises øverst i tråden
4. Summary caches (ikke generer hver gang)
5. "Regenerate" mulighet
6. Strukturert output
7. Loading state
8. Key points og konklusjon inkludert

### Story 5.6: Home Feed & UX Polish

**Som** bruker,  
**vil jeg** ha en engasjerende hjem-side,  
**slik at** jeg oppdager nytt innhold.

**Acceptance Criteria:**
1. Home feed på `/home`
2. Aggregert feed: snippets, diskusjoner, challenges
3. Feed-items: type-ikon, tittel, author, timestamp
4. Filtrering på type
5. "Trending" seksjon
6. Quick-actions synlig
7. Loading skeletons
8. Subtle animasjoner/transitions

---

## Checklist Results Report

### Executive Summary

| Metrikk | Vurdering |
|---------|-----------|
| **Overall PRD Completeness** | **92%** |
| **MVP Scope Appropriateness** | Just Right |
| **Readiness for Architecture** | ✅ Ready |
| **Critical Blockers** | 0 |

### Category Statuses

| Category | Status | Notes |
|----------|--------|-------|
| 1. Problem Definition & Context | PASS | Læringsmål klart definert |
| 2. MVP Scope Definition | PASS | 5 epics med stegvis progresjon |
| 3. User Experience Requirements | PARTIAL | UI screens definert, user flows kan utdypes |
| 4. Functional Requirements | PASS | FR1-FR25 komplette og testbare |
| 5. Non-Functional Requirements | PASS | NFR1-NFR15 inkluderer lærings-krav |
| 6. Epic & Story Structure | PASS | 28 stories med AC, dependencies klare |
| 7. Technical Guidance | PASS | Tech stack og arkitektur dokumentert |
| 8. Cross-Functional Requirements | PARTIAL | Integrasjoner OK, datamodell til arkitekt |
| 9. Clarity & Communication | PASS | Godt strukturert |

### Recommendations

1. **Arkitekt:** Lag detaljert datamodell/ER-diagram
2. **UX:** Vurder user flow-diagram for onboarding
3. **Utvikling:** Hvis AI blir komplekst, forenkle til manuelle challenges først

### Final Decision

**✅ READY FOR ARCHITECT** - PRD er komplett for arkitektur-fasen.

---

## Next Steps

### UX Expert Prompt

```
@ux-expert

Jeg har ferdigstilt PRD for DevHub - et læringsprosjekt for utvikler-community plattform.

Se docs/prd.md for komplett PRD med:
- UI Design Goals (screens, interaction paradigms, accessibility)
- 5 Epics med 28 user stories

Jeg trenger hjelp med:
1. Validere UI/UX-retningen
2. Vurdere om user flows bør dokumenteres mer detaljert
3. Eventuelt lage wireframes eller flow-diagrammer for kritiske paths

Dette er et læringsprosjekt - fokus på forståelse fremfor hastighet.
```

### Architect Prompt

```
@architect

Jeg har ferdigstilt PRD for DevHub - et læringsprosjekt for å mestre:
Payload CMS, PostgreSQL, Prisma, Next.js, Vercel AI SDK, Clerk, shadcn/ui

Se docs/prd.md for komplett PRD.

Tech stack er definert. Jeg trenger arkitektur-dokumentasjon som inkluderer:
1. Detaljert datamodell (Payload collections + Prisma schema)
2. API-struktur og endpoints
3. Prosjektstruktur (mappestruktur)
4. Integrasjonspunkter (Clerk ↔ Payload, AI SDK setup)

VIKTIG: Dette er et læringsprosjekt. Alt skal gjøres stegvis med full 
forståelse. Tempo > hastighet. Forklar beslutninger grundig.

Start med å lese PRD og bekreft forståelse før du begynner arkitektur.
```

---

*PRD created: 2025-01-20 | Version: 1.0 | Author: PM John*

