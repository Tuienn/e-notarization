from __future__ import annotations

import argparse
from dataclasses import dataclass
from pathlib import Path
from typing import Iterable


@dataclass(frozen=True)
class MdcRule:
    filename: str
    frontmatter: dict[str, str]
    body: str


def _parse_frontmatter(lines: list[str]) -> tuple[dict[str, str], int]:
    """
    Minimal frontmatter parser for Cursor .mdc files.
    Supports:
      ---
      key: value
      ---
    Returns (frontmatter, body_start_index).
    """
    if len(lines) < 3 or lines[0].strip() != "---":
        return ({}, 0)

    frontmatter: dict[str, str] = {}
    i = 1
    while i < len(lines):
        if lines[i].strip() == "---":
            return (frontmatter, i + 1)
        raw = lines[i].rstrip("\n")
        if not raw.strip():
            i += 1
            continue
        if ":" not in raw:
            i += 1
            continue
        key, value = raw.split(":", 1)
        frontmatter[key.strip()] = value.strip().strip("'").strip('"')
        i += 1

    return ({}, 0)


def read_mdc(path: Path) -> MdcRule:
    text = path.read_text(encoding="utf-8")
    lines = text.splitlines(keepends=True)
    frontmatter, body_start = _parse_frontmatter(lines)
    body = "".join(lines[body_start:]).lstrip("\n")
    return MdcRule(filename=path.name, frontmatter=frontmatter, body=body)


def normalize_apply_to(globs_value: str) -> str:
    v = (globs_value or "").strip()
    if not v:
        return "**/*.ts,**/*.tsx"

    # If user provided already a multi-glob list, keep it.
    if "," in v:
        return v

    # Common simple cases
    if v == "*.tsx":
        return "**/*.tsx"
    if v == "*.ts":
        return "**/*.ts"

    return v


def is_always_apply(rule: MdcRule) -> bool:
    return rule.frontmatter.get("alwaysApply", "").lower() == "true"


def ensure_dir(path: Path, dry_run: bool) -> None:
    if dry_run:
        return
    path.mkdir(parents=True, exist_ok=True)


def write_text(path: Path, content: str, dry_run: bool) -> None:
    if dry_run:
        return
    path.write_text(content.replace("\r\n", "\n"), encoding="utf-8")


def build_repo_wide_instructions(always_rules: list[MdcRule]) -> str:
    parts: list[str] = []
    parts.append("# Repository Instructions\n")
    parts.append(
        "These are repository-wide instructions for GitHub Copilot in this repo.\n"
    )
    parts.append("\n")
    parts.append("## Included rules\n")
    for rule in always_rules:
        parts.append(f"- `{rule.filename}`\n")
    parts.append("\n")

    for rule in always_rules:
        title = rule.frontmatter.get("description") or rule.filename
        parts.append(f"---\n\n## {title}\n\n")
        parts.append(rule.body.rstrip() + "\n")

    return "".join(parts).strip() + "\n"


def build_path_specific_instruction(rule: MdcRule, apply_to: str) -> str:
    return (
        "---\n"
        f'applyTo: "{apply_to}"\n'
        "---\n\n"
        + rule.body.strip()
        + "\n"
    )


def iter_rule_files(source_dir: Path) -> Iterable[Path]:
    return sorted(source_dir.glob("*.mdc"), key=lambda p: p.name.lower())


def main() -> int:
    parser = argparse.ArgumentParser(description="Export Cursor rules to .github/")
    parser.add_argument("--source", default=".cursor/rules", help="Source rules dir")
    parser.add_argument("--target", default=".github", help="Target .github dir")
    parser.add_argument("--dry-run", action="store_true", help="Preview only")
    parser.add_argument(
        "--single", default="", help="Export a single .mdc file (e.g., core.mdc)"
    )
    args = parser.parse_args()

    repo_root = Path.cwd()
    source_dir = (repo_root / args.source).resolve()
    github_dir = (repo_root / args.target).resolve()
    instructions_dir = github_dir / "instructions"

    if not source_dir.exists():
        raise SystemExit(f"[ERROR] Source rules dir not found: {source_dir}")

    rule_paths = list(iter_rule_files(source_dir))
    if args.single:
        rule_paths = [p for p in rule_paths if p.name == args.single]
        if not rule_paths:
            raise SystemExit(f"[ERROR] Rule not found: {args.single}")

    rules = [read_mdc(p) for p in rule_paths]
    always_rules = [r for r in rules if is_always_apply(r)]
    scoped_rules = [r for r in rules if not is_always_apply(r)]

    print("[DRY RUN] No files will be written\n" if args.dry_run else "")
    print(f"[INFO] Exporting {len(rules)} rule(s)...\n")

    ensure_dir(github_dir, args.dry_run)
    ensure_dir(instructions_dir, args.dry_run)

    # 1) Repository-wide
    if always_rules:
        out_repo = github_dir / "copilot-instructions.md"
        content = build_repo_wide_instructions(always_rules)
        print(f"[{'DRY RUN' if args.dry_run else 'WRITE'}] {out_repo}")
        write_text(out_repo, content, args.dry_run)

    # 2) Path-specific
    for rule in scoped_rules:
        apply_to = normalize_apply_to(rule.frontmatter.get("globs", ""))
        out_file = instructions_dir / f"{Path(rule.filename).stem}.instructions.md"
        content = build_path_specific_instruction(rule, apply_to)
        print(f"[{'DRY RUN' if args.dry_run else 'WRITE'}] {out_file} (applyTo={apply_to})")
        write_text(out_file, content, args.dry_run)

    print("\n[SUCCESS] Done.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

