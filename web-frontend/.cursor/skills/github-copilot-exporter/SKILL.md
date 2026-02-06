# GitHub Copilot Exporter

Export Cursor rules and skills into GitHub Copilot repository instruction format under `.github/`.

## Overview

This skill provides Python scripts to export:

- **Rules**: `.cursor/rules/*.mdc` → `.github/copilot-instructions.md` and `.github/instructions/*.instructions.md`
- **Skills (copy as-is)**: `.cursor/skills/*/` → `.github/skills/*/`

### Exclusions (hard-coded)

When exporting skills, these folders are excluded:

- `antigravity-exporter`
- `github-copilot-exporter`

## Quick Start

### Preview (Dry Run)

```bash
python .cursor\skills\github-copilot-exporter\scripts\export_rules.py --dry-run
python .cursor\skills\github-copilot-exporter\scripts\export_skills.py --dry-run
```

### Export (Write Files)

```bash
python .cursor\skills\github-copilot-exporter\scripts\export_rules.py
python .cursor\skills\github-copilot-exporter\scripts\export_skills.py
```

## Exporting Rules

### What It Does

- Reads `.mdc` files from `.cursor/rules/`
- Splits frontmatter and body
- If a rule has `alwaysApply: true`, it is appended to `.github/copilot-instructions.md` (repository-wide)
- Otherwise it is exported to `.github/instructions/<rule>.instructions.md` with frontmatter `applyTo`

### applyTo Mapping

- If the `.mdc` frontmatter contains `globs`, it is used as `applyTo` (with minimal normalization)
- Otherwise defaults to: `**/*.ts,**/*.tsx`

## Exporting Skills (Copy)

### What It Does

- Copies each folder in `.cursor/skills/` into `.github/skills/`
- Excludes `antigravity-exporter` and `github-copilot-exporter`
- Overwrites existing folders with the same name

## Command Reference

### export_rules.py

```bash
python .cursor\skills\github-copilot-exporter\scripts\export_rules.py [options]

Options:
  --source DIR      Source rules directory (default: .cursor/rules)
  --target DIR      Target .github directory (default: .github)
  --dry-run         Preview without writing
  --single FILE     Export a single .mdc file only (e.g., core.mdc)
```

### export_skills.py

```bash
python .cursor\skills\github-copilot-exporter\scripts\export_skills.py [options]

Options:
  --source DIR      Source skills directory (default: .cursor/skills)
  --target DIR      Target skills directory (default: .github/skills)
  --dry-run         Preview without writing
  --list            List available skills in source
```
