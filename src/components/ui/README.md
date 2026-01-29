# Skeleton Component Pattern

## Mandatory Pattern

**Every feature component MUST have a matching skeleton component.**

### Pattern

```tsx
// ✅ CORRECT: Use skeleton component
if (loading) return <SnippetCardSkeleton />
return <SnippetCard data={data} />

// ❌ NEVER: Use spinner or generic loading
if (loading) return <Spinner />
```

### Requirements

1. **Match dimensions**: Skeleton must match exact dimensions of actual component
2. **Same structure**: Skeleton should mirror the component's layout structure
3. **Placement**: Create skeleton in same directory as feature component
   - `components/snippets/snippet-card.tsx`
   - `components/snippets/snippet-card-skeleton.tsx`
4. **Use shadcn/ui Skeleton**: Import from `@/components/ui/skeleton`

### Examples

See `skeleton-card.tsx` and `skeleton-header.tsx` for reference implementations.

### Benefits

- Better UX: Users see content structure while loading
- Consistent loading states across the app
- Professional appearance
- Reduces perceived load time
