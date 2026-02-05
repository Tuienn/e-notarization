---
name: cursor-to-antigravity-skill
description: Copy all skills from Cursor (.cursor/skills/) to Antigravity (.agent/skills/) format. Overwrites existing skills with the same name. Use when migrating skill folders from Cursor IDE to Antigravity.
---

# Cursor to Antigravity Skill Copier

Copy all skill folders from Cursor to Antigravity workspace.

## Overview

This skill copies entire skill directories from `.cursor/skills/` to `.agent/skills/`, preserving all files and folder structure.

### What it does

- ✅ Copies all skill folders from `.cursor/skills/` to `.agent/skills/`
- ✅ Preserves complete folder structure (SKILL.md, scripts/, examples/, etc.)
- ✅ Overwrites existing skills if names match
- ✅ Creates `.agent/skills/` directory if it doesn't exist
- ✅ Reports summary of copied skills

## Usage

### In Chat

Simply ask Antigravity:

> "Copy all Cursor skills to Antigravity"

> "Use cursor-to-antigravity-skill to migrate my skills"

> "Migrate skills from Cursor"

### Direct Command

```bash
cd d:\Code\e-notarization\web-frontend
python .agent\skills\cursor-to-antigravity-skill\scripts\copy_skill.py
```

## Workflow

When you request skill migration:

1. **Read skill list** from `.cursor/skills/`
2. **Copy each skill folder** to `.agent/skills/`
3. **Preserve all files** (SKILL.md, scripts, examples, resources)
4. **Overwrite if exists** - No confirmation needed
5. **Report summary** with list of copied skills

## Examples

### Example 1: Copy All Skills

**User**: "Copy all my Cursor skills"

**Result**:

```
✅ Copied 5 skills:
  - handle-api-service/
  - mui-docs/
  - mui-mcp/
  - react-eslint/
  - skill-creator/
```

### Example 2: After Running Script

**Before**:

```
.cursor/skills/
├── handle-api-service/
│   ├── SKILL.md
│   └── scripts/
├── mui-docs/
│   └── SKILL.md
└── react-eslint/
    ├── SKILL.md
    └── examples/
```

**After**:

```
.agent/skills/
├── handle-api-service/    ← Copied
│   ├── SKILL.md
│   └── scripts/
├── mui-docs/              ← Copied
│   └── SKILL.md
├── react-eslint/          ← Copied
│   ├── SKILL.md
│   └── examples/
└── cursor-to-antigravity-skill/  ← Already exists
    ├── SKILL.md
    └── scripts/
```

## How it Works

### Python Script Logic

```python
1. List all directories in .cursor/skills/
2. For each skill directory:
   a. Create target directory in .agent/skills/
   b. Copy entire directory tree recursively
   c. Overwrite if target exists
3. Report summary
```

### File Preservation

All files are copied exactly as-is:

- `SKILL.md` - Main skill documentation
- `scripts/` - Helper scripts
- `examples/` - Example files
- `resources/` - Additional resources
- Any other files/folders

## Options

```bash
python copy_skill.py [options]

Options:
  --source DIR      Source directory (default: .cursor/skills)
  --target DIR      Target directory (default: .agent/skills)
  --dry-run         Preview without copying
  -h, --help        Show help message
```

## Current Project Skills

Your Cursor skills (`.cursor/skills/`):

- `handle-api-service/` - API service handling patterns
- `mui-docs/` - Material UI documentation integration
- `mui-mcp/` - MUI with MCP server integration
- `react-eslint/` - React ESLint configuration
- `skill-creator/` - Skill creation helper

## Notes

- **Overwrites automatically**: If a skill with the same name exists in `.agent/skills/`, it will be overwritten
- **No confirmation**: Script runs without asking for confirmation on overwrites
- **Preserves structure**: Complete directory tree is copied, not just SKILL.md
- **Safe operation**: Original files in `.cursor/skills/` are never modified

## Quick Command

```bash
# Copy all skills
python .agent\skills\cursor-to-antigravity-skill\scripts\copy_skill.py

# Preview only (dry run)
python .agent\skills\cursor-to-antigravity-skill\scripts\copy_skill.py --dry-run
```

## Workflow Integration

This skill is designed to work together with:

- **cursor-to-antigravity-rule** - For copying rules from `.cursor/rules/` to `.agent/rules/`
- Together, these skills provide complete migration from Cursor to Antigravity workspace
