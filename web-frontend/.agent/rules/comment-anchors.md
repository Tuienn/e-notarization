---
trigger: always_on
---

# Comment Anchor Rules

Use anchor tags in comments to organize code and track tasks.
The comment syntax may vary by language (`//`, `#`, `/* */`, `--`, `<!-- -->`, etc.).
Only the **TAG format** must follow this rule.

## Format

```
TAG - message
```

Tags must be **UPPERCASE** and followed by a dash (`-`).

## Tags

| Tag       | Purpose                                          |
| --------- | ------------------------------------------------ |
| `SECTION` | Defines a major code section or logical block    |
| `ANCHOR`  | Marks an important location in the file          |
| `TODO`    | Task that still needs implementation             |
| `FIXME`   | Known bug that must be fixed                     |
| `REVIEW`  | Code that needs further review                   |
| `NOTE`    | Important information for developers             |
| `STUB`    | Placeholder for future implementation            |
| `LINK`    | Reference to documentation or external resources |

## Examples

```js
// SECTION - API Routes
// ANCHOR - JWT Verification
// TODO - Add request validation
// FIXME - Incorrect timezone conversion
// REVIEW - Security check for token refresh
// NOTE - Rate limit is 100 requests/min
// STUB - Implement payment webhook
// LINK - https://stripe.com/docs/api
```
