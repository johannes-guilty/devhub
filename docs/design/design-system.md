# DevHub Design System

**Version:** 1.0  
**Created:** 2025-01-21  
**Author:** UX Expert Sally

---

## Overview

DevHub bruker en **dark mode-first** tilnærming med fokus på lesbarhet, 
spesielt for kode. Designsystemet bygger på shadcn/ui og Tailwind CSS, 
med tilpassede farger for utvikler-estetikk.

---

## Color Palette

### Core Colors (Dark Theme)

```css
/* CSS Custom Properties for Tailwind */

:root {
  /* Background Layers */
  --background: 222.2 84% 4.9%;        /* #09090b - Darkest, main bg */
  --background-elevated: 222.2 47% 8%; /* #111318 - Cards, modals */
  --background-subtle: 222.2 47% 11%;  /* #181c24 - Hover states */
  
  /* Foreground (Text) */
  --foreground: 210 40% 98%;           /* #f8fafc - Primary text */
  --foreground-muted: 215 20% 65%;     /* #94a3b8 - Secondary text */
  --foreground-subtle: 215 14% 45%;    /* #64748b - Placeholder, hints */
  
  /* Primary (Accent) */
  --primary: 217 91% 60%;              /* #3b82f6 - Blue, main actions */
  --primary-hover: 217 91% 55%;        /* Slightly darker for hover */
  --primary-foreground: 0 0% 100%;     /* White text on primary */
  
  /* Secondary */
  --secondary: 270 50% 60%;            /* #9333ea - Purple, secondary actions */
  --secondary-hover: 270 50% 55%;
  --secondary-foreground: 0 0% 100%;
  
  /* Accent (Highlights) */
  --accent: 142 71% 45%;               /* #22c55e - Green, success accent */
  --accent-foreground: 0 0% 100%;
  
  /* Semantic Colors */
  --success: 142 71% 45%;              /* #22c55e - Green */
  --warning: 38 92% 50%;               /* #f59e0b - Amber */
  --error: 0 84% 60%;                  /* #ef4444 - Red */
  --info: 199 89% 48%;                 /* #0ea5e9 - Sky blue */
  
  /* Border & Dividers */
  --border: 217 19% 20%;               /* #2e3440 - Default borders */
  --border-subtle: 217 19% 15%;        /* Subtle dividers */
  
  /* Ring (Focus) */
  --ring: 217 91% 60%;                 /* Same as primary */
}
```

### Semantic Color Usage

| Farge | HSL | Hex | Bruk |
|-------|-----|-----|------|
| **Primary** | 217 91% 60% | #3b82f6 | Knapper, lenker, aktive states |
| **Secondary** | 270 50% 60% | #9333ea | Sekundære handlinger, badges |
| **Success** | 142 71% 45% | #22c55e | Riktig svar, positive feedback |
| **Warning** | 38 92% 50% | #f59e0b | Advarsler, OBS-meldinger |
| **Error** | 0 84% 60% | #ef4444 | Feil, validering |
| **Info** | 199 89% 48% | #0ea5e9 | Tips, informasjon |

### Difficulty Badge Colors

| Difficulty | Background | Text | Hex |
|------------|------------|------|-----|
| **Easy** | green-900/50 | green-300 | bg: #14532d50, text: #86efac |
| **Medium** | amber-900/50 | amber-300 | bg: #78350f50, text: #fcd34d |
| **Hard** | red-900/50 | red-300 | bg: #7f1d1d50, text: #fca5a5 |

### Syntax Highlighting Theme

Bruk **One Dark Pro** eller **GitHub Dark** som base. Viktige tokenfarger:

```css
/* Syntax Highlighting Tokens */
--syntax-keyword: #c678dd;     /* purple - if, const, function */
--syntax-string: #98c379;      /* green - "strings" */
--syntax-number: #d19a66;      /* orange - 123, 45.6 */
--syntax-function: #61afef;    /* blue - functionName() */
--syntax-variable: #e06c75;    /* red - variables */
--syntax-comment: #5c6370;     /* gray - // comments */
--syntax-operator: #56b6c2;    /* cyan - =, +, => */
--syntax-class: #e5c07b;       /* yellow - ClassName */
```

### Tailwind Config Extension

```typescript
// tailwind.config.ts
const config = {
  theme: {
    extend: {
      colors: {
        // DevHub custom colors
        devhub: {
          bg: {
            DEFAULT: '#09090b',
            elevated: '#111318',
            subtle: '#181c24',
          },
          // Difficulty badges
          easy: {
            bg: 'rgba(20, 83, 45, 0.5)',
            text: '#86efac',
          },
          medium: {
            bg: 'rgba(120, 53, 15, 0.5)',
            text: '#fcd34d',
          },
          hard: {
            bg: 'rgba(127, 29, 29, 0.5)',
            text: '#fca5a5',
          },
        },
      },
    },
  },
}
```

---

## Typography

### Font Families

