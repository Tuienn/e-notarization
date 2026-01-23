---
name: create-rule
description: Create Cursor rule files in .claude/rules/ for the e-notarization project. Use when the user wants to add coding standards, library integration rules, file-specific patterns, or development protocols. Use when user mentions rules, conventions, or .claude/rules/.
---

# Create Cursor Rules

Create rule files in `.claude/rules/` to guide AI behavior for the e-notarization project.

## Quick Start

When creating a new rule file:

1. Determine the rule category
2. Choose an appropriate filename
3. Structure the content following project patterns
4. Place the file in `.claude/rules/`

## Rule Categories

### 1. Project Conventions (core.md pattern)

For tech stack, architecture, and coding standards.

**Use when:**

- Defining technology choices
- Setting coding conventions
- Documenting project structure
- Establishing mandatory patterns

**Template structure:**

```markdown
# [RULE TITLE]

**STATUS:** Active
**MISSION:** [Purpose of these rules]

[Introduction in Vietnamese explaining the rules]

---

## 1. [SECTION NAME]

[Rules and directives]

- **[Technology]:** [Details]
- **Directive:** [Mandatory instruction]

---

## 2. [NEXT SECTION]

...
```

### 2. Library/Framework Integration (mui-mcp.md pattern)

For specific library usage and best practices.

**Use when:**

- Integrating new libraries
- Defining library-specific workflows
- Setting up MCP server usage
- Documenting API patterns

**Template structure:**

```markdown
# [LIBRARY NAME] INTEGRATION RULES

## MISSION: [Purpose]

[Brief description]

---

## PROTOCOL: [Main Workflow]

### Step 1: [Action]

- **DIRECTIVE:** [Instruction]
- **CRITICAL:** [Important note]

### Step 2: [Next Action]

...

---

## INTEGRATION WITH CORE DIRECTIVES

### Priority Order

1. **First:** [Highest priority]
2. **Second:** [Next priority]

---

## TROUBLESHOOTING PROTOCOL

### If [Problem]:

1. [Solution step]
2. [Next step]

---

## SUCCESS CRITERIA

✅ [Verification point 1]
✅ [Verification point 2]
```

### 3. File-Specific Patterns

For templates, naming conventions, or file organization.

**Use when:**

- Creating file templates
- Defining naming conventions
- Setting up file organization rules
- Documenting file-specific patterns

**Template structure:**

```markdown
# [FILE TYPE] PATTERNS

## Purpose

[What this rule governs]

## File Naming

- **Convention:** [Pattern]
- **Examples:**
    - ✅ Good: [example]
    - ❌ Bad: [example]

## File Structure Template

\`\`\`typescript
// Template code here
\`\`\`

## Rules

1. [Rule 1]
2. [Rule 2]
```

## Writing Style Guidelines

Follow these patterns from existing rules:

### Use Military/Mission Style for Core Rules

```markdown
**MISSION:** [Objective]
**DIRECTIVE:** [Command]
**CRITICAL:** [Essential warning]
**FORBIDDEN:** [Prohibited action]
**PROTOCOL:** [Required procedure]
```

### Use Vietnamese for Context/Explanations

Core rules and explanations use Vietnamese to ensure clarity for the team.

### Use English for Code and Technical Terms

Keep technical terminology, code examples, and package names in English.

### Hierarchical Structure

```markdown
## 1. MAIN SECTION (UPPERCASE)

### 1.1. Subsection (Title Case)

- **Bold Term:** Description
```

## Filename Conventions

| Type                 | Filename                   | Example                                |
| -------------------- | -------------------------- | -------------------------------------- |
| Core project rules   | `core.md`                  | Tech stack, architecture               |
| Library integration  | `[library]-integration.md` | `mui-mcp.md`, `tanstack-router.md`     |
| Workflow protocols   | `[workflow]-protocol.md`   | `api-protocol.md`, `state-protocol.md` |
| General instructions | `instructions.md`          | High-level guidelines                  |
| File patterns        | `[filetype]-patterns.md`   | `component-patterns.md`                |

