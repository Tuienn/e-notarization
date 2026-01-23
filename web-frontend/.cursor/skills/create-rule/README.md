# Create Rule Skill

A Cursor skill for creating standardized rule files in the e-notarization project.

## What This Skill Does

This skill helps create rule files in `.claude/rules/` that guide AI behavior for the e-notarization web-frontend project. It provides templates, patterns, and guidelines for different types of rules.

## When to Use

The AI will automatically use this skill when you:

- Ask to create new rules or conventions
- Mention `.claude/rules/` directory
- Want to add coding standards
- Need to integrate a new library
- Want to document file patterns or protocols

## Quick Examples

### Creating Core Project Rules

```
User: "Create rules for our form validation patterns"
AI: [Uses this skill to create component-patterns.md or validation-patterns.md]
```

### Creating Library Integration Rules

```
User: "Add rules for using TanStack Query"
AI: [Uses this skill to create tanstack-query-integration.md]
```

### Creating Protocol Rules

```
User: "Document our API service implementation pattern"
AI: [Uses this skill to create api-service-protocol.md]
```

## Rule Categories

1. **Project Conventions** - Core tech stack and coding standards
2. **Library Integration** - How to use specific libraries
3. **File Patterns** - Templates and organization rules

## Files in This Skill

- `SKILL.md` - Main skill instructions for the AI
- `examples.md` - Complete example rule files for reference
- `README.md` - This file (documentation for humans)

## Rule File Patterns

The skill follows patterns established in existing rules:

- **Military/Mission Style**: Uses terms like DIRECTIVE, MISSION, PROTOCOL
- **Bilingual**: Vietnamese for context, English for code
- **Hierarchical**: Clear numbered sections and subsections
- **Example-Rich**: Shows both correct (✅) and incorrect (❌) patterns

## Existing Rules

Current rules in the project:

- `core.md` - Core tech stack, architecture, and coding conventions
- `mui-mcp.md` - Material UI integration with MCP server
- `instructions.md` - High-level guidelines for AI agents

## Contributing

When the skill creates a new rule file:

1. Review the generated content
2. Verify it doesn't conflict with existing rules
3. Test that examples are accurate
4. Commit the rule file to git (tracked in `.claude/rules/`)

## Priority System

Rules follow a priority order:

1. **Highest**: `core.md` - Core project conventions
2. **Medium**: Specific integration rules (e.g., `mui-mcp.md`)
3. **Lower**: General best practices

When rules conflict, higher priority rules take precedence.

## Skill Metadata

- **Name**: `create-rule`
- **Type**: Project skill
- **Location**: `.cursor/skills/create-rule/`
- **Scope**: e-notarization web-frontend project only

---

Created: January 23, 2026