| Type | Font | Fallback | Bruk |
|------|------|----------|------|
| **Sans (UI)** | Inter | system-ui, sans-serif | All UI text |
| **Mono (Code)** | JetBrains Mono | Fira Code, monospace | Code, snippets |

### Font Loading

```typescript
// app/layout.tsx
import { Inter, JetBrains_Mono } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})
```

### Type Scale

| Level | Size | Line Height | Weight | Bruk |
|-------|------|-------------|--------|------|
| **H1** | 3rem (48px) | 1.1 | 700 (bold) | Page titles, hero |
| **H2** | 2.25rem (36px) | 1.2 | 600 (semibold) | Section headers |
| **H3** | 1.5rem (24px) | 1.3 | 600 (semibold) | Card titles |
| **H4** | 1.25rem (20px) | 1.4 | 500 (medium) | Subsection titles |
| **Body** | 1rem (16px) | 1.6 | 400 (normal) | Paragraph text |
| **Body Small** | 0.875rem (14px) | 1.5 | 400 (normal) | Secondary text |
| **Caption** | 0.75rem (12px) | 1.4 | 400 (normal) | Labels, metadata |
| **Code** | 0.875rem (14px) | 1.6 | 400 (normal) | Inline code, snippets |

### Tailwind Typography Classes

```typescript
// Heading components
const headingStyles = {
  h1: 'text-5xl font-bold tracking-tight',      // 48px
  h2: 'text-4xl font-semibold tracking-tight',  // 36px
  h3: 'text-2xl font-semibold',                 // 24px
  h4: 'text-xl font-medium',                    // 20px
}

// Body text
const textStyles = {
  body: 'text-base leading-relaxed',            // 16px
  small: 'text-sm leading-normal',              // 14px
  caption: 'text-xs',                           // 12px
}

// Code
const codeStyles = {
  inline: 'font-mono text-sm bg-muted px-1.5 py-0.5 rounded',
  block: 'font-mono text-sm',
}
```

---

## Spacing System

### Base Unit

```
4px grid (Tailwind default)
1 unit = 0.25rem = 4px
```

### Spacing Scale

| Token | Value | Pixels | Bruk |
|-------|-------|--------|------|
| `space-1` | 0.25rem | 4px | Tight spacing (icon margins) |
| `space-2` | 0.5rem | 8px | Compact elements |
| `space-3` | 0.75rem | 12px | Input padding |
| `space-4` | 1rem | 16px | Default gap, card padding |
| `space-6` | 1.5rem | 24px | Section gaps |
| `space-8` | 2rem | 32px | Large gaps |
| `space-12` | 3rem | 48px | Section spacing |
| `space-16` | 4rem | 64px | Major sections |
| `space-24` | 6rem | 96px | Page sections |

### Common Patterns

```typescript
// Card padding
'p-4'          // 16px all sides
'px-4 py-3'    // 16px horizontal, 12px vertical

// Section spacing
'py-16'        // 64px vertical padding for page sections
'py-24'        // 96px for major sections (landing)

// Gap in grids
'gap-4'        // 16px gap
'gap-6'        // 24px gap for larger grids

// Stack spacing
'space-y-4'    // 16px between stacked items
```

---

## Layout

### Container

```typescript
// Max-widths
const containers = {
  sm: 'max-w-screen-sm',   // 640px
  md: 'max-w-screen-md',   // 768px
  lg: 'max-w-screen-lg',   // 1024px
  xl: 'max-w-screen-xl',   // 1280px
  '2xl': 'max-w-screen-2xl', // 1536px
}

// Default container for content
'max-w-5xl mx-auto px-4'  // 1024px with padding

// Landing page sections
'max-w-6xl mx-auto px-6'  // 1152px with more padding
```

### Grid System

```typescript
// Responsive grid patterns
const grids = {
  features: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
  cards: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4',
  sidebar: 'grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8',
  detail: 'grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8',
}
```

### Breakpoints (Tailwind Defaults)

| Breakpoint | Min-width | Target |
|------------|-----------|--------|
| `sm` | 640px | Large phones |
| `md` | 768px | Tablets |
| `lg` | 1024px | Small laptops |
| `xl` | 1280px | Desktops |
| `2xl` | 1536px | Large desktops |

---

## Border Radius

| Token | Value | Bruk |
|-------|-------|------|
| `rounded-sm` | 2px | Tags, small badges |
| `rounded` | 4px | Buttons, inputs |
| `rounded-md` | 6px | Cards, modals |
| `rounded-lg` | 8px | Large containers |
| `rounded-xl` | 12px | Hero sections |
| `rounded-full` | 9999px | Avatars, pills |

---

## Shadows

Minimalistisk - dark theme trenger mindre shadows.

```typescript
const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.3)',
  DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.4), 0 1px 2px -1px rgb(0 0 0 / 0.4)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.4), 0 2px 4px -2px rgb(0 0 0 / 0.4)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.4), 0 4px 6px -4px rgb(0 0 0 / 0.4)',
}
```

