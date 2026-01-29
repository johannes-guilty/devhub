# DevHub Component Patterns

**Version:** 1.0  
**Created:** 2025-01-21  
**Author:** UX Expert Sally

---

## Overview

Dette dokumentet definerer atferd og visuell design for kjernekomponenter 
i DevHub. Hver komponent har definerte states, interaksjoner, og 
tilgjengelighets-krav.

---

## Cards

### Snippet Card

**Formål:** Vise kode-snippet preview i liste/grid.

#### Visual Structure

```
┌─────────────────────────────────────────────────────┐
│  ┌─────┐                                            │
│  │ JS  │  snippet-title-here                        │
│  └─────┘  Beskrivelse av snippet som kan være       │
│           ganske lang og vil truncates...           │
│                                                     │
│  ┌──────────────────────────────────────────────┐  │
│  │ const greeting = "Hello";                     │  │
│  │ console.log(greeting);                        │  │
│  │ // Preview max 5 linjer                       │  │
│  └──────────────────────────────────────────────┘  │
│                                                     │
│  ┌────┐ ┌────┐ ┌────────┐                          │
│  │React│ │API │ │Database│     ♡ 24   👤 @user     │
│  └────┘ └────┘ └────────┘     [Like]  [Bookmark]   │
└─────────────────────────────────────────────────────┘
```

#### Content Displayed

| Element | Visning | Max Length |
|---------|---------|------------|
| Language badge | Fargekodet ikon + kort navn | 20 chars |
| Title | Bold, linkbar | 80 chars, truncate |
| Description | Muted tekst | 150 chars, truncate |
| Code preview | Syntax highlighted, monospace | 5 linjer |
| Tags | Badges, max 3 synlige | +X more |
| Like count | Hjerte-ikon + tall | - |
| Author | Avatar + @username | 20 chars |

#### States

| State | Visual Change |
|-------|---------------|
| **Default** | Border: `border-border`, bg: `bg-background-elevated` |
| **Hover** | bg: `bg-background-subtle`, slight scale (1.01), cursor: pointer |
| **Focused** | Focus ring (2px primary), outline offset |
| **Liked** | Heart filled, red color |
| **Bookmarked** | Bookmark filled, primary color |
| **Loading** | Skeleton med shimmer |

#### Interactions

| Action | Behavior |
|--------|----------|
| **Click card** | Navigate til `/snippets/[id]` |
| **Click like** | Toggle like, optimistic update, stop propagation |
| **Click bookmark** | Toggle bookmark, optimistic update, stop propagation |
| **Click tag** | Navigate til filtered list, stop propagation |
| **Click author** | Navigate til `/users/[username]`, stop propagation |

#### Accessibility

- Card er en `<article>` med `aria-labelledby` på title
- Like/bookmark er `<button>` med `aria-pressed`
- Keyboard: Tab navigerer mellom kort, Enter åpner
- Screen reader: "Snippet: [title], by [author], [X] likes"

---

### Discussion Card

**Formål:** Vise diskusjonstråd preview i liste.

#### Visual Structure

```
┌─────────────────────────────────────────────────────┐
│  Diskusjons-tittel som spørsmål her?                │
│                                                     │
│  Første del av diskusjonsinnholdet som gir          │
│  kontekst til hva tråden handler om...              │
│                                                     │
│  ┌────┐ ┌─────────┐                                 │
│  │React│ │TypeScript│                               │
│  └────┘ └─────────┘                                 │
│                                                     │
│  💬 12 svar · 👤 @user · 2 timer siden             │
└─────────────────────────────────────────────────────┘
```

#### Content Displayed

| Element | Visning | Max Length |
|---------|---------|------------|
| Title | Bold, linkbar | 120 chars, truncate |
| Content preview | Plain text (markdown stripped) | 200 chars |
| Tags | Badges, max 3 | +X more |
| Comment count | Ikon + tall | - |
| Author | Avatar + @username | 20 chars |
| Timestamp | Relative ("2 timer siden") | - |

#### States & Interactions

Samme mønster som Snippet Card, men:
- Ingen like/bookmark på kort-nivå
- Kommentar-ikon viser aktivitet

---

### Challenge Card

**Formål:** Vise challenge i browser med difficulty og status.

#### Visual Structure

