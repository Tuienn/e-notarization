---
name: cursor-to-antigravity-rule
description: Convert Cursor rules (.mdc files) to Antigravity rules (.md files) following Antigravity's format and conventions. Use when migrating rules from .cursor/rules/*.mdc to .agent/rules/*.md.
---

# Cursor to Antigravity Rule Converter

Convert Cursor IDE rules to Antigravity format automatically.

## Overview

This skill helps convert rule files from Cursor format (`.cursor/rules/*.mdc`) to Antigravity format (`.agent/rules/*.md`).

### Key Differences

**Cursor Rules (.mdc):**

- YAML frontmatter with `alwaysApply: true` or `alwaysApply: false`
- Full markdown content describing rules
- Typically verbose and comprehensive

**Antigravity Rules (.md):**

- YAML frontmatter with `trigger:` (manual/glob/auto)
- Optional `globs:` pattern for file matching
- More concise, focused content

## Workflow

### 1. Identify Source Files

List all `.mdc` files in `.cursor/rules/`:

```bash
ls .cursor/rules/*.mdc
```

### 2. Convert Using Python Script

Use the conversion script located at `scripts/convert_rules.py`:

```bash
python .agent/skills/cursor-to-antigravity-rule/scripts/convert_rules.py
```

**Options:**

- `--source`: Source directory (default: `.cursor/rules`)
- `--target`: Target directory (default: `.agent/rules`)
- `--single`: Convert single file only
- `--dry-run`: Preview changes without writing

### 3. Review Converted Files

After conversion:

1. Check `.agent/rules/` for new `.md` files
2. Review trigger modes (manual/glob/auto)
3. Verify glob patterns if applicable
4. Test rules with Antigravity

## Conversion Rules

### Frontmatter Mapping

| Cursor Format        | Antigravity Format                                   |
| -------------------- | ---------------------------------------------------- |
| `alwaysApply: true`  | `trigger: glob`                                      |
| `alwaysApply: false` | `trigger: manual` or `trigger: glob` (auto-detected) |
| (no field)           | `trigger: manual`                                    |

### Content Processing

1. **Remove Windows Line Endings**: Convert `\r\n` to `\n`
2. **Preserve Markdown**: Keep all markdown formatting
3. **Add Glob Patterns**: Optionally add `globs:` based on content analysis
4. **Simplify if Needed**: Optionally condense verbose content

## Examples

### Example 1: Core Rules (Always Apply)

**Cursor (.cursor/rules/core.mdc):**

```markdown
---
alwaysApply: true
---

# Core Rules

- Use TypeScript
- Follow conventions
```

**Antigravity (.agent/rules/core.md):**

```markdown
---
trigger: glob
---

# Core Rules

- Use TypeScript
- Follow conventions
```

### Example 2: File-Specific Rules

**Cursor (.cursor/rules/mui.mdc):**

```markdown
---
alwaysApply: false
---

# MUI Import Rules

Always use deep imports...
```

**Antigravity (.agent/rules/mui.md):**

```markdown
---
trigger: glob
globs: ['*.tsx', '*.ts']
---

# MUI Import Rules

Always use deep imports...
```

### Example 3: Manual Trigger Rules

**Cursor (.cursor/rules/skeleton-query.mdc):**

```markdown
---
alwaysApply: false
---

# Loading State Patterns

Use Skeleton for loading...
```

**Antigravity (.agent/rules/skeleton-query.md):**

```markdown
---
trigger: manual
---

# Loading State Patterns

Use Skeleton for loading...
```

## Usage

### Interactive Mode

1. Ask user which rules to convert:

    ```
    "Which rules would you like to convert? (all/specific files)"
    ```

2. Run conversion script:

    ```bash
    python .agent/skills/cursor-to-antigravity-rule/scripts/convert_rules.py
    ```

3. Report results:
    ```
    ✅ Converted 5 files:
    - core.mdc → core.md (trigger: auto)
    - mui.mdc → mui.md (trigger: glob, globs: *.tsx)
    - i18n.mdc → i18n.md (trigger: glob, globs: *.tsx)
    - svg.mdc → svg.md (trigger: glob, globs: *.tsx)
    - skeleton-query.mdc → skeleton-query.md (trigger: manual)
    ```

### Automatic Mode

When user says "convert all cursor rules":

1. Read all `.mdc` files from `.cursor/rules/`
2. Auto-convert with smart trigger detection
3. Write to `.agent/rules/`
4. Report summary

## Smart Trigger Detection

The script analyzes content to determine the best trigger mode:

```python
def detect_trigger(content: str, always_apply: bool) -> dict:
    if always_apply:
        return {"trigger": "glob"}

    # Check for file-specific keywords
    if any(keyword in content.lower() for keyword in ["tsx", "component", "import", "react"]):
        return {"trigger": "glob", "globs": ["*.tsx", "*.ts"]}

    # Default to manual
    return {"trigger": "manual"}
```

## Post-Conversion Checklist

- [ ] All `.mdc` files converted to `.md`
- [ ] Frontmatter uses correct trigger modes
- [ ] Glob patterns added where appropriate
- [ ] Content preserved accurately
- [ ] Line endings normalized to `\n`
- [ ] Test rules work in Antigravity
- [ ] Update `.gitignore` if needed

## Troubleshooting

**Issue**: Rules not triggering in Antigravity

- **Solution**: Check frontmatter syntax, ensure `trigger:` field is present

**Issue**: Glob patterns not matching

- **Solution**: Test glob patterns, ensure they match your file structure

**Issue**: Content formatting broken

- **Solution**: Check for special characters, ensure markdown is valid

## Quick Command Reference

```bash
# Convert all rules
python .agent/skills/cursor-to-antigravity-rule/scripts/convert_rules.py

# Convert specific file
python .agent/skills/cursor-to-antigravity-rule/scripts/convert_rules.py --single core.mdc

# Dry run (preview only)
python .agent/skills/cursor-to-antigravity-rule/scripts/convert_rules.py --dry-run

# Custom paths
python .agent/skills/cursor-to-antigravity-rule/scripts/convert_rules.py \
    --source .cursor/rules \
    --target .agent/rules
```