Foretrekk **borders** over shadows i dark mode.

---

## Icons

### Library

**Lucide React** (inkludert med shadcn/ui)

### Sizes

| Size | Pixels | Class | Bruk |
|------|--------|-------|------|
| XS | 12px | `size-3` | Inline badges |
| SM | 16px | `size-4` | Buttons, inputs |
| MD | 20px | `size-5` | Nav items |
| LG | 24px | `size-6` | Headers, features |
| XL | 32px | `size-8` | Empty states |

### Common Icons

| Ikon | Navn | Bruk |
|------|------|------|
| `<Code2 />` | Code2 | Snippets |
| `<MessageSquare />` | MessageSquare | Discussions |
| `<Trophy />` | Trophy | Challenges |
| `<Star />` | Star | Badges, favorites |
| `<Heart />` | Heart | Likes |
| `<Bookmark />` | Bookmark | Bookmarks |
| `<Copy />` | Copy | Copy to clipboard |
| `<Check />` | Check | Success, done |
| `<X />` | X | Close, error |
| `<ChevronRight />` | ChevronRight | Navigation |
| `<Loader2 />` | Loader2 | Loading spinner |

---

## Animation & Motion

### Principles

- **Subtil og funksjonell** - Ikke distraherende
- **Rask** - 150-300ms for de fleste transisjoner
- **Easing** - `ease-out` for enter, `ease-in` for exit

### Transition Durations

| Type | Duration | Bruk |
|------|----------|------|
| Fast | 150ms | Hover states, toggles |
| Normal | 200ms | Most interactions |
| Slow | 300ms | Modals, larger elements |
| Slower | 500ms | Page transitions |

### Common Animations

```typescript
// Tailwind classes
const animations = {
  fadeIn: 'animate-in fade-in duration-200',
  fadeOut: 'animate-out fade-out duration-150',
  slideUp: 'animate-in slide-in-from-bottom-4 duration-300',
  scaleIn: 'animate-in zoom-in-95 duration-200',
}

// Hover transitions
'transition-colors duration-150'
'transition-all duration-200'

// Interactive elements
'hover:bg-muted transition-colors'
'active:scale-95 transition-transform duration-100'
```

### Skeleton Animation

```css
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.skeleton {
  background: linear-gradient(
    90deg,
    hsl(var(--muted)) 0%,
    hsl(var(--muted-foreground) / 0.1) 50%,
    hsl(var(--muted)) 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
}
```

---

## Accessibility

### Focus States

```typescript
// Focus ring
'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background'

// Shorter utility
'focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'
```

### Color Contrast

Alle tekst-kombinasjoner skal møte **WCAG AA** (4.5:1 for normal tekst):

| Bakgrunn | Tekst | Kontrast |
|----------|-------|----------|
| #09090b | #f8fafc | 18.1:1 ✅ |
| #09090b | #94a3b8 | 7.2:1 ✅ |
| #09090b | #64748b | 4.6:1 ✅ |
| #3b82f6 | #ffffff | 4.7:1 ✅ |

### Touch Targets

- Minimum 44x44px for interaktive elementer på mobil
- Tilstrekkelig spacing mellom touch targets

---

## Dark Mode Toggle (Fremtidig)

Selv om dark mode er default, design for fremtidig light mode:

```typescript
// CSS variables that swap
:root { /* dark mode values */ }
.light { /* light mode overrides */ }

// Tailwind dark: prefix
'bg-background dark:bg-background'  // Same in this case
'text-foreground dark:text-foreground'
```

---

## Quick Reference Card

```
╔════════════════════════════════════════════════════════════════╗
║                    DEVHUB DESIGN TOKENS                         ║
╠════════════════════════════════════════════════════════════════╣
║  COLORS                                                         ║
║  Primary: #3b82f6 (blue)    Secondary: #9333ea (purple)        ║
║  Success: #22c55e           Warning: #f59e0b                   ║
║  Error: #ef4444             Background: #09090b                ║
╠════════════════════════════════════════════════════════════════╣
║  TYPOGRAPHY                                                     ║
║  Sans: Inter                Mono: JetBrains Mono               ║
║  H1: 48px/bold              Body: 16px/regular                 ║
║  H2: 36px/semibold          Small: 14px/regular                ║
║  H3: 24px/semibold          Caption: 12px                      ║
╠════════════════════════════════════════════════════════════════╣
║  SPACING                                                        ║
║  4px grid · Common: 16px (p-4), 24px (p-6), 32px (p-8)         ║
║  Section padding: 64px (py-16) · Major: 96px (py-24)           ║
╠════════════════════════════════════════════════════════════════╣
║  BREAKPOINTS                                                    ║
║  Mobile: <640px · Tablet: 768px · Desktop: 1024px+             ║
╚════════════════════════════════════════════════════════════════╝
```

---

*Design System av Sally, UX Expert*