```
┌─────────────────────────────────────────────────────┐
│  ┌────────┐                                         │
│  │ MEDIUM │  25 poeng                    ✓ Løst    │
│  └────────┘                                         │
│                                                     │
│  Find the Missing Number                            │
│                                                     │
│  En tallfølge mangler et tall. Gitt en liste        │
│  fra 1 til N der ett tall mangler...                │
│                                                     │
│  ┌────────┐ ┌──────┐                               │
│  │Algorithm│ │Arrays│                               │
│  └────────┘ └──────┘                               │
│                                                     │
│  156 har løst denne                                 │
└─────────────────────────────────────────────────────┘
```

#### Difficulty Badge Styling

| Difficulty | Background | Text | Border |
|------------|------------|------|--------|
| **EASY** | `bg-green-900/50` | `text-green-300` | `border-green-700` |
| **MEDIUM** | `bg-amber-900/50` | `text-amber-300` | `border-amber-700` |
| **HARD** | `bg-red-900/50` | `text-red-300` | `border-red-700` |

#### Status Indicators

| Status | Visual |
|--------|--------|
| **Not attempted** | No indicator |
| **Attempted (failed)** | Yellow dot or "Prøvd" badge |
| **Solved** | Green checkmark + "Løst" badge |

#### Interactions

| Action | Behavior |
|--------|----------|
| **Click card** | Navigate til `/challenges/[id]` |
| **Hover** | Same as Snippet Card |

---

## Comment Component

### Single Comment

**Formål:** Vise en kommentar med nesting-support.

#### Visual Structure

```
┌─────────────────────────────────────────────────────┐
│  👤  @username · 2 timer siden                      │
│  ├─                                                 │
│  │  Kommentarinnhold her som kan være flere linjer  │
│  │  og støtter **markdown** formattering.           │
│  │                                                  │
│  │  ♡ 5  · Svar                                    │
│  │                                                  │
│  │  ┌─────────────────────────────────────────────┐│
│  │  │  👤  @another · 1 time siden                ││
│  │  │  ├─                                          ││
│  │  │  │  Nested svar her...                       ││
│  │  │  │  ♡ 2  · Svar                             ││
│  │  │  └───────────────────────────────────────────┤│
│  │  └─────────────────────────────────────────────┘│
│  └──────────────────────────────────────────────────┘
└─────────────────────────────────────────────────────┘
```

### Nesting Rules

| Regel | Verdi | Beskrivelse |
|-------|-------|-------------|
| **Max visual depth** | 4 nivåer | Dypere replies vises på nivå 4 |
| **Indentation** | 24px per nivå | `ml-6` i Tailwind |
| **Visual indicator** | Border-left | `border-l-2 border-border` |
| **Collapse threshold** | 5+ replies | "Vis X flere svar" toggle |

### Nesting Visual Cues

```
Nivå 0: Ingen indent
│
├─ Nivå 1: 24px indent, border-l
│  │
│  ├─ Nivå 2: 48px total indent
│  │  │
│  │  ├─ Nivå 3: 72px total indent
│  │  │  │
│  │  │  └─ Nivå 4+: 96px (flates ut her)
```

### Comment States

| State | Visual |
|-------|--------|
| **Default** | Normal styling |
| **Own comment** | Subtle highlight `bg-primary/5` |
| **Liked by user** | Heart filled |
| **Replying** | Inline reply form expanded |
| **Collapsed** | Only first line + "..." + expand button |

### Reply Form

```
┌─────────────────────────────────────────────────────┐
│  [Avatar] Skriv et svar...                          │
│                                                     │
│  ┌─────────────────────────────────────────────────┐│
│  │ Textarea for reply                              ││
│  │                                                 ││
│  └─────────────────────────────────────────────────┘│
│                              [Avbryt] [Publiser]    │
└─────────────────────────────────────────────────────┘
```

---

## Form Components

### Input Field

```
┌─────────────────────────────────────────────────────┐
│  Label                                              │
│  ┌─────────────────────────────────────────────────┐│
│  │ Placeholder text...                              ││
│  └─────────────────────────────────────────────────┘│
│  Helper text eller beskrivelse                      │
└─────────────────────────────────────────────────────┘
```

#### States

| State | Border | Background | Text |
|-------|--------|------------|------|
| **Default** | `border-border` | `bg-background` | `text-foreground` |
| **Focus** | `ring-2 ring-primary` | `bg-background` | `text-foreground` |
| **Error** | `border-error` | `bg-background` | `text-foreground` |
| **Disabled** | `border-border/50` | `bg-muted` | `text-muted-foreground` |

#### Validation Feedback

```
┌─────────────────────────────────────────────────────┐
│  Email *                                            │
│  ┌─────────────────────────────────────────────────┐│
│  │ invalid@                                         ││
│  └─────────────────────────────────────────────────┘│
│  ⚠️ Ugyldig e-postadresse                          │
└─────────────────────────────────────────────────────┘
```

