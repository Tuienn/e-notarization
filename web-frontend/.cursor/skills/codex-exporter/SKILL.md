---
name: codex-exporter
description: Export Cursor rules and skills to OpenAI Codex format under `.agents/`. Use when migrating rules from `.cursor/rules/*.mdc` to `.agents/AGENTS.md` or copying skills from `.cursor/skills/` to `.agents/skills/`. This skill operates from Cursor's perspective.
---

# Codex Exporter

Export Cursor rules and skills into OpenAI Codex format.

## Overview

Two Python scripts handle the export:

- **Rules**: `.cursor/rules/*.mdc` → `.agents/AGENTS.md` (alwaysApply) + `.agents/rules/*.md` (scoped)
- **Skills (copy as-is)**: `.cursor/skills/*/` → `.agents/skills/*/`

### Exclusions (hard-coded)

When exporting skills, these folders are excluded:

- `antigravity-exporter`
- `github-copilot-exporter`
- `codex-exporter`

## Quick Start

### Preview (Dry Run)

```bash
python .cursor\skills\codex-exporter\scripts\export_rules.py --dry-run
python .cursor\skills\codex-exporter\scripts\export_skills.py --dry-run
```

### Export (Write Files)

```bash
python .cursor\skills\codex-exporter\scripts\export_rules.py
python .cursor\skills\codex-exporter\scripts\export_skills.py
```

## Exporting Rules

### What It Does

- Reads `.mdc` files from `.cursor/rules/`
- Splits frontmatter and body
- If a rule has `alwaysApply: true`, it is appended to `.agents/AGENTS.md` (repository-wide)
- Otherwise it is exported to `.agents/rules/<name>.md` (scoped rule file)

## Exporting Skills (Copy)

### What It Does

- Copies each folder in `.cursor/skills/` into `.agents/skills/`
- Excludes `antigravity-exporter`, `github-copilot-exporter`, and `codex-exporter`
- Overwrites existing folders with the same name

## Command Reference

### export_rules.py

```bash
python .cursor\skills\codex-exporter\scripts\export_rules.py [options]

Options:
  --source DIR      Source rules directory (default: .cursor/rules)
  --target DIR      Target .agents directory (default: .agents)
  --dry-run         Preview without writing
  --single FILE     Export a single .mdc file only (e.g., core.mdc)
```

### export_skills.py

```bash
python .cursor\skills\codex-exporter\scripts\export_skills.py [options]

Options:
  --source DIR      Source skills directory (default: .cursor/skills)
  --target DIR      Target skills directory (default: .agents/skills)
  --dry-run         Preview without writing
  --list            List available skills in source
```

## Codex Skills Format

Codex reads skills from `.agents/skills/` in the repo. Each skill is a folder with a `SKILL.md` file containing `name` and `description` frontmatter — same format as Cursor skills.

For repository-wide instructions, Codex reads `AGENTS.md` files placed in the repo (root or subdirectories).
