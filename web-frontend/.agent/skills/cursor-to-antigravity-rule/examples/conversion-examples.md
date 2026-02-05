# Conversion Examples

This directory contains example conversions from Cursor to Antigravity format.

## Example 1: Core Rules (Always Apply → Glob Trigger)

### Before (Cursor .mdc)

```markdown
---
alwaysApply: true
---

# E-Notarization Web Frontend - Core Directives

**Mission:** Develop the web-frontend for the E-Notarization platform...

## Tech Stack & Libraries

- **Routing:** TanStack Router
- **State Management:** Zustand
```

### After (Antigravity .md)

```markdown
---
trigger: glob
---

# E-Notarization Web Frontend - Core Directives

**Mission:** Develop the web-frontend for the E-Notarization platform...

## Tech Stack & Libraries

- **Routing:** TanStack Router
- **State Management:** Zustand
```

**Changes:**

- ✅ `alwaysApply: true` → `trigger: glob`
- ✅ Windows line endings (`\r\n`) → Unix (`\n`)

---

## Example 2: MUI Rules (File-specific → Glob Trigger)

### Before (Cursor .mdc)

````markdown
---
alwaysApply: false
---

# MUI Import Rules

## Deep Imports Only

Always use deep imports for Material UI:

```typescript
// ✅ DO
import Button from '@mui/material/Button'

// ❌ DON'T
import { Button } from '@mui/material'
```
````

````

### After (Antigravity .md)
```markdown
---
trigger: glob
globs: *.tsx
---

# MUI Import Rules

## Deep Imports Only

Always use deep imports for Material UI:

```typescript
// ✅ DO
import Button from '@mui/material/Button'

// ❌ DON'T
import { Button } from '@mui/material'
````

````

**Changes:**
- ✅ `alwaysApply: false` → `trigger: glob`
- ✅ Added `globs: *.tsx` (auto-detected from content)
- ✅ Windows line endings → Unix

**Why glob trigger?**
Script detected keywords: "mui", "import", "tsx" → suggests file-specific trigger

---

## Example 3: i18n Rules (File-specific → Glob Trigger)

### Before (Cursor .mdc)
```markdown
---
alwaysApply: false
---

# Internationalization (i18n) Rules

Use `useTranslation` hook from i18next for all text content.

```typescript
import { useTranslation } from 'react-i18next'

const MyComponent = () => {
  const { t } = useTranslation()
  return <div>{t('common.welcome')}</div>
}
````

````

### After (Antigravity .md)
```markdown
---
trigger: glob
globs: *.tsx
---

# Internationalization (i18n) Rules

Use `useTranslation` hook from i18next for all text content.

```typescript
import { useTranslation } from 'react-i18next'

const MyComponent = () => {
  const { t } = useTranslation()
  return <div>{t('common.welcome')}</div>
}
````

````

**Changes:**
- ✅ `alwaysApply: false` → `trigger: glob`
- ✅ Added `globs: *.tsx` (auto-detected from keywords)

**Why glob trigger?**
Script detected: "i18n", "translation", "usetranslation" → file-specific

---

## Example 4: Generic Rules (No Auto-detect → Manual Trigger)

### Before (Cursor .mdc)
```markdown
---
alwaysApply: false
---

# Code Review Checklist

- Check for proper error handling
- Verify TypeScript types
- Ensure code follows conventions
````

### After (Antigravity .md)

```markdown
---
trigger: manual
---

# Code Review Checklist

- Check for proper error handling
- Verify TypeScript types
- Ensure code follows conventions
```

**Changes:**

- ✅ `alwaysApply: false` → `trigger: manual`
- ✅ No glob pattern (generic content, no specific keywords)

**Why manual trigger?**
No file-specific keywords detected → default to manual

---

## Summary Table

| Original Frontmatter | Detected Content               | Antigravity Frontmatter           |
| -------------------- | ------------------------------ | --------------------------------- | --- |
| `alwaysApply: true`  | (any)                          | `trigger: glob`                   |
| `alwaysApply: false` | Contains "mui", "import"       | `trigger: glob`<br>`globs: *.tsx` |
| `alwaysApply: false` | Contains "i18n", "translation" | `trigger: glob`<br>`globs: *.tsx` |
| `alwaysApply: false` | Contains "svg", "icon"         | `trigger: glob`<br>`globs: *.tsx` |
| `alwaysApply: false` | Generic content                | `trigger: manual`                 |     |

---

## Keyword Detection Logic

The script uses these keyword sets to auto-detect glob patterns:

**React/TypeScript keywords:**

- `tsx`, `component`, `react`, `import`, `props`, `interface`

**i18n keywords:**

- `i18n`, `translation`, `locale`, `usetranslation`

**MUI keywords:**

- `mui`, `material-ui`, `@mui/material`

**Filename hints:**

- `mui` → `globs: *.tsx`
- `i18n` or `translation` → `globs: *.tsx`
- `svg` → `globs: *.tsx`