- Error message in `text-error` (red)
- Icon + message under field
- Field border turns red

---

## Loading & Feedback

### Skeleton Patterns

**Snippet Card Skeleton:**
```
┌─────────────────────────────────────────────────────┐
│  ┌─────┐                                            │
│  │░░░░░│  ████████████████████                      │
│  └─────┘  ██████████████████████████████            │
│                                                     │
│  ┌──────────────────────────────────────────────┐  │
│  │░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│  │
│  │░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│  │
│  │░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│  │
│  └──────────────────────────────────────────────┘  │
│                                                     │
│  ┌────┐ ┌────┐ ┌────┐          ██████   ██████     │
│  └────┘ └────┘ └────┘                              │
└─────────────────────────────────────────────────────┘
```

**Principles:**
- Match exact dimensions of loaded component
- Animate with shimmer effect (left-to-right gradient)
- Use `bg-muted` as base color
- Keep structural elements (borders, spacing)

### Skeleton Component Pattern

```typescript
// components/snippets/snippet-card-skeleton.tsx
export function SnippetCardSkeleton() {
  return (
    <div className="rounded-md border border-border p-4 space-y-3">
      <div className="flex items-center gap-2">
        <Skeleton className="h-6 w-12" /> {/* Language badge */}
        <Skeleton className="h-5 w-3/4" /> {/* Title */}
      </div>
      <Skeleton className="h-4 w-full" /> {/* Description */}
      <Skeleton className="h-20 w-full" /> {/* Code preview */}
      <div className="flex gap-2">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-5 w-16" />
      </div>
    </div>
  )
}
```

### Toast Notifications

**Types:**

| Type | Icon | Background | Border |
|------|------|------------|--------|
| **Success** | CheckCircle | `bg-green-900/20` | `border-green-700` |
| **Error** | XCircle | `bg-red-900/20` | `border-red-700` |
| **Warning** | AlertTriangle | `bg-amber-900/20` | `border-amber-700` |
| **Info** | Info | `bg-blue-900/20` | `border-blue-700` |

**Behavior:**
- Position: Bottom-right (desktop), bottom-center (mobile)
- Auto-dismiss: 5 seconds (success/info), persistent (error)
- Swipe to dismiss on mobile
- Stack max 3 visible

**Structure:**
```
┌──────────────────────────────────────────┐
│  ✓  Snippet opprettet                 ✕  │
│     Din snippet er nå publisert.         │
└──────────────────────────────────────────┘
```

### Optimistic UI

**Pattern for Like/Bookmark:**

```typescript
// 1. Umiddelbart oppdater UI
setLiked(!liked)
setLikeCount(prev => liked ? prev - 1 : prev + 1)

// 2. Send request
const result = await toggleLike(snippetId)

// 3. Reverser hvis feil
if (!result.success) {
  setLiked(liked)
  setLikeCount(prev => liked ? prev + 1 : prev - 1)
  toast.error('Kunne ikke lagre')
}
```

**Visual Feedback:**
- Immediate state change (no delay)
- Subtle animation on icon (scale pulse)
- No loading spinner for optimistic actions

---

## Button Variants

### Primary Button
```
┌─────────────────┐
│  Opprett  →     │  bg-primary, text-primary-foreground
└─────────────────┘
```

### Secondary Button
```
┌─────────────────┐
│  Avbryt         │  bg-secondary, text-secondary-foreground
└─────────────────┘
```

### Ghost Button
```
┌─────────────────┐
│  Les mer        │  bg-transparent, hover:bg-muted
└─────────────────┘
```

### Destructive Button
```
┌─────────────────┐
│  Slett          │  bg-error, text-white
└─────────────────┘
```

### Button States

| State | Visual Change |
|-------|---------------|
| **Hover** | Slightly darker/lighter bg |
| **Active** | Scale down 95% |
| **Loading** | Spinner + disabled + text "Laster..." |
| **Disabled** | Opacity 50%, cursor not-allowed |

### Loading Button Pattern

```typescript
<Button disabled={isPending}>
  {isPending ? (
    <>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Lagrer...
    </>
  ) : (
    'Lagre'
  )}
</Button>
```

---

## Empty States

### Structure

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│                    ┌──────┐                         │
│                    │ Icon │  (size-12, muted)       │
│                    └──────┘                         │
│                                                     │
│              Ingen snippets ennå                    │
│                                                     │
│        Bli den første til å dele kode!              │
│                                                     │
│              [ Opprett snippet ]                    │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Empty State Messages

