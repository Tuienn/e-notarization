# Cursor to Antigravity Converter

Automatically convert Cursor rules (`.mdc`) to Antigravity rules (`.md`).

## Quick Start

### 1. Convert All Rules

```bash
cd d:\Code\e-notarization\web-frontend
python .agent\skills\cursor-to-antigravity-rule\scripts\convert_rules.py
```

### 2. Convert Single File

```bash
python .agent\skills\cursor-to-antigravity-rule\scripts\convert_rules.py --single core.mdc
```

### 3. Preview (Dry Run)

```bash
python .agent\skills\cursor-to-antigravity-rule\scripts\convert_rules.py --dry-run
```

## What It Does

✅ Converts `.cursor/rules/*.mdc` → `.agent/rules/*.md`
✅ Maps `alwaysApply: true` → `trigger: glob`
✅ Maps `alwaysApply: false` → `trigger: manual` or `trigger: glob`
✅ Auto-detects glob patterns from content
✅ Normalizes line endings (Windows → Unix)
✅ Preserves all markdown content

## Format Differences

### Cursor Format (.mdc)

```markdown
---
alwaysApply: true
---

# My Rule

Content here...
```

### Antigravity Format (.md)

```markdown
---
trigger: glob
---

# My Rule

Content here...
```

## Trigger Modes

| Mode     | When to Use                     | Example                                 |
| -------- | ------------------------------- | --------------------------------------- |
| `glob`   | Apply to files matching pattern | Core conventions, MUI rules for `*.tsx` |
| `manual` | User triggers explicitly        | Code review checklist                   |

## Examples

See [examples/conversion-examples.md](examples/conversion-examples.md) for detailed examples.

## Workflow

1.  **Read source rules** from `.cursor/rules/*.mdc`
2.  **Parse frontmatter** (YAML metadata)
3.  **Detect trigger mode** using content analysis
4.  **Convert content** (normalize line endings, etc.)
5.  **Write to target** `.agent/rules/*.md`
6.  **Report summary** with conversion details

## Smart Detection

The script analyzes content to choose the best trigger mode:

- **Keywords**: `mui`, `i18n`, `tsx`, `react`, `import`
- **Filename**: `mui.mdc`, `i18n.mdc`, `svg.mdc`
- **Default**: If no keywords found → `manual` trigger

## File Structure

```
.agent/skills/cursor-to-antigravity-rule/
├── SKILL.md                    # Main skill documentation
├── README.md                   # This file
├── scripts/
│   └── convert_rules.py        # Conversion script
└── examples/
    └── conversion-examples.md  # Example conversions
```

## Usage in Chat

Just ask Antigravity:

> "Convert all my Cursor rules to Antigravity format"

> "Use the cursor-to-antigravity-rule skill to convert mui.mdc"

> "I want to migrate my rules from Cursor"

The skill will automatically run the conversion script and report results.

## Options

```bash
python convert_rules.py [options]

Options:
  --source DIR      Source directory (default: .cursor/rules)
  --target DIR      Target directory (default: .agent/rules)
  --single FILE     Convert only one file
  --dry-run         Preview without writing files
  -h, --help        Show help message
```

## Current Project Rules

Your project has these rules:

### Cursor Rules (.cursor/rules/)

- `core.mdc` - Core directives (alwaysApply: true) → `trigger: glob`
- `i18n.mdc` - i18n guidelines (alwaysApply: false) → `trigger: glob`
- `mui.mdc` - MUI import rules (alwaysApply: false) → `trigger: glob`
- `skeleton-query.mdc` - Loading states (alwaysApply: false) → `trigger: glob`
- `svg.mdc` - SVG handling (alwaysApply: false) → `trigger: glob`

### Antigravity Rules (.agent/rules/)

- `core.md` - (already exists, manual override)
- `i18n.md` - (already exists, manual override)

## Recommended Conversion

Based on your current rules:

| File                 | Recommended Trigger | Globs       |
| -------------------- | ------------------- | ----------- |
| `core.mdc`           | `glob`              | (all files) |
| `mui.mdc`            | `glob`              | `*.tsx`     |
| `i18n.mdc`           | `glob`              | `*.tsx`     |
| `svg.mdc`            | `glob`              | `*.tsx`     |
| `skeleton-query.mdc` | `glob`              | `*.tsx`     |

Would you like to run the conversion now?