## Rule Priority System

When rules may conflict, establish priority:

```markdown
## INTEGRATION WITH CORE DIRECTIVES

### Priority Order

1. **First:** Core project conventions (core.md)
2. **Second:** [This rule file]
3. **Third:** General best practices
```

## Best Practices

### ✅ DO

- **Be specific**: Use concrete examples and clear directives
- **Use consistent terminology**: Maintain vocabulary across all rules
- **Include examples**: Show both correct (✅) and incorrect (❌) patterns
- **Structure hierarchically**: Use clear section numbering
- **Reference other rules**: Link to related rule files when needed
- **Add verification criteria**: Include success criteria or checklist

### ❌ DON'T

- **Be vague**: Avoid "try to" or "consider maybe"
- **Create conflicts**: Check existing rules before adding new ones
- **Over-explain**: Keep rules concise and actionable
- **Mix languages**: Vietnamese for context, English for code
- **Skip examples**: Always show how to apply the rule

## Implementation Workflow

### Step 1: Analyze the Need

Ask or infer:

- What problem does this rule solve?
- Which category does it fit?
- Does it conflict with existing rules?
- Who is the audience (AI, developers, both)?

### Step 2: Choose Template

Select the appropriate template based on category.

### Step 3: Draft Content

Write the rule following the template and style guidelines.

### Step 4: Create File

Place the file in `.claude/rules/` with appropriate filename.

### Step 5: Verify

Check:

- [ ] Filename follows conventions
- [ ] Structure matches template
- [ ] No conflicts with existing rules
- [ ] Examples are clear
- [ ] Vietnamese/English usage is correct

## Example: Creating a New Rule

**User request:** "Add rules for API service implementation"

**Implementation:**

1. **Category**: Library integration + File patterns
2. **Filename**: `api-service-protocol.md`
3. **Structure**:

```markdown
# API SERVICE PROTOCOL

## MISSION: Standardize Backend Communication

[Vietnamese introduction]

---

## 1. SERVICE STRUCTURE

### 1.1. File Organization

Services must be in `src/services/[backend-name]/`:

\`\`\`text
src/services/gin/
├── auth.service.ts
├── user.service.ts
└── document.service.ts
\`\`\`

### 1.2. Implementation Pattern

\`\`\`typescript
export class AuthService {
static async login(credentials: LoginDto) {
// Implementation
}
}
\`\`\`

**Directives:**

- Use `class` with `static` methods
- Export class as named export
- Use TypeScript types from `src/types/`

---

## 2. INTEGRATION WITH TANSTACK QUERY

[Rules for using services with TanStack Query]

---

## SUCCESS CRITERIA

✅ All API calls go through service layer
✅ Services use consistent error handling
✅ Types are properly defined
```

## Additional Resources

For reference, examine existing rules:

- `core.md` - Core tech stack and conventions
- `mui-mcp.md` - Library integration example
- `instructions.md` - High-level guidelines

## Common Rule Patterns

### For "Must Use" Directives

```markdown
**BẮT BUỘC** sử dụng [technology]
**CẤM TUYỆT ĐỐI** sử dụng [alternative]
```

### For Troubleshooting

```markdown
## TROUBLESHOOTING PROTOCOL

### If [Problem Occurs]:

1. [First solution step]
2. [Alternative approach]
3. [Escalation path]
```

### For Verification

```markdown
## VERIFICATION CHECKLIST

Before [action], verify:

- [ ] [Requirement 1]
- [ ] [Requirement 2]
- [ ] [Requirement 3]
```

### For Examples

```markdown
**Example [Number]:**

**Scenario:** [Context]

**Implementation:**
\`\`\`typescript
// Code here
\`\`\`

**Result:** [Outcome]
```

---

**Remember:** Rules should be clear, actionable, and maintainable. When in doubt, favor specificity over flexibility.