| Context | Title | Description | CTA |
|---------|-------|-------------|-----|
| **Snippets (empty)** | "Ingen snippets ennå" | "Bli den første til å dele kode!" | "Opprett snippet" |
| **Discussions (empty)** | "Ingen diskusjoner" | "Start en samtale!" | "Ny diskusjon" |
| **Challenges (empty)** | "Ingen challenges" | "Nye utfordringer kommer snart" | - |
| **Search (no results)** | "Ingen treff" | "Prøv andre søkeord" | "Fjern filter" |
| **Bookmarks (empty)** | "Ingen bokmerker" | "Lagre snippets for senere" | "Utforsk snippets" |
| **My submissions (empty)** | "Ingen forsøk ennå" | "Velg en challenge å løse" | "Se challenges" |

---

## Modal / Dialog

### Structure

```
┌─────────────────────────────────────────────────────┐
│  Bekreft sletting                               ✕  │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Er du sikker på at du vil slette denne snippeten?  │
│  Dette kan ikke angres.                             │
│                                                     │
├─────────────────────────────────────────────────────┤
│                          [Avbryt]  [Slett]          │
└─────────────────────────────────────────────────────┘
```

### Behavior

- Backdrop: `bg-black/80`, blur(4px)
- Focus trap: Tab cycles within modal
- Close: Esc key, click outside, X button
- Animation: fade + scale in (200ms)
- Centered vertically with max-height scroll

---

## Code Block

### Structure

```
┌─────────────────────────────────────────────────────┐
│  JavaScript                              [Copy]     │
├─────────────────────────────────────────────────────┤
│  1 │ const greeting = "Hello, World!";              │
│  2 │                                                │
│  3 │ function sayHello(name) {                      │
│  4 │   return `${greeting} - ${name}`;              │
│  5 │ }                                              │
│  6 │                                                │
│  7 │ console.log(sayHello("Developer"));            │
└─────────────────────────────────────────────────────┘
```

### Features

| Feature | Behavior |
|---------|----------|
| **Language label** | Top-left, matches syntax highlighter |
| **Copy button** | Top-right, copies code only (not line numbers) |
| **Line numbers** | Optional, muted color |
| **Scroll** | Horizontal scroll for long lines, no wrap |
| **Max height** | 400px with vertical scroll for long snippets |

### Copy Feedback

1. Click "Copy"
2. Icon changes to checkmark
3. Tooltip: "Kopiert!"
4. Reset after 2 seconds

---

## Badge / Tag

### Variants

| Variant | Use | Style |
|---------|-----|-------|
| **Default** | Tags på snippets | `bg-muted text-muted-foreground` |
| **Primary** | Aktiv filter | `bg-primary/20 text-primary` |
| **Success** | "Løst" status | `bg-green-900/50 text-green-300` |
| **Warning** | "Prøvd" status | `bg-amber-900/50 text-amber-300` |
| **Language** | Språk-badge | Fargekodet per språk |

### Language Badge Colors

| Language | Background | Text |
|----------|------------|------|
| JavaScript | `bg-yellow-900/50` | `text-yellow-300` |
| TypeScript | `bg-blue-900/50` | `text-blue-300` |
| Python | `bg-green-900/50` | `text-green-300` |
| React/JSX | `bg-cyan-900/50` | `text-cyan-300` |
| CSS | `bg-pink-900/50` | `text-pink-300` |
| HTML | `bg-orange-900/50` | `text-orange-300` |

---

## Avatar

### Sizes

| Size | Pixels | Class | Use |
|------|--------|-------|-----|
| XS | 24px | `size-6` | Inline mentions |
| SM | 32px | `size-8` | Comments, lists |
| MD | 40px | `size-10` | Cards, headers |
| LG | 64px | `size-16` | Profile pages |
| XL | 96px | `size-24` | Profile hero |

### Fallback

- Initials fra displayName
- Gradient background basert på username hash
- Konsistent farge per bruker

---

## Responsive Behavior Summary

| Component | Desktop | Tablet | Mobile |
|-----------|---------|--------|--------|
| **Snippet Card** | Grid 3-col | Grid 2-col | Stack 1-col |
| **Code Block** | Full width | Full width | Horizontal scroll |
| **Comments** | Full nesting | Full nesting | Max 2 levels visual |
| **Modal** | Centered | Centered | Full-width bottom sheet |
| **Sidebar** | Visible | Hidden (drawer) | Hidden (drawer) |
| **Toast** | Bottom-right | Bottom-right | Bottom-center |

---

*Component Patterns av Sally, UX Expert*
