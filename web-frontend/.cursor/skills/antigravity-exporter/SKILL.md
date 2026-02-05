---
name: antigravity-exporter
description: Export Cursor rules and skills to Antigravity format. Use when migrating rules from .cursor/rules/*.mdc to .agent/rules/*.md or copying skills from .cursor/skills/ to .agent/skills/. This skill operates from Cursor's perspective.
---

# Antigravity Exporter

Export rules and skills from Cursor to Antigravity workspace.

## Overview

This skill provides Python scripts to export Cursor content to Antigravity format:

- **Rules**: Convert `.cursor/rules/*.mdc` → `.agent/rules/*.md`
- **Skills**: Copy `.cursor/skills/` → `.agent/skills/`

All scripts run from Cursor's perspective (located in `.cursor/skills/antigravity-exporter/scripts/`).

## Quick Start

### Export All Rules

```bash
python .cursor\skills\antigravity-exporter\scripts\export_rules.py
```

### Export All Skills

```bash
python .cursor\skills\antigravity-exporter\scripts\export_skills.py
```

### Preview Before Exporting (Dry Run)

```bash
python .cursor\skills\antigravity-exporter\scripts\export_rules.py --dry-run
python .cursor\skills\antigravity-exporter\scripts\export_skills.py --dry-run
```

## Exporting Rules

### What It Does

Converts Cursor rule files to Antigravity format:

- Reads `.mdc` files from `.cursor/rules/`
- Converts `alwaysApply` to `trigger` field
- Adds `globs` pattern for file-specific rules
- Writes `.md` files to `.agent/rules/`
- Normalizes line endings and formatting

### Frontmatter Conversion

| Cursor Format        | Antigravity Format                 |
| -------------------- | ---------------------------------- |
| `alwaysApply: true`  | `trigger: glob`                    |
| `alwaysApply: false` | `trigger: glob` or `trigger: manual` (auto-detected) |
| (no field)           | `trigger: manual`                  |

### Smart Trigger Detection

The script analyzes content to determine the best trigger mode:

- **React/TypeScript keywords** (tsx, component, props) → `trigger: glob, globs: *.tsx`
- **MUI keywords** (@mui/material, mui) → `trigger: glob, globs: *.tsx`
- **i18n keywords** (i18n, translation, useTranslation) → `trigger: glob, globs: *.tsx`
- **SVG keywords** → `trigger: glob, globs: *.tsx`
- **Default** → `trigger: manual`

### Usage Examples

**Export all rules:**

```bash
python .cursor\skills\antigravity-exporter\scripts\export_rules.py
```

**Export single rule:**

```bash
python .cursor\skills\antigravity-exporter\scripts\export_rules.py --single core.mdc
```

**Preview changes:**

```bash
python .cursor\skills\antigravity-exporter\scripts\export_rules.py --dry-run
```

**Custom paths:**

```bash
python .cursor\skills\antigravity-exporter\scripts\export_rules.py --source .cursor/rules --target .agent/rules
```

### Example Output

```
[INFO] Exporting 5 rule(s)...

[SUCCESS] core.mdc -> core.md
[SUCCESS] mui.mdc -> mui.md
[SUCCESS] i18n.mdc -> i18n.md
[SUCCESS] svg.mdc -> svg.md
[SUCCESS] skeleton-query.mdc -> skeleton-query.md

============================================================
Export Summary
============================================================
Total files: 5
Successful: 5
Failed: 0

Exported rules:
   - core.mdc -> core.md (trigger: glob)
   - mui.mdc -> mui.md (trigger: glob, globs: *.tsx)
   - i18n.mdc -> i18n.md (trigger: glob, globs: *.tsx)
   - svg.mdc -> svg.md (trigger: glob, globs: *.tsx)
   - skeleton-query.mdc -> skeleton-query.md (trigger: manual)
============================================================
```

## Exporting Skills

### What It Does

Copies entire skill directories from Cursor to Antigravity:

- Reads skill folders from `.cursor/skills/`
- Excludes `antigravity-exporter` itself (prevents recursion)
- Preserves complete folder structure
- Copies all files (SKILL.md, scripts/, references/, assets/)
- Overwrites existing skills if names match
- Creates `.agent/skills/` if needed

### Usage Examples

**Export all skills:**

```bash
python .cursor\skills\antigravity-exporter\scripts\export_skills.py
```

**Preview changes:**

```bash
python .cursor\skills\antigravity-exporter\scripts\export_skills.py --dry-run
```

**List available skills:**

```bash
python .cursor\skills\antigravity-exporter\scripts\export_skills.py --list
```

**Custom paths:**

```bash
python .cursor\skills\antigravity-exporter\scripts\export_skills.py --source .cursor/skills --target .agent/skills
```

### Example Output

```
[INFO] Exporting 5 skill(s)...

[SUCCESS] handle-api-service/ (create)
[SUCCESS] mui-docs/ (overwrite)
[SUCCESS] mui-mcp/ (create)
[SUCCESS] react-eslint/ (create)
[SUCCESS] skill-creator/ (overwrite)

============================================================
Export Summary
============================================================
Total skills: 5
Successful: 5
   - Created: 3
   - Overwritten: 2
Failed: 0

Exported skills:
   [Created]: handle-api-service/
   [Overwritten]: mui-docs/
   [Created]: mui-mcp/
   [Created]: react-eslint/
   [Overwritten]: skill-creator/
============================================================
```

## Complete Workflow

To export everything from Cursor to Antigravity:

```bash
# 1. Export all rules
python .cursor\skills\antigravity-exporter\scripts\export_rules.py

# 2. Export all skills
python .cursor\skills\antigravity-exporter\scripts\export_skills.py
```

Or preview first:

```bash
# Preview rules export
python .cursor\skills\antigravity-exporter\scripts\export_rules.py --dry-run

# Preview skills export
python .cursor\skills\antigravity-exporter\scripts\export_skills.py --dry-run

# If satisfied, run without --dry-run
python .cursor\skills\antigravity-exporter\scripts\export_rules.py
python .cursor\skills\antigravity-exporter\scripts\export_skills.py
```

## Command Reference

### export_rules.py

```bash
python export_rules.py [options]

Options:
  --source DIR      Source directory (default: .cursor/rules)
  --target DIR      Target directory (default: .agent/rules)
  --single FILE     Export single file only (e.g., core.mdc)
  --dry-run         Preview without writing
  -h, --help        Show help message
```

### export_skills.py

```bash
python export_skills.py [options]

Options:
  --source DIR      Source directory (default: .cursor/skills)
  --target DIR      Target directory (default: .agent/skills)
  --dry-run         Preview without exporting
  --list            List all skills in source directory
  -h, --help        Show help message
```

## Notes

- **Operating from Cursor**: Scripts are located in `.cursor/skills/antigravity-exporter/scripts/`
- **Safe operation**: Source files in `.cursor/` are never modified
- **Automatic overwrite**: Existing files/folders in `.agent/` are overwritten without confirmation
- **Self-exclusion**: `antigravity-exporter` skill itself is excluded from skills export
- **Directory creation**: Target directories are created automatically if they don't exist
- **Line endings**: Rules are normalized to Unix line endings (`\n`)

## Use Cases

**Initial migration**: Export all Cursor rules and skills to Antigravity when first setting up.

**Incremental updates**: After modifying rules or skills in Cursor, export them to sync with Antigravity.

**Backup/sync**: Keep Antigravity workspace in sync with Cursor workspace.

**Testing**: Use `--dry-run` to preview changes before applying them.

## Troubleshooting

**Issue**: Script not found

**Solution**: Ensure you're running from project root and path includes `.cursor\skills\antigravity-exporter\scripts\`

---

**Issue**: Permission denied

**Solution**: Check file permissions, ensure `.agent/` directory is writable

---

**Issue**: Files not triggering in Antigravity

**Solution**: Check frontmatter syntax, verify `trigger:` field is correct, test glob patterns

---

**Issue**: Content formatting broken

**Solution**: Check for special characters, ensure markdown is valid
